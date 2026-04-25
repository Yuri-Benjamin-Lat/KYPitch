export default function DashboardLoading() {
    return (
        <div className="min-h-screen flex flex-col animate-pulse">
            <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
                <div className="w-full flex justify-between items-center py-4 px-4 md:py-6 md:px-8 lg:py-8 lg:px-8">
                    <div className="w-20 h-7 bg-foreground/10 rounded" />
                    <div className="w-24 h-7 bg-foreground/10 rounded" />
                </div>
                <div className="flex justify-center py-4 md:py-8">
                    <div className="w-52 h-8 bg-foreground/10 rounded" />
                </div>
                <div className="grid grid-cols-1 gap-8 p-8 pt-0 md:grid-cols-2 lg:gap-12 lg:p-12 lg:pt-0">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-foreground/10 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}