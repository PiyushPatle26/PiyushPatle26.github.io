import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <section id="hero" className="min-h-screen flex items-center px-12 max-w-full relative overflow-hidden max-md:pt-[100px] max-md:pb-[60px] max-md:px-6">
                <div className="grid grid-cols-[1fr_auto] gap-[80px] items-center max-w-[1200px] mx-auto w-full max-md:grid-cols-1 max-md:gap-10">
                    <div className="hero-left">
                        <div
                            className="text-[11px] tracking-[0.4em] uppercase text-amber mb-8 opacity-0 translate-y-4 animate-[fadeUp_0.6s_1.1s_forwards]"
                        >
              // If It Boots, I’m Curious
                        </div>
                        <h1 className="font-bebas text-[clamp(44px,7vw,100px)] leading-[0.9] tracking-[0.02em] opacity-0 translate-y-8 animate-[fadeUp_0.7s_1.3s_forwards] m-0">
                            Embedded &<br />
                            <em className="not-italic text-amber">Kernel</em><br />
                            <span className="text-transparent [-webkit-text-stroke:1px_var(--color-muted)]">Enthusiast</span>
                        </h1>
                        <p className="mt-7 max-w-[480px] text-base leading-[1.85] text-muted opacity-0 translate-y-4 animate-[fadeUp_0.6s_1.5s_forwards]">
                            I'm <strong className="text-text font-normal">Piyush</strong> — 3rd year Electrical at VJTI Mumbai.
                            I primarily work in C and Linux kernel internals.
                            I am currently part of the <strong className="text-text font-normal">LFX Bug Fixing Program</strong> at LKMP and working on a BELA codec driver for BeagleBoard.
                            Previously, I was a research intern at <strong className="text-text font-normal">CDAC Pune</strong>, where I worked on VFS-related Lustre porting and co-authored one paper published in the <strong className="text-text font-normal">ACM Digital Library</strong>.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2 opacity-0 translate-y-4 animate-[fadeUp_0.6s_1.6s_forwards] max-sm:hidden">
                            <span className="text-[10px] tracking-[0.18em] uppercase py-1 px-3 border border-amber-dim text-amber">LFX'26 @LKMP</span>
                            <span className="text-[10px] tracking-[0.18em] uppercase py-1 px-3 border border-amber-dim text-amber">Ex-intern @CDAC</span>
                            <span className="text-[10px] tracking-[0.18em] uppercase py-1 px-3 border border-amber-dim text-amber">ACM Author</span>
                            <span className="text-[10px] tracking-[0.18em] uppercase py-1 px-3 border border-amber-dim text-amber">VJTI'27 Electrical</span>
                            <span className="text-[10px] tracking-[0.18em] uppercase py-1 px-3 border border-amber-dim text-amber">Mumbai</span>
                        </div>
                        <div className="mt-9 flex gap-5 items-center opacity-0 translate-y-4 animate-[fadeUp_0.6s_1.7s_forwards]">
                            <Link to="/projects" className="inline-block py-[13px] px-7 border border-amber bg-amber text-bg font-ibm text-[11px] tracking-[0.25em] uppercase no-underline transition-all duration-200 hover:bg-transparent hover:text-amber hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]">See the work</Link>
                            <a href={`${import.meta.env.BASE_URL}Resume_Piyush_Patle (1).pdf`} target="_blank" rel="noreferrer" className="inline-block py-[13px] px-7 border border-amber bg-transparent text-amber font-ibm text-[11px] tracking-[0.25em] uppercase no-underline transition-all duration-200 hover:bg-transparent hover:text-amber hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]">Resume ↗</a>
                            <a href="#contact" className="text-[11px] tracking-[0.25em] uppercase text-muted no-underline transition-colors duration-200 hover:text-text">// say hi →</a>
                        </div>
                    </div>
                    <div className="opacity-0 translate-y-6 animate-[fadeUp_0.7s_1.4s_forwards] shrink-0 max-md:order-last max-md:mx-auto">
                        <div className="relative w-[380px] h-[480px] max-sm:w-[200px] max-sm:h-[260px] group">
                            <div className="absolute inset-3 -right-3 -bottom-3 border border-amber-dim z-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>
                            <img src={`${import.meta.env.BASE_URL}Screenshot from 2026-03-02 17-50-20.png`} alt="Piyush Patle" className="absolute inset-0 w-full h-full object-cover object-top z-[2] grayscale-[15%] contrast-105 transition-all duration-300 border border-border group-hover:grayscale-0 group-hover:contrast-100" />
                        </div>
                        <p className="mt-3 text-[10px] tracking-[0.3em] text-muted text-center uppercase m-0">// piyush.patle · mumbai</p>
                    </div>
                </div>
            </section>

            <div className="overflow-hidden border-y border-border py-3.5 whitespace-nowrap bg-bg2">
                <div className="inline-flex animate-[marquee_18s_linear_infinite]">
                    {Array(2).fill(null).map((_, i) => (
                        <div key={i} className="flex">
                            {['Linux Kernel', 'Device Drivers', 'RISC-V', 'ARM Cortex-M', 'RTOS', 'Bare-metal Firmware', 'GDB / JTAG', 'C / C++', 'STM32', 'Open Source'].map((tech, j) => (
                                <div key={j} className="flex">
                                    <span className="font-bebas text-[32px] tracking-[0.15em] px-10 text-muted">{tech}</span>
                                    <span className="font-bebas text-[32px] tracking-[0.15em] px-10 text-amber">◆</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <section id="about" className="py-[110px] px-12 max-w-[1200px] mx-auto max-md:py-20 max-md:px-6">
                <p className="text-[10px] tracking-[0.5em] uppercase text-amber mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">01 — About</p>
                <div className="grid grid-cols-2 gap-20 items-start max-md:grid-cols-1 max-md:gap-9">
                    <FadeIn>
                        <h2 className="font-bebas text-[clamp(36px,4.5vw,64px)] leading-none tracking-[0.03em] m-0">
                            All the way<br />
                            down to<br />
                            <em className="not-italic text-amber">register</em><br />
                            level
                        </h2>
                    </FadeIn>
                    <FadeIn>
                        <div className="text-base leading-[1.95] text-muted flex flex-col gap-[18px]">
                            <p className="m-0">I am a third-year B.Tech Electrical student at <strong className="text-text font-normal">VJTI Mumbai</strong>, with primary interest in Linux kernel and embedded systems work.</p>
                            <p className="m-0">As a research intern at <strong className="text-text font-normal">CDAC Pune</strong>, I worked on Lustre porting tasks involving VFS internals and validation on a RISC-V cluster. This work contributed to one paper presented at HPC Asia 2026 and published in the <strong className="text-text font-normal">ACM Digital Library</strong>.</p>
                            <p className="m-0">I am currently part of the <strong className="text-text font-normal">LFX Bug Fixing Program</strong> under LKMP and working on a codec driver for <strong className="text-text font-normal">BeagleBoard BELA</strong> in the ALSA subsystem.</p>
                            <p className="m-0">I also review contributions and mentor juniors on embedded projects at VJTI, with a focus on debugging discipline and maintainable firmware design.</p>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn>
                    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[1px] bg-border mt-16">
                        {[
                            { num: '01', name: 'Linux Kernel', desc: 'Experience with VFS, ext4, and ALSA-focused development, including filesystem porting and codec driver work.' },
                            { num: '02', name: 'C / C++ / Python', desc: 'Primary development in C, with C++ and Python used where appropriate for tooling and prototyping.' },
                            { num: '03', name: 'ARM & Embedded', desc: 'Hands-on work with STM32, ESP32, BeagleBoard, and Raspberry Pi across firmware and board-level bring-up.' },
                            { num: '04', name: 'Open Source', desc: 'Contributor to open-source embedded and kernel-adjacent projects with exposure to upstream review workflows.' },
                            { num: '05', name: 'RTOS & Firmware', desc: 'Firmware development using FreeRTOS and bare-metal approaches, including interrupt-driven and timing-sensitive systems.' },
                            { num: '06', name: 'GDB / Debug', desc: 'Debug workflow based on GDB, OpenOCD, and low-level diagnostics for kernel and embedded software issues.' }
                        ].map((skill, i) => (
                            <div key={i} className="bg-bg p-7 overflow-hidden relative transition-colors duration-200 hover:bg-bg2 group">
                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber transition-all duration-300 group-hover:w-full"></div>
                                <div className="text-[10px] tracking-[0.3em] uppercase text-amber mb-3.5">// {skill.num}</div>
                                <div className="font-bebas text-[26px] tracking-[0.05em] mb-2.5">{skill.name}</div>
                                <div className="text-sm leading-[1.8] text-muted">{skill.desc}</div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </section>


            <section id="contact" className="bg-bg2 max-w-full py-[110px] px-12 border-t border-border text-center max-md:px-6 max-md:py-20">
                <div className="max-w-[760px] mx-auto">
                    <FadeIn>
                        <p className="text-[10px] tracking-[0.5em] uppercase text-amber mb-12 flex items-center justify-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border before:content-[''] before:flex-1 before:h-[1px] before:bg-border">02 — Contact</p>
                    </FadeIn>
                    <FadeIn>
                        <h2 className="font-bebas text-[clamp(44px,8vw,110px)] leading-[0.9] tracking-[0.02em] mb-7 mt-0">
                            Let's<br /><em className="not-italic text-amber">talk</em><br />hardware
                        </h2>
                    </FadeIn>
                    <FadeIn>
                        <p className="text-xs leading-[1.9] text-muted mb-[52px] max-w-[400px] mx-auto">
                            Open to embedded roles, kernel work, open-source collab, and problems that don't have a Stack Overflow answer.<br />
                            I read every message. Response time depends on whether GDB has me cornered.
                        </p>
                    </FadeIn>
                    <FadeIn>
                        <div className="flex justify-center gap-11 flex-wrap">
                            {[
                                { label: 'Email', value: 'Say hello →', href: 'mailto:piyushpatle228@gmail.com' },
                                { label: 'GitHub', value: 'PiyushPatle26 →', href: 'https://github.com/PiyushPatle26' },
                                { label: 'LinkedIn', value: 'Connect →', href: 'https://www.linkedin.com/in/piyush-patle-28400228a/' }
                            ].map(link => (
                                <a key={link.label} href={link.href} target={link.href.startsWith('http') ? "_blank" : "_self"} rel="noreferrer" className="flex flex-col items-center gap-2 no-underline transition-transform duration-200 hover:-translate-y-1 group">
                                    <span className="text-[10px] tracking-[0.35em] uppercase text-muted">{link.label}</span>
                                    <span className="text-[13px] text-text tracking-[0.05em] transition-colors duration-200 group-hover:text-amber">{link.value}</span>
                                </a>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </>
    );
}
