import { Link } from 'react-router-dom';

const socials = [
    { label: 'GITHUB', href: 'https://github.com/PiyushPatle26' },
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/piyush-patle-28400228a/' },
    { label: 'LORE', href: 'https://lore.kernel.org/all/?q=Piyush%20Patle' }
];

export default function Home() {
    return (
        <>
            <main className="min-h-screen flex items-center px-12 py-[120px] max-md:px-6 max-md:py-[110px]">
                <div className="max-w-[960px] mx-auto w-full grid grid-cols-[200px_1fr] gap-14 items-start max-md:grid-cols-1 max-md:gap-9">

                    <aside className="opacity-0 translate-y-4 animate-[fadeUp_0.6s_0.2s_forwards]">
                        <img
                            src={`${import.meta.env.BASE_URL}Screenshot from 2026-03-02 17-50-20.png`}
                            alt="Piyush Patle"
                            className="w-full h-[250px] object-cover object-top border border-border max-md:max-w-[200px]"
                        />
                        <p className="mt-3 text-[9px] tracking-[0.3em] uppercase text-muted m-0">// piyush.patle · mumbai</p>
                        <nav className="mt-5 pt-5 border-t border-border flex flex-col gap-2">
                            <Link to="/projects" className="text-[11px] tracking-[0.25em] uppercase text-muted no-underline transition-colors duration-200 hover:text-amber">Projects</Link>
                            <Link to="/blog" className="text-[11px] tracking-[0.25em] uppercase text-muted no-underline transition-colors duration-200 hover:text-amber">Blog</Link>
                            <a href="#contact" className="text-[11px] tracking-[0.25em] uppercase text-muted no-underline transition-colors duration-200 hover:text-amber">Contact</a>
                        </nav>
                    </aside>

                    <div className="opacity-0 translate-y-4 animate-[fadeUp_0.6s_0.35s_forwards]">
                        <p className="text-[10px] tracking-[0.4em] uppercase text-amber m-0 mb-4">// embedded &amp; kernel</p>
                        <h1 className="font-bebas text-[clamp(34px,5vw,52px)] leading-none tracking-[0.03em] text-text m-0">
                            hello
                        </h1>

                        <div className="mt-6 flex flex-col gap-5 text-[15px] leading-[1.9] text-muted max-w-[600px]">
                            <p className="m-0">
                                i am <span className="text-text">piyush</span>. i work in C and Linux kernel internals: device drivers,
                                filesystems, and firmware that runs on real silicon. if it boots, i'm curious.
                            </p>
                            <p className="m-0">
                                third-year Electrical undergrad at <span className="text-text">VJTI Mumbai</span>. i recently graduated from the
                                {' '}<span className="text-text">Linux Kernel Mentorship Program</span> (LFX '26), with patches merged into the
                                mainline kernel across IIO, ASoC, DT bindings, RTC, and Kbuild.
                            </p>
                            <p className="m-0">
                                before that i was a research intern at <span className="text-text">CDAC Pune</span>, working on VFS internals and
                                Lustre porting. that work became a paper at HPC Asia 2026, published in the{' '}
                                <a href="https://dl.acm.org/doi/10.1145/3784828.3785406" target="_blank" rel="noreferrer" className="text-text no-underline border-b border-border transition-colors hover:border-muted">ACM Digital Library</a>.
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4 items-center flex-wrap">
                            <a
                                href={`${import.meta.env.BASE_URL}Resume_Piyush_Patle.pdf`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block py-[11px] px-6 border border-amber text-amber text-[11px] tracking-[0.25em] uppercase no-underline transition-all duration-200 hover:bg-amber hover:text-bg"
                            >
                                Resume
                            </a>
                            <Link
                                to="/projects"
                                className="inline-block py-[11px] px-6 border border-border text-muted text-[11px] tracking-[0.25em] uppercase no-underline transition-all duration-200 hover:border-amber hover:text-amber"
                            >
                                See the work
                            </Link>
                        </div>

                        <h2 id="contact" className="text-[10px] tracking-[0.4em] uppercase text-amber mt-14 mb-5 pt-8 border-t border-border scroll-mt-[120px]">// contact</h2>
                        <p className="m-0 text-[15px] leading-[1.9] text-muted max-w-[600px]">
                            open to embedded roles, kernel work, and open-source collaboration. if you want to build something low-level,
                            reach me at{' '}
                            <a href="mailto:piyushpatle228@gmail.com" className="text-text no-underline border-b border-border transition-colors hover:border-muted">piyushpatle228@gmail.com</a>.
                        </p>
                        <div className="mt-6 flex gap-7 flex-wrap">
                            {socials.map(s => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] tracking-[0.25em] uppercase text-muted no-underline transition-colors duration-200 hover:text-amber"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

        </>
    );
}
