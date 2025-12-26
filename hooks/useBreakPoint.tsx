import { useEffect, useState } from "react";

export const useBreakPoints = ():{ BreakPoint  :"lg" | "md" | "sm"} => {
    const [BreakPoint, setBreakPoint] = useState<"lg" | "md" | "sm">("lg")
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 992) setBreakPoint("lg")
            if (window.innerWidth < 991) setBreakPoint("md")
            if (window.innerWidth < 768) setBreakPoint("sm")
        }

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return {
        BreakPoint
    }
} 