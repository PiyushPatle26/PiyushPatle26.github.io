import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import Footer from '../components/Footer';

const projects = [
    {
        id: '01',
        categories: ['kernel', 'research', 'opensource'],
        catText: '// Linux Kernel · Research · CDAC Pune',
        badge: 'ACM Published',
        title: 'Lustre on Linux 6.12 — Undergrad Research Intern',
        summary: 'Four months at CDAC Pune inside VFS and ext4, porting the Lustre parallel filesystem to Linux 6.12 with RISC-V cluster support. Fixed real bugs, shipped production patches, co-authored a paper that got into HPC Asia 2026 and the ACM Digital Library.',
        body: (
            <>
                <p className="m-0 mb-[18px]">Lustre is a parallel filesystem used across large HPC clusters. It hooks deep into the Linux kernel — VFS layer, block I/O, network stack. When Linux 6.12 changed internal VFS interfaces, Lustre broke, and I spent four months figuring out exactly how and why.</p>
                <p className="m-0">Most of the work was reading both sides — the upstream kernel commits explaining <em>why</em> the interfaces changed, and the Lustre code that had made assumptions about how they'd stay. Fixed multiple breakages across VFS and ext4, tested everything on a RISC-V cluster, and contributed changes back upstream. We also wrote up the whole experience as a paper, submitted it to SCA/HPC Asia 2026, and it got accepted. Published in the <strong className="text-text font-normal">ACM Digital Library</strong>.</p>
            </>
        ),
        tags: ['C', 'Linux Kernel', 'VFS', 'ext4', 'RISC-V', 'Lustre', 'HPC', 'GDB'],
        links: [
            { text: '↗ Research Paper (ACM)', href: 'https://dl.acm.org/doi/10.1145/3784828.3785406', type: 'primary' },
            { text: '↗ Internship Certificate', href: 'https://drive.google.com/file/d/1bTYrrer-fmjAIqlGSIqlAJZ0wU3WUgIp/view?usp=drive_link', type: 'ghost' },
            { text: '↗ Letter of Recommendation', href: 'https://drive.google.com/file/d/13VFPeCVi6Ac6CBrjaPDgRrrgTzjTFqiF/view?usp=drive_link', type: 'ghost' }
        ]
    },
    {
        id: '02',
        categories: ['kernel'],
        catText: '// Linux Kernel · Debug Tools',
        title: 'Boot Autopsy — Kernel Flight Recorder',
        summary: 'A Linux kernel module that keeps a ring buffer of the last 200 kernel events and dumps everything automatically on panic. Built because boot hangs are miserable to debug — no dmesg, no SSH, no idea what happened.',
        body: (
            <>
                <p className="m-0 mb-[18px]">Traditional boot hang debugging means adding printk statements, rebuilding the kernel, rebooting, and hoping you guessed the right location. That can take hours. Boot Autopsy sidesteps all of that.</p>
                <p className="m-0">It maintains a fixed-size <strong className="text-text font-normal">ring buffer</strong> in kernel memory. Events get written to it continuously. When the kernel panics, a <strong className="text-text font-normal">panic notifier</strong> fires and dumps the last 200 events to console before the system halts. You get a clean timeline of what led to the crash — no rebuilds needed, no guessing about where to add printks.</p>
            </>
        ),
        tags: ['C', 'Linux Kernel', 'Ring Buffer', 'Panic Notifier', 'GDB', 'QEMU'],
        links: [
            { text: '↗ Source Code (GitHub)', href: 'https://github.com/PiyushPatle26/boot_autopsy', type: 'primary' }
        ]
    },
    {
        id: '03',
        categories: ['kernel', 'opensource'],
        catText: '// Linux Kernel · ALSA · BeagleBoard.org',
        badge: 'Open Source',
        title: 'ALSA Codec Driver — BeagleBoard BELA',
        summary: "Adding a codec driver for BeagleBoard's BELA audio platform to the Linux ALSA subsystem. Upstream kernel driver work — ASoC framework, DAPM widgets, device tree bindings, audio codec integration.",
        body: (
            <>
                <p className="m-0 mb-[18px]">BeagleBoard's BELA is a real-time audio platform used in music and research. It needed a proper upstream Linux codec driver — something written to the quality bar the kernel mailing list actually accepts. That meant working through the ASoC framework: codec registration, DAPM power widget graphs, mixer controls, and device tree bindings for hardware description.</p>
                <p className="m-0">Doing this properly means reading other accepted drivers, understanding the subsystem conventions, and writing code that won't get dismissed on first review. Still in progress, but it's taught me more about the right way to write kernel code than almost anything else.</p>
            </>
        ),
        tags: ['C', 'Linux Kernel', 'ALSA / ASoC', 'Device Tree', 'BeagleBone', 'Audio'],
        links: [
            { text: '↗ Source Code (GitHub)', href: 'https://github.com/PiyushPatle26/ALSA-Linux-Driver-for-BELA', type: 'primary' }
        ]
    },
    {
        id: '04',
        categories: ['kernel', 'opensource'],
        catText: '// Unikernel · Open Source · Unikraft SoC',
        badge: 'SoC Alumnus',
        title: 'Unikraft Summer of Code',
        summary: 'Completed Unikraft Summer of Code — learning kernel debugging in a unikernel context (GDB, objdump, crash logs) and contributing directly to the Unikraft codebase. Also submitted a GSoC proposal on Unikraft debug tooling.',
        body: (
            <>
                <p className="m-0 mb-[18px]">Unikraft is a modular unikernel toolkit — no user/kernel space split, no process model, single binary that boots in milliseconds. During SoC I worked on debugging tooling: setting up GDB over QEMU's gdbserver for unikernel images, reading crash logs and objdump output, and contributing code directly to Unikraft's codebase.</p>
                <p className="m-0">The interesting part was realizing how different debugging a unikernel is. You don't have /proc, you can't attach a debugger to a "process", and the crash often takes the entire system with it. You learn to be more deliberate about what you're doing and why.</p>
            </>
        ),
        tags: ['C', 'Unikernel', 'GDB', 'objdump', 'Unikraft', 'QEMU'],
        links: [
            { text: '↗ GitHub Profile', href: 'https://github.com/PiyushPatle26', type: 'ghost' }
        ]
    },
    {
        id: '05',
        categories: ['arm'],
        catText: '// Embedded · Competition · SIH 2025',
        title: 'Smart India Hackathon 2025',
        summary: 'Smart India Hackathon 2025 — solving a real government problem statement in embedded systems. Hardware selection, firmware from scratch, prototype integration, and live demo. Real deadlines, real pressure, actually shipping something that works.',
        body: (
            <>
                <p className="m-0 mb-[18px]">SIH is one of the bigger national hackathons — teams tackle real problem statements from government ministries and industry. Our problem was in embedded systems. We picked hardware, wrote firmware, built the prototype, and had it working in front of the panel in a compressed timeframe.</p>
                <p className="m-0">The value here isn't just the technical work — it's doing engineering under pressure with unclear specs and changing requirements. That's most of what industry actually looks like.</p>
            </>
        ),
        tags: ['C', 'Embedded', 'Firmware', 'Prototyping'],
        links: [
            { text: '↗ Source Code (GitHub)', href: 'https://github.com/PiyushPatle26/SIH-2025', type: 'primary' }
        ]
    },
    {
        id: '06',
        categories: ['arm'],
        catText: '// ARM · Embedded · Mentor',
        title: 'Handheld Gaming Console — Mentored',
        summary: 'Mentored a team of junior engineers building a handheld gaming console from scratch — display drivers, input handling, audio, and game logic on constrained ARM hardware. Reviewed code, helped with architecture decisions, and tried to stop them from making the same mistakes I made in first year.',
        body: (
            <>
                <p className="m-0 mb-[18px]">Part of my broader work maintaining college embedded projects at VJTI — including Pixels SRA (OpenCV) and WALLE SRA (ESP32). The gaming console was a junior team's project. They were building it from scratch: display driver, joystick input, buzzer audio, and Tetris running on it.</p>
                <p className="m-0">My role was reviewing PRs, doing architecture discussions, helping debug the gnarlier hardware issues, and teaching real-time systems basics. Explaining something you know well to someone who doesn't is one of the better ways to find out you don't actually know it as well as you thought.</p>
            </>
        ),
        tags: ['C', 'ARM', 'Embedded', 'Display Driver', 'Real-Time', 'Mentoring'],
        links: [
            { text: '↗ Source Code (GitHub)', href: 'https://github.com/PiyushPatle26/Handheld-Gaming-Console', type: 'primary' }
        ]
    },
    {
        id: '07',
        categories: ['arm'],
        catText: '// ARM · Embedded · Firmware',
        title: 'Counter Clock',
        summary: 'A hardware counter and clock on an ARM microcontroller. Custom timer configuration, interrupt-driven counting, real-time display updates. All bare-metal, no HAL. The kind of small project that makes you understand exactly how hardware timers work.',
        body: (
            <>
                <p className="m-0 mb-[18px]">Built a hardware counter and clock — configuring ARM hardware timers for precise timekeeping, writing ISRs to count events, and driving a display with real-time updates. Written in bare-metal C without HAL abstraction because I wanted to actually understand what was happening at the register level.</p>
                <p className="m-0">Small project, clear scope. The kind of thing that teaches you more about timer peripheral configuration than any datasheet reading alone.</p>
            </>
        ),
        tags: ['C', 'ARM', 'Hardware Timers', 'ISR', 'Bare-metal', 'Display'],
        links: [
            { text: '↗ Source Code (GitHub)', href: 'https://github.com/PiyushPatle26/Counter-Clock', type: 'primary' }
        ]
    }
];

