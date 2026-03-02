import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved || 'dark';
    });

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[1000] px-12 py-6 flex items-center justify-between border-b transition-colors duration-300 max-md:px-6 max-md:py-5
      ${scrolled ? 'border-border bg-[rgba(10,10,8,0.88)] backdrop-blur-[12px]' : 'border-transparent bg-transparent'}
    `}>
            <NavLink to="/" className="font-bebas text-[22px] tracking-[0.1em] text-amber no-underline">
                PP
            </NavLink>
            <ul className="flex gap-9 list-none m-0 p-0">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => `
              text-[11px] tracking-[0.25em] uppercase no-underline transition-colors duration-200 relative pb-1
              before:absolute before:bottom-[-4px] before:left-0 before:h-[1px] before:bg-amber before:transition-all before:duration-200
              ${isActive && location.pathname === '/' ? 'text-amber before:w-full' : 'text-muted before:w-0 hover:text-text hover:before:w-full'}
            `}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/projects"
                        className={({ isActive }) => `
              text-[11px] tracking-[0.25em] uppercase no-underline transition-colors duration-200 relative pb-1
              before:absolute before:bottom-[-4px] before:left-0 before:h-[1px] before:bg-amber before:transition-all before:duration-200
              ${isActive ? 'text-amber before:w-full' : 'text-muted before:w-0 hover:text-text hover:before:w-full'}
            `}
                    >
                        Projects
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/blog"
                        className={({ isActive }) => `
              text-[11px] tracking-[0.25em] uppercase no-underline transition-colors duration-200 relative pb-1
              before:absolute before:bottom-[-4px] before:left-0 before:h-[1px] before:bg-amber before:transition-all before:duration-200
              ${isActive ? 'text-amber before:w-full' : 'text-muted before:w-0 hover:text-text hover:before:w-full'}
            `}
                    >
                        Blog
                    </NavLink>
                </li>
                <li>
                    <Link
                        to="/#contact"
                        className={`
              text-[11px] tracking-[0.25em] uppercase no-underline transition-colors duration-200 relative pb-1 text-muted
              before:absolute before:bottom-[-4px] before:left-0 before:h-[1px] before:bg-amber before:transition-all before:duration-200 before:w-0
              hover:text-text hover:before:w-full
            `}
                    >
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
