import {

    TrendingUp,
} from "lucide-react";
import StatCard, { iconComponents } from "./AchiveCard";

type IconVariant = "warm" | "cool" | "success" | "purple" | "rose" | "teal";

export interface StatItem {
    label: string;
    value: number;
    icon: keyof typeof  iconComponents;
    variant: IconVariant;
}

const iconMap: Record<string, keyof typeof  iconComponents> = {
    "Total Services": "briefcase",
    "project in progress": "layers",
    "Completed Projects": "check",
    "Team Members": "users",
    "New Contacts": "mail",
    "Testimonials": "star",
};


const variantOrder: IconVariant[] = [
    "warm",
    "cool",
    "success",
    "purple",
    "rose",
    "teal",
];

export const dynamic = "force-static";


type AchivementResult = { status: "success" | "error"; stats: { label: string; value: number; }[] | [] }

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


const AchievementsSection = async () => {
    //   const [isVisible, setIsVisible] = useState(false);
    //   const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = true;
    //   const { data } = useGetAchivementsQuery();
    const data = await fetchAchivement();
    if (data.status === "error") return null




    const stats: StatItem[] | undefined = data?.stats.map((stat, index) => {
        return {
            label: stat.label,
            value: stat.value,
            icon: iconMap[stat.label] || "briefcase",
            variant: variantOrder[index % variantOrder.length],
        }
    });

  
    return (
        <section
        
        id="achivements"
            //   ref={sectionRef}
            className="min-h-screen  mx-auto  relative overflow-hidden py-24 px-4 bg-background"
        >
            <div className="container mx-auto">
                {/* Decorative Background Elements */}
                <div className=" absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl bg-primary/10 animate-float" />
                    <div
                        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl bg-accent/10 animate-float"
                        style={{ animationDelay: "-10s" }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-muted/50" />
                </div>

                <div className=" flex justify-center w-full flex-col items-centerrelative z-10">
                    {/* Header */}
                    <header className="text-center mb-20">
                        <div className="mb-6 flex justify-center w-full items-center">
                            <span className="section-badge w-fit flex items-center p-2 shadow-md rounded-xl gap-2">
                                <TrendingUp className="w-4 h-4" />
                                <span>Our Journey</span>
                            </span>
                        </div>

                        <h2 className="section-title mb-6">
                            Our <span className="text-gradient italic">Achievements</span>
                        </h2>

                        <p className="section-subtitle">
                            Celebrating milestones and the meaningful impact we&apos;ve created
                            together
                        </p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid items-center justify-center grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {stats?.map((stat, index) => (
                            <StatCard
                                key={stat.label}
                                label={stat.label}
                                value={stat.value}
                                icon={stat.icon}
                                variant={stat.variant}

                                isVisible={isVisible}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
