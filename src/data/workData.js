

import AmesPdf from '../assets/Portfolio/website/AMES/AMES.pdf';
import AmesThumb from '../assets/Portfolio/website/AMES/thumbnail.png';
import ConnectMePdf from '../assets/Portfolio/website/CME/connectme_style_guide.pdf';
import CmeThumb from '../assets/Portfolio/website/CME/cme_thumbnail.png';
import PlayaPdf from '../assets/Portfolio/website/Playa/playa_case_study.pdf';
import PlayaThumb from '../assets/Portfolio/website/Playa/playa_thumbnail.png';

// Branding Assets
import IfsPdf from '../assets/Portfolio/Branding and Identity/IFS Brand Identity.pdf';
import IfsThumb from '../assets/Portfolio/Branding and Identity/IFS Thumbnail.png';
import ProjectXPdf from '../assets/Portfolio/Branding and Identity/ProjeectX/ProjectXB.pdf';

export const WORK_FOLDERS = [
    {
        id: 'web-experiences',
        title: 'Websites',
        description: 'Immersive sites that convert.',
        subtitle: 'High-Performance Sites',
        bg: '#051408',
        img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
        color: '#E3FFEB',
        projects: [
            {
                title: 'ConnectME',
                type: 'Web Platform & Identity',
                pdf: ConnectMePdf,
                img: CmeThumb
            },
            {
                title: 'AMES',
                type: 'Corporate Website',
                pdf: AmesPdf,
                img: AmesThumb
            },
            {
                title: 'Playa',
                type: 'Hospitality Website',
                pdf: PlayaPdf,
                img: PlayaThumb
            }
        ],
        testimonials: [
            { quote: "Our conversion rate doubled within 30 days of launch.", author: "James K.", role: "CMO, Nexus" },
            { quote: "Finally, a site that looks like a billion dollars.", author: "Elena R.", role: "Founder, Velvet" }
        ],
        details: "We don't build brochures. We build digital engines. Every pixel is engineered for authority and conversion."
    },
    {
        id: 'product-commercials',
        title: 'Commercials',
        description: 'High-octane visuals.',
        subtitle: '3D & Film Production',
        bg: '#1f0b00',
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
        color: '#FF7701',
        projects: [
            { title: 'Hyperion X', type: 'Product Launch', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop' },
            { title: 'Lumina Drink', type: 'TV Spot', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2000&auto=format&fit=crop' }
        ],
        testimonials: [
            { quote: "The most insane visuals we've ever had. Period.", author: "Marcus T.", role: "Director, Hyperion" }
        ],
        details: "Stop taking photos with your iPhone. We create 3D renders and motion graphics that make your product look physical, tangible, and inevitable."
    },
    {
        id: 'branding',
        title: 'Branding',
        description: 'Identity systems that stick.',
        subtitle: 'Logo & Identity',
        bg: '#1a0507',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        color: '#FF9F9F',
        projects: [
            {
                title: 'IFS',
                type: 'Brand Identity',
                pdf: IfsPdf,
                img: IfsThumb
            },
            {
                title: 'Project X',
                type: 'Brand Strategy',
                pdf: ProjectXPdf,
                img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2000&auto=format&fit=crop'
            }
        ],
        testimonials: [
            { quote: "It feels like us, but 10x bigger.", author: "Sarah L.", role: "CEO, Solace" }
        ],
        details: "A logo is not a brand. A brand is a feeling. We design the system—type, color, voice, motion—that creates that feeling."
    },
    {
        id: 'social-campaigns',
        title: 'Social Content',
        description: 'Content that spreads.',
        subtitle: 'Viral Growth Assets',
        bg: '#140505',
        img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        color: '#C27B7F',
        projects: [
            { title: 'Founders Week', type: 'Docu-series', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop' },
            { title: 'TechTalks', type: 'Short Form', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2000&auto=format&fit=crop' }
        ],
        testimonials: [
            { quote: "4M views in 2 weeks. Enough said.", author: "David P.", role: "Growth Lead" }
        ],
        details: "You don't need 'posts'. You need a media engine. We build the workflows that keep you in the feed every single day."
    }
];
