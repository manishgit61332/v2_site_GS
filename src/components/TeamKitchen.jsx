import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import team1 from '../assets/team_cutout_1.png';
import team2 from '../assets/team_cutout_2.png';
import team3 from '../assets/team_cutout_3.png';
import team4 from '../assets/team_cutout_4.png';

// Using placeholders for the rest or reusing to keep it simple as requested
const TEAM_MEMBERS = [
    { name: 'Manish', role: 'Head Chef', title: 'Founder & Creative Director', chat: "Trends fade. I care if it holds up in 2 years.", img: team1 },
    { name: 'Amulya', role: 'Design Head', title: 'Structure & Restraint', chat: "If it looks clever but confuses people, it’s bad design.", img: team2 },
    { name: 'Ayush Singh', role: 'Client Acquisition', title: 'Realism & Clarity', chat: "If a client can’t explain why they’re buying, we pause the project.", img: team3 },
    { name: 'Mohit Silla', role: 'Business & PR', title: 'Relationship Builder', chat: "Reputation compounds faster than ads. We protect it.", img: team4 },
    { name: 'Aayush Mohan', role: 'Creative Strategist', title: 'Systems Thinker', chat: "Every piece of content is either noise or signal.", img: team1 },
    { name: 'Ayush Tripathi', role: 'Video & Storytelling', title: 'Emotion with Discipline', chat: "A good cut isn’t flashy. It just feels inevitable.", img: team4 },
    { name: 'CREA', role: 'Operations (Robot)', title: 'Silent Efficiency', chat: "Tasks executed. No opinions formed.", img: team3 },
];

const TeamKitchen = () => {
    const [activeMember, setActiveMember] = useState(null);

    return (
        <section className="section-padding" style={{ backgroundColor: '#050505', color: '#fff' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                        Meet the Kitchen.
                    </h2>
                    <p style={{ opacity: 0.7 }}>No freelancers. No bloat. Just the chefs.</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {TEAM_MEMBERS.map((member, index) => (
                        <div key={index} style={{ position: 'relative', marginBottom: '2rem' }}>
                            <motion.div
                                onClick={() => setActiveMember(activeMember === index ? null : index)}
                                style={{
                                    padding: '1.5rem',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: activeMember === index ? 'rgba(255,255,255,0.03)' : 'transparent',
                                    transition: 'background-color 0.3s'
                                }}
                                whileHover={{ paddingLeft: '2rem' }}
                            >
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {/* Avatar Cutout (Visible on active or hover via CSS if needed, but here simple) */}
                                    <AnimatePresence>
                                        {activeMember === index && (
                                            <motion.img
                                                src={member.img}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #D4AF37' }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{member.name}</h3>
                                        <span style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</span>
                                    </div>
                                </div>
                                <div style={{ opacity: 0.6, fontStyle: 'italic', fontSize: '0.9rem' }}>{member.title}</div>
                            </motion.div>

                            {/* Thinking/Chat Line Reveal */}
                            <AnimatePresence>
                                {activeMember === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '1rem 2rem', color: '#D4AF37', fontStyle: 'italic', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '1.5rem', lineHeight: 0 }}>“</span>
                                            {member.chat}
                                            <span style={{ fontSize: '1.5rem', lineHeight: 0 }}>”</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamKitchen;