export default function Projects() {
    const [filter, setFilter] = useState('all');
    const [expanded, setExpanded] = useState({});

    const toggleProject = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredProjects = projects.filter(p => filter === 'all' || p.categories.includes(filter));

    return (
        <>
            <div className="pt-[160px] pb-20 px-12 max-w-[1200px] mx-auto max-md:px-6">
                <p className="text-[11px] tracking-[0.4em] uppercase text-amber mb-6 opacity-0 translate-y-4 animate-[fadeUp_0.6s_0.2s_forwards] m-0">// Work & Projects</p>
                <h1 className="font-bebas text-[clamp(36px,5vw,72px)] leading-none tracking-[0.02em] opacity-0 translate-y-7 animate-[fadeUp_0.7s_0.35s_forwards] m-0">
                    Things that<br /><em className="not-italic text-amber">actually run</em><br />on hardware
                </h1>
                <p className="mt-7 max-w-[520px] text-base leading-[1.9] text-muted opacity-0 translate-y-4 animate-[fadeUp_0.6s_0.5s_forwards] m-0">
                    Open source contributions, kernel work, research, and firmware that survived contact with real silicon. Some of it is in production. All of it taught me something.
                </p>
            </div>

            <div className="px-12 pb-12 max-w-[1200px] mx-auto flex gap-3 flex-wrap max-md:px-6">
                {[
                    { id: 'all', label: 'All' },
                    { id: 'kernel', label: 'Linux Kernel' },
                    { id: 'opensource', label: 'Open Source' },
                    { id: 'arm', label: 'ARM / Embedded' },
                    { id: 'research', label: 'Research' }
                ].map(btn => (
                    <button
                        key={btn.id}
                        onClick={() => setFilter(btn.id)}
                        className={`text-[10px] tracking-[0.25em] uppercase px-5 py-2 border bg-transparent transition-all duration-200 cursor-none
              ${filter === btn.id ? 'border-amber text-amber' : 'border-border text-muted hover:border-amber hover:text-amber'}
            `}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <div className="px-12 pb-[120px] max-w-[1200px] mx-auto max-md:px-6">
                {filteredProjects.map((p, index) => (
                    <FadeIn key={p.id}>
                        <div className="border border-border mb-[2px] bg-bg transition-colors duration-300 hover:bg-bg2 overflow-hidden">
                            <div className="py-11 px-12 grid grid-cols-[1fr_auto] gap-10 items-start max-md:grid-cols-1 max-md:py-6 max-md:px-6">
                                <div>
                                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                                        <span className="font-bebas text-[18px] text-border leading-none">{p.id}</span>
                                        <span className="text-[10px] tracking-[0.3em] uppercase text-amber">{p.catText}</span>
                                        {p.badge && (
                                            <span className="text-[9px] tracking-[0.2em] uppercase py-[3px] px-2.5 border border-amber-dim text-amber">{p.badge}</span>
                                        )}
                                    </div>
                                    <div className="font-bebas text-[clamp(28px,3.5vw,48px)] tracking-[0.04em] leading-[1.05] mb-4">{p.title}</div>
                                    <div className="text-base leading-[1.9] text-muted max-w-[620px]">{p.summary}</div>
                                </div>
                                <button
                                    onClick={() => toggleProject(p.id)}
                                    className="text-[10px] tracking-[0.3em] uppercase text-muted bg-transparent border border-border py-2.5 px-[18px] cursor-none transition-all duration-200 whitespace-nowrap self-start mt-12 hover:text-amber hover:border-amber max-md:mt-5"
                                >
                                    {expanded[p.id] ? '[ collapse ]' : '[ expand ]'}
                                </button>
                            </div>
                            <div
                                className="overflow-hidden transition-[max-height] duration-600 ease"
                                style={{ maxHeight: expanded[p.id] ? '900px' : '0px' }}
                            >
                                <div className="px-12 pb-11 max-md:px-6 max-md:pb-6 pt-0">
                                    <div className="text-base leading-[1.9] text-muted mb-7 border-t border-border pt-7">
                                        {p.body}
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-7">
                                        {p.tags.map(tag => (
                                            <span key={tag} className="text-[9px] tracking-[0.2em] uppercase py-1 px-2.5 border border-border text-muted">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 flex-wrap items-center">
                                        {p.links.map(link => (
                                            <a
                                                key={link.text}
                                                href={link.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`text-[10px] tracking-[0.2em] uppercase no-underline inline-flex items-center gap-1.5 transition-all duration-200 py-[7px] px-3.5 border
                          ${link.type === 'primary'
                                                        ? 'text-amber border-amber-dim hover:gap-3 hover:border-amber hover:bg-[rgba(245,158,11,0.05)]'
                                                        : 'text-muted border-border hover:gap-3 hover:text-text hover:border-muted'
                                                    }
                        `}
                                            >
                                                {link.text}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            <div className="px-12 pb-[120px] max-w-[1200px] mx-auto max-md:px-6">
                <FadeIn>
                    <div className="border border-border p-[60px] flex items-center justify-between gap-10 bg-bg2 max-md:flex-col max-md:p-8 text-left">
                        <p className="font-bebas text-[clamp(28px,4vw,52px)] leading-none tracking-[0.03em] m-0">
                            More stuff<br /><em className="not-italic text-amber">lives on GitHub</em>
                        </p>
                        <a href="https://github.com/PiyushPatle26" target="_blank" rel="noreferrer" className="inline-block py-[13px] px-7 border border-amber bg-amber text-bg font-ibm text-[11px] tracking-[0.25em] uppercase no-underline transition-all duration-200 hover:bg-transparent hover:text-amber hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] whitespace-nowrap">
                            github.com/PiyushPatle26 →
                        </a>
                    </div>
                </FadeIn>
            </div>

            <Footer />
        </>
    );
}
