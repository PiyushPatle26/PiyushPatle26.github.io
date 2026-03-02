export default function Footer({ bigText }) {
    return (
        <>
            <footer className="px-12 py-7 border-t border-border flex items-center justify-between max-sm:flex-col max-sm:gap-2 max-sm:text-center">
                <p className="text-[10px] text-muted tracking-[0.15em] m-0">
                    © 2025 <span className="text-amber">Piyush Patle</span>
                </p>
                {bigText === 'PIYUSH' ? (
                    <p className="text-[10px] text-muted tracking-[0.15em] m-0">
                        B.Tech Electrical &nbsp;// Embedded & Kernel Enthusiast · VJTI Mumbai
                    </p>
                ) : (
                    <p className="text-[10px] text-muted tracking-[0.15em] m-0">
                        <a href="/" className="text-muted no-underline tracking-[0.15em] hover:text-amber transition-colors">← Back to Home</a>
                    </p>
                )}
            </footer>
        </>
    );
}
