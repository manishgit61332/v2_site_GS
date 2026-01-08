import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSectionColor } from '../context/ScrollColorContext';

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

const SERVICES = [
    {
        id: 0,
        title: 'Web Experiences.',
        description: 'Immersive sites that convert.',
        bg: '#051408', // Deep Mint Void
        img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
        slug: 'web-experiences',
        color: '#E3FFEB'
    },
    {
        id: 1,
        title: 'Product Commercials.',
        description: 'High-octane visuals.',
        bg: '#1f0b00', // Deep Orange Void
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
        slug: 'product-commercials',
        color: '#FF7701'
    },
    {
        id: 2,
        title: 'Branding.',
        description: 'Identity systems that stick.',
        bg: '#1a0507', // Deep Maroon Void
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        slug: 'branding',
        color: '#FF9F9F'
    },
    {
        id: 3,
        title: 'Social & Campaigns.',
        description: 'Content that spreads.',
        bg: '#140505', // Deep Red Void
        img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        slug: 'social-campaigns',
        color: '#C27B7F'
    }
];

const CaseStudies = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const setGlobalTheme = useSectionColor();
    const isVisible = useRef(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Horizontal Scroll Transformation
    const x = useTransform(springScroll, [0, 1], ["0%", "-75%"]);

    // BACKGROUND COLOR LOGIC
    useMotionValueEvent(springScroll, "change", (latest) => {
        if (!isVisible.current || latest > 0.99) { // Simple guard
            return;
        }

        const totalSteps = SERVICES.length;
        const stepSize = 1 / totalSteps;

        let activeIndex = Math.floor(latest / stepSize);
        if (activeIndex >= totalSteps) activeIndex = totalSteps - 1;

        const stepStart = activeIndex * stepSize;
        const linearProgress = (latest - stepStart) / stepSize;

        // Use simple linear interpolation to be safe (OG behavior)
        const localProgress = linearProgress;

        const currentColor = SERVICES[activeIndex].bg;
        const nextColor = (activeIndex < totalSteps - 1) ? SERVICES[activeIndex + 1].bg : currentColor;

        const blendedBgColor = lerpColor(currentColor, nextColor, localProgress);

        setGlobalTheme(blendedBgColor, '#FFFFFF', 0);
    });

    return (
        <motion.section
            onViewportEnter={() => isVisible.current = true}
            onViewportLeave={() => isVisible.current = false}
            ref={containerRef}
            id="work"
            style={{ height: '400vh', position: 'relative' }}
        >
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <h2 style={{
                    position: 'absolute',
                    top: '5vh',
                    left: '5vw',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1,
                    color: '#fff',
                    zIndex: 10
                }}>
                    Selected Work.
                </h2>

                <motion.div style={{ x, display: 'flex', gap: '4vw', paddingLeft: '5vw', paddingRight: '10vw', alignItems: 'center', height: '100%', willChange: 'transform' }}>
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={service.id} service={service} navigate={navigate} />
                    ))}
                </motion.div>

                {/* Mobile Scroll Hint / Design Element */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Scroll to Explore
                </div>

            </div>

            {/* Mobile Fallback (CSS) */}
            <style>{`
                @media(max-width: 768px) {
                    /* On mobile, we might want to disable the sticky scroll and just show a vertical list? 
                       For now, keeping the horizontal scroll as it is often preferred even on mobile for portfolios 
                       BUT 'sticky' requires height. If we want simple vertical on mobile:
                    */
                }
            `}</style>
        </motion.section>
    );
};

const ServiceCard = ({ service, navigate }) => {
    return (
        <motion.div
            onClick={() => navigate(`/service/${service.slug}`)}
            className="group"
            whileHover={{ scale: 0.98 }}
            style={{
                width: '80vw',      // Big wide cards
                maxWidth: '600px',
                height: '70vh',
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
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${service.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6) saturate(0.8)',
                transition: 'filter 0.5s ease, transform 0.7s ease'
            }} className="card-bg" />

            {/* Gradient Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%)' }} />

            {/* Content */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '3rem', boxSizing: 'border-box' }}>
                <span style={{
                    display: 'inline-block',
                    marginBottom: '1rem',
                    color: service.color,
                    border: `1px solid ${service.color}`,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    0{service.id + 1}
                </span>

                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '3rem',
                    color: '#fff',
                    margin: '0 0 0.5rem 0',
                    lineHeight: 1
                }}>
                    {service.title}
                </h3>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.7)',
                    maxWidth: '80%',
                    marginBottom: '2rem'
                }}>
                    {service.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>
                    View Case Study <ArrowUpRight size={18} />
                </div>
            </div>

            <style>{`
                .group:hover .card-bg {
                    filter: brightness(0.8) saturate(1.1) !important;
                    transform: scale(1.05) !important;
                }
            `}</style>
        </motion.div>
    );
};

export default CaseStudies;

