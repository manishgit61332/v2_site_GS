import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useSectionColor } from '../context/ScrollColorContext';
import logo from '../assets/logo-transparent.png';

// "Dopamine" Text Reveal Component
const CinematicReveal = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(15px)', scale: 1.05, y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
            transition={{
                duration: 1.2,
                delay: delay,
                ease: [0.16, 1, 0.3, 1] // "Apple" Ease
            }}
        >
            {children}
        </motion.div>
    );
};

const Hero = () => {
    const setGlobalTheme = useSectionColor();

    // Parallax logic
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <motion.section
            onViewportEnter={() => setGlobalTheme('#050507', '#FFFFFF', 1.5)}
            viewport={{ margin: "-10% 0px -10% 0px" }} // Trigger slightly inwards
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '8rem 2rem 4rem 2rem',
                position: 'relative',
                zIndex: 1,
            }}>

            {/* Hero-specific Ambient Light (The "Nice Effect") */}
            <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255, 119, 1, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: -1
                }}
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

                {/* 1. Eyebrow - Cinematic Reveal */}
                <CinematicReveal delay={0.2}>
                    <div style={{
                        marginBottom: '1.5rem',
                        fontSize: '0.8rem',
                        letterSpacing: '0.04em', // +4%
                        textTransform: 'uppercase',
                        color: 'var(--color-light-gray)',
                        opacity: 0.7,
                        fontWeight: 500,
                        fontFamily: 'var(--font-body)'
                    }}>
                        Trusted by 15+ founders across SaaS, tech, and venture
                    </div>
                </CinematicReveal>

                {/* 2. Headline - Cinematic Reveal */}
                <CinematicReveal delay={0.4}>
                    <h1 style={{
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        lineHeight: 1.15,
                        color: '#fff',
                        maxWidth: '960px',
                        fontWeight: 400
                    }}>
                        We turn complex products into stories people actually <span style={{ color: 'var(--color-orange)', textShadow: '0 0 20px rgba(255, 119, 1, 0.3)' }}>understand and repeat.</span>
                    </h1>
                </CinematicReveal>

                {/* 3. Subheadline - Cinematic Reveal */}
                <CinematicReveal delay={0.6}>
                    <p style={{
                        marginBottom: '3.5rem',
                        fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                        lineHeight: 1.5,
                        color: '#e0e0e0', // ~85% white
                        maxWidth: '640px',
                        fontFamily: 'var(--font-body)'
                    }}>
                        Marketing is <span className="highlight-orange" style={{ color: '#fff', fontWeight: 600 }}>applied psychology</span>. We work with founders to shape narrative, content, and distribution that triggers a response.
                    </p>
                </CinematicReveal>

                {/* 4. Supporting Blocks - Cinematic Reveal */}
                <CinematicReveal delay={0.8}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive 3-col
                        gap: '2.5rem',
                        marginBottom: '3.5rem',
                        maxWidth: '900px',
                        textAlign: 'left'
                    }}>
                        {/* Block 1 */}
                        <div>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>The problem</h4>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#aaa' }}>
                                Most good products die quietly because they are hard to explain and easy to ignore.
                            </p>
                        </div>

                        {/* Block 2 */}
                        <div>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>Our approach</h4>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#aaa' }}>
                                We extract the core idea and design a story that travels across content, teams, and channels.
                            </p>
                        </div>

                        {/* Block 3 */}
                        <div>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>Why it works</h4>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#aaa' }}>
                                We do not stop at making assets. We design how the story spreads.
                            </p>
                        </div>
                    </div>
                </CinematicReveal>

                {/* 5. CTA - Cinematic Reveal */}
                <CinematicReveal delay={1.0}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
                            fontSize: '1rem',
                            color: '#fff',
                            borderBottom: '1px solid #fff',
                            paddingBottom: '2px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-body)'
                        }}>
                            See how this looks in practice ↓
                        </a>

                        <a href="https://calendly.com/manish-gensync/30min" target="_blank" rel="noopener noreferrer" style={{
                            fontSize: '1rem',
                            color: '#777',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-body)'
                        }}>
                            Talk when you are serious
                        </a>
                    </div>
                </CinematicReveal>

            </div>
        </motion.section>
    );
};

export default Hero;

