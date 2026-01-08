import React from 'react';
import { motion } from 'framer-motion';

const StepCard = ({ number, title, subtitle, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        style={{
            position: 'relative',
            padding: '2rem',
            background: 'rgba(255,255,255,0.02)',
            borderLeft: '1px solid var(--color-orange)',
            marginBottom: '2rem',
            marginLeft: '1rem' // For the connecting line effect
        }}
    >
        <div style={{
            position: 'absolute',
            left: '-1rem',
            top: '0',
            bottom: '0',
            width: '1px',
            background: 'linear-gradient(to bottom, var(--color-orange), transparent)',
            opacity: 0.3
        }} />

        <span style={{
            fontSize: '4rem',
            fontWeight: 400,
            opacity: 0.1,
            position: 'absolute',
            right: '1rem',
            top: '0',
            fontFamily: 'var(--font-heading)',
            color: '#fff'
        }}>
            {number}
        </span>

        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '0.5rem' }}>
            {title}
        </h3>
        <p style={{ color: 'var(--color-orange)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
            {subtitle}
        </p>
        <p style={{ color: 'var(--color-light-gray)', lineHeight: 1.6 }}>
            {description}
        </p>
    </motion.div>
);

import { useSectionColor } from '../context/ScrollColorContext';

const SystemFramework = () => {
    const setGlobalTheme = useSectionColor();
    const steps = [
        {
            number: "01",
            title: "Discover",
            subtitle: "Extracting the Truth",
            description: "We audit your entire product and market. We find the one 'obvious' truth your competitors are ignoring."
        },
        {
            number: "02",
            title: "Narrate",
            subtitle: "Weaponized Storytelling",
            description: "We turn that truth into a narrative framework. Not 'marketing copy', but a worldview that forces a reaction."
        },
        {
            number: "03",
            title: "Produce",
            subtitle: "High-Fidelity Creation",
            description: "Video, text, visual design. We build the assets that prove your narrative is real, using top-tier talent only."
        },
        {
            number: "04",
            title: "Distribute",
            subtitle: "Engineered Reach",
            description: "We don't hope for views. We target specific channels and communities to ensure your story lands in the right laps."
        },
        {
            number: "05",
            title: "Optimize",
            subtitle: "Feedback Loops",
            description: "We watch the data. If it sparks a cult, we fuel it. If it doesn't, we tweak the angle until it does."
        }
    ];

    return (
        <motion.section
            onViewportEnter={() => setGlobalTheme('#050507', '#FFFFFF', 1.5)} // Return to void
            viewport={{ margin: "-10% 0px -10% 0px" }}
            id="protocol"
            className="container"
            style={{ padding: '6rem 5%', maxWidth: '1000px', margin: '0 auto' }}
        >
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                    The <span style={{ color: 'var(--color-orange)' }}>Gensync Protocol</span>
                </h2>
                <p style={{ color: 'var(--color-light-gray)', maxWidth: '600px', margin: '0 auto' }}>
                    We don't sell random services. We sell a system that builds authority.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {steps.map((step, index) => (
                    <StepCard key={index} {...step} delay={index * 0.1} />
                ))}
            </div>
        </motion.section>
    );
};

export default SystemFramework;
