import { useState, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import Footer from '../components/Footer';

const articles = {
    article1: {
        tag: 'Research · HPC · Linux Kernel',
        date: 'January 2026 · 12 min read',
        title: 'Porting Lustre to Linux 6.12 with RISC-V Support',
        body: (
            <>
                <p>When my internship at CDAC Pune started, the task sounded manageable: port Lustre to a newer kernel. Four months later I had fixed a dozen subtle breakages, tested across a RISC-V cluster, and somehow ended up co-authoring a paper that got into HPC Asia 2026. This is the actual story of how that happened.</p>
                <h2>What is Lustre and why should you care</h2>
                <p>Lustre is a parallel distributed filesystem used on some of the world's largest supercomputers. It hooks deep into the Linux kernel — VFS layer, block I/O, network stack. When Linux 6.12 changed internal VFS interfaces, Lustre broke, and I spent four months figuring out exactly how and why.</p>
                <h2>The first build attempt</h2>
                <p>I pulled Linux 6.12, tried to build Lustre against it, and got a wall of compiler errors. The kernel had changed internal function signatures in the VFS layer that Lustre depended on. The VFS defines <code>inode_operations</code>, <code>file_operations</code>, and <code>super_operations</code> — the interfaces your filesystem implements to hook into the kernel. When these change, every filesystem needs to adapt.</p>
                <blockquote>Linux 6.12 changed how directory entry lookup works, how some locking interacts with inode operations, and a few other things Lustre depended on in subtle ways. None of it was documented in one place — you read the kernel commits and figure it out.</blockquote>
                <h2>How I actually fixed it</h2>
                <p>For each breakage: find the upstream kernel commit, read the commit message carefully, understand <em>why</em> it changed, then figure out how to update Lustre correctly. Slower than just making the compiler happy, but it's the right way. Some fixes were one-liners. Some required rethinking how Lustre's directory operations fit into the new locking model.</p>
                <h2>The RISC-V cluster</h2>
                <p>Once things compiled, we validated on the actual target: a RISC-V cluster with separate MDS and OSS nodes. We ran synthetic benchmarks and real HPC application workload traces. Performance was acceptable, data integrity held up under load — getting there involved some late nights with GDB and a lot of reading kernel logs.</p>
                <h2>The paper</h2>
                <p>We wrote up the entire experience. It got accepted at SCA/HPC Asia 2026 and is now in the ACM Digital Library. Read it here: <a href="https://dl.acm.org/doi/10.1145/3784828.3785406" target="_blank" rel="noreferrer">ACM Digital Library — doi:10.1145/3784828.3785406</a></p>
                <h2>What I took away</h2>
                <p><strong>Read the commits, not just the diffs.</strong> Understanding why an API changed is more useful than knowing what it changed to. The <strong>kernel mailing list archives</strong> are your friend. And yes — RISC-V is ready for production workloads.</p>
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
                        <div className="font-bebas text-[clamp(32px,4vw,52px)] tracking-[0.04em] leading-[1.05] mb-4">Porting Lustre to Linux 6.12 with RISC-V Support</div>
                        <div className="text-base leading-[1.9] text-muted max-w-[640px] m-0">The full story of my CDAC internship — what Lustre is, why porting it broke things, what VFS changes actually look like from the inside, and how we ended up with a paper at HPC Asia 2026.</div>
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
