import React from 'react';
import { motion } from 'framer-motion';
import { useSectionColor } from '../context/ScrollColorContext';

const WereEarly = () => {
    const setGlobalTheme = useSectionColor();

    return (
        <motion.section
            onViewportEnter={() => setGlobalTheme('#000000', '#FFFFFF', 1.5)}
            viewport={{ margin: "-10% 0px -10% 0px" }}
            className="section-padding"
            style={{
                backgroundColor: 'transparent',
                color: '#fff',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 0.9,
                        marginBottom: '2rem'
                    }}>
                        We're <span style={{ color: 'var(--color-orange)' }}>Early.</span>
                    </h2>

                    <p style={{
                        fontSize: '1.25rem',
                        maxWidth: '600px',
                        margin: '0 auto',
                        opacity: 0.8,
                        lineHeight: 1.6
                    }}>
                        Most people are waiting for the playbook. We are writing it.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default WereEarly;
