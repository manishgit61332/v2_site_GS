import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSectionColor } from '../context/ScrollColorContext';

// Import images
import imgManish from '../assets/team/Manish.jpeg';
import imgAmulya from '../assets/team/Amulya.jpeg';
import imgAyushS from '../assets/team/Ayush S.jpeg';
import imgMohit from '../assets/team/Mohit.jpeg';
import imgAayushM from '../assets/team/Aayush Mohan.jpeg';
import imgAyushT from '../assets/team/Ayush T.jpg';
import imgMani from '../assets/team/Mani Kanta.jpeg';
import imgCrea from '../assets/team/Crea.jpeg';

const TEAM = [
    { name: 'Manish', role: 'Head Chef', img: imgManish, quote: "If I can't explain it in one sentence, it's not done." },
    { name: 'Amulya', role: 'Visual Lead', img: imgAmulya, quote: "Ugly converts, but beautiful endures." },
    { name: 'Ayush S', role: 'Acquisition', img: imgAyushS, quote: "Traffic is vanity. Conversion is sanity." },
    { name: 'Mohit', role: 'Operations', img: imgMohit, quote: "Creativity without deadlines is just a dream." },
    { name: 'Aayush M', role: 'Strategy', img: imgAayushM, quote: "Product-Market Fit is a narrative problem." },
    { name: 'Ayush T', role: 'Production', img: imgAyushT, quote: "We fix it in pre-production, not post." },
    { name: 'Manikanta', role: 'Editor & Storywriter', img: imgMani, quote: "Every cut must advance the story." },
    // { name: 'Crea', role: 'Operations Robot', img: imgCrea, quote: "Optimizing for maximum throughput." }, // Commented out based on intent or keep if needed.
    // Keeping all 8 as per original code for now.
    { name: 'Crea', role: 'Operations Robot', img: imgCrea, quote: "Optimizing for maximum throughput." },
];

// Reusing hook logic (ideally would be in a hooks/utils file, but for single file self-containment):
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

const TeamKitchen = () => {
    const setGlobalTheme = useSectionColor();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <motion.section
            onViewportEnter={() => setGlobalTheme('#050505', '#FFFFFF', 1.5)}
            viewport={{ margin: "-10% 0px -10% 0px" }}
            style={{
                color: '#fff',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '8rem 4vw',
                position: 'relative',
            }}
        >
            {/* Section Header */}
            <div style={{ maxWidth: '1400px', margin: '0 auto 6rem auto', width: '100%' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 500,
                        lineHeight: 1.2,
                        margin: 0,
                        marginBottom: '1rem'
                    }}
                >
                    The Kitchen.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        maxWidth: '500px',
                        letterSpacing: '1px'
                    }}
                >
                    Meet the team building your brand
                </motion.p>
            </div>

            {/* Team Grid */}
            <div
                style={{
                    display: 'grid',
                    // Mobile: 1 col, Tablet: 2 col, Desktop: 4 col
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                {TEAM.map((member, index) => (
                    <TeamCard key={index} member={member} index={index} isMobile={isMobile} />
                ))}
            </div>
        </motion.section>
    );
};

const TeamCard = ({ member, index, isMobile }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    // Magnetic effect - track mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for magnetic effect
    const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    // Transform mouse position to rotation
    const rotateX = useTransform(smoothMouseY, [-100, 100], [5, -5]);
    const rotateY = useTransform(smoothMouseX, [-100, 100], [-5, 5]);

    const handleMouseMove = (e) => {
        if (isMobile || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    // Toggle on touch for mobile
    const toggleHover = () => {
        if (isMobile) {
            setIsHovered(!isHovered);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={toggleHover} // Enable tap on mobile
            style={{
                position: 'relative',
                perspective: '1000px',
            }}
        >
            <motion.div
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    transformStyle: 'preserve-3d',
                }}
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                whileTap={isMobile ? { scale: 0.98 } : {}}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    style={{
                        position: 'relative',
                        height: 'clamp(450px, 60vh, 550px)', // Responsive height
                        borderRadius: '20px',
                        overflow: 'hidden',
                        backgroundColor: '#111',
                        border: isHovered ? '1px solid var(--color-orange)' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: isHovered ? '0 20px 60px rgba(255, 107, 0, 0.3)' : '0 10px 30px rgba(0,0,0,0.3)',
                        transition: 'border 0.4s ease, box-shadow 0.4s ease',
                        cursor: 'pointer',
                    }}
                >
                    {/* Background Image */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url('${member.img}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        initial={{ filter: 'grayscale(100%)' }}
                        animate={{
                            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Gradient Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                        }}
                    />

                    {/* Content */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '2.5rem',
                            zIndex: 2,
                        }}
                    >
                        {/* Ticket Number */}
                        <motion.div
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: isHovered ? 1 : 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.75rem',
                                    marginBottom: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    color: isHovered ? 'var(--color-orange)' : '#999',
                                    transition: 'color 0.3s ease',
                                }}
                            >
                                STATION #{String(index + 1).padStart(2, '0')}
                            </p>
                        </motion.div>

                        {/* Name */}
                        <motion.h3
                            style={{
                                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                margin: 0,
                                lineHeight: 0.9,
                                fontFamily: 'var(--font-heading)',
                                marginBottom: '0.5rem',
                            }}
                            animate={{
                                color: isHovered ? 'var(--color-orange)' : '#fff',
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {member.name}
                        </motion.h3>

                        {/* Role */}
                        <p
                            style={{
                                fontSize: '1rem',
                                opacity: 0.7,
                                fontFamily: 'var(--font-body)',
                                marginBottom: '1.5rem',
                            }}
                        >
                            {member.role}
                        </p>

                        {/* Quote - Smooth reveal */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: isHovered ? 'auto' : 0,
                                opacity: isHovered ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            style={{
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    paddingTop: '1rem',
                                    borderTop: '1px solid rgba(255, 107, 0, 0.3)',
                                }}
                            >
                                <p
                                    style={{
                                        fontStyle: 'italic',
                                        fontSize: '1.1rem',
                                        color: 'rgba(255,255,255,0.9)',
                                        lineHeight: 1.6,
                                        fontFamily: 'var(--font-body)',
                                    }}
                                >
                                    "{member.quote}"
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'absolute',
                            inset: -1,
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(255,107,0,0.1), transparent)',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TeamKitchen;
