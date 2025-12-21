
import { Skeleton } from '@/components/ui/skeleton'

const LoadingHero = () => {
  return (
         <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-background">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="space-y-8 text-center">
                        <Skeleton className="h-8 w-64 mx-auto rounded-full" />
                        <Skeleton className="h-20 w-full max-w-4xl mx-auto" />
                        <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
                        <div className="flex justify-center gap-4 pt-4">
                            <Skeleton className="h-12 w-40" />
                            <Skeleton className="h-12 w-40" />
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default LoadingHero