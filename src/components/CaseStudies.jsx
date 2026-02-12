import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ArrowRight } from 'lucide-react';
import { useSectionColor } from '../context/ScrollColorContext';
import { WORK_FOLDERS } from '../data/workData';

// Helper: Linear Interpolation for Hex Colors
const lerpColor = (a, b, amount) => {
    const ah = parseInt(a.replace(/#/g, ''), 16),
        bh = parseInt(b.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

// Hook for media query
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);
    return matches;
};

const CaseStudies = () => {
    const containerRef = useRef(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const setGlobalTheme = useSectionColor();
    const isVisible = useRef(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Softer, heavier spring for "very sticky" ease-in-ease-out feel
    const springScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

    // Horizontal Scroll Transformation
    const x = useTransform(springScroll, [0, 1], ["0%", "-85%"]);

    // BACKGROUND COLOR LOGIC
    useMotionValueEvent(springScroll, "change", (latest) => {
        if (!isVisible.current || latest > 0.99 || selectedFolder) {
            return;
        }

        const totalSteps = WORK_FOLDERS.length;
        const stepSize = 1 / totalSteps;

        let activeIndex = Math.floor(latest / stepSize);
        if (activeIndex >= totalSteps) activeIndex = totalSteps - 1;

        const stepStart = activeIndex * stepSize;
        const linearProgress = (latest - stepStart) / stepSize;
        const localProgress = linearProgress;

        const currentColor = WORK_FOLDERS[activeIndex].bg;
        const nextColor = (activeIndex < totalSteps - 1) ? WORK_FOLDERS[activeIndex + 1].bg : currentColor;

        const blendedBgColor = lerpColor(currentColor, nextColor, localProgress);

        setGlobalTheme(blendedBgColor, '#FFFFFF', 0);
    });

    // Reset theme when closing
    useEffect(() => {
        if (!selectedFolder) {
            // Re-trigger scroll logic or default to start color
            setGlobalTheme(WORK_FOLDERS[0].bg, '#FFFFFF', 0);
        }
    }, [selectedFolder, setGlobalTheme]);


    return (
        <motion.section
            onViewportEnter={() => isVisible.current = true}
            onViewportLeave={() => isVisible.current = false}
            ref={containerRef}
            id="work"
            style={{
                height: isMobile ? 'auto' : '500vh',
                position: 'relative',
                marginBottom: isMobile ? '4rem' : 0
            }}
        >
            <div style={{
                position: isMobile ? 'relative' : 'sticky',
                top: 0,
                height: isMobile ? 'auto' : '100vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                perspective: '1000px',
                paddingTop: isMobile ? '4rem' : 0
            }}>

                <h2 style={{
                    position: isMobile ? 'relative' : 'absolute',
                    top: isMobile ? 'auto' : '8vh',
                    left: isMobile ? 'auto' : '5vw',
                    marginBottom: isMobile ? '2rem' : 0,
                    paddingLeft: isMobile ? '5vw' : 0,
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1,
                    color: '#fff',
                    zIndex: 10,
                    mixBlendMode: 'difference'
                }}>
                    Selected Work.
                </h2>

                <motion.div style={{
                    x: isMobile ? 0 : x,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '2rem' : '4vw',
                    paddingLeft: '5vw',
                    paddingRight: isMobile ? '5vw' : '60vw',
                    alignItems: isMobile ? 'stretch' : 'center',
                    height: isMobile ? 'auto' : '100%',
                    willChange: isMobile ? 'auto' : 'transform'
                }}>
                    {WORK_FOLDERS.map((folder, index) => (
                        <ServiceCard
                            key={folder.id}
                            folder={folder}
                            onClick={() => setSelectedFolder(folder)}
                            globalProgress={springScroll}
                            isMobile={isMobile}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* Mobile Scroll Hint - Only show on Desktop */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        style={{ position: 'absolute', bottom: '3rem', right: '5vw', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Scroll <ArrowUpRight size={16} style={{ transform: 'rotate(45deg)' }} />
                    </motion.div>
                )}

            </div>

            {/* FOLDER OVERLAY */}
            <AnimatePresence>
                {selectedFolder && (
                    <FolderDetailView
                        folder={selectedFolder}
                        onClose={() => setSelectedFolder(null)}
                    />
                )}
            </AnimatePresence>
        </motion.section>
    );
};

const ServiceCard = ({ folder, onClick, globalProgress, isMobile, index }) => {
    // Parallax Logic
    const parallaxX = useTransform(globalProgress, [0, 1], ["-10%", "10%"]);

    const variants = {
        initial: { scale: 1.25, filter: 'brightness(0.6) saturate(0.8)' },
        hover: { scale: 1.35, filter: 'brightness(0.8) saturate(1.1)' }
    };

    return (
        <motion.div
            onClick={onClick}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            style={{
                width: isMobile ? '100%' : '80vw',
                maxWidth: '600px',
                height: isMobile ? '50vh' : '70vh',
                maxHeight: '600px',
                flexShrink: 0,
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                backgroundColor: 'rgba(20,20,20,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
        >
            {/* Image Background */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: '-10%',
                        backgroundImage: `url(${folder.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        x: isMobile ? 0 : parallaxX,
                        willChange: 'transform'
                    }}
                    variants={variants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
            </div>

            {/* Gradient Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%)', pointerEvents: 'none' }} />

            {/* Content */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: isMobile ? '1.5rem' : '3rem', boxSizing: 'border-box', pointerEvents: 'none' }}>
                <span style={{
                    display: 'inline-block',
                    marginBottom: '1rem',
                    color: folder.color,
                    border: `1px solid ${folder.color}`,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    0{index + 1}
                </span>

                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: isMobile ? '2rem' : '3rem',
                    color: '#fff',
                    margin: '0 0 0.5rem 0',
                    lineHeight: 1
                }}>
                    {folder.subtitle}
                </h3>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    color: 'rgba(255,255,255,0.7)',
                    maxWidth: '80%',
                    marginBottom: '2rem'
                }}>
                    {folder.title}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>
                    Open Folder <ArrowRight size={18} />
                </div>
            </div>
        </motion.div>
    );
};

const FolderDetailView = ({ folder, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.lenis?.stop();
        return () => {
            document.body.style.overflow = 'unset';
            window.lenis?.start();
        };
    }, []);

    return (
        <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                backgroundColor: '#050505',
                overflowY: 'auto'
            }}
        >
            {/* Header / Nav */}
            <div style={{
                padding: '2rem 5%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                background: 'rgba(5,5,5,0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 10,
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div>
                    <div style={{ fontSize: '0.9rem', color: folder.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Folder</div>
                    <h2 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>{folder.title}</h2>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#fff',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content Container */}
            <div className="container" style={{ padding: '4rem 0' }}>

                {/* Intro */}
                <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '2rem', color: '#fff', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
                        {folder.details}
                    </h3>
                </div>

                {/* Projects Grid */}
                <h4 style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem', fontSize: '0.9rem' }}>Inside this folder</h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '6rem'
                }}>
                    {folder.projects.map((project, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                            <div style={{
                                height: '250px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                marginBottom: '1rem',
                                backgroundColor: '#222'
                            }}>
                                {project.video ? (
                                    <video
                                        src={project.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </div>
                            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.2rem' }}>{project.title}</h4>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{project.type}</p>
                            {project.pdf && (
                                <a
                                    href={project.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.8rem',
                                        color: folder.color,
                                        textDecoration: 'none',
                                        border: `1px solid ${folder.color}`,
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '50px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = folder.color;
                                        e.currentTarget.style.color = '#000';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = folder.color;
                                    }}
                                >
                                    View Case Study <ArrowUpRight size={14} />
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '24px',
                    padding: '3rem',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <h4 style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem', fontSize: '0.9rem' }}>Client Feedback</h4>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {folder.testimonials.map((t, i) => (
                            <div key={i}>
                                <p style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1.4, marginBottom: '1rem' }}>
                                    "{t.quote}"
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ color: '#fff', fontWeight: 600 }}>{t.author}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>— {t.role}</span>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default CaseStudies;
