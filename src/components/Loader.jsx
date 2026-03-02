import { useEffect, useState } from 'react';

export default function Loader() {
    const [pct, setPct] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [hidden, setHidden] = useState(true);

    const msgs = [
        'initializing kernel...',
        'loading modules...',
        'mounting filesystems...',
        'starting userspace...',
        'ready.'
    ];

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('hasLoaded');
        if (hasLoaded) {
            setHidden(true);
            return;
        }

        setHidden(false);
        let currentPct = 0;
        const interval = setInterval(() => {
            currentPct += Math.random() * 10 + 3;
            if (currentPct >= 100) {
                currentPct = 100;
                clearInterval(interval);
                setMsgIdx(msgs.length - 1);
                sessionStorage.setItem('hasLoaded', 'true');
                setTimeout(() => setHidden(true), 500);
            }
            setPct(currentPct);
            const newIdx = Math.min(Math.floor(currentPct / 25), msgs.length - 1);
            if (newIdx !== msgIdx && currentPct < 100) {
                setMsgIdx(newIdx);
            }
        }, 75);

        return () => clearInterval(interval);
    }, []);

    if (hidden) return null;

    const circumference = 2 * Math.PI * 65;
    const strokeDashoffset = circumference - (pct / 100) * circumference;

    return (
        <div className={`fixed inset-0 bg-bg z-[10000] flex flex-col items-center justify-center gap-7 transition-all duration-700 ${pct >= 100 ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}>
            <div className="relative w-[140px] h-[140px]">
                <svg className="w-[140px] h-[140px] -rotate-90" viewBox="0 0 140 140">
                    <circle
                        className="fill-none stroke-border stroke-[3px]"
                        cx="70" cy="70" r="65"
                    />
                    <circle
                        className="fill-none stroke-amber stroke-[3px] transition-all duration-75 ease-linear drop-shadow-[0_0_8px_var(--amber)]"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        cx="70" cy="70" r="65"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2px]">
                    <span className="font-bebas text-[42px] text-amber leading-none tracking-wider">
                        {Math.floor(pct)}
                    </span>
                    <span className="text-[9px] tracking-[0.3em] text-muted uppercase">
                        boot
                    </span>
                </div>
            </div>
            <div className="text-[10px] tracking-[0.4em] text-muted uppercase">
                {msgs[msgIdx]}
            </div>
        </div>
    );
}
