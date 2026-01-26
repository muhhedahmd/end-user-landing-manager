

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Github, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { getDictionary } from "@/lib/i18n"
import { getCompanyInfo } from "@/app/[locale]/(routes)/services/comp/Fetchers"
import SwitchLang from "../locale/switchLang"
import { ThemeToggle } from "../toggleTheme"


export default async function Footer({ dictionary, locale = "en" }: {
    locale: "en" | "ar"
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}) {
    const data = await getCompanyInfo()


    const currentYear = new Date().getFullYear() + 1


    if (data === null) {
        return (
            <footer className="w-full border-t border-border bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-12 text-center">
                        <p className="text-sm text-muted-foreground">
                            {dictionary.footer.about}
                            © {currentYear} All rights reserved.</p>
                    </div>
                </div>
            </footer>
        )
    }
    const { company: companyInfo, logo, translation } = data
    const currentTrnalsation = translation?.find((item) => item?.lang?.toLowerCase() === locale?.toLowerCase())
    // Social media links

    const socialLinks = [

        { icon: Facebook, url: companyInfo.facebook, label: "Facebook" },
        { icon: Twitter, url: companyInfo.twitter, label: "Twitter" },
        { icon: Linkedin, url: companyInfo.linkedin, label: "LinkedIn" },
        { icon: Instagram, url: companyInfo.instagram, label: "Instagram" },
        { icon: Github, url: companyInfo.github, label: "GitHub" },
        { icon: Youtube, url: companyInfo.youtube, label: "YouTube" },
    ].filter(link => link.url)

    return (
        <footer className="w-full border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            {logo ? (
                                <Image
                                    width={12}
                                    height={12}
                                    src={logo.url}
                                    alt={logo.alt || companyInfo.name}

                                    className="w-8 h-8 object-contain"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-lg">
                                        {currentTrnalsation?.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <span className="font-semibold text-foreground">{currentTrnalsation?.name}</span>
                        </div>

                        {currentTrnalsation?.tagline && (
                            <p className="text-sm font-medium text-foreground">{currentTrnalsation.tagline}</p>
                        )}

                        {currentTrnalsation?.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {currentTrnalsation?.description}
                            </p>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">{dictionary.footer.contact}</h3>
                        <ul className="space-y-3">
                            {companyInfo.email && (
                                <li className="flex items-start gap-2">
                                    <Mail className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <a
                                        href={`mailto:${companyInfo.email}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                                    >
                                        {companyInfo.email}
                                    </a>
                                </li>
                            )}

                            {companyInfo.phone && (
                                <li className="flex items-start gap-2">
                                    <Phone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <Link
                                        href={`tel:${companyInfo.phone}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {companyInfo.phone}
                                    </Link>
                                </li>
                            )}

                            {(companyInfo.address || companyInfo.city || companyInfo.country) && (
                                <li className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">
                                        {[companyInfo.address, companyInfo.city, companyInfo.postalCode, companyInfo.country]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">{dictionary.footer.company}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {dictionary.footer.about}
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {dictionary.footer.services}
                                </Link>
                            </li>

                            <li>
                                <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {dictionary.footer.contactLink}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">{dictionary.footer.legal}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {dictionary.footer.privacy}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {dictionary.footer.terms}
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {dictionary.footer.cookies}
                                </Link>
                            </li>
                            <li>
                                <Link href="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {dictionary.footer.security}
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Bottom Bar */}
                <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} {companyInfo.name}. {dictionary.footer.rights}.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center text-sm ">

                    {socialLinks.length > 0 && (

                        <div className="flex items-center gap-4">
                            {socialLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.url || ""}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                        aria-label={link.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                    <SwitchLang placement="footer" showIcon={false} showTransition variant={'link'} />
              <ThemeToggle  placement="footer" showIcon={false} showTransition variant={'link'}  />

                    </div>


                </div>
            </div>
        </footer>
    )
}