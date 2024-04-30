export default async function BasicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full xl:max-w-6xl mx-auto px-4 md:px-8">
            {children}
        </div>
    );
}




