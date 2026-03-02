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
                            I spend most of my time writing C, poking around the Linux kernel,
                            and occasionally having things published in the <strong className="text-text font-normal">ACM Digital Library</strong>.
                            Currently in the <strong className="text-text font-normal">LFX Bug Fixing program</strong> at LKMP, working on a BELA codec driver for BeagleBoard.
                            Before that, research intern at <strong className="text-text font-normal">CDAC Pune</strong> — learned a lot about VFS internals, wrote a paper, survived.
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
                            <p className="m-0">B.Tech Electrical at <strong className="text-text font-normal">VJTI Mumbai</strong>, third year. Somewhere in first year I opened a datasheet, read the words "memory-mapped I/O", and that was pretty much it for me.</p>
                            <p className="m-0">Last year I was a research intern at <strong className="text-text font-normal">CDAC Pune</strong>. Two months working on Lustre — reading VFS internals, understanding how a parallel filesystem hooks into the kernel, doing performance testing on a RISC-V cluster. We wrote up the work and it got into HPC Asia 2026, published in the <strong className="text-text font-normal">ACM Digital Library</strong>.</p>
                            <p className="m-0">Right now I'm in the <strong className="text-text font-normal">LFX Bug Fixing program</strong> at the Linux Kernel Mentorship Program. I'm also working on a codec driver for <strong className="text-text font-normal">BeagleBoard's BELA</strong> platform in the ALSA subsystem — upstream kernel driver work. Also did Unikraft Summer of Code — a summer inside a unikernel debugger, learning things that can't be unlearned.</p>
                            <p className="m-0">I review PRs and mentor juniors on embedded projects at VJTI. GDB is my debugger. Terminal is my IDE. <strong className="text-text font-normal">The oscilloscope never lies.</strong></p>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn>
                    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[1px] bg-border mt-16">
                        {[
                            { num: '01', name: 'Linux Kernel', desc: 'VFS, ext4, ALSA. Ported filesystems, added codec drivers, debugged panics at 2 AM. Read more kernel source than documentation. The docs lie anyway.' },
                            { num: '02', name: 'C / C++ / Python', desc: "C first, always. C++ when needed, Python when I need to feel productive fast. Segfaults don't scare me anymore — they just mean I'm close to whatever broke." },
                            { num: '03', name: 'ARM & Embedded', desc: 'STM32, ESP32, BeagleBone, Raspberry Pi. Written startup assembly by hand. Wrestled with linker scripts. Convinced peripherals to cooperate at 3 AM. Normal stuff.' },
                            { num: '04', name: 'Open Source', desc: 'BeagleBoard.org contributor, Unikraft SoC alumnus. Sent patches to mailing lists and survived the review process. Builds character. Highly recommend.' },
                            { num: '05', name: 'RTOS & Firmware', desc: 'FreeRTOS, bare-metal, ISRs, task scheduling. Hit a real priority inversion bug in production once. Watchdog reset four times before I figured it out. I understand mutex types now.' },
                            { num: '06', name: 'GDB / Debug', desc: "GDB over JTAG, OpenOCD, objdump, crash logs. If printf is your primary debug strategy, we need to talk. Hardware always tells you what's wrong — you just need the right question." }
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

            <section id="work" className="max-w-full px-12 pb-[110px] pt-0 max-md:px-6 max-md:pb-20">
                <div className="max-w-[1200px] mx-auto">
                    <FadeIn>
                        <p className="text-[10px] tracking-[0.5em] uppercase text-amber mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">02 — Featured Work</p>
                    </FadeIn>
                    <FadeIn>
                        <h2 className="font-bebas text-[clamp(36px,4.5vw,64px)] leading-none tracking-[0.03em] mb-12 mt-0">
                            Things that <em className="not-italic text-amber">actually</em><br />run on hardware
                        </h2>
                    </FadeIn>
                    <FadeIn>
                        <div className="grid grid-cols-2 gap-[2px] bg-border max-md:grid-cols-1">
                            <Link to="/projects" className="bg-bg p-11 relative overflow-hidden no-underline text-inherit transition-colors duration-300 hover:bg-bg2 block group">
                                <div className="font-bebas text-[72px] text-border absolute top-3 right-5 leading-none pointer-events-none transition-colors duration-300 group-hover:text-[rgba(245,158,11,0.07)]">01</div>
                                <div className="text-[10px] tracking-[0.3em] uppercase text-amber mb-[18px]">// Linux Kernel · Research · CDAC</div>
                                <div className="font-bebas text-[32px] tracking-[0.05em] mb-3.5 leading-[1.1]">Lustre on Linux 6.12</div>
                                <div className="text-[15px] leading-[1.9] text-muted mb-6">Four months inside VFS and ext4 at CDAC Pune, porting Lustre to Linux 6.12 on a RISC-V cluster. Fixed real bugs, shipped real patches, ended up at HPC Asia 2026 with an ACM paper.</div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {['C', 'Linux Kernel', 'RISC-V', 'VFS'].map(tag => (
                                        <span key={tag} className="text-[9px] tracking-[0.2em] uppercase py-1 px-2.5 border border-border text-muted transition-colors duration-200 group-hover:border-amber-dim group-hover:text-text">{tag}</span>
                                    ))}
                                </div>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-amber flex items-center gap-2 transition-all duration-200 group-hover:gap-3.5">View all projects →</span>
                            </Link>
                            <Link to="/projects" className="bg-bg p-11 relative overflow-hidden no-underline text-inherit transition-colors duration-300 hover:bg-bg2 block group">
                                <div className="font-bebas text-[72px] text-border absolute top-3 right-5 leading-none pointer-events-none transition-colors duration-300 group-hover:text-[rgba(245,158,11,0.07)]">02</div>
                                <div className="text-[10px] tracking-[0.3em] uppercase text-amber mb-[18px]">// Linux Kernel · Debug Tools</div>
                                <div className="font-bebas text-[32px] tracking-[0.05em] mb-3.5 leading-[1.1]">Boot Autopsy</div>
                                <div className="text-[15px] leading-[1.9] text-muted mb-6">Boot hangs are miserable. No dmesg, no SSH, no idea what happened. So I built a kernel module that keeps a ring buffer of events and dumps everything on panic. No rebuilds needed.</div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {['C', 'Linux Kernel', 'GDB'].map(tag => (
                                        <span key={tag} className="text-[9px] tracking-[0.2em] uppercase py-1 px-2.5 border border-border text-muted transition-colors duration-200 group-hover:border-amber-dim group-hover:text-text">{tag}</span>
                                    ))}
                                </div>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-amber flex items-center gap-2 transition-all duration-200 group-hover:gap-3.5">View all projects →</span>
                            </Link>
                        </div>
                    </FadeIn>
                    <FadeIn>
                        <div className="border-l-[3px] border-amber py-9 px-11 bg-bg2 mt-[72px]">
                            <p className="font-bebas text-[clamp(26px,3.5vw,48px)] leading-[1.1] tracking-[0.03em] mb-5 mt-0">
                                Good firmware is <em className="not-italic text-amber">honest.</em><br />It does exactly what you told it to.<br />That's usually the problem.
                            </p>
                            <p className="text-[10px] tracking-[0.25em] uppercase text-muted m-0">— me &nbsp;&nbsp;// after the fourth watchdog reset</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section className="max-w-full px-12 pt-0 pb-[110px] max-md:px-6">
                <div className="max-w-[1200px] mx-auto">
                    <FadeIn>
                        <p className="text-[10px] tracking-[0.5em] uppercase text-amber mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">03 — Latest Writing</p>
                    </FadeIn>
                    <FadeIn>
                        <div className="grid grid-cols-1 gap-[2px] bg-border">
                            <Link to="/blog" className="bg-bg p-11 relative overflow-hidden no-underline text-inherit transition-colors duration-300 hover:bg-bg2 block group">
                                <div className="font-bebas text-[72px] text-border absolute top-3 right-5 leading-none pointer-events-none transition-colors duration-300 group-hover:text-[rgba(245,158,11,0.07)]">▶</div>
                                <div className="text-[10px] tracking-[0.3em] uppercase text-amber mb-[18px]">// Research · HPC · Linux</div>
                                <div className="font-bebas text-[32px] tracking-[0.05em] mb-3.5 leading-[1.1] max-w-[85%]">Porting Lustre to Linux 6.12 with RISC-V Support</div>
                                <div className="text-[15px] leading-[1.9] text-muted mb-6">The full story from my CDAC internship — why Lustre breaks on a new kernel, what VFS changes actually mean, how we got a RISC-V cluster running, and what it's like to see your name in the ACM Digital Library.</div>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-amber flex items-center gap-2 transition-all duration-200 group-hover:gap-3.5">Read article →</span>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section id="contact" className="bg-bg2 max-w-full py-[110px] px-12 border-t border-border text-center max-md:px-6 max-md:py-20">
                <div className="max-w-[760px] mx-auto">
                    <FadeIn>
                        <p className="text-[10px] tracking-[0.5em] uppercase text-amber mb-12 flex items-center justify-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border before:content-[''] before:flex-1 before:h-[1px] before:bg-border">04 — Contact</p>
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
