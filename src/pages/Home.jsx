import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';

import Belief from '../components/Belief';
import Philosophy from '../components/Philosophy';
import Pricing from '../components/Pricing';
import TeamKitchen from '../components/TeamKitchen';
import SystemFramework from '../components/SystemFramework';
import ThaliBuilder from '../components/ThaliBuilder';
import CaseStudies from '../components/CaseStudies';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import HallOfFame from '../components/HallOfFame';

import Preloader from '../components/Preloader';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence>
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            <Navbar />
            <Hero />

            <SystemFramework /> {/* Moved up: Process before Work */}
            <CaseStudies />
            <Belief />
            <Philosophy />
            {/* Narrative Flow: Ethos -> Methodology -> Credibility (Team/Social) -> Proof (Cases) -> Action (Thali) -> Pricing */}
            <TeamKitchen />
            <HallOfFame />

            <ThaliBuilder />
            <Pricing />
            <Footer />
        </>
    );
};

export default Home;
