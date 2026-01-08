import React from 'react';
import { motion } from 'framer-motion';
import { useScrollColor } from '../context/ScrollColorContext';

const GlobalAtmosphere = () => {
    const { currentColor, transitionDuration } = useScrollColor();

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                // backgroundColor: '#050507' // REMOVED: Now driven by animate prop below directly
            }}
            animate={{ backgroundColor: currentColor }}
            transition={{
                backgroundColor: { duration: transitionDuration, ease: "linear" },
                delay: 0
            }}
        >
            {/* 1. Mesh Gradients - Reactive Blobs with ULTRA SMOOTH TRANSITIONS */}

            {/* Blob 1: Top Left - The "Main Light" */}
            <motion.div
                animate={{
                    backgroundColor: currentColor,
                    opacity: [0.15, 0.25, 0.15],
                    scale: [1, 1.2, 1],
                    rotate: [0, 20, 0]
                }}
                transition={{
                    backgroundColor: { duration: transitionDuration, ease: "linear" },
                    default: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '70vw',
                    height: '70vw',
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                    willChange: 'transform' // Performance optimization
                }}
            />

            {/* Blob 2: Bottom Right - The "Ambient Echo" */}
            <motion.div
                animate={{
                    backgroundColor: currentColor,
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    backgroundColor: { duration: transitionDuration, ease: "linear" },
                    default: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-20%',
                    width: '80vw',
                    height: '80vw',
                    filter: 'blur(120px)',
                    borderRadius: '50%',
                    willChange: 'transform' // Performance optimization
                }}
            />

            {/* Blob 3: Floating Mid - The "Highlight" */}
            <motion.div
                animate={{
                    x: [-100, 100, -100],
                    y: [-50, 50, -50],
                    backgroundColor: currentColor
                }}
                transition={{
                    backgroundColor: { duration: transitionDuration, ease: "linear" },
                    default: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '20%',
                    width: '40vw',
                    height: '40vw',
                    opacity: 0.15,
                    filter: 'blur(80px)',
                    borderRadius: '50%',
                    willChange: 'transform', // Performance optimization
                    mixBlendMode: 'screen'
                }}
            />

            {/* 2. Grain Texture Overlay - Static */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                opacity: 0.15, // Increased for better banding prevention (dithering)
                mixBlendMode: 'overlay',
                pointerEvents: 'none'
            }} />

            {/* 3. Vignette / Monitor Glow - Static */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 0%, #000000 100%)',
                opacity: 0.5,
                pointerEvents: 'none'
            }} />

        </motion.div>
    );
};

export default GlobalAtmosphere;
