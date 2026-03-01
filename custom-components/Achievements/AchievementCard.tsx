"use client"

import { useEffect, useState } from "react";
import { Briefcase, CheckCircle, Layers, Mail, Star, Users } from "lucide-react";


interface StatCardProps {

    label: string
    value: number
    icon: keyof typeof  iconComponents,
    variant: unknown
    isVisible: boolean;
    delay: number;
}
export const iconComponents = {
    "briefcase": Briefcase,
    "layers": Layers,
    "check": CheckCircle,
    "users": Users,
    "mail": Mail,
    "star": Star,
};

const StatCard = ({ icon, label, value, variant, isVisible, delay }: StatCardProps) => {

    const [count, setCount] = useState(0);
    // const Icon = icon;
    const Icon = iconComponents[icon];

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        const stepDuration = duration / steps;

        const timer = setTimeout(() => {
            let current = 0;
            const counter = setInterval(() => {

                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(counter);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepDuration);

            return () => clearInterval(counter);
        }, delay);

        return () => clearTimeout(timer);
    }, [isVisible, value, delay]);

    return (
        <article
            className="center-card flex flex-col items-center justify-center  text-center gap-2   w-full p-8   rounded-full  group"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
            }}
        >
            {/* Icon */}
            <div className="mb-6">
                <div className={`stat-icon stat-icon-${variant}`}>
                    <Icon className="w-7 h-7" strokeWidth={2} />
                </div>
            </div>

            {/* Counter */}
            <div className="mb-2">
                <span className="text-5xl font-display font-normal tracking-tight text-foreground">
                    {count.toLocaleString()}
                </span>
                <span className="text-3xl font-display text-muted-foreground ml-1">+</span>
            </div>

            {/* Label */}
            <p className="text-base font-medium text-muted-foreground">
                {label}
            </p>

            {/* Progress Bar */}
            <div className="progress-bar mt-6">
                <div
                    className={`progress-fill progress-fill-${variant}`}
                    style={{
                        width: isVisible ? "100%" : "0%",
                        transitionDelay: `${delay + 500}ms`,
                    }}
                />
            </div>
        </article>
    );
};


export default StatCard