import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import MusicPlayer from './components/MusicPlayer';
import Nav from './components/Nav';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';

function ScrollToHash() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}

function App() {
    return (
        <Router basename="/portfolio_website">
            <ScrollToHash />
            <Loader />
            <Cursor />
            <MusicPlayer />
            <Nav />
            <div id="page-content" className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
