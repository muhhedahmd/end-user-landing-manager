/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { z } from "zod"

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name must be less than 255 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().max(255, "Company name must be less than 255 characters").optional().or(z.literal("")),
  subject: z.string().min(1, "Subject is required").max(255, "Subject must be less than 255 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
  budget: z.string(),
  timeline: z.string(),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    budget: "Not sure yet",
    timeline: "Flexible",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData | "submit", string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateField = (name: keyof ContactFormData, value: string): string => {
    try {
      contactSchema.shape[name].parse(value)
      return ""
    } catch (error) {
      if (error instanceof z.ZodError) {
        // return error.(errors as amy).[0]?.message || ""
      }
      return ""
    }
  }

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
        // error.errors.forEach((err) => {
        //   if (err.path[0]) {
        //     newErrors[err.path[0] as keyof ContactFormData] = err.message
        //   }
        // })
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // Mock API call
      const response = await fetch("https://api.example.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone || null,
          company: formData.company || null,
          referrer: typeof document !== "undefined" ? document.referrer || null : null,
        }),
      })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (response.ok || true) {
        // Mock success
        setIsSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          budget: "Not sure yet",
          timeline: "Flexible",
        })
        setErrors({})
        setTouched({})

        setTimeout(() => setIsSuccess(false), 5000)
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-card-foreground p-8 border-b"
        >
          <div className="text-center mb-8">
            <h2 className=" text-2xl md:text-4xl font-bold mb-3">Ready to Work Together?</h2>
            <p className="text-muted-foreground text-lg">
              Have a project in mind? Let&apos;s discuss.
            </p>
          </div>

          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg"
            >
              ✓ Thank you! We&apos;ll be in touch soon.
            </motion.div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

{/* 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="< $10,000">Less than $10,000</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                  <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                  <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                  <option value="> $250,000">More than $250,000</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="ASAP">ASAP (Less than 1 month)</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="12+ months">More than 12 months</option>
                  <option value="Flexible">Flexible / Not decided</option>
                </select>
              </div>
            </div> */}

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
        </motion.div>
      </div>
    </section>
  )
}