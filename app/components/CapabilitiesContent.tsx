"use client";

import { useEffect, useState } from "react";

export default function CapabilitiesContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['capabilities']));

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section');
        if (sectionId) {
          setVisibleSections((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(sectionId);
            } else {
              // Only remove when truly out of viewport
              newSet.delete(sectionId);
            }
            return newSet;
          });
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('[data-section]');
    
    // Immediately check which sections are visible on mount
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        const sectionId = section.getAttribute('data-section');
        if (sectionId) {
          setVisibleSections((prev) => new Set(prev).add(sectionId));
        }
      }
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const capabilityItems = [
    {
      title: "Nutritional Powders",
      description: "Custom-blended formulas packed with essential vitamins, minerals, and performance enhancers for daily wellness.",
      badge: "Precision batching",
      tags: ["Macro-balanced", "Micronized"],
      accent: {
        from: "#81c029",
        to: "#3b9032",
        shadow: "rgba(129, 192, 41, 0.4)"
      },
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          {/* Container/Flask */}
          <path
            d="M22 12h20v8l-6 16c-1 3-2 6-4 6h-4c-2 0-3-3-4-6l-6-16v-8z"
            fill="white"
            opacity="0.2"
          />
          <path
            d="M22 12h20v8l-6 16c-1 3-2 6-4 6h-4c-2 0-3-3-4-6l-6-16v-8z"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          {/* Powder particles */}
          <circle cx="28" cy="26" r="2" fill="white" opacity="0.9" />
          <circle cx="36" cy="28" r="1.5" fill="white" opacity="0.8" />
          <circle cx="32" cy="24" r="2.5" fill="white" opacity="1" />
          <circle cx="30" cy="32" r="1.5" fill="white" opacity="0.8" />
          <circle cx="34" cy="34" r="2" fill="white" opacity="0.9" />
          {/* Top opening */}
          <line x1="22" y1="12" x2="42" y2="12" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Herbal Blends",
      description: "Harmonious combinations of time-tested botanicals designed for targeted health benefits like immune support or stress relief.",
      badge: "Botanical lab",
      tags: ["Solvent-free", "Sensory tested"],
      accent: {
        from: "#81c029",
        to: "#3b9032",
        shadow: "rgba(129, 192, 41, 0.4)"
      },
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          {/* Plant/Leaf structure */}
          <path
            d="M32 48 V16"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Left leaves */}
          <path
            d="M32 24 Q20 22 18 28 Q20 34 32 32"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M32 24 Q20 22 18 28 Q20 34 32 32"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M32 36 Q22 34 20 40 Q22 46 32 44"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M32 36 Q22 34 20 40 Q22 46 32 44"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Right leaves */}
          <path
            d="M32 28 Q44 26 46 32 Q44 38 32 36"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M32 28 Q44 26 46 32 Q44 38 32 36"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M32 40 Q42 38 44 44 Q42 50 32 48"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M32 40 Q42 38 44 44 Q42 50 32 48"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Top sprout */}
          <circle cx="32" cy="16" r="3" fill="white" opacity="0.9" />
        </svg>
      )
    },
    {
      title: "Botanical Extracts",
      description: "High-potency concentrates derived from nature&rsquo;s finest sources, ensuring bioavailability and efficacy.",
      badge: "High potency",
      tags: ["Standardized", "Bioavailable"],
      accent: {
        from: "#81c029",
        to: "#3b9032",
        shadow: "rgba(129, 192, 41, 0.4)"
      },
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          {/* Dropper/Extract drop */}
          <path
            d="M32 12 L32 20"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="10" r="3" fill="white" />
          {/* Main droplet */}
          <path
            d="M32 20 C38 28 42 34 42 40 C42 46 37 52 32 52 C27 52 22 46 22 40 C22 34 26 28 32 20 Z"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M32 20 C38 28 42 34 42 40 C42 46 37 52 32 52 C27 52 22 46 22 40 C22 34 26 28 32 20 Z"
            stroke="white"
            strokeWidth="2"
          />
          {/* Inner highlight */}
          <circle cx="28" cy="38" r="4" fill="white" opacity="0.5" />
          {/* Concentration lines */}
          <path d="M32 44 L32 48" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <path d="M28 42 L28 46" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path d="M36 42 L36 46" stroke="white" strokeWidth="1.5" opacity="0.6" />
        </svg>
      )
    },
    {
      title: "Superfoods",
      description: "Nutrient-dense powders and mixes featuring adaptogens, greens, and exotic ingredients to supercharge your lineup.",
      badge: "Adaptogenic stacks",
      tags: ["Greens lab", "Flavor mapped"],
      accent: {
        from: "#81c029",
        to: "#3b9032",
        shadow: "rgba(129, 192, 41, 0.4)"
      },
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          {/* Star/Energy burst shape */}
          <path
            d="M32 12 L35 26 L48 28 L38 38 L40 52 L32 45 L24 52 L26 38 L16 28 L29 26 Z"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M32 12 L35 26 L48 28 L38 38 L40 52 L32 45 L24 52 L26 38 L16 28 L29 26 Z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Center circle */}
          <circle cx="32" cy="32" r="8" fill="white" opacity="0.5" />
          <circle cx="32" cy="32" r="8" stroke="white" strokeWidth="2" fill="none" />
          {/* Inner detail */}
          <circle cx="32" cy="32" r="3" fill="white" opacity="0.8" />
          {/* Energy lines */}
          <line x1="32" y1="20" x2="32" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="40" x2="32" y2="44" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="32" x2="24" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="32" x2="44" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff', transition: 'background-color 0.3s ease' }}>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes conveyor {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gearRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes processing {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-animate {
          opacity: 0;
          animation-fill-mode: both;
        }

        .section-animate.visible {
          opacity: 1;
          animation-duration: 1s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fadeInUp.visible {
          animation-name: fadeInUp;
        }

        .animate-fadeInDown.visible {
          animation-name: fadeInDown;
        }

        .animate-scaleIn.visible {
          animation-name: scaleIn;
        }

        .animate-slideInLeft.visible {
          animation-name: slideInLeft;
        }

        .animate-slideInRight.visible {
          animation-name: slideInRight;
        }

        .animate-slideInUp.visible {
          animation-name: slideInUp;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        .rotating {
          animation: rotate 20s linear infinite;
        }

        .pulsing {
          animation: pulse 2s ease-in-out infinite;
        }

        .capability-icon {
          width: 64px;
          height: 64px;
        }

        .capability-icon-shell {
          position: relative;
          width: 72px;
          height: 72px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .capability-icon-shell::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          pointer-events: none;
        }

        .capability-orbit {
          stroke-dasharray: 140;
          animation: dashFlow 7s linear infinite;
        }

        .capability-particle {
          animation: glowPulse 3.5s ease-in-out infinite;
        }

        .capability-leaf {
          animation: leafDrift 5s ease-in-out infinite;
          transform-origin: center;
        }

        .capability-stream {
          stroke-dasharray: 12;
          animation: dashFlow 4s linear infinite;
        }

        .capability-drop {
          animation: glowPulse 4.5s ease-in-out infinite;
        }

        .capability-burst {
          animation: rotate 14s linear infinite;
          transform-origin: center;
        }

        .capability-progress {
          width: 100%;
          height: 4px;
          border-radius: 999px;
          background-size: 200% 100%;
          animation: shimmer 6s linear infinite;
        }

        .capability-tag {
          font-size: 0.65rem;
          letter-spacing: 0.08em;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes dashFlow {
          from {
            stroke-dashoffset: 140;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes leafDrift {
          0%, 100% {
            transform: rotate(-4deg) translateY(0);
          }
          50% {
            transform: rotate(4deg) translateY(-3px);
          }
        }

        @keyframes floatParticles {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-40px) translateX(-5px);
            opacity: 0;
          }
        }

        @keyframes leafFloat {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px) rotate(10deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-30px) rotate(-5deg);
            opacity: 0;
          }
        }

        @keyframes dropletFall {
          0% {
            transform: translateY(-20px) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translateY(10px) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(40px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
          }
        }

        .animated-particle {
          animation: floatParticles 3s ease-in-out infinite;
        }

        .animated-leaf {
          animation: leafFloat 4s ease-in-out infinite;
        }

        .animated-droplet {
          animation: dropletFall 2.5s ease-in-out infinite;
        }

        .animated-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes rotateGear {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes flowLine {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulseDot {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes processingBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .gear-rotate {
          animation: rotateGear 8s linear infinite;
          transform-origin: center;
        }

        .gear-rotate-reverse {
          animation: rotateGear 8s linear infinite reverse;
          transform-origin: center;
        }

        .flow-line {
          stroke-dasharray: 100;
          animation: flowLine 3s linear infinite;
        }

        .pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }

        .processing-bar {
          animation: processingBar 2s ease-in-out infinite;
        }
      `}</style>

      {/* Product Capabilities Section */}
      <div 
        data-section="capabilities"
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Subtle Dot Pattern Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(129, 192, 41, 0.04) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating Gradient Orbs */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(129, 192, 41, 0.08), transparent)',
            filter: 'blur(80px)',
            animation: 'float 12s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 144, 50, 0.08), transparent)',
            filter: 'blur(80px)',
            animation: 'float 15s ease-in-out infinite 3s'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-8 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('capabilities') ? 'visible' : ''}`}>
            <div className="inline-block mb-4">
              <span 
                className="text-xs sm:text-sm font-bold tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.15)'
                }}
              >
                What We Offer
              </span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#161616' }}
            >
              Product{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Capabilities
              </span>
            </h2>
            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: '#6b7280' }}
            >
              Advanced manufacturing capabilities designed to bring your vision to life
            </p>
          </div>

          {/* Product Capability Cards - Modern Grid Layout */}
          <div className={`section-animate animate-slideInUp stagger-3 ${visibleSections.has('capabilities') ? 'visible' : ''}`}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {capabilityItems.map((item, index) => {
                return (
                  <div
                    key={item.title}
                    className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{
                      background: 'linear-gradient(135deg, #f9fafb, #ffffff)',
                      border: '2px solid rgba(59, 144, 50, 0.2)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    {/* Top Accent Bar */}
                    <div 
                      className="h-1 w-full"
                      style={{
                        background: `linear-gradient(90deg, ${item.accent.from}, ${item.accent.to})`
                      }}
                    />
                    
                    {/* Hover Gradient Overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top right, ${item.accent.from}15, transparent)`
                      }}
                    />

                    {/* Machinery Section - Top */}
                    <div className="relative h-40 overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                      {/* Animated Machinery Elements */}
                      {item.title === "Nutritional Powders" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.6 }}>
                          {/* Mixing Machinery */}
                          <svg style={{ width: '120px', height: '120px' }} viewBox="0 0 100 100" fill="none">
                          {/* Main Gear */}
                          <g className="gear-rotate">
                            <circle cx="50" cy="50" r="18" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                            <circle cx="50" cy="50" r="12" stroke={'#3b9032'} strokeWidth="1" fill="none" />
                            {[...Array(8)].map((_, i) => {
                              const angle = (i * 45) * Math.PI / 180;
                              const x1 = Math.round((50 + Math.cos(angle) * 15) * 100) / 100;
                              const y1 = Math.round((50 + Math.sin(angle) * 15) * 100) / 100;
                              const x2 = Math.round((50 + Math.cos(angle) * 18) * 100) / 100;
                              const y2 = Math.round((50 + Math.sin(angle) * 18) * 100) / 100;
                              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#3b9032'} strokeWidth="2" />;
                            })}
                          </g>
                          {/* Small Gear */}
                          <g className="gear-rotate-reverse">
                            <circle cx="70" cy="30" r="10" stroke={'#2d7028'} strokeWidth="1.5" fill="none" />
                            {[...Array(6)].map((_, i) => {
                              const angle = (i * 60) * Math.PI / 180;
                              const x1 = Math.round((70 + Math.cos(angle) * 8) * 100) / 100;
                              const y1 = Math.round((30 + Math.sin(angle) * 8) * 100) / 100;
                              const x2 = Math.round((70 + Math.cos(angle) * 10) * 100) / 100;
                              const y2 = Math.round((30 + Math.sin(angle) * 10) * 100) / 100;
                              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#2d7028'} strokeWidth="1.5" />;
                            })}
                          </g>
                          {/* Flow Lines */}
                          <path d="M 30 20 Q 35 30 40 40" stroke={'#3b9032'} strokeWidth="1.5" className="flow-line" />
                          <path d="M 70 60 Q 65 70 60 80" stroke={'#3b9032'} strokeWidth="1.5" className="flow-line" style={{ animationDelay: '0.5s' }} />
                          {/* Processing Indicator */}
                          <circle cx="50" cy="50" r="4" fill={'#3b9032'} className="pulse-dot" />
                          {/* Container */}
                          <rect x="20" y="70" width="30" height="25" rx="2" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          </svg>
                        </div>
                      )}

                      {item.title === "Herbal Blends" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.6 }}>
                          {/* Extraction System */}
                          <svg style={{ width: '120px', height: '120px' }} viewBox="0 0 100 100" fill="none">
                          {/* Main Chamber */}
                          <ellipse cx="50" cy="30" rx="20" ry="8" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          <line x1="30" y1="30" x2="30" y2="60" stroke={'#3b9032'} strokeWidth="1.5" />
                          <line x1="70" y1="30" x2="70" y2="60" stroke={'#3b9032'} strokeWidth="1.5" />
                          <ellipse cx="50" cy="60" rx="20" ry="8" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          {/* Botanical Material Inside */}
                          <path d="M 45 35 Q 40 40 42 45" stroke={'#2d7028'} strokeWidth="1" opacity="0.6" />
                          <path d="M 55 35 Q 60 40 58 45" stroke={'#2d7028'} strokeWidth="1" opacity="0.6" />
                          <circle cx="50" cy="42" r="2" fill={'#3b9032'} className="pulse-dot" />
                          {/* Flow pipes */}
                          <path d="M 50 60 L 50 75" stroke={'#3b9032'} strokeWidth="1.5" className="flow-line" />
                          <path d="M 50 75 Q 60 80 70 85" stroke={'#3b9032'} strokeWidth="1.5" className="flow-line" style={{ animationDelay: '0.3s' }} />
                          {/* Collection vessel */}
                          <path d="M 65 85 L 70 85 L 68 95 L 62 95 Z" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          {/* Process indicator */}
                          <circle cx="35" cy="45" r="3" stroke={'#3b9032'} strokeWidth="1" fill="none" className="pulse-dot" />
                          <circle cx="65" cy="45" r="3" stroke={'#3b9032'} strokeWidth="1" fill="none" className="pulse-dot" style={{ animationDelay: '0.5s' }} />
                          {/* Gear mechanism */}
                          <g className="gear-rotate">
                            <circle cx="20" cy="50" r="8" stroke={'#2d7028'} strokeWidth="1" fill="none" />
                            {[...Array(6)].map((_, i) => {
                              const angle = (i * 60) * Math.PI / 180;
                              const x1 = Math.round((20 + Math.cos(angle) * 6) * 100) / 100;
                              const y1 = Math.round((50 + Math.sin(angle) * 6) * 100) / 100;
                              const x2 = Math.round((20 + Math.cos(angle) * 8) * 100) / 100;
                              const y2 = Math.round((50 + Math.sin(angle) * 8) * 100) / 100;
                              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#2d7028'} strokeWidth="1.5" />;
                            })}
                          </g>
                          </svg>
                        </div>
                      )}

                      {item.title === "Botanical Extracts" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.6 }}>
                          {/* Distillation Apparatus */}
                          <svg style={{ width: '120px', height: '120px' }} viewBox="0 0 100 100" fill="none">
                          {/* Condenser coil */}
                          <path d="M 30 20 Q 35 25 30 30 Q 25 35 30 40 Q 35 45 30 50" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          {/* Flow indicator in coil */}
                          <circle cx="30" cy="25" r="2" fill={'#3b9032'} className="pulse-dot" />
                          <circle cx="30" cy="35" r="2" fill={'#3b9032'} className="pulse-dot" style={{ animationDelay: '0.3s' }} />
                          <circle cx="30" cy="45" r="2" fill={'#3b9032'} className="pulse-dot" style={{ animationDelay: '0.6s' }} />
                          {/* Main vessel */}
                          <path d="M 45 30 L 50 20 L 55 30" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          <ellipse cx="50" cy="30" rx="12" ry="4" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          <line x1="38" y1="30" x2="38" y2="55" stroke={'#3b9032'} strokeWidth="1.5" />
                          <line x1="62" y1="30" x2="62" y2="55" stroke={'#3b9032'} strokeWidth="1.5" />
                          <path d="M 38 55 Q 40 60 45 62 L 55 62 Q 60 60 62 55" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          {/* Concentrate level */}
                          <rect x="39" y="50" width="22" height="8" fill={'#3b9032'} opacity="0.3" />
                          <rect className="processing-bar" x="39" y="50" width="22" height="2" fill={'#2d7028'} opacity="0.6" />
                          {/* Dropper tube */}
                          <line x1="50" y1="62" x2="50" y2="75" stroke={'#3b9032'} strokeWidth="1.5" className="flow-line" />
                          <circle cx="50" cy="68" r="1.5" fill={'#3b9032'} className="animated-droplet" />
                          {/* Collection beaker */}
                          <path d="M 40 80 L 42 90 L 58 90 L 60 80 Z" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          <line x1="42" y1="88" x2="58" y2="88" stroke={'#2d7028'} strokeWidth="2" opacity="0.6" />
                          {/* Pressure gauge */}
                          <circle cx="70" cy="45" r="8" stroke={'#3b9032'} strokeWidth="1" fill="none" />
                          <line x1="70" y1="45" x2="75" y2="42" stroke={'#3b9032'} strokeWidth="1" className="gear-rotate" style={{ transformOrigin: '70px 45px' }} />
                          {/* Connection lines */}
                          <path d="M 62 45 L 62 45" stroke={'#3b9032'} strokeWidth="1" strokeDasharray="2 2" />
                          </svg>
                        </div>
                      )}

                      {item.title === "Superfoods" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.6 }}>
                          {/* Energy Processing System */}
                          <svg style={{ width: '120px', height: '120px' }} viewBox="0 0 100 100" fill="none">
                          {/* Central Reactor */}
                          <circle cx="50" cy="50" r="15" stroke={'#3b9032'} strokeWidth="1.5" fill="none" />
                          <circle cx="50" cy="50" r="20" stroke={'#3b9032'} strokeWidth="1" fill="none" opacity="0.6" />
                          <circle cx="50" cy="50" r="25" stroke={'#3b9032'} strokeWidth="0.5" fill="none" opacity="0.3" className="pulse-dot" />
                          {/* Energy core */}
                          <circle cx="50" cy="50" r="8" fill={'#3b9032'} opacity="0.4" className="pulse-dot" />
                          {/* Rotating energy rings */}
                          <g className="gear-rotate">
                            <line x1="50" y1="35" x2="50" y2="30" stroke={'#3b9032'} strokeWidth="2" />
                            <line x1="65" y1="50" x2="70" y2="50" stroke={'#3b9032'} strokeWidth="2" />
                            <line x1="50" y1="65" x2="50" y2="70" stroke={'#3b9032'} strokeWidth="2" />
                            <line x1="35" y1="50" x2="30" y2="50" stroke={'#3b9032'} strokeWidth="2" />
                          </g>
                          {/* Energy nodes */}
                          <circle cx="50" cy="25" r="3" fill={'#2d7028'} className="pulse-dot" />
                          <circle cx="75" cy="50" r="3" fill={'#2d7028'} className="pulse-dot" style={{ animationDelay: '0.25s' }} />
                          <circle cx="50" cy="75" r="3" fill={'#2d7028'} className="pulse-dot" style={{ animationDelay: '0.5s' }} />
                          <circle cx="25" cy="50" r="3" fill={'#2d7028'} className="pulse-dot" style={{ animationDelay: '0.75s' }} />
                          {/* Energy flow lines */}
                          <path d="M 50 25 L 50 35" stroke={'#3b9032'} strokeWidth="1" className="flow-line" />
                          <path d="M 70 50 L 65 50" stroke={'#3b9032'} strokeWidth="1" className="flow-line" style={{ animationDelay: '0.25s' }} />
                          <path d="M 50 75 L 50 65" stroke={'#3b9032'} strokeWidth="1" className="flow-line" style={{ animationDelay: '0.5s' }} />
                          <path d="M 30 50 L 35 50" stroke={'#3b9032'} strokeWidth="1" className="flow-line" style={{ animationDelay: '0.75s' }} />
                          {/* Output channels */}
                          <path d="M 65 35 L 75 25" stroke={'#3b9032'} strokeWidth="1" strokeDasharray="2 2" className="flow-line" />
                          <path d="M 65 65 L 75 75" stroke={'#3b9032'} strokeWidth="1" strokeDasharray="2 2" className="flow-line" style={{ animationDelay: '0.4s' }} />
                          {/* Processing gears */}
                          <g className="gear-rotate-reverse">
                            <circle cx="75" cy="25" r="6" stroke={'#2d7028'} strokeWidth="1" fill="none" />
                            {[...Array(6)].map((_, i) => {
                              const angle = (i * 60) * Math.PI / 180;
                              const x1 = Math.round((75 + Math.cos(angle) * 5) * 100) / 100;
                              const y1 = Math.round((25 + Math.sin(angle) * 5) * 100) / 100;
                              const x2 = Math.round((75 + Math.cos(angle) * 6) * 100) / 100;
                              const y2 = Math.round((25 + Math.sin(angle) * 6) * 100) / 100;
                              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#2d7028'} strokeWidth="1" />;
                            })}
                          </g>
                          <g className="gear-rotate-reverse">
                            <circle cx="75" cy="75" r="6" stroke={'#2d7028'} strokeWidth="1" fill="none" />
                            {[...Array(6)].map((_, i) => {
                              const angle = (i * 60) * Math.PI / 180;
                              const x1 = Math.round((75 + Math.cos(angle) * 5) * 100) / 100;
                              const y1 = Math.round((75 + Math.sin(angle) * 5) * 100) / 100;
                              const x2 = Math.round((75 + Math.cos(angle) * 6) * 100) / 100;
                              const y2 = Math.round((75 + Math.sin(angle) * 6) * 100) / 100;
                              return <line key={`g2-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#2d7028'} strokeWidth="1" />;
                            })}
                          </g>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Separator */}
                    <div 
                      className="h-px"
                      style={{ 
                        background: `linear-gradient(90deg, transparent, ${item.accent.from}, ${item.accent.to}, transparent)` 
                      }}
                    />

                    {/* Content Section - Bottom */}
                    <div className="relative p-6 text-center">
                      {/* Title */}
                      <h3 
                        className="text-lg font-bold mb-3"
                        style={{ color: '#161616' }}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: '#6b7280', textAlign: 'justify' }}
                      >
                        {item.description}
                      </p>

                      {/* Bottom Corner Accent */}
                      <div 
                        className="absolute bottom-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at bottom right, ${item.accent.to}, transparent)`,
                          borderRadius: '100% 0 0 0'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Icon Summary Section */}
          <div className={`max-w-5xl mx-auto mt-12 lg:mt-16 section-animate animate-fadeInUp stagger-4 ${visibleSections.has('capabilities') ? 'visible' : ''}`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Custom Formulation */}
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(129, 192, 41, 0.1)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#81c029" strokeWidth="2">
                    <path d="M9 2v6h6V2M12 8v14M8 20h8M6 14h12"/>
                  </svg>
                </div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: '#161616' }}>
                  Custom Formulation
                </h4>
                <p className="text-xs" style={{ color: '#6b7280' }}>
                  Tailored to Your Brand
                </p>
              </div>

              {/* Scalable Production */}
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(129, 192, 41, 0.1)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#81c029" strokeWidth="2">
                    <path d="M3 3v18h18"/>
                    <path d="M18 17l-5-5-4 4L3 10"/>
                  </svg>
                </div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: '#161616' }}>
                  Scalable Production
                </h4>
                <p className="text-xs" style={{ color: '#6b7280' }}>
                  Small Batch to High Volume
                </p>
              </div>

              {/* Premium Quality */}
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(129, 192, 41, 0.1)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#81c029" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: '#161616' }}>
                  Premium Quality
                </h4>
                <p className="text-xs" style={{ color: '#6b7280' }}>
                  Efficacy &amp; Flavor
                </p>
              </div>

              {/* Clean Formulations */}
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(129, 192, 41, 0.1)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#81c029" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                </div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: '#161616' }}>
                  Clean Formulations
                </h4>
                <p className="text-xs" style={{ color: '#6b7280' }}>
                  Effective &amp; Pure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredient Expertise Section */}
      <div 
        data-section="ingredients"
        className="relative py-8 sm:py-10 lg:py-12 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-8 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('ingredients') ? 'visible' : ''}`}>
            <div className="inline-block mb-4">
              <span 
                className="text-xs sm:text-sm font-bold tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.15)'
                }}
              >
                Quality First
              </span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#161616' }}
            >
              Ingredient{' '}
              <span 
                style={{
                  backgroundImage: 'linear-gradient(135deg, #3b9032, #81c029)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Expertise
              </span>
            </h2>
            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: '#6b7280' }}
            >
              Sourcing only the purest, most reliable ingredients from trusted global suppliers
           </p>
          </div>

          {/* Content Grid */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 section-animate animate-fadeInUp stagger-2 ${visibleSections.has('ingredients') ? 'visible' : ''}`}>
            {/* Feature Cards */}
            {[
              {
                title: 'Non-GMO & Organic',
                description: 'Sustainably farmed botanicals sourced from trusted farms worldwide',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4a6 6 0 0 0-6 6c0 2 1 4 3 6L24 44l3-28C29 14 30 12 30 10a6 6 0 0 0-6-6z" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M24 44c-4-10-8-16-8-26M24 44c4-10 8-16 8-26" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          opacity="0.5"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'Full Traceability',
                description: 'Complete supply chain visibility for vitamins, minerals, and all raw materials',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <path d="M6 6v36h36" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M14 32l8-16 8 8 10-20" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'Regulatory Compliance',
                description: 'Meeting and exceeding the latest FDA and international regulatory standards',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4L4 14l20 10 20-10-20-10z" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M4 34l20 10 20-10M4 24l20 10 20-10" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'Innovative Ingredients',
                description: 'Plant-based proteins, nootropic enhancers, and cutting-edge compounds',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" 
                            stroke={'#3b9032'} 
                            strokeWidth="2.5" 
                            strokeLinecap="round"
                            strokeLinejoin="round"/>
                    <path d="M24 12v12l8 4" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'Trend-Aligned',
                description: 'Ingredients that match evolving consumer preferences and market demands',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <path d="M44 24h-8l-6 18L18 6l-6 18H4" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'Potency Guaranteed',
                description: 'Rigorous testing ensures every ingredient meets specified concentration levels',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4l6.18 12.52L44 18.54l-10 9.74 2.36 13.76L24 35.54l-12.36 6.5L14 28.28 4 18.54l13.82-2.02L24 4z" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden"
              >
                <div 
                  className="relative p-6 md:p-8 h-full transition-all duration-500"
                  style={{
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div 
                    className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.03) 0%, transparent 100%)'
                    }}
                  ></div>
                  
                  <div className="relative">
                    <div 
                      className="mb-6 transition-transform duration-500 group-hover:scale-110 inline-block"
                    >
                      {feature.icon}
                    </div>
                    
                    <h3 
                      className="text-lg md:text-xl font-bold mb-3"
                      style={{ color: '#161616' }}
                    >
                      {feature.title}
                    </h3>
                    
                    <div 
                      className="w-10 md:w-12 h-1 mb-4 transition-all duration-500 group-hover:w-16 md:group-hover:w-20"
                      style={{
                        background: `linear-gradient(90deg, ${'#3b9032'} 0%, transparent 100%)`
                      }}
                    ></div>
                    
                    <p 
                      className="text-sm md:text-base leading-relaxed"
                      style={{ color: '#6b7280' }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Manufacturing Capabilities Section */}
      <div 
        data-section="manufacturing"
        className="relative py-8 sm:py-10 lg:py-12 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-8 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('manufacturing') ? 'visible' : ''}`}>
            <div className="inline-block mb-4">
              <span 
                className="text-xs sm:text-sm font-bold tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.15)'
                }}
              >
                Manufacturing Excellence
              </span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#161616' }}
            >
              Core Manufacturing{' '}
              <span 
                style={{
                  backgroundImage: 'linear-gradient(135deg, #3b9032, #81c029)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Capabilities
              </span>
            </h2>
            <p 
              className="text-base sm:text-lg max-w-3xl mx-auto"
              style={{ color: '#6b7280' }}
            >
              Advanced production technologies delivering precision at scale
            </p>
          </div>

          {/* Content Grid */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 section-animate animate-fadeInUp stagger-2 ${visibleSections.has('manufacturing') ? 'visible' : ''}`}>
            {/* Capability Cards */}
            {[
              {
                title: 'High-Speed Stick Pack Production',
                description: 'State-of-the-art automated stick pack lines capable of producing thousands of units per hour with precision filling and sealing technology',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                    <rect x="12" y="8" width="6" height="32" rx="1" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          fill="none"/>
                    <rect x="21" y="8" width="6" height="32" rx="1" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          fill="none"/>
                    <rect x="30" y="8" width="6" height="32" rx="1" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          fill="none"/>
                    <path d="M14 20h3M23 20h3M32 20h3" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          strokeLinecap="round"/>
                    <path d="M10 4l28 0" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'Custom Powder Blending',
                description: 'Precision blending systems ensuring uniform distribution of ingredients with validated homogeneity testing for every batch',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                    <path d="M18 12h12v8l-4 12h-4l-4-12v-8z" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"/>
                    <line x1="18" y1="12" x2="30" y2="12" 
                          stroke={'#3b9032'} 
                          strokeWidth="3" 
                          strokeLinecap="round"/>
                    <circle cx="20" cy="18" r="1.5" 
                            fill={'#3b9032'}/>
                    <circle cx="28" cy="20" r="1.5" 
                            fill={'#3b9032'}/>
                    <circle cx="24" cy="16" r="2" 
                            fill={'#3b9032'}/>
                    <path d="M20 26c2-1 4-1 6 0" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          strokeLinecap="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'Flavoring & Sweetener Optimization',
                description: 'Expert formulation development to create great-tasting products while maintaining nutritional integrity and label claims',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                    <path d="M24 8v8l8 8-8 8v8" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="16" cy="20" r="3" 
                            stroke={'#3b9032'} 
                            strokeWidth="2"/>
                    <circle cx="32" cy="28" r="3" 
                            stroke={'#3b9032'} 
                            strokeWidth="2"/>
                    <path d="M20 12l-4 4M28 36l4-4" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          strokeLinecap="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'Small-Run R&D Batches',
                description: 'Flexible pilot-scale production for product development and testing before full commercial manufacturing runs',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                    <path d="M20 12h8v6l-2 8h-4l-2-8v-6z" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <line x1="20" y1="12" x2="28" y2="12" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"/>
                    <circle cx="24" cy="18" r="1.5" 
                            fill={'#3b9032'}/>
                    <path d="M16 32h16v4h-16z" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M18 28l2-2h8l2 2" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              },
              {
                title: 'packaging-showcase',
                description: 'visual-element',
                icon: 'packaging'
              },
              {
                title: 'Bulk or Retail-Ready Packaging',
                description: 'Versatile packaging solutions from large-scale bulk containers for wholesale to attractive retail-ready formats for direct consumer sales',
                icon: (
                  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                    <rect x="12" y="14" width="24" height="26" rx="2" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M12 20h24" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"/>
                    <path d="M18 14v-4a6 6 0 0 1 12 0v4" 
                          stroke={'#3b9032'} 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="24" cy="28" r="2" 
                            fill={'#3b9032'}/>
                    <path d="M20 32h8" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          strokeLinecap="round"/>
                    <circle cx="24" cy="24" r="20" 
                            fill={'#3b9032'} 
                            opacity="0.1"/>
                  </svg>
                )
              }
            ].map((capability, index) => {
              // Render packaging showcase card
              if (capability.title === 'packaging-showcase') {
                return (
                  <div 
                    key={index}
                    className="group relative hidden lg:block"
                  >
                    <div 
                      className="relative p-5 lg:p-6 h-full rounded-3xl transition-all duration-500 hover:shadow-2xl overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(59, 144, 50, 0.02)',
                        border: `1px solid ${'rgba(59, 144, 50, 0.08)'}`,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Apex Nutra Packaging Image */}
                      <div className="relative h-full flex items-center justify-center py-3">
                        <div className="relative w-full max-w-[240px] mx-auto">
                          <img 
                            src="/packaging.png" 
                            alt="Apex Nutra Packaging"
                            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            style={{
                              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.2))'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div 
                    className="relative p-5 lg:p-6 h-full rounded-3xl transition-all duration-500 hover:shadow-2xl"
                    style={{
                      backgroundColor: 'rgba(59, 144, 50, 0.02)',
                      border: `1px solid ${'rgba(59, 144, 50, 0.08)'}`,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {/* Top corner accent */}
                    <div 
                      className="absolute top-0 right-0 w-24 h-24 rounded-tr-3xl opacity-5 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top right, ${'#3b9032'}, transparent)`
                      }}
                    ></div>

                    {/* Number badge */}
                    <div 
                      className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: 'rgba(59, 144, 50, 0.1)',
                        color: '#3b9032'
                      }}
                    >
                      {String(index > 4 ? index : index + 1).padStart(2, '0')}
                    </div>
                    
                    <div className="relative">
                      {/* Icon */}
                      <div 
                        className="mb-5 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                      >
                        {capability.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 
                        className="text-lg lg:text-xl font-bold mb-3 leading-tight"
                        style={{ color: '#161616' }}
                      >
                        {capability.title}
                      </h3>
                      
                      {/* Description */}
                      <p 
                        className="text-sm lg:text-base leading-relaxed"
                        style={{ color: '#6b7280' }}
                      >
                        {capability.description}
                      </p>

                      {/* Bottom accent line */}
                      <div 
                        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-20 transition-all duration-500 rounded-full"
                        style={{
                          backgroundColor: '#3b9032'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        data-section="cta"
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${'rgba(59, 144, 50, 0.03)'} 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`section-animate animate-fadeInUp stagger-1 ${visibleSections.has('cta') ? 'visible' : ''}`}>
            <h2 
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: '#161616' }}
            >
              Ready to Get{' '}
              <span 
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Started
              </span>
              ?
            </h2>
            <p 
              className="text-xl mb-10"
              style={{ color: '#6b7280' }}
            >
              Let&rsquo;s discuss how we can help bring your supplement product to market
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #81c029, #3b9032)',
                color: '#ffffff',
                boxShadow: '0 10px 40px rgba(129, 192, 41, 0.3)'
              }}
            >
              Contact Us
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-8 sm:py-12 lg:py-16 border-t" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(59, 144, 50, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-12 max-w-4xl mx-auto">
            {/* Left Column - Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center space-x-2 mb-6 justify-center md:justify-start">
                <img 
                  src="/logo.png" 
                  alt="APEX NUTRA" 
                  className="h-12 w-auto"
                  style={{ filter: 'brightness(1)' }}
                />
                <h2 className="text-2xl">
                  <span style={{ fontFamily: 'var(--font-gotham, sans-serif)', fontWeight: 700, color: '#1f2937' }}>APEX</span>
                  <span style={{
                    fontFamily: 'var(--font-raleway, sans-serif)',
                    fontWeight: 300,
                    marginLeft: '0.25rem',
                    background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>NUTRA</span>
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 justify-center md:justify-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          fill="none"/>
                    <circle cx="12" cy="9" r="2.5" 
                            stroke={'#3b9032'} 
                            strokeWidth="2" 
                            fill="none"/>
                  </svg>
                  <div>
                    <p className="text-sm" style={{ color: '#4b5563' }}>
                      395 N 1140 W, Suite 2<br />
                      Ogden, UT 84404, USA
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                  </svg>
                  <a href="tel:+13852808343" className="text-sm hover:underline" style={{ color: '#3b9032' }}>
                    (385) 280-8343
                  </a>
                </div>

                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <rect x="3" y="5" width="18" height="14" rx="2" 
                          stroke={'#3b9032'} 
                          strokeWidth="2"/>
                    <path d="M3 7l9 6 9-6" 
                          stroke={'#3b9032'} 
                          strokeWidth="2" 
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                  </svg>
                  <a href="mailto:kwybrow@apexnutraus.com" className="text-sm hover:underline" style={{ color: '#3b9032' }}>
                    kwybrow@apexnutraus.com
                  </a>
                </div>

                <div className="pt-2 flex justify-center md:justify-start">
                  <p className="text-xs" style={{ color: '#6b7280' }}>
                    Contact: <span style={{ color: '#3b9032', fontWeight: 600 }}>Kim Wybrow</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column - Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-6" style={{ color: '#161616' }}>
                Quick Links
              </h3>
              <ul className="space-y-3 flex flex-col items-center md:items-start">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Our Capabilities', href: '/capabilities' },
                  { name: 'Manufacturing', href: '/manufacturer' },
                  { name: 'Contact', href: '/contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-sm transition-colors duration-300 hover:underline"
                      style={{ color: '#4b5563' }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="h-px mb-8" style={{ backgroundColor: 'rgba(59, 144, 50, 0.1)' }}></div>

          {/* Bottom Copyright */}
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: '#6b7280' }}>
              © 2025 Apex Nutra. All Rights Reserved.
            </p>
            <p className="text-xs" style={{ color: '#9ca3af' }}>
              Your Partner in Premium Nutritional Manufacturing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
