/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { getDictionary } from "@/lib/i18n"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import { z } from "zod"

export type DictionaryShape = Awaited<ReturnType<typeof getDictionary>>

const createContactSchema = (t: DictionaryShape["contact"]) => {
  const e = t.errors ?? {}
  const msg = (key: string, fallback: string) => e[key as keyof typeof e] ?? fallback

  return z.object({
    name: z
      .string()
      .min(1, msg("required", "This field is required"))
      .max(255, msg("maxName", "Name must be less than 255 characters")),
    email: z
      .string()
      .min(1, msg("required", "This field is required"))
      .email(msg("email", "Invalid email address")),
    phone: z
      .string()
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, msg("phone", "Invalid phone number format"))
      .optional()
      .or(z.literal("")),
    company: z
      .string()
      .max(255, msg("maxCompany", "Company name must be less than 255 characters"))
      .optional()
      .or(z.literal("")),
    subject: z
      .string()
      .min(1, msg("required", "This field is required"))
      .max(255, msg("maxSubject", "Subject must be less than 255 characters")),
    message: z
      .string()
      .min(10, msg("minMessage", "Message must be at least 10 characters"))
      .max(5000, msg("maxMessage", "Message must be less than 5000 characters")),
    category: z
      .enum([
        "GENERAL_INQUIRY",
        "SUPPORT",
        "SALES",
        "PARTNERSHIP",
        "FEEDBACK",
        "COMPLAINT",
        "SERVICE_INQUIRY",
        "OTHER",
      ])
      .default("GENERAL_INQUIRY"),
  })
}

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>

export default function ContactForm({
  dictionary,
}: {
  dictionary: DictionaryShape
}) {
  const t = dictionary.contact
  const schema = createContactSchema(t)

  const formRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    category: "GENERAL_INQUIRY",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData | "submit", string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useGSAP(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      })
    }
  }, [])

  useGSAP(() => {
    if (isSuccess && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      )
    }
  }, [isSuccess])

  const validateField = (name: keyof ContactFormData, value: string): string => {
    try {
      createContactSchema(t).shape[name].parse(value)
      return ""
    } catch (error : any) {
      if (error instanceof z.ZodError as any) {
        return error.errors[0]?.message || ""
      }
      return ""
    }
  }
  const validateForm = (): boolean => {
    try {
      createContactSchema(t).parse(formData)
      setErrors({})
      return true
    } catch (error : any) {
      if (error instanceof z.ZodError as any  ) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
        error.errors.forEach((err : any) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message
          }
        })
        setErrors(newErrors)
        return false
      }
      return false
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value } as ContactFormData))

    // Real-time validation
    if (touched[name as keyof ContactFormData]) {
      const error = validateField(name as keyof ContactFormData, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name as keyof ContactFormData, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof ContactFormData] = true
      return acc
    }, {} as Partial<Record<keyof ContactFormData, boolean>>)
    setTouched(allTouched)

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const referrer = typeof document !== "undefined" ? document.referrer || "" : ""
      const source = typeof window !== "undefined" ? window.location.hostname : ""

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        subject: formData.subject,
        message: formData.message,
        category: formData.category,
        status: "NEW",
        priority: "MEDIUM",
        source: source || null,
        referrer: referrer || null,
      }

      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          category: "GENERAL_INQUIRY",
        })
        setErrors({})
        setTouched({})

        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        const errorData = await response.json().catch(() => ({}))
        setErrors((prev) => ({
          ...prev,
          submit: (errorData?.message as string) || t.errors?.submit || "Failed to send. Please try again.",
        }))
      }
    } catch (error) {
      console.error("Submission error:", error)
      setErrors((prev) => ({ ...prev, submit: t.errors?.submit || "Failed to send. Please try again." }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // categories from dictionary, with fallback order-preserving default
  const categoryOptions = Object.keys(t.categories ?? {}).length
    ? Object.entries(t.categories)
    : [
        ["GENERAL_INQUIRY", "General Inquiry"],
        ["SUPPORT", "Support"],
        ["SALES", "Sales"],
        ["PARTNERSHIP", "Partnership"],
        ["FEEDBACK", "Feedback"],
        ["COMPLAINT", "Complaint"],
        ["SERVICE_INQUIRY", "Service Inquiry"],
        ["OTHER", "Other"],
      ]

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div ref={formRef} className="text-card-foreground p-8 border-b">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">{t.title}</h2>
            <p className="text-muted-foreground text-lg">{t.subtitle}</p>
          </div>

          {isSuccess && (
            <div
              ref={successRef}
              className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg"
              role="status"
            >
              ✓ {t.success}
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg" role="alert">
              {errors.submit}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.fields.name} <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.name && touched.name ? "border-red-500" : ""
                  }`}
                  placeholder={t.placeholders.name}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name && touched.name ? "err-name" : undefined}
                />
                {errors.name && touched.name && (
                  <p id="err-name" className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.fields.subject} <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.subject && touched.subject ? "border-red-500" : ""
                  }`}
                  placeholder={t.placeholders.subject}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject && touched.subject ? "err-subject" : undefined}
                />
                {errors.subject && touched.subject && (
                  <p id="err-subject" className="text-red-500 text-sm mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.fields.email} <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                  placeholder={t.placeholders.email}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email && touched.email ? "err-email" : undefined}
                />
                {errors.email && touched.email && (
                  <p id="err-email" className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.fields.phone}</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.phone && touched.phone ? "border-red-500" : ""
                  }`}
                  placeholder={t.placeholders.phone}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone && touched.phone ? "err-phone" : undefined}
                />
                {errors.phone && touched.phone && (
                  <p id="err-phone" className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t.fields.company}</label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.company && touched.company ? "border-red-500" : ""
                  }`}
                  placeholder={t.placeholders.company}
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company && touched.company ? "err-company" : undefined}
                />
                {errors.company && touched.company && (
                  <p id="err-company" className="text-red-500 text-sm mt-1">
                    {errors.company}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.fields.category} <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  aria-invalid={!!errors.category}
                >
                  {categoryOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.fields.message} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={6}
                className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none ${
                  errors.message && touched.message ? "border-red-500" : ""
                }`}
                placeholder={t.placeholders.message}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message && touched.message ? "err-message" : undefined}
              />
              {errors.message && touched.message && (
                <p id="err-message" className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {formData.message.length}/5000
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all hover:shadow-lg"
            >
              {isSubmitting ? t.sending : t.submit}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
