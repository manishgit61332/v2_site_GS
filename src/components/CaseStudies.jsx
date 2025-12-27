import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = ['All', 'Web Experiences', 'Product Commercials', 'Branding', 'Social & Campaigns'];

const PROJECTS = [
    {
        id: 0,
        title: 'Project Alpha',
        category: 'Web Experiences',
        color: '#C27B7F',
        img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
        link: '#',
        problem: 'A Series-A fintech struggled to communicate its mission.',
        move: 'Complete narrative workshop & rebranding.',
        shift: 'Raised $4M, reached 20k waitlist users.'
    },
    {
        id: 1,
        title: 'Nebula AI',
        category: 'Product Commercials',
        color: '#7B8FC2',
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
        link: '#',
        problem: 'Powerful AI tool looked like another generic wrapper.',
        move: 'High-contrast "Dark Mode" viral launch video.',
        shift: '1.2M views on X, 500+ paying users.'
    },
    {
        id: 2,
        title: 'Velvet',
        category: 'Branding',
        color: '#C2A87B',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        link: '#',
        problem: 'Luxury brand felt inaccessible to Gen Z.',
        move: 'TikTok-first content strategy & "Drop" mechanic.',
        shift: 'Sold out 3 consecutive drops in <10 mins.'
    },
    {
        id: 3,
        title: 'Nexus',
        category: 'Web Experiences',
        color: '#7BC29D',
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        link: '#',
        problem: 'Complex dev-tooling was confusing stakeholders.',
        move: 'Simplified 3D interactive visualizations.',
        shift: 'Sales cycle reduced by 40%.'
    },
    {
        id: 4,
        title: 'Pulse',
        category: 'Social & Campaigns',
        color: '#A87BC2',
        img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        link: '#',
        problem: 'Fitness app needed to break through noise.',
        move: 'Influencer-led challenge campaign.',
        shift: '150k app installs in 2 weeks.'
    }
];

const CaseStudies = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeCategory);

    return (
        <section id="work" className="section-padding" style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', paddingBottom: '20vh' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>
                        What We Do.
                    </h2>

                    {/* CATEGORY TABS */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '50px',
                                    border: `1px solid ${activeCategory === cat ? '#D4AF37' : 'rgba(255,255,255,0.2)'}`,
                                    backgroundColor: activeCategory === cat ? '#D4AF37' : 'transparent',
                                    color: activeCategory === cat ? '#000' : '#fff',
                                    transition: 'all 0.3s',
                                    fontSize: '0.9rem',
                                    fontWeight: activeCategory === cat ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <p style={{ opacity: 0.7 }}>Not just pretty pixels. Measurable impact.</p>
                </div>

                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: project.color, letterSpacing: '1px' }}>{project.category}</span>
                                        <h3 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>{project.title}</h3>
                                    </div>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', transition: 'all 0.2s'
                                        }}
                                    >
                                        <ArrowUpRight size={20} />
                                    </a>
                                </div>

                                {/* PROBLEM */}
                                <div>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.3rem', textTransform: 'uppercase' }}>The Problem</p>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.4 }}>{project.problem}</p>
                                </div>

                                {/* MOVE */}
                                <div>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.3rem', textTransform: 'uppercase' }}>The Move</p>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.4 }}>{project.move}</p>
                                </div>

                                {/* SHIFT */}
                                <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: `2px solid ${project.color}` }}>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.3rem', textTransform: 'uppercase' }}>The Shift</p>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{project.shift}</p>
                                </div>

                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default CaseStudies;
