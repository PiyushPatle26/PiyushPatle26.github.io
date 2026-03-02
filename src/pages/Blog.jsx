import { useState, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import Footer from '../components/Footer';

const articles = {
    article1: {
        tag: 'Research · HPC · Linux Kernel',
        date: 'June 2025 · 15 min read',
        title: 'Porting Lustre to a Newer Kernel: What I Actually Learned',
        body: (
            <>
                <p>Two months at CDAC Pune working on Lustre. The task was straightforward on paper: get Lustre building and running on a newer kernel, test it on a RISC-V cluster, and understand it well enough to write a paper about it. This is what I actually learned — not a list of patches, but what the work taught me about how the Linux kernel and filesystems fit together.</p>

                <h2>What Lustre is and why it's complicated</h2>
                <p>Lustre is a parallel distributed filesystem used in HPC clusters. Unlike NFS (one server you talk to), Lustre separates metadata and data across distinct server types. The <strong>MDS/MDT</strong> (Metadata Server / Target) handles filenames, permissions, and layout maps. The <strong>OSS/OST</strong> (Object Storage Server / Target) holds actual file data, striped across multiple targets in parallel. Clients coordinate with both.</p>
                <p>What makes this interesting from a kernel perspective: the entire client stack is kernel modules. No FUSE, no userspace daemon. When you <code>mount -t lustre</code>, you're loading <code>lustre.ko</code>, <code>lnet.ko</code>, <code>obdclass.ko</code>, <code>fid.ko</code>, and others — all living inside the kernel, talking directly to the VFS.</p>

                <h2>The VFS layer — where everything connects</h2>
                <p>Understanding Lustre meant understanding VFS first. The Virtual File System is the abstraction layer that presents a uniform interface to userspace regardless of what's underneath. When you call <code>open()</code>, the kernel doesn't care if it's ext4 or Lustre — the syscall hits VFS, VFS routes based on mount point, and the filesystem-specific module handles it.</p>
                <p>The key structures are <code>inode_operations</code>, <code>file_operations</code>, and <code>super_operations</code>. Every filesystem implements these. They're the contract between your filesystem and the kernel. When the kernel changes these interfaces between versions — which it does, without much fanfare — every filesystem that implements them needs to adapt. Lustre depended on several of these in ways that broke with newer kernels. Finding those breakages and understanding why they happened was most of the work.</p>
                <blockquote>The interesting thing about VFS interface changes is that they're rarely documented in one place. You find them by reading the commits that changed them, understanding the rationale, and tracing what broke downstream. This is slow. It's also the correct approach.</blockquote>

                <h2>LNet — why Lustre has its own networking stack</h2>
                <p>One thing that surprised me early on was <code>lnet.ko</code>. Lustre doesn't use the Linux TCP/IP stack for inter-node communication — it has its own custom networking layer that supports InfiniBand, Omni-Path, and Ethernet. This allows RDMA (Remote Direct Memory Access): the NIC transfers data directly into application memory without CPU involvement.</p>
                <p>The alternative approach, used by BeeGFS's optional FUSE client, is simpler to develop — a crash in the daemon doesn't take the kernel with it — but every I/O operation crosses the kernel-userspace boundary twice. For HPC workloads doing large sequential I/O across many nodes, that overhead is significant. Lustre's all-kernel design trades development complexity for throughput. Learning both approaches side by side made the tradeoffs concrete.</p>

                <h2>FIDs — how Lustre tracks files at scale</h2>
                <p>Lustre doesn't track files by path. It uses <strong>File Identifiers (FIDs)</strong>, managed by <code>fid.ko</code>. A FID is a 128-bit globally unique identifier: a 64-bit sequence number, a 32-bit object ID within that sequence, and a 32-bit version. Once you open a file and get its FID from the MDS, all subsequent operations use the FID directly — no path resolution, no directory walks.</p>
                <p>This matters at scale. A cluster with billions of files can't afford to re-resolve long paths on every access. FIDs make metadata operations cheap. Underneath, <code>obdclass.ko</code> provides an abstraction layer that gives clients and servers a common interface — everything is an object you send commands to, whether it's an MDS or an OSS. This is what allows Lustre's modularity: components can be upgraded without rewriting core communication logic.</p>

                <h2>The ldiskfs backend and what the porting involved</h2>
                <p>Lustre's server-side storage backend is <strong>ldiskfs</strong> — a modified fork of ext4. Building Lustre with ldiskfs support requires the ext4 source from the kernel tree, a custom e2fsprogs build from Whamcloud, and the right configure flags (<code>--enable-ldiskfs --with-zfs=no</code>). The build system expects things in specific places, and the errors when they aren't there aren't always clear.</p>
                <p>The porting involved cherry-picking compatibility patches from Whamcloud's Gerrit for the target kernel version: changes to journal commit callbacks, VFS interface adaptations, build system fixes. Each patch addresses a specific incompatibility between Lustre's assumptions and what the newer kernel provides. For each one: find the kernel commit that changed the interface, read why it changed, then understand how Lustre needs to adapt. The "just make the compiler happy" approach gives you modules that load and silently misbehave. Doing it properly means understanding both sides of the interface.</p>

                <h2>Testing on the RISC-V cluster</h2>
                <p>Once we had Lustre building and loading, we tested it on a RISC-V cluster — separate MDS and OSS nodes, client machines mounting and running workloads. The performance testing used synthetic benchmarks and traces representative of HPC application patterns: large sequential reads and writes, metadata-heavy operations, mixed workloads.</p>
                <p>RISC-V isn't x86 — there are architectural differences in how the kernel handles certain operations, and validating that a complex filesystem like Lustre runs stably on a different ISA means checking that the assumptions baked into the code hold. Data integrity testing, checking performance numbers, verifying that parallel I/O across OSTs worked correctly. The outcome was that Lustre ran on the cluster and performed acceptably — which is the point. Getting there was the learning.</p>

                <h2>What I actually took away</h2>
                <p>The most valuable thing wasn't any particular patch. It was learning to navigate a large kernel subsystem I'd never seen before: following code paths across multiple modules, reading VFS and filesystem documentation, understanding why an interface exists before trying to use it. The kernel mailing lists and Whamcloud's Gerrit are genuinely useful — most of the hard answers are in commit messages, if you know to look there.</p>
                <p>We wrote up the work and it got accepted at SCA/HPC Asia 2026: <a href="https://dl.acm.org/doi/10.1145/3784828.3785406" target="_blank" rel="noreferrer">ACM Digital Library — doi:10.1145/3784828.3785406</a>.</p>
            </>
        )
    }
};

export default function Blog() {
    const [activeArticle, setActiveArticle] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveArticle(null);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (activeArticle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
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
                        onClick={() => setActiveArticle('article1')}
                        className="border border-border p-14 mb-[2px] bg-bg cursor-none transition-colors duration-300 relative overflow-hidden group hover:bg-bg2"
                    >
                        <div className="absolute top-5 right-6 text-[9px] tracking-[0.4em] text-amber uppercase">FEATURED</div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[9px] tracking-[0.3em] uppercase text-amber">// Research · HPC · Linux Kernel</span>
                            <span className="text-[9px] tracking-[0.2em] text-muted">Jan 2026 &nbsp;·&nbsp; 12 min read</span>
                        </div>
                        <div className="font-bebas text-[clamp(32px,4vw,52px)] tracking-[0.04em] leading-[1.05] mb-4">Porting Lustre to a Newer Kernel: What I Actually Learned</div>
                        <div className="text-base leading-[1.9] text-muted max-w-[640px] m-0">What four months at CDAC Pune taught me about VFS internals, LNet, FIDs, ldiskfs, and what it actually means to port a kernel filesystem to a new architecture.</div>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-amber inline-flex items-center gap-2 mt-5 transition-all duration-200 group-hover:gap-3.5">Read article →</span>
                    </div>
                </FadeIn>

            </div>

            <Footer />

            {/* ARTICLE OVERLAY */}
            <div
                className={`fixed inset-0 bg-[rgba(10,10,8,0.96)] z-[5000] overflow-y-auto backdrop-blur-[4px] transition-all duration-400
          ${activeArticle ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setActiveArticle(null);
                }}
            >
                <button
                    onClick={() => setActiveArticle(null)}
                    className="fixed top-7 right-12 z-[5001] text-[10px] tracking-[0.3em] uppercase text-muted bg-transparent border border-border py-2 px-4 cursor-none transition-all duration-200 hover:text-amber hover:border-amber max-md:right-6"
                >
                    [ close ]
                </button>
                <div className="max-w-[720px] mx-auto pt-[100px] px-12 pb-[120px] max-md:pt-20 max-md:px-6">
                    {activeArticle && (
                        <>
                            <div className="text-[10px] tracking-[0.35em] uppercase text-amber mb-5 m-0">// {articles[activeArticle].tag}</div>
                            <div className="font-bebas text-[clamp(40px,6vw,80px)] leading-[0.92] tracking-[0.03em] mb-8">{articles[activeArticle].title}</div>
                            <div className="text-[10px] tracking-[0.2em] text-muted uppercase mb-12 pb-8 border-b border-border m-0">{articles[activeArticle].date} — Piyush Patle</div>
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
