/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import { z } from "zod"

// Zod validation schema matching backend
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be less than 255 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  company: z.string().max(255, "Company name must be less than 255 characters").optional().or(z.literal("")),
  subject: z.string().min(1, "Subject is required").max(255, "Subject must be less than 255 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
  // budget: z.string().max(255).optional().or(z.literal("")),
  // timeline: z.string().max(255).optional().or(z.literal("")),
  category: z.enum([
    "GENERAL_INQUIRY",
    "SUPPORT",
    "SALES",
    "PARTNERSHIP",
    "FEEDBACK",
    "COMPLAINT",
    "SERVICE_INQUIRY",
    "OTHER",
  ]).default("GENERAL_INQUIRY"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    // budget: "",
    // timeline: "",
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
      contactSchema.shape[name].parse(value)
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
      contactSchema.parse(formData)
      setErrors({})
      return true
    } catch (error : any) {
      if (error instanceof z.ZodError as any  ) {
        console.log(error)
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
    setFormData((prev) => ({ ...prev, [name]: value }))

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

      // Prepare payload matching backend schema
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        subject: formData.subject,
        message: formData.message,
        category: formData.category,
        // budget: formData.budget || null,
        // timeline: formData.timeline || null,
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
          // budget: "",
          // timeline: "",
          category: "GENERAL_INQUIRY",
        })
        setErrors({})
        setTouched({})

        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        const errorData = await response.json().catch(() => ({}))
        setErrors((prev) => ({ 
          ...prev, 
          submit: errorData.message || "Failed to send. Please try again." 
        }))
      }
    } catch (error) {
      console.error("Submission error:", error)
      setErrors((prev) => ({ ...prev, submit: "Failed to send. Please try again." }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div ref={formRef} className="text-card-foreground p-8 border-b">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Ready to Work Together?</h2>
            <p className="text-muted-foreground text-lg">
              Have a project in mind? Let&apos;s discuss.
            </p>
          </div>

          {isSuccess && (
            <div
              ref={successRef}
              className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg"
            >
              ✓ Thank you! We&apos;ll be in touch soon.
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">{errors.submit}</div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.name && touched.name ? "border-red-500" : ""
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && touched.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.subject && touched.subject ? "border-red-500" : ""
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && touched.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Work Email <span className="text-red-500">*</span>
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
                  placeholder="john@company.com"
                />
                {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.phone && touched.phone ? "border-red-500" : ""
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && touched.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    errors.company && touched.company ? "border-red-500" : ""
                  }`}
                  placeholder="Your Company Inc."
                />
                {errors.company && touched.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category <span className="text-red-500">*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="GENERAL_INQUIRY">General Inquiry</option>
                  <option value="SUPPORT">Support</option>
                  <option value="SALES">Sales</option>
                  <option value="PARTNERSHIP">Partnership</option>
                  <option value="FEEDBACK">Feedback</option>
                  <option value="COMPLAINT">Complaint</option>
                  <option value="SERVICE_INQUIRY">Service Inquiry</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium mb-2">
                Project Details <span className="text-red-500">*</span>
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
                placeholder="Tell us about your project..."
              />
              {errors.message && touched.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              <p className="text-xs text-muted-foreground mt-1">{formData.message.length}/5000 characters</p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all hover:shadow-lg"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}