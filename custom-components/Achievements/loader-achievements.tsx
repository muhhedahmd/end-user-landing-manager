import { TrendingUp } from "lucide-react"

const LoaderAchievements = () => {
    return (
        <section
            id="achievements"
            className="min-h-screen mx-auto relative overflow-hidden py-24 px-4 bg-background"
        >
            <div className="container mx-auto">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl bg-primary/10 animate-float" />
                    <div
                        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl bg-accent/10 animate-float"
                        style={{ animationDelay: "-10s" }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-muted/50" />
                </div>

                <div className="flex justify-center w-full flex-col items-center relative z-10">
                    {/* Header */}
                    <header className="text-center mb-20">
                        <div className="mb-6 flex justify-center w-full items-center">
                            <span className="section-badge w-fit flex items-center p-2 shadow-md rounded-xl gap-2 animate-wave">
                                <TrendingUp className="w-4 h-4" />
                                <span className="w-20 h-4 bg-muted rounded animate-wave"></span>
                            </span>
                        </div>

                        <div className="mb-6 flex justify-center">
                            <div className="h-12 w-80 bg-muted rounded-lg animate-wave"></div>
                        </div>

                        <div className="flex justify-center">
                            <div className="h-6 w-96 bg-muted/60 rounded animate-wave"></div>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <StatCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const StatCardSkeleton = () => {
    return (
        <article className="center-card flex flex-col items-center justify-center text-center gap-2 w-full p-8 rounded-full group">
            {/* Icon */}
            <div className="mb-6">
                <div className="w-16 h-16 bg-muted rounded-xl animate-wave"></div>
            </div>

            {/* Counter */}
            <div className="mb-2">
                <div className="h-12 w-32 bg-muted rounded animate-wave"></div>
            </div>

            {/* Label */}
            <div className="h-5 w-40 bg-muted/60 rounded animate-wave"></div>

            {/* Progress Bar */}
            <div className="w-1/2 flex items-center justify-center h-2 bg-muted/40 rounded-full mt-6 overflow-hidden">
                <div className="h-full w-3/5 bg-muted rounded-full animate-wave"></div>
            </div>
        
        </article>
    );
};

export default LoaderAchievements;

