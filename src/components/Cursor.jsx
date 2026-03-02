import { useEffect, useState } from 'react';

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let rx = 0, ry = 0;
        let mx = 0, my = 0;

        let rafId;

        const onMouseMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            setPosition({ x: mx, y: my });
        };

        const animateRing = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            setRingPosition({ x: rx, y: ry });
            rafId = requestAnimationFrame(animateRing);
        };

        document.addEventListener('mousemove', onMouseMove);
        rafId = requestAnimationFrame(animateRing);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            <div
                className="fixed top-0 left-0 w-3 h-3 bg-amber z-[9999] pointer-events-none mix-blend-difference"
                style={{ transform: `translate(${position.x - 6}px, ${position.y - 6}px)` }}
            />
            <div
                className="fixed top-0 left-0 w-9 h-9 border border-amber rounded-full z-[9998] pointer-events-none opacity-50"
                style={{ transform: `translate(${ringPosition.x - 18}px, ${ringPosition.y - 18}px)` }}
            />
        </>
    );
}
