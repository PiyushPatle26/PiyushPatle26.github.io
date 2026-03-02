import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
    const [musicOn, setMusicOn] = useState(() => localStorage.getItem('musicOn') !== 'false');
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
        audio.currentTime = savedTime;

        const interval = setInterval(() => {
            if (!audio.paused) {
                localStorage.setItem('musicTime', audio.currentTime.toString());
            }
        }, 1000);

        const handleBeforeUnload = () => {
            localStorage.setItem('musicTime', audio.currentTime.toString());
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Attempt autoplay after a bit (to let loader finish)
        const timeout = setTimeout(() => {
            if (musicOn) {
                audio.play().catch(() => {
                    setMusicOn(false);
                    localStorage.setItem('musicOn', 'false');
                });
            }
        }, 1800);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const newState = !musicOn;
        setMusicOn(newState);
        localStorage.setItem('musicOn', newState.toString());

        if (newState) {
            audio.play().catch(() => {
                setMusicOn(false);
                localStorage.setItem('musicOn', 'false');
            });
        } else {
            localStorage.setItem('musicTime', audio.currentTime.toString());
            audio.pause();
        }
    };

    return (
        <>
            <audio ref={audioRef} loop preload="auto">
                <source src="/music.mp3" type="audio/mpeg" />
            </audio>
            <button
                onClick={toggleMusic}
                className={`fixed bottom-7 right-12 z-[2000] text-[9px] tracking-[0.3em] uppercase bg-transparent border px-3.5 py-2 transition-all duration-200 cursor-none
          ${musicOn ? 'text-amber border-amber' : 'text-muted border-border hover:text-amber hover:border-amber'}
          max-md:right-6 max-md:bottom-5
        `}
            >
                {musicOn ? '[ music: on ]' : '[ click to play ]'}
            </button>
        </>
    );
}
