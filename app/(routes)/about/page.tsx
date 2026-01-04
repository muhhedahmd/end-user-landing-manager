import { getCompanyInfo } from "../services/comp/Fetchers";
import { AnimationWrapper } from "./_comp/animation-wrapper";

type label = "Total Services" |
    "project in progress" |
    "Completed Projects" |
    "Team Members" |
    "New Contacts" |
    "Testimonials"

export const dynamic = "force-static";

type AchivementResult = { status: "success" | "error"; stats: { label: label; value: number; }[] | [] }

async function fetchAchivement(): Promise<AchivementResult> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company-info/achivements`,
            {
                cache: "force-cache",
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) return { status: "error", stats: [] };

        const json = await res.json();
        const payload = json?.data;

        if (!payload) {
            return { status: "error", stats: [] };
        }

        return {
            status: "success",
            stats: payload.stats,
        };
    } catch {
        return { status: "error", stats: [] };
    }
}



export default async function AboutPage() {
    const { stats } = await fetchAchivement();
    const companyInfo = await getCompanyInfo();

    const companyName = companyInfo?.name ?? "Our Company";
    const companyTagline = companyInfo?.tagline ?? "Building the future with innovation and passion";
    const companyDescription = companyInfo?.description ?? 
        "We started with a simple mission: to create products that make a difference. What began as a small team with big dreams has grown into a passionate community dedicated to innovation and excellence.";

    const values = [
        {
            title: 'Innovation',
            description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.'
        },
        {
            title: 'Quality',
            description: 'Excellence is our standard. We never compromise on the quality of our products and services.'
        },
        {
            title: 'Integrity',
            description: 'We build trust through transparency, honesty, and ethical business practices.'
        },
        {
            title: 'Collaboration',
            description: 'Great things happen when talented people work together toward a common goal.'
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <AnimationWrapper animation="fade-down" duration={1}>
                <div className="border-b">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            About {companyName}
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            {companyTagline}
                        </p>
                    </div>
                </div>
            </AnimationWrapper>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Our Story */}
                <AnimationWrapper animation="fade-up" delay={0.2}>
                    <section className="mb-16 sm:mb-20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            Our Story
                        </h2>
                        <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                            <p>{companyDescription}</p>
                            <p>
                                Today, we serve thousands of customers worldwide, delivering solutions that empower businesses and individuals to achieve their goals. Our journey is just beginning, and we&apos;re excited about what the future holds.
                            </p>
                        </div>
                    </section>
                </AnimationWrapper>

                {/* Stats Section */}
                <section className="mb-16 sm:mb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {stats.map((stat, index) => {
                            if(stat.label === "project in progress") return null;
                            if(stat.label === "New Contacts") return null;

                            return (
                                <AnimationWrapper
                                    key={stat.label}
                                    animation="scale"
                                    delay={0.2}
                                    duration={0.5}
                                >
                                    <div className="text-center p-6 bg-card border rounded-lg hover:shadow-lg transition-shadow">
                                        <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm sm:text-base text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </div>
                                </AnimationWrapper>
                            );
                        })}
                    </div>
                </section>

                {/* Mission */}
                <AnimationWrapper animation="fade-right" delay={0.2}>
                    <section className="mb-16 sm:mb-20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            Our Mission
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            We believe in creating technology that empowers people and transforms businesses. Our mission is to deliver innovative solutions that solve real-world problems while maintaining the highest standards of quality and customer service. We&rsquo;re committed to building products that not only meet today&apos;s needs but anticipate tomorrow&apos;s challenges.
                        </p>
                    </section>
                </AnimationWrapper>

                {/* Values */}
                <section className="mb-16 sm:mb-20">
                    <AnimationWrapper animation="fade-up" delay={.1}>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
                            Our Values
                        </h2>
                    </AnimationWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {values.map((value) => (
                            <AnimationWrapper
                                key={value.title}
                                animation="fade-up"
                                delay={.4}
                            >
                                <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-semibold text-foreground mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {value.description}
                                    </p>
                                </div>
                            </AnimationWrapper>
                        ))}
                    </div>
                </section>

                {/* Contact Information Section */}
                {(companyInfo?.email || companyInfo?.phone || companyInfo?.address) && (
                    <AnimationWrapper animation="fade-up" delay={.2}>
                        <section className="mb-16 sm:mb-20">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
                                Get In Touch
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {companyInfo.email && (
                                    <div className="bg-card border rounded-lg p-6 text-center">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                                        <a href={`mailto:${companyInfo.email}`} className="text-primary hover:underline">
                                            {companyInfo.email}
                                        </a>
                                    </div>
                                )}
                                {companyInfo.phone && (
                                    <div className="bg-card border rounded-lg p-6 text-center">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                                        <a href={`tel:${companyInfo.phone}`} className="text-primary hover:underline">
                                            {companyInfo.phone}
                                        </a>
                                    </div>
                                )}
                                {companyInfo.address && (
                                    <div className="bg-card border rounded-lg p-6 text-center">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">Address</h3>
                                        <p className="text-muted-foreground">
                                            {companyInfo.address}
                                            {companyInfo.city && `, ${companyInfo.city}`}
                                            {companyInfo.country && `, ${companyInfo.country}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </AnimationWrapper>
                )}

                {/* CTA Section */}
                <AnimationWrapper animation="scale" delay={.1}>
                    <section className="bg-primary/5 border rounded-2xl p-8 sm:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                            Join Our Journey
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            We&lsquo;re always looking for talented individuals who share our passion for innovation and excellence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                                View Open Positions
                            </button>
                            <button className="px-6 py-3 bg-background border rounded-lg font-medium hover:bg-accent transition-colors">
                                Contact Us
                            </button>
                        </div>
                    </section>
                </AnimationWrapper>
            </div>
        </div>
    );
}