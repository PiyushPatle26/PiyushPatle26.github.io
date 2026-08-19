import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

const articles = {
    'cdac-lustre': {
        tag: 'Research · HPC · Linux Kernel',
        date: 'June 2025 · 15 min read',
        title: 'Porting Lustre to a Newer Kernel: What I Actually Learned',
        body: (
            <>
                <p>Two months at CDAC Pune working on Lustre. The task was straightforward on paper: get Lustre building and running on a newer kernel, test it on a RISC-V cluster, and understand it well enough to write a paper about it. This is what I actually learned. Not a list of patches, but what the work taught me about how the Linux kernel and filesystems fit together.</p>

                <h2>What Lustre is and why it's complicated</h2>
                <p>Lustre is a parallel distributed filesystem used in HPC clusters. Unlike NFS (one server you talk to), Lustre separates metadata and data across distinct server types. The <strong>MDS/MDT</strong> (Metadata Server / Target) handles filenames, permissions, and layout maps. The <strong>OSS/OST</strong> (Object Storage Server / Target) holds actual file data, striped across multiple targets in parallel. Clients coordinate with both.</p>
                <p>What makes this interesting from a kernel perspective: the entire client stack is kernel modules. No FUSE, no userspace daemon. When you <code>mount -t lustre</code>, you're loading <code>lustre.ko</code>, <code>lnet.ko</code>, <code>obdclass.ko</code>, <code>fid.ko</code>, and others, all living inside the kernel, talking directly to the VFS.</p>

                <h2>The VFS layer: where everything connects</h2>
                <p>Understanding Lustre meant understanding VFS first. The Virtual File System is the abstraction layer that presents a uniform interface to userspace regardless of what's underneath. When you call <code>open()</code>, the kernel doesn't care if it's ext4 or Lustre. The syscall hits VFS, VFS routes based on mount point, and the filesystem-specific module handles it.</p>
                <p>The key structures are <code>inode_operations</code>, <code>file_operations</code>, and <code>super_operations</code>. Every filesystem implements these. They're the contract between your filesystem and the kernel. When the kernel changes these interfaces between versions, which it does without much fanfare, every filesystem that implements them needs to adapt. Lustre depended on several of these in ways that broke with newer kernels. Finding those breakages and understanding why they happened was most of the work.</p>
                <blockquote>The interesting thing about VFS interface changes is that they're rarely documented in one place. You find them by reading the commits that changed them, understanding the rationale, and tracing what broke downstream. This is slow. It's also the correct approach.</blockquote>

                <h2>LNet: why Lustre has its own networking stack</h2>
                <p>One thing that surprised me early on was <code>lnet.ko</code>. Lustre doesn't use the Linux TCP/IP stack for inter-node communication. It has its own custom networking layer that supports InfiniBand, Omni-Path, and Ethernet. This allows RDMA (Remote Direct Memory Access): the NIC transfers data directly into application memory without CPU involvement.</p>
                <p>The alternative approach, used by BeeGFS's optional FUSE client, is simpler to develop, since a crash in the daemon doesn't take the kernel with it, but every I/O operation crosses the kernel-userspace boundary twice. For HPC workloads doing large sequential I/O across many nodes, that overhead is significant. Lustre's all-kernel design trades development complexity for throughput. Learning both approaches side by side made the tradeoffs concrete.</p>

                <h2>FIDs: how Lustre tracks files at scale</h2>
                <p>Lustre doesn't track files by path. It uses <strong>File Identifiers (FIDs)</strong>, managed by <code>fid.ko</code>. A FID is a 128-bit globally unique identifier: a 64-bit sequence number, a 32-bit object ID within that sequence, and a 32-bit version. Once you open a file and get its FID from the MDS, all subsequent operations use the FID directly, with no path resolution and no directory walks.</p>
                <p>This matters at scale. A cluster with billions of files can't afford to re-resolve long paths on every access. FIDs make metadata operations cheap. Underneath, <code>obdclass.ko</code> provides an abstraction layer that gives clients and servers a common interface, where everything is an object you send commands to, whether it's an MDS or an OSS. This is what allows Lustre's modularity: components can be upgraded without rewriting core communication logic.</p>

                <h2>The ldiskfs backend and what the porting involved</h2>
                <p>Lustre's server-side storage backend is <strong>ldiskfs</strong>, a modified fork of ext4. Building Lustre with ldiskfs support requires the ext4 source from the kernel tree, a custom e2fsprogs build from Whamcloud, and the right configure flags (<code>--enable-ldiskfs --with-zfs=no</code>). The build system expects things in specific places, and the errors when they aren't there aren't always clear.</p>
                <p>The porting involved cherry-picking compatibility patches from Whamcloud's Gerrit for the target kernel version: changes to journal commit callbacks, VFS interface adaptations, build system fixes. Each patch addresses a specific incompatibility between Lustre's assumptions and what the newer kernel provides. For each one: find the kernel commit that changed the interface, read why it changed, then understand how Lustre needs to adapt. The "just make the compiler happy" approach gives you modules that load and silently misbehave. Doing it properly means understanding both sides of the interface.</p>

                <h2>Testing on the RISC-V cluster</h2>
                <p>Once we had Lustre building and loading, we tested it on a RISC-V cluster: separate MDS and OSS nodes, client machines mounting and running workloads. The performance testing used synthetic benchmarks and traces representative of HPC application patterns: large sequential reads and writes, metadata-heavy operations, mixed workloads.</p>
                <p>RISC-V isn't x86. There are architectural differences in how the kernel handles certain operations, and validating that a complex filesystem like Lustre runs stably on a different ISA means checking that the assumptions baked into the code hold. Data integrity testing, checking performance numbers, verifying that parallel I/O across OSTs worked correctly. The outcome was that Lustre ran on the cluster and performed acceptably, which is the point. Getting there was the learning.</p>

                <h2>What I actually took away</h2>
                <p>The most valuable thing wasn't any particular patch. It was learning to navigate a large kernel subsystem I'd never seen before: following code paths across multiple modules, reading VFS and filesystem documentation, understanding why an interface exists before trying to use it. The kernel mailing lists and Whamcloud's Gerrit are genuinely useful. Most of the hard answers are in commit messages, if you know to look there.</p>
                <p>We wrote up the work and it got accepted at SCA/HPC Asia 2026: <a href="https://dl.acm.org/doi/10.1145/3784828.3785406" target="_blank" rel="noreferrer">ACM Digital Library, doi:10.1145/3784828.3785406</a>.</p>
            </>
        )
    },
    'lkmp-2026': {
        tag: 'Linux Kernel · Mentorship · Open Source',
        date: 'August 2026 · 6 min read',
        title: 'My Journey Through the Linux Kernel Mentorship Program',
        body: (
            <>
                <h2>Why I applied</h2>
                <p>I had used Linux for years but had never actually contributed to it. The kernel always felt like a closed door to me: a massive codebase, mailing lists full of people who clearly knew what they were doing, and a review culture I had heard was pretty blunt. I kept telling myself I would get into it "someday." The mentorship was me finally forcing that someday to happen.</p>
                <p>What I wanted out of it was simple. I wanted to stop being intimidated, learn how real kernel development actually works, and get at least a little of my own code into the tree that runs on machines all over the world.</p>

                <h2>What I worked on</h2>
                <p>During the mentorship I submitted patches across several kernel subsystems, including IIO, ASoC, DeviceTree bindings, RTC, and Kbuild. Nine of my commits have made it into Linus Torvalds' mainline tree.</p>
                <figure className="my-8">
                    <img
                        src="/mainline-commits.png"
                        alt="cgit log of the mainline Linux kernel filtered by author Piyush Patle, showing nine commits across iio, dt-bindings, kbuild, and ASoC"
                        className="w-full border border-border"
                        loading="lazy"
                    />
                    <figcaption className="text-[10px] tracking-[0.2em] uppercase text-muted mt-3">My commits in the mainline Linux kernel</figcaption>
                </figure>
                <p>My biggest project was adding support for a new sensor chip, the AVIA HX710B, to the IIO subsystem (<a href="https://lore.kernel.org/all/20260603184859.89693-1-piyushpatle228@gmail.com/" target="_blank" rel="noreferrer">the series is here on Lore</a>). Most of the groundwork for it has been accepted and is queued for the next kernel release, and the last couple of patches are still going through review as I write this. Seeing a whole new device get this close to being in the kernel is easily the thing I am proudest of.</p>
                <p>I also built <a href="https://github.com/PiyushPatle26/PageForge" target="_blank" rel="noreferrer">PageForge</a> while working through the memory and paging concepts I kept running into in the kernel.</p>

                <h2>The part that challenged me</h2>
                <p>My biggest lesson came from that sensor project, which went through twelve revisions before the bulk of it was accepted.</p>
                <p>Twelve. When I sent v1, I honestly thought it was almost done. It was not. Every round came back with comments, and in the beginning my instinct was to defend what I had written. That was the wrong instinct. Somewhere around the middle of those revisions something clicked, and I stopped reading review comments as criticism and started reading them as the fastest way to understand the code better than I had on my own. The reviewers were not trying to block me. They were pointing at things I genuinely had not seen yet.</p>
                <p>Once I made that switch, the whole process got easier. I stopped taking the back-and-forth personally and just tried to come back each time with a cleaner, smaller, clearer version. That change in how I thought about review is the most useful thing I took from the whole program.</p>

                <h2>What I learned</h2>
                <p>Small, reviewable patches matter. Keeping changes focused makes it much easier for maintainers to understand, review, and eventually merge them. Review is part of development, not a final approval step at the end. And rejection is useful information, not a verdict on you.</p>

                <h2>Thank you</h2>
                <p>Thank you to my mentor Shuah Khan for the guidance, and to the maintainers and reviewers who spent real time on my patches, especially Jonathan Cameron, along with Andy Shevchenko, Conor Dooley, Krzysztof Kozlowski, David Lechner, and Mark Brown. I learned the most from the reviews that were hardest on me.</p>

                <h2>What's next</h2>
                <p>The mentorship may be over, but my kernel work isn't. I want to see the HX710B series fully merged, keep contributing to IIO, and slowly take on bigger pieces. The door I was so intimidated by is open now, and I intend to keep walking through it.</p>

                <h2>My contributions</h2>
                <p>
                    <a href="https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/log/?qt=author&q=Piyush+Patle" target="_blank" rel="noreferrer">Merged patches (mainline Linux kernel)</a>
                    {' · '}
                    <a href="https://lore.kernel.org/all/?q=Piyush%20Patle" target="_blank" rel="noreferrer">All submissions and discussions on Lore</a>
                </p>
            </>
        )
    },
    'handheld-gaming-console': {
        tag: 'Embedded Systems · STM32 · Mentoring',
        date: 'April 2026 · 8 min read',
        title: 'Mentoring a Handheld Gaming Console Build on STM32',
        body: (
            <>
                <p>I mentored a junior team at VJTI building a handheld gaming console on STM32 using HAL. The project included LCD rendering, joystick and button input, IMU integration, DFPlayer Mini audio output, and game loop timing on constrained hardware.</p>

                <h2>System architecture and constraints</h2>
                <p>The team had to balance responsiveness, peripheral coordination, and limited compute/memory resources. The design required clear separation between input handling, rendering, audio control, and game-state updates so that changes in one module would not destabilize the rest.</p>
                <p>We focused on predictable behavior: deterministic update loops, measured peripheral latencies, and careful interrupt usage. On small embedded systems, loose architecture decisions show up quickly as jitter, missed inputs, or unstable frame timing.</p>

                <h2>Mentoring approach</h2>
                <p>My role was review and technical guidance rather than implementation. I reviewed pull requests, discussed driver boundaries, and helped debug difficult hardware-software interaction issues. The objective was not just to make the console work, but to help the team understand why each design decision mattered.</p>
                <p>Most mentoring effort went into debugging discipline: reproduce reliably, isolate one subsystem at a time, verify assumptions with instrumentation, and document root cause before applying fixes.</p>

                <h2>What the project delivered</h2>
                <p>The final build demonstrated a complete and stable handheld prototype: graphics on LCD, responsive controls, motion input, and audio playback with coherent game behavior. It was a good example of practical embedded development under real constraints.</p>
                <p>This project reinforced an important lesson: engineering maturity comes from making systems understandable and maintainable, not only functional.</p>
            </>
        )
    }
};

export default function Blog() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const overlayRef = useRef(null);
    const activeArticle = slug && articles[slug] ? slug : null;

    const openArticle = (id) => navigate(`/blog/${id}`);
    const closeArticle = () => navigate('/blog');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeArticle();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    useEffect(() => {
        if (activeArticle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [activeArticle]);

    // an unknown slug is not an article, so fall back to the listing
    useEffect(() => {
        if (slug && !articles[slug]) navigate('/blog', { replace: true });
    }, [slug, navigate]);

    useEffect(() => {
        if (overlayRef.current) overlayRef.current.scrollTop = 0;
    }, [activeArticle]);

    return (
        <>
            <div className="pt-[160px] pb-20 px-12 max-w-[1200px] mx-auto max-md:px-6">
                <p className="text-[11px] tracking-[0.4em] uppercase text-amber mb-6 opacity-0 translate-y-4 animate-[fadeUp_0.6s_0.2s_forwards] m-0">// Writing & Notes</p>
                <h1 className="font-bebas text-[clamp(36px,5vw,72px)] leading-none tracking-[0.02em] opacity-0 translate-y-7 animate-[fadeUp_0.7s_0.35s_forwards] m-0">
                    Thoughts<br />from the <em className="not-italic text-amber">kernel</em><br />side
                </h1>
                <p className="mt-7 max-w-[520px] text-base leading-[1.9] text-muted opacity-0 translate-y-4 animate-[fadeUp_0.6s_0.5s_forwards] m-0">
                    Stuff I figured out the hard way, things I wish someone had written down before I wasted three days on them, and the occasional post-mortem.
                </p>
            </div>

            <div className="px-12 pb-[120px] max-w-[1200px] mx-auto max-md:px-6">

                <FadeIn>
                    <div
                        onClick={() => openArticle('lkmp-2026')}
                        className="border border-border p-14 mb-[2px] bg-bg cursor-none transition-colors duration-300 relative overflow-hidden group hover:bg-bg2"
                    >
                        <div className="absolute top-5 right-6 text-[9px] tracking-[0.4em] text-amber uppercase">FEATURED</div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[9px] tracking-[0.3em] uppercase text-amber">// Linux Kernel · Mentorship · Open Source</span>
                            <span className="text-[9px] tracking-[0.2em] text-muted">Aug 2026 &nbsp;·&nbsp; 6 min read</span>
                        </div>
                        <div className="font-bebas text-[clamp(32px,4vw,52px)] tracking-[0.04em] leading-[1.05] mb-4">My Journey Through the Linux Kernel Mentorship Program</div>
                        <div className="text-base leading-[1.9] text-muted max-w-[640px] m-0">Nine commits in mainline, twelve revisions on one patch series, and what the Linux Kernel Mentorship Program taught me about reading review comments the right way.</div>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-amber inline-flex items-center gap-2 mt-5 transition-all duration-200 group-hover:gap-3.5">Read article →</span>
                    </div>
                </FadeIn>

                <FadeIn>
                    <div
                        onClick={() => openArticle('cdac-lustre')}
                        className="border border-border p-14 mb-[2px] bg-bg cursor-none transition-colors duration-300 relative overflow-hidden group hover:bg-bg2"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[9px] tracking-[0.3em] uppercase text-amber">// Research · HPC · Linux Kernel</span>
                            <span className="text-[9px] tracking-[0.2em] text-muted">Jan 2026 &nbsp;·&nbsp; 12 min read</span>
                        </div>
                        <div className="font-bebas text-[clamp(32px,4vw,52px)] tracking-[0.04em] leading-[1.05] mb-4">Porting Lustre to a Newer Kernel: What I Actually Learned</div>
                        <div className="text-base leading-[1.9] text-muted max-w-[640px] m-0">What four months at CDAC Pune taught me about VFS internals, LNet, FIDs, ldiskfs, and what it actually means to port a kernel filesystem to a new architecture.</div>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-amber inline-flex items-center gap-2 mt-5 transition-all duration-200 group-hover:gap-3.5">Read article →</span>
                    </div>
                </FadeIn>

                <FadeIn>
                    <div
                        onClick={() => openArticle('handheld-gaming-console')}
                        className="border border-border p-14 mb-[2px] bg-bg cursor-none transition-colors duration-300 relative overflow-hidden group hover:bg-bg2"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[9px] tracking-[0.3em] uppercase text-amber">// Embedded Systems · STM32 · Mentoring</span>
                            <span className="text-[9px] tracking-[0.2em] text-muted">Apr 2026 &nbsp;·&nbsp; 8 min read</span>
                        </div>
                        <div className="font-bebas text-[clamp(32px,4vw,52px)] tracking-[0.04em] leading-[1.05] mb-4">Mentoring a Handheld Gaming Console Build on STM32</div>
                        <div className="text-base leading-[1.9] text-muted max-w-[640px] m-0">How we structured the firmware stack, handled peripheral integration, and debugged timing and hardware interaction issues while mentoring a junior embedded team.</div>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-amber inline-flex items-center gap-2 mt-5 transition-all duration-200 group-hover:gap-3.5">Read article →</span>
                    </div>
                </FadeIn>

            </div>


            {/* ARTICLE OVERLAY */}
            <div
                ref={overlayRef}
                className={`fixed inset-0 bg-[rgba(10,10,8,0.96)] z-[5000] overflow-y-auto backdrop-blur-[4px] transition-all duration-400
          ${activeArticle ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
                onClick={(e) => {
                    if (e.target === e.currentTarget) closeArticle();
                }}
            >
                <button
                    onClick={closeArticle}
                    className="fixed top-7 right-12 z-[5001] text-[10px] tracking-[0.3em] uppercase text-muted bg-transparent border border-border py-2 px-4 cursor-none transition-all duration-200 hover:text-amber hover:border-amber max-md:right-6"
                >
                    [ close ]
                </button>
                <div className="max-w-[1040px] mx-auto pt-[100px] px-12 pb-[120px] max-md:pt-20 max-md:px-6">
                    {activeArticle && (
                        <>
                            <div className="text-[10px] tracking-[0.35em] uppercase text-amber mb-5 m-0">// {articles[activeArticle].tag}</div>
                            <div className="font-bebas text-[clamp(40px,6vw,80px)] leading-[0.92] tracking-[0.03em] mb-8">{articles[activeArticle].title}</div>
                            <div className="text-[10px] tracking-[0.2em] text-muted uppercase mb-12 pb-8 border-b border-border m-0">{articles[activeArticle].date} · Piyush Patle</div>
                            <div
                                className="text-sm leading-[2.1] text-muted blog-content"
                            >
                                {/* 
                  Using a scoped class .blog-content or direct tailwind classes for children to match the css:
                  h2 -> font-bebas text-[32px] tracking-[0.05em] text-text my-12 mb-5
                  p -> mb-6
                  strong -> text-text font-bold
                  em -> text-text italic
                  pre -> bg-bg2 border border-border p-6 my-8 overflow-x-auto text-[14px] leading-[1.6] text-[#a3e635] border-l-[3px] border-l-amber
                  code -> font-ibm bg-bg2 py-0.5 px-1.5 text-[14px] text-amber
                  blockquote -> border-l-[3px] border-amber py-4 px-6 my-8 italic text-text
                  a -> text-amber no-underline border-b border-amber-dim hover:border-amber
                */}
                                <style>{`
                  .blog-content h2 { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 0.05em; color: var(--color-text); margin: 48px 0 20px; font-weight: normal; }
                  .blog-content p { margin-bottom: 24px; }
                  .blog-content strong { color: var(--color-text); font-weight: bold; }
                  .blog-content em { color: var(--color-text); font-style: italic; }
                  .blog-content pre { background: var(--color-bg2); border: 1px solid var(--color-border); padding: 24px; margin: 32px 0; overflow-x: auto; font-size: 14px; line-height: 1.6; color: #a3e635; border-left: 3px solid var(--color-amber); white-space: pre-wrap; word-wrap: break-word;}
                  .blog-content code { font-family: 'IBM Plex Mono', monospace; background: var(--color-bg2); padding: 2px 6px; font-size: 14px; color: var(--color-amber); }
                  .blog-content blockquote { border-left: 3px solid var(--color-amber); padding: 16px 24px; margin: 32px 0; font-style: italic; color: var(--color-text); }
                  .blog-content a { color: var(--color-amber); text-decoration: none; border-bottom: 1px solid var(--color-amber-dim); transition: border-color 0.2s;}
                  .blog-content a:hover { border-bottom-color: var(--color-amber); }
                `}</style>
                                {articles[activeArticle].body}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
