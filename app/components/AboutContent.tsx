"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['history']));
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

  // Handle hash anchor scrolling
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const milestoneElements = timelineRef.current.querySelectorAll('.milestone-item');
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const viewportCenter = windowHeight / 2;
        
        // Find closest milestone to viewport center
        let closestIndex = 0;
        let minDistance = Infinity;
        
        milestoneElements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });
        
        setActiveIndex(closestIndex);
        
        // Calculate exact position for the moving circle (snap to milestone centers)
        if (milestoneElements[closestIndex]) {
          const closestRect = milestoneElements[closestIndex].getBoundingClientRect();
          const circlePosition = closestRect.top - timelineRect.top + closestRect.height / 2;
          setIndicatorPosition(circlePosition);
          
          // Set progress based on which milestone we're at
          const progress = ((closestIndex + 1) / milestones.length) * 100;
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    // Use different settings for mobile to prevent premature exit animations
    const isMobile = window.innerWidth < 768;
    const observerOptions = {
      threshold: isMobile ? 0.05 : 0.15,
      rootMargin: isMobile ? '0px 0px -100px 0px' : '-50px 0px -50px 0px'
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
              newSet.delete(sectionId);
            }
            return newSet;
          });
        }
      });
    }, observerOptions);

    // Observe all sections
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

  const milestones = [
    {
      year: "2021",
      title: "The Beginning",
      description: "Founded in a modest 1,200 square foot facility, starting with essential kitting services to meet the growing demands of the nutraceutical industry.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L24 24L34 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3"/>
        </svg>
      )
    },
    {
      year: "2022",
      title: "Major Expansion",
      description: "Relocated to the Business District in Ogden into an expansive 8,000 square foot building. Introduced our first state-of-the-art machines—a 10-lane and 4-lane stickpack machine—marking the beginning of full-scale manufacturing capabilities.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="16" width="32" height="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 16L24 8L40 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="18" y="24" width="5" height="16" fill="currentColor" opacity="0.3"/>
          <rect x="27" y="24" width="5" height="16" fill="currentColor" opacity="0.3"/>
        </svg>
      )
    },
    {
      year: "2023",
      title: "Strategic Growth",
      description: "Thanks to a strategic partnership with one of Utah's largest and most respected manufacturing companies, we quickly outpaced our space. Expanded by acquiring the adjacent building for dedicated warehousing.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <path d="M12 24C12 24 14 18 24 18C34 18 36 24 36 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="12" cy="24" r="4" fill="currentColor"/>
          <circle cx="36" cy="24" r="4" fill="currentColor"/>
          <circle cx="24" cy="12" r="4" fill="currentColor"/>
        </svg>
      )
    },
    {
      year: "2024",
      title: "Enhanced Capacity",
      description: "Further enhanced our operations by adding more advanced machinery, significantly boosting our production capacity and technological capabilities.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <path d="M24 8L24 40M14 18L34 18M10 28L38 28M12 38L36 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="24" cy="8" r="3" fill="currentColor"/>
          <circle cx="14" cy="18" r="3" fill="currentColor"/>
          <circle cx="34" cy="18" r="3" fill="currentColor"/>
          <circle cx="10" cy="28" r="3" fill="currentColor"/>
          <circle cx="38" cy="28" r="3" fill="currentColor"/>
        </svg>
      )
    },
    {
      year: "Today",
      title: "Continuous Innovation",
      description: "Our journey of continuous improvement remains an ongoing mission, driven by innovation and a commitment to excellence in every aspect of supplement manufacturing.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <path d="M24 6L30 18L42 20L33 29L35 42L24 36L13 42L15 29L6 20L18 18L24 6Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" opacity="0.2"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff', color: '#1f2937', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <style jsx>{`
        @keyframes pathDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .animate-fadeIn.visible {
          animation-name: fadeIn;
        }

        .animate-scaleIn.visible {
          animation-name: scaleIn;
        }

        .animate-slideInLeft.visible {
          animation-name: slideInFromLeft;
        }

        .animate-slideInRight.visible {
          animation-name: slideInFromRight;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scanLine {
          0% {
            top: 0;
          }
          80% {
            top: 100%;
          }
          100% {
            top: 100%;
          }
        }

        @keyframes labelChange1 {
          0% { opacity: 1; }
          19.99% { opacity: 1; }
          20% { opacity: 0; }
          99.99% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes labelChange2 {
          0% { opacity: 0; }
          19.99% { opacity: 0; }
          20% { opacity: 1; }
          39.99% { opacity: 1; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes labelChange3 {
          0% { opacity: 0; }
          39.99% { opacity: 0; }
          40% { opacity: 1; }
          59.99% { opacity: 1; }
          60% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes labelChange4 {
          0% { opacity: 0; }
          59.99% { opacity: 0; }
          60% { opacity: 1; }
          79.99% { opacity: 1; }
          80% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes labelChange5 {
          0% { opacity: 0; }
          79.99% { opacity: 0; }
          80% { opacity: 1; }
          99.99% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes glowPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(129, 192, 41, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(129, 192, 41, 0.6), 0 0 60px rgba(129, 192, 41, 0.4);
          }
        }

        .scan-container {
          animation: glowPulse 4s ease-in-out infinite;
        }

        .scan-line {
          animation: scanLine 4s ease-in-out infinite;
        }

        .label-1 { 
          animation: labelChange1 20s ease-in-out infinite;
          opacity: 1;
        }
        .label-2 { 
          animation: labelChange2 20s ease-in-out infinite;
          opacity: 0;
        }
        .label-3 { 
          animation: labelChange3 20s ease-in-out infinite;
          opacity: 0;
        }
        .label-4 { 
          animation: labelChange4 20s ease-in-out infinite;
          opacity: 0;
        }
        .label-5 { 
          animation: labelChange5 20s ease-in-out infinite;
          opacity: 0;
        }
        
        .cap-1 { 
          animation: labelChange1 20s ease-in-out infinite; 
          opacity: 1;
        }
        .cap-2 { 
          animation: labelChange2 20s ease-in-out infinite;
          opacity: 0;
        }
        .cap-3 { 
          animation: labelChange3 20s ease-in-out infinite;
          opacity: 0;
        }
        .cap-4 { 
          animation: labelChange4 20s ease-in-out infinite;
          opacity: 0;
        }
        .cap-5 { 
          animation: labelChange5 20s ease-in-out infinite;
          opacity: 0;
        }

        .milestone-card {
          opacity: 0;
          transform: translateX(0);
        }

        .milestone-card.visible {
          opacity: 1;
        }

        .milestone-left {
          animation: slideInLeft 0.7s ease-out forwards;
        }

        .milestone-right {
          animation: slideInRight 0.7s ease-out forwards;
        }

        .icon-float {
          animation: float 3s ease-in-out infinite;
        }

        /* 3D Flip Card Styles */
        .flip-card {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 100px;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* History Section - Journey Timeline */}
      <div 
        data-section="history"
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 144, 50, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 144, 50, 0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Animated Background Blobs */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(59, 144, 50, 0.08), transparent)`,
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${'rgba(129, 192, 41, 0.08)'}, transparent)`,
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite 2s'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-8 sm:mb-12 lg:mb-16 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('history') ? 'visible' : ''}`}>
            <div className="inline-block mb-6">
              <span 
                className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.1)'
                }}
              >
                Our Journey
              </span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
              style={{ color: '#161616' }}
            >
              The Road to
              <br />
              <span 
                style={{
                  backgroundImage: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Excellence
              </span>
            </h2>
            <p 
              className="text-lg lg:text-xl max-w-3xl mx-auto"
              style={{ color: '#6b7280' }}
            >
              From humble beginnings to industry leadership—discover how we've grown through innovation and dedication
            </p>
          </div>

          {/* Timeline Container */}
          <div ref={timelineRef} className="relative">
            {/* Central Route Path - Desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden lg:block" style={{ width: '6px' }}>
              {/* Background Gray Line */}
              <div 
                className="absolute inset-0"
                style={{
                  background: '#d1d5db',
                  opacity: 0.3
                }}
              ></div>
              
              {/* Highlighted Green Line */}
              <div 
                className="absolute left-0 top-0 w-full"
                style={{
                  height: `${indicatorPosition}px`,
                  background: '#3b9032',
                  boxShadow: `0 0 15px ${'#3b9032'}`,
                  transition: 'height 0.5s ease-out'
                }}
              ></div>

              {/* Static Milestone Circles */}
              {milestones.map((_, index) => {
                const milestoneElements = timelineRef.current?.querySelectorAll('.milestone-item');
                const timelineRect = timelineRef.current?.getBoundingClientRect();
                
                let circlePosition = 0;
                if (milestoneElements && milestoneElements[index] && timelineRect) {
                  const milestoneRect = milestoneElements[index].getBoundingClientRect();
                  circlePosition = milestoneRect.top - timelineRect.top + milestoneRect.height / 2;
                }
                
                const isCompleted = activeIndex > index;
                
                return (
                  <div
                    key={index}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      top: `${circlePosition}px`,
                      transition: 'all 0.4s ease-out'
                    }}
                  >
                    <div
                      className="rounded-full border-4 transition-all duration-500"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderColor: isCompleted
                          ? ('#3b9032')
                          : ('#d1d5db'),
                        backgroundColor: isCompleted 
                          ? ('#3b9032')
                          : ('#ffffff'),
                        boxShadow: isCompleted
                          ? `0 0 20px ${'rgba(59, 144, 50, 0.6)'}`
                          : 'none'
                      }}
                    />
                  </div>
                );
              })}

              {/* Moving Active Circle */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: `${indicatorPosition}px`,
                  transition: 'top 0.5s ease-out',
                  zIndex: 10
                }}
              >
                <div
                  className="rounded-full border-4 transition-all duration-300 relative"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderColor: '#3b9032',
                    backgroundColor: '#3b9032',
                    boxShadow: `0 0 30px ${'rgba(59, 144, 50, 0.8)'}`
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `3px solid ${'#3b9032'}`,
                      animation: 'pulseGlow 2s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Route Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 lg:hidden">
              <div 
                className="absolute inset-0"
                style={{
                  background: '#d1d5db',
                  opacity: 0.3
                }}
              ></div>
              <div 
                className="absolute left-0 top-0 w-full"
                style={{
                  height: `${indicatorPosition}px`,
                  background: '#3b9032',
                  boxShadow: `0 0 10px ${'#3b9032'}`,
                  transition: 'height 0.5s ease-out'
                }}
              ></div>
              
              {/* Mobile Static Circles */}
              {milestones.map((_, index) => {
                const milestoneElements = timelineRef.current?.querySelectorAll('.milestone-item');
                const timelineRect = timelineRef.current?.getBoundingClientRect();
                
                let circlePosition = 0;
                if (milestoneElements && milestoneElements[index] && timelineRect) {
                  const milestoneRect = milestoneElements[index].getBoundingClientRect();
                  circlePosition = milestoneRect.top - timelineRect.top + milestoneRect.height / 2;
                }
                
                const isCompleted = activeIndex > index;
                
                return (
                  <div
                    key={index}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      top: `${circlePosition}px`,
                      transition: 'all 0.4s ease-out'
                    }}
                  >
                    <div
                      className="rounded-full transition-all duration-500"
                      style={{
                        width: '16px',
                        height: '16px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: isCompleted
                          ? ('#3b9032')
                          : ('#d1d5db'),
                        backgroundColor: isCompleted 
                          ? ('#3b9032')
                          : ('#ffffff'),
                        boxShadow: isCompleted
                          ? `0 0 12px ${'rgba(59, 144, 50, 0.6)'}`
                          : 'none'
                      }}
                    />
                  </div>
                );
              })}

              {/* Mobile Moving Active Circle */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: `${indicatorPosition}px`,
                  transition: 'top 0.5s ease-out',
                  zIndex: 10
                }}
              >
                <div
                  className="rounded-full transition-all duration-300 relative"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    borderColor: '#3b9032',
                    backgroundColor: '#3b9032',
                    boxShadow: `0 0 20px ${'rgba(59, 144, 50, 0.8)'}`
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `2px solid ${'#3b9032'}`,
                      animation: 'pulseGlow 2s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-24 lg:space-y-32">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                const progressThreshold = ((index + 1) / milestones.length) * 100;
                const isVisible = scrollProgress >= progressThreshold - 5;

                return (
                  <div 
                    key={index}
                    className={`relative milestone-card milestone-item ${isVisible ? 'visible' : ''} ${isVisible ? (isLeft ? 'milestone-left' : 'milestone-right') : ''}`}
                    style={{
                      minHeight: 'auto',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 items-center w-full">
                      {/* Left Side */}
                      {isLeft ? (
                        <>
                          <div className="text-right pr-8">
                            <div 
                              className="inline-flex items-center justify-center rounded-full mb-6"
                              style={{
                                background: `linear-gradient(135deg, ${'#3b9032'}, ${'#81c029'})`,
                                boxShadow: `0 4px 20px ${'rgba(59, 144, 50, 0.3)'}}`,
                                minWidth: '140px',
                                height: '48px',
                                paddingLeft: '24px',
                                paddingRight: '24px'
                              }}
                            >
                              <span className="text-white font-bold text-2xl">{milestone.year}</span>
                            </div>
                            <h3 
                              className="text-3xl font-bold mb-4"
                              style={{ color: '#161616' }}
                            >
                              {milestone.title}
                            </h3>
                            <p 
                              className="text-lg leading-relaxed"
                              style={{ color: '#6b7280' }}
                            >
                              {milestone.description}
                            </p>
                          </div>
                          
                          {/* Center Icon */}
                          <div className="flex justify-start">
                            <div 
                              className="relative w-24 h-24 rounded-2xl flex items-center justify-center icon-float"
                              style={{
                                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))',
                                border: `2px solid ${'#3b9032'}`,
                                boxShadow: `0 8px 32px ${'rgba(59, 144, 50, 0.3)'}`,
                                color: '#3b9032'
                              }}
                            >
                              {milestone.icon}
                              
                              {/* Pulsing Ring */}
                              <div 
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                  border: `2px solid ${'#3b9032'}`,
                                  animation: 'pulseGlow 2s ease-in-out infinite'
                                }}
                              ></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Center Icon */}
                          <div className="flex justify-end">
                            <div 
                              className="relative w-24 h-24 rounded-2xl flex items-center justify-center icon-float"
                              style={{
                                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))',
                                border: `2px solid ${'#3b9032'}`,
                                boxShadow: `0 8px 32px ${'rgba(59, 144, 50, 0.3)'}`,
                                color: '#3b9032'
                              }}
                            >
                              {milestone.icon}
                              
                              {/* Pulsing Ring */}
                              <div 
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                  border: `2px solid ${'#3b9032'}`,
                                  animation: 'pulseGlow 2s ease-in-out infinite'
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Right Side */}
                          <div className="text-left pl-8">
                            <div 
                              className="inline-flex items-center justify-center rounded-full mb-6"
                              style={{
                                background: `linear-gradient(135deg, ${'#3b9032'}, ${'#81c029'})`,
                                boxShadow: `0 4px 20px ${'rgba(59, 144, 50, 0.3)'}}`,
                                minWidth: '140px',
                                height: '48px',
                                paddingLeft: '24px',
                                paddingRight: '24px'
                              }}
                            >
                              <span className="text-white font-bold text-2xl">{milestone.year}</span>
                            </div>
                            <h3 
                              className="text-3xl font-bold mb-4"
                              style={{ color: '#161616' }}
                            >
                              {milestone.title}
                            </h3>
                            <p 
                              className="text-lg leading-relaxed"
                              style={{ color: '#6b7280' }}
                            >
                              {milestone.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden flex gap-4 items-start pl-16 pr-4 w-full">
                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-2">
                          <div 
                            className="inline-flex items-center justify-center rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${'#3b9032'}, ${'#81c029'})`,
                              boxShadow: `0 4px 20px ${'rgba(59, 144, 50, 0.3)'}}`,
                              minWidth: '100px',
                              height: '32px',
                              paddingLeft: '12px',
                              paddingRight: '12px'
                            }}
                          >
                            <span className="text-white font-bold text-sm">{milestone.year}</span>
                          </div>
                        </div>
                        
                        {/* Icon below year for mobile */}
                        <div className="mb-3">
                          <div 
                            className="inline-flex w-12 h-12 rounded-lg items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))',
                              border: `2px solid ${'#3b9032'}`,
                              color: '#3b9032'
                            }}
                          >
                            <div className="scale-[0.6]">
                              {milestone.icon}
                            </div>
                          </div>
                        </div>
                        
                        <h3 
                          className="text-xl font-bold mb-2"
                          style={{ color: '#161616' }}
                        >
                          {milestone.title}
                        </h3>
                        <p 
                          className="text-sm leading-relaxed"
                          style={{ color: '#6b7280' }}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div 
        data-section="mission"
        className="relative pt-8 pb-4 sm:pt-12 sm:pb-6 lg:pt-16 lg:pb-8 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative grid lg:grid-cols-2 gap-16 items-center">
              {/* Product Bottle with Scanner */}
              <div className={`flex justify-center items-center section-animate animate-slideInLeft stagger-1 ${visibleSections.has('mission') ? 'visible' : ''}`}>
                <div className="relative scan-container" style={{
                  width: '300px',
                  height: '450px',
                  borderRadius: '20px',
                  border: '2px solid rgba(129, 192, 41, 0.3)',
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  overflow: 'hidden'
                }}>
                  {/* Scanning Line */}
                  <div className="scan-line absolute w-full h-1 left-0 top-0 z-20" style={{
                    background: 'linear-gradient(90deg, transparent, #81c029, transparent)',
                    boxShadow: '0 0 20px #81c029, 0 0 40px #81c029'
                  }}></div>

                  {/* Stickpack Container */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* 3D Stickpack SVG */}
                    <svg width="180" height="350" viewBox="0 0 180 350" fill="none" className="relative z-10">
                      {/* Stickpack Shadow/Base */}
                      <ellipse cx="90" cy="325" rx="30" ry="8" fill="rgba(129, 192, 41, 0.2)"/>
                      
                      {/* Main Stickpack Body - Thin rectangular packet */}
                      <defs>
                        <linearGradient id="packShine" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{ stopColor: 'rgba(200, 200, 200, 0.2)', stopOpacity: 1 }} />
                          <stop offset="15%" style={{ stopColor: 'rgba(230, 230, 230, 0.4)', stopOpacity: 1 }} />
                          <stop offset="30%" style={{ stopColor: 'rgba(210, 210, 210, 0.3)', stopOpacity: 1 }} />
                          <stop offset="70%" style={{ stopColor: 'rgba(210, 210, 210, 0.3)', stopOpacity: 1 }} />
                          <stop offset="85%" style={{ stopColor: 'rgba(230, 230, 230, 0.4)', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: 'rgba(200, 200, 200, 0.2)', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      
                      {/* Stickpack main body with pillow shape */}
                      <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" 
                        fill={"rgba(220, 220, 220, 0.3)"}
                        stroke={"rgba(100, 100, 100, 0.5)"}
                        strokeWidth="1.5"/>
                      
                      {/* Shine overlay for 3D effect */}
                      <rect x="60" y="90" width="60" height="210" fill="url(#packShine)"/>
                      
                      {/* Left edge highlight */}
                      <path d="M65 85 L65 305" 
                        stroke={"rgba(255, 255, 255, 0.7)"}
                        strokeWidth="2" 
                        strokeLinecap="round"/>
                      
                      {/* Right edge shadow */}
                      <path d="M115 85 L115 305" 
                        stroke="rgba(0, 0, 0, 0.15)"
                        strokeWidth="1.5" 
                        strokeLinecap="round"/>
                      
                      {/* Top seal area with notch */}
                      <g>
                        {/* Tear notch - small triangle cut at top */}
                        <path d="M85 65 L90 75 L95 65 Z" 
                          fill={"rgba(150, 150, 150, 0.3)"}
                          stroke={"rgba(100, 100, 100, 0.5)"}
                          strokeWidth="1"/>
                        
                        {/* Top seal flap */}
                        <rect x="65" y="65" width="50" height="15" rx="2"
                          fill={"rgba(200, 200, 200, 0.35)"}
                          stroke={"rgba(100, 100, 100, 0.5)"}
                          strokeWidth="1.5"/>
                        
                        {/* Seal lines - horizontal ridges */}
                        <line x1="68" y1="70" x2="112" y2="70" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                        <line x1="68" y1="73" x2="112" y2="73" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                        <line x1="68" y1="76" x2="112" y2="76" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                      </g>
                      
                      {/* Bottom seal area */}
                      <rect x="65" y="310" width="50" height="12" rx="2"
                        fill={"rgba(200, 200, 200, 0.35)"}
                        stroke={"rgba(100, 100, 100, 0.5)"}
                        strokeWidth="1.5"/>
                      
                      {/* Bottom seal lines */}
                      <line x1="68" y1="313" x2="112" y2="313" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                      <line x1="68" y1="316" x2="112" y2="316" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                      <line x1="68" y1="319" x2="112" y2="319" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>

                      {/* Label Area - Multiple rotating labels for stickpack - Full body coverage */}
                      <g className="label-1">
                        {/* Main label with gradient - covers full stickpack body */}
                        <defs>
                          <linearGradient id="stickpackGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'rgba(80, 130, 25, 0.95)', stopOpacity: 1 }} />
                            <stop offset="10%" style={{ stopColor: 'rgba(110, 170, 35, 0.98)', stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: 'rgba(129, 192, 41, 1)', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: 'rgba(140, 205, 50, 1)', stopOpacity: 1 }} />
                            <stop offset="75%" style={{ stopColor: 'rgba(129, 192, 41, 1)', stopOpacity: 1 }} />
                            <stop offset="90%" style={{ stopColor: 'rgba(110, 170, 35, 0.98)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(80, 130, 25, 0.95)', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        {/* Full body label path matching the stickpack shape exactly */}
                        <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" 
                          fill="url(#stickpackGrad1)"/>
                        
                        {/* Logo Image */}
                        <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                        
                        {/* Brand Name */}
                        <text x="90" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Gotham, sans-serif" letterSpacing="0.5">APEX</text>
                        <text x="90" y="167" textAnchor="middle" fill="white" fontSize="10" fontWeight="300" fontFamily="Raleway, sans-serif" letterSpacing="0.5">NUTRA</text>
                        
                        {/* Product Name */}
                        <text x="90" y="200" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">PREMIUM</text>
                        <text x="90" y="211" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">FORMULA</text>
                        
                        <rect x="72" y="225" width="36" height="1" fill="rgba(255,255,255,0.5)"/>
                        <text x="90" y="245" textAnchor="middle" fill="white" fontSize="7">Stickpack</text>
                        <text x="90" y="258" textAnchor="middle" fill="white" fontSize="6">Single Serve</text>
                      </g>

                      <g className="label-2">
                        <defs>
                          <linearGradient id="stickpackGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'rgba(40, 100, 30, 0.95)', stopOpacity: 1 }} />
                            <stop offset="10%" style={{ stopColor: 'rgba(50, 125, 40, 0.98)', stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: 'rgba(59, 144, 50, 1)', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: 'rgba(70, 160, 60, 1)', stopOpacity: 1 }} />
                            <stop offset="75%" style={{ stopColor: 'rgba(59, 144, 50, 1)', stopOpacity: 1 }} />
                            <stop offset="90%" style={{ stopColor: 'rgba(50, 125, 40, 0.98)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(40, 100, 30, 0.95)', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#stickpackGrad2)"/>
                        <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                        <text x="90" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Gotham, sans-serif" letterSpacing="0.5">APEX</text>
                        <text x="90" y="167" textAnchor="middle" fill="white" fontSize="10" fontWeight="300" fontFamily="Raleway, sans-serif" letterSpacing="0.5">NUTRA</text>
                        <text x="90" y="200" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">ENERGY</text>
                        <text x="90" y="211" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">BOOST</text>
                        <rect x="72" y="225" width="36" height="1" fill="rgba(255,255,255,0.5)"/>
                        <text x="90" y="245" textAnchor="middle" fill="white" fontSize="7">Stickpack</text>
                        <text x="90" y="258" textAnchor="middle" fill="white" fontSize="6">Single Serve</text>
                      </g>

                      <g className="label-3">
                        <defs>
                          <linearGradient id="stickpackGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'rgba(70, 120, 30, 0.95)', stopOpacity: 1 }} />
                            <stop offset="10%" style={{ stopColor: 'rgba(85, 145, 35, 0.98)', stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: 'rgba(100, 170, 40, 1)', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: 'rgba(110, 185, 48, 1)', stopOpacity: 1 }} />
                            <stop offset="75%" style={{ stopColor: 'rgba(100, 170, 40, 1)', stopOpacity: 1 }} />
                            <stop offset="90%" style={{ stopColor: 'rgba(85, 145, 35, 0.98)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(70, 120, 30, 0.95)', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#stickpackGrad3)"/>
                        <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                        <text x="90" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Gotham, sans-serif" letterSpacing="0.5">APEX</text>
                        <text x="90" y="167" textAnchor="middle" fill="white" fontSize="10" fontWeight="300" fontFamily="Raleway, sans-serif" letterSpacing="0.5">NUTRA</text>
                        <text x="90" y="200" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">WELLNESS</text>
                        <text x="90" y="211" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">BLEND</text>
                        <rect x="72" y="225" width="36" height="1" fill="rgba(255,255,255,0.5)"/>
                        <text x="90" y="245" textAnchor="middle" fill="white" fontSize="7">Stickpack</text>
                        <text x="90" y="258" textAnchor="middle" fill="white" fontSize="6">Single Serve</text>
                      </g>

                      <g className="label-4">
                        <defs>
                          <linearGradient id="stickpackGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'rgba(220, 220, 220, 0.98)', stopOpacity: 1 }} />
                            <stop offset="10%" style={{ stopColor: 'rgba(240, 240, 240, 1)', stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: 'rgba(255, 255, 255, 1)', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: 'rgba(255, 255, 255, 1)', stopOpacity: 1 }} />
                            <stop offset="75%" style={{ stopColor: 'rgba(255, 255, 255, 1)', stopOpacity: 1 }} />
                            <stop offset="90%" style={{ stopColor: 'rgba(240, 240, 240, 1)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(220, 220, 220, 0.98)', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#stickpackGrad4)"/>
                        <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                        <text x="90" y="155" textAnchor="middle" fill="#161616" fontSize="10" fontWeight="700" fontFamily="Gotham, sans-serif" letterSpacing="0.5">APEX</text>
                        <text x="90" y="167" textAnchor="middle" fill="#161616" fontSize="10" fontWeight="300" fontFamily="Raleway, sans-serif" letterSpacing="0.5">NUTRA</text>
                        <text x="90" y="200" textAnchor="middle" fill="#3b9032" fontSize="8" fontWeight="600">MUSCLE</text>
                        <text x="90" y="211" textAnchor="middle" fill="#3b9032" fontSize="8" fontWeight="600">BUILDER</text>
                        <rect x="72" y="225" width="36" height="1" fill="rgba(59,144,50,0.5)"/>
                        <text x="90" y="245" textAnchor="middle" fill="#3b9032" fontSize="7">Stickpack</text>
                        <text x="90" y="258" textAnchor="middle" fill="#3b9032" fontSize="6">Single Serve</text>
                      </g>

                      <g className="label-5">
                        <defs>
                          <linearGradient id="stickpackGrad5" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'rgba(75, 95, 30, 0.95)', stopOpacity: 1 }} />
                            <stop offset="10%" style={{ stopColor: 'rgba(95, 115, 40, 0.98)', stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: 'rgba(115, 135, 50, 1)', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: 'rgba(130, 150, 60, 1)', stopOpacity: 1 }} />
                            <stop offset="75%" style={{ stopColor: 'rgba(115, 135, 50, 1)', stopOpacity: 1 }} />
                            <stop offset="90%" style={{ stopColor: 'rgba(95, 115, 40, 0.98)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(75, 95, 30, 0.95)', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#stickpackGrad5)"/>
                        <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                        <text x="90" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Gotham, sans-serif" letterSpacing="0.5">APEX</text>
                        <text x="90" y="167" textAnchor="middle" fill="white" fontSize="10" fontWeight="300" fontFamily="Raleway, sans-serif" letterSpacing="0.5">NUTRA</text>
                        <text x="90" y="200" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">RECOVERY</text>
                        <text x="90" y="211" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">PLUS</text>
                        <rect x="72" y="225" width="36" height="1" fill="rgba(255,255,255,0.5)"/>
                        <text x="90" y="245" textAnchor="middle" fill="white" fontSize="7">Stickpack</text>
                        <text x="90" y="258" textAnchor="middle" fill="white" fontSize="6">Single Serve</text>
                      </g>
                    </svg>

                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-500 opacity-50"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-green-500 opacity-50"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-green-500 opacity-50"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-green-500 opacity-50"></div>

                    {/* Scan Data Points */}
                    <div className="absolute top-20 right-8 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <div className="text-xs text-green-500 font-mono">SCAN</div>
                    </div>
                    <div className="absolute bottom-20 left-8 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <div className="text-xs text-green-500 font-mono">QA</div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Content Side */}
              <div className={`section-animate animate-slideInRight stagger-2 ${visibleSections.has('mission') ? 'visible' : ''}`}>
                  <div className="mb-6 inline-flex relative rounded-full p-1" style={{ 
                    backgroundColor: 'rgba(59, 144, 50, 0.15)',
                    border: `2px solid ${'#3b9032'}`
                  }}>
                    <div 
                      className="absolute rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: '#3b9032',
                        height: 'calc(100% - 8px)',
                        width: 'calc(50% - 4px)',
                        top: '4px',
                        left: activeTab === 'mission' ? '4px' : 'calc(50% + 0px)',
                        zIndex: 0
                      }}
                    />
                    <button
                      onClick={() => setActiveTab('mission')}
                      className="relative text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300"
                      style={{ 
                        color: activeTab === 'mission' ? '#ffffff' : ('#3b9032'),
                        zIndex: 1,
                        minWidth: '110px',
                        padding: '8px 16px'
                      }}
                    >
                      Mission
                    </button>
                    <button
                      onClick={() => setActiveTab('vision')}
                      className="relative text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300"
                      style={{ 
                        color: activeTab === 'vision' ? '#ffffff' : ('#3b9032'),
                        zIndex: 1,
                        minWidth: '110px',
                        padding: '8px 16px'
                      }}
                    >
                      Vision
                    </button>
                  </div>
                  
                  <div style={{ minHeight: '400px' }}>
                    {activeTab === 'mission' ? (
                      <>
                        <h2 
                          className="text-5xl lg:text-6xl font-bold mb-8 leading-tight"
                          style={{ color: '#161616' }}
                        >
                          Excellence in Every
                          <br />
                          <span 
                            style={{
                              backgroundImage: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            Product
                          </span>
                        </h2>
                        
                        <p 
                          className="text-xl lg:text-2xl leading-relaxed"
                          style={{ color: '#4b5563' }}
                        >
                          To deliver exceptional products with rapid turnaround times, utilizing only the highest-quality ingredients that our clients can trust.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 mt-8">
                          <div 
                            className="px-5 py-3 rounded-full text-sm font-semibold"
                            style={{
                              background: 'rgba(59, 144, 50, 0.1)',
                              color: '#3b9032',
                              border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                            }}
                          >
                            Exceptional Quality
                          </div>
                          <div 
                            className="px-5 py-3 rounded-full text-sm font-semibold"
                            style={{
                              background: 'rgba(59, 144, 50, 0.1)',
                              color: '#3b9032',
                              border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                            }}
                          >
                            Rapid Turnaround
                          </div>
                          <div 
                            className="px-5 py-3 rounded-full text-sm font-semibold"
                            style={{
                              background: 'rgba(59, 144, 50, 0.1)',
                              color: '#3b9032',
                              border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                            }}
                          >
                            Trusted Ingredients
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 
                          className="text-5xl lg:text-6xl font-bold mb-8 leading-tight"
                          style={{ color: '#161616' }}
                        >
                          Leading the{' '}
                          <span 
                            style={{
                              backgroundImage: 'linear-gradient(135deg, #81c029 0%, #3b9032 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            Future
                          </span>
                        </h2>
                        
                        <p 
                          className="text-xl lg:text-2xl leading-relaxed"
                          style={{ color: '#4b5563' }}
                        >
                          To become Utah's premier nutraceutical partner, empowering brands worldwide through sustainable growth, cutting-edge manufacturing, and unwavering integrity.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 mt-8">
                          <div 
                            className="px-5 py-3 rounded-full text-sm font-semibold"
                            style={{
                              background: 'rgba(59, 144, 50, 0.1)',
                              color: '#3b9032',
                              border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                            }}
                          >
                            #1 in Utah
                          </div>
                          <div 
                            className="px-5 py-3 rounded-full text-sm font-semibold"
                            style={{
                              background: 'rgba(59, 144, 50, 0.1)',
                              color: '#3b9032',
                              border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                            }}
                          >
                            Global Reach
                          </div>
                          <div 
                            className="px-5 py-3 rounded-full text-sm font-semibold"
                            style={{
                              background: 'rgba(59, 144, 50, 0.1)',
                              color: '#3b9032',
                              border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                            }}
                          >
                            100% Integrity
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

          {/* Mobile Layout */}
          <div className={`lg:hidden text-center section-animate animate-fadeInUp stagger-1 ${visibleSections.has('mission') ? 'visible' : ''}`}>
            <div>
              <div className="inline-flex relative rounded-full p-1 mb-2" style={{ 
                backgroundColor: 'rgba(59, 144, 50, 0.15)',
                border: `2px solid ${'#3b9032'}`
              }}>
                <div 
                  className="absolute rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: '#3b9032',
                    height: 'calc(100% - 8px)',
                    width: 'calc(50% - 4px)',
                    top: '4px',
                    left: activeTab === 'mission' ? '4px' : 'calc(50% + 0px)',
                    zIndex: 0
                  }}
                />
                <button
                  onClick={() => setActiveTab('mission')}
                  className="relative text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300"
                  style={{ 
                    color: activeTab === 'mission' ? '#ffffff' : ('#3b9032'),
                    zIndex: 1,
                    minWidth: '90px',
                    padding: '8px 12px'
                  }}
                >
                  Mission
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className="relative text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300"
                  style={{ 
                    color: activeTab === 'vision' ? '#ffffff' : ('#3b9032'),
                    zIndex: 1,
                    minWidth: '90px',
                    padding: '8px 12px'
                  }}
                >
                  Vision
                </button>
              </div>
              
              <div>
                {activeTab === 'mission' ? (
                  <h2 
                    className="text-3xl sm:text-4xl font-bold mb-2 leading-tight"
                    style={{ color: '#161616' }}
                  >
                    Excellence in Every
                    <br />
                    <span 
                      style={{
                        backgroundImage: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Product
                    </span>
                  </h2>
                ) : (
                  <h2 
                    className="text-3xl sm:text-4xl font-bold mb-2 leading-tight"
                    style={{ color: '#161616' }}
                  >
                    Leading the{' '}
                    <span 
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #81c029 0%, #3b9032 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Future
                    </span>
                  </h2>
                )}
              </div>
            </div>

            {/* Mobile Stickpack Scanner */}
            <div className="flex justify-center mb-8">
              <div className="relative scan-container" style={{
                width: '200px',
                height: '300px',
                borderRadius: '15px',
                border: '2px solid rgba(129, 192, 41, 0.3)',
                background: 'rgba(255, 255, 255, 0.5)',
                overflow: 'hidden'
              }}>
                <div className="scan-line absolute w-full h-1 left-0 top-0 z-20" style={{
                  background: 'linear-gradient(90deg, transparent, #81c029, transparent)',
                  boxShadow: '0 0 15px #81c029'
                }}></div>

                <div className="relative w-full h-full flex items-center justify-center">
                  <svg width="120" height="230" viewBox="0 0 180 350" fill="none" className="relative z-10">
                    {/* Gradient Definitions for Labels and Stickpack - Mobile */}
                    <defs>
                      <linearGradient id="mobilePackShine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgba(200, 200, 200, 0.2)', stopOpacity: 1 }} />
                        <stop offset="15%" style={{ stopColor: 'rgba(230, 230, 230, 0.4)', stopOpacity: 1 }} />
                        <stop offset="30%" style={{ stopColor: 'rgba(210, 210, 210, 0.3)', stopOpacity: 1 }} />
                        <stop offset="70%" style={{ stopColor: 'rgba(210, 210, 210, 0.3)', stopOpacity: 1 }} />
                        <stop offset="85%" style={{ stopColor: 'rgba(230, 230, 230, 0.4)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(200, 200, 200, 0.2)', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="mobileCylinderGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgba(80, 130, 25, 0.95)', stopOpacity: 1 }} />
                        <stop offset="10%" style={{ stopColor: 'rgba(110, 170, 35, 0.98)', stopOpacity: 1 }} />
                        <stop offset="25%" style={{ stopColor: 'rgba(129, 192, 41, 1)', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: 'rgba(140, 205, 50, 1)', stopOpacity: 1 }} />
                        <stop offset="75%" style={{ stopColor: 'rgba(129, 192, 41, 1)', stopOpacity: 1 }} />
                        <stop offset="90%" style={{ stopColor: 'rgba(110, 170, 35, 0.98)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(80, 130, 25, 0.95)', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="mobileCylinderGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgba(40, 100, 30, 0.95)', stopOpacity: 1 }} />
                        <stop offset="10%" style={{ stopColor: 'rgba(50, 125, 40, 0.98)', stopOpacity: 1 }} />
                        <stop offset="25%" style={{ stopColor: 'rgba(59, 144, 50, 1)', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: 'rgba(70, 160, 60, 1)', stopOpacity: 1 }} />
                        <stop offset="75%" style={{ stopColor: 'rgba(59, 144, 50, 1)', stopOpacity: 1 }} />
                        <stop offset="90%" style={{ stopColor: 'rgba(50, 125, 40, 0.98)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(40, 100, 30, 0.95)', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="mobileCylinderGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgba(70, 120, 30, 0.95)', stopOpacity: 1 }} />
                        <stop offset="10%" style={{ stopColor: 'rgba(85, 145, 35, 0.98)', stopOpacity: 1 }} />
                        <stop offset="25%" style={{ stopColor: 'rgba(100, 170, 40, 1)', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: 'rgba(110, 185, 48, 1)', stopOpacity: 1 }} />
                        <stop offset="75%" style={{ stopColor: 'rgba(100, 170, 40, 1)', stopOpacity: 1 }} />
                        <stop offset="90%" style={{ stopColor: 'rgba(85, 145, 35, 0.98)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(70, 120, 30, 0.95)', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="mobileCylinderGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgba(220, 220, 220, 0.98)', stopOpacity: 1 }} />
                        <stop offset="10%" style={{ stopColor: 'rgba(240, 240, 240, 1)', stopOpacity: 1 }} />
                        <stop offset="25%" style={{ stopColor: 'rgba(255, 255, 255, 1)', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: 'rgba(255, 255, 255, 1)', stopOpacity: 1 }} />
                        <stop offset="75%" style={{ stopColor: 'rgba(255, 255, 255, 1)', stopOpacity: 1 }} />
                        <stop offset="90%" style={{ stopColor: 'rgba(240, 240, 240, 1)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(220, 220, 220, 0.98)', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="mobileCylinderGrad5" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgba(75, 95, 30, 0.95)', stopOpacity: 1 }} />
                        <stop offset="10%" style={{ stopColor: 'rgba(95, 115, 40, 0.98)', stopOpacity: 1 }} />
                        <stop offset="25%" style={{ stopColor: 'rgba(115, 135, 50, 1)', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: 'rgba(130, 150, 60, 1)', stopOpacity: 1 }} />
                        <stop offset="75%" style={{ stopColor: 'rgba(115, 135, 50, 1)', stopOpacity: 1 }} />
                        <stop offset="90%" style={{ stopColor: 'rgba(95, 115, 40, 0.98)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(75, 95, 30, 0.95)', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Mobile Stickpack Structure */}
                    <ellipse cx="90" cy="325" rx="30" ry="8" fill="rgba(129, 192, 41, 0.2)"/>
                    <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" 
                      fill={"rgba(220, 220, 220, 0.3)"}
                      stroke={"rgba(100, 100, 100, 0.5)"}
                      strokeWidth="1.5"/>
                    <rect x="60" y="90" width="60" height="210" fill="url(#mobilePackShine)"/>
                    <path d="M65 85 L65 305" 
                      stroke={"rgba(255, 255, 255, 0.7)"}
                      strokeWidth="2" strokeLinecap="round"/>
                    <path d="M115 85 L115 305" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                    
                    {/* Top seal */}
                    <g>
                      <path d="M85 65 L90 75 L95 65 Z" 
                        fill={"rgba(150, 150, 150, 0.3)"}
                        stroke={"rgba(100, 100, 100, 0.5)"}
                        strokeWidth="1"/>
                      <rect x="65" y="65" width="50" height="15" rx="2"
                        fill={"rgba(200, 200, 200, 0.35)"}
                        stroke={"rgba(100, 100, 100, 0.5)"}
                        strokeWidth="1.5"/>
                      <line x1="68" y1="70" x2="112" y2="70" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                      <line x1="68" y1="73" x2="112" y2="73" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                      <line x1="68" y1="76" x2="112" y2="76" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                    </g>
                    
                    {/* Bottom seal */}
                    <rect x="65" y="310" width="50" height="12" rx="2"
                      fill={"rgba(200, 200, 200, 0.35)"}
                      stroke={"rgba(100, 100, 100, 0.5)"}
                      strokeWidth="1.5"/>
                    <line x1="68" y1="313" x2="112" y2="313" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                    <line x1="68" y1="316" x2="112" y2="316" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>
                    <line x1="68" y1="319" x2="112" y2="319" stroke={"rgba(100, 100, 100, 0.3)"} strokeWidth="0.5"/>

                    <g className="label-1">
                      <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#mobileCylinderGrad1)"/>
                      <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                      <text x="90" y="152" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Gotham, sans-serif">APEX</text>
                      <text x="90" y="163" textAnchor="middle" fill="white" fontSize="9" fontWeight="300" fontFamily="Raleway, sans-serif">NUTRA</text>
                      <text x="90" y="190" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">PREMIUM</text>
                      <text x="90" y="200" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">FORMULA</text>
                      <rect x="72" y="212" width="36" height="1" fill="rgba(255,255,255,0.5)"/>
                      <text x="90" y="230" textAnchor="middle" fill="white" fontSize="6">Stickpack</text>
                    </g>

                    <g className="label-2">
                      <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#mobileCylinderGrad2)"/>
                      <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                      <text x="90" y="152" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Gotham, sans-serif">APEX</text>
                      <text x="90" y="163" textAnchor="middle" fill="white" fontSize="9" fontWeight="300" fontFamily="Raleway, sans-serif">NUTRA</text>
                      <text x="90" y="190" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">ENERGY</text>
                      <text x="90" y="200" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">BOOST</text>
                      <rect x="72" y="212" width="36" height="1" fill="rgba(255,255,255,0.5)"/>
                      <text x="90" y="230" textAnchor="middle" fill="white" fontSize="6">Stickpack</text>
                    </g>

                    <g className="label-3">
                      <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#mobileCylinderGrad3)"/>
                      <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                      <text x="90" y="152" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Gotham, sans-serif">APEX</text>
                      <text x="90" y="163" textAnchor="middle" fill="white" fontSize="9" fontWeight="300" fontFamily="Raleway, sans-serif">NUTRA</text>
                      <text x="90" y="190" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">WELLNESS</text>
                      <text x="90" y="200" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">BLEND</text>
                      <rect x="72" y="212" width="36" height="1" fill="rgba(255,255,255,0.5)"/>
                      <text x="90" y="230" textAnchor="middle" fill="white" fontSize="6">Stickpack</text>
                    </g>

                    <g className="label-4">
                      <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#mobileCylinderGrad4)"/>
                      <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                      <text x="90" y="152" textAnchor="middle" fill="#161616" fontSize="9" fontWeight="700" fontFamily="Gotham, sans-serif">APEX</text>
                      <text x="90" y="163" textAnchor="middle" fill="#161616" fontSize="9" fontWeight="300" fontFamily="Raleway, sans-serif">NUTRA</text>
                      <text x="90" y="190" textAnchor="middle" fill="#3b9032" fontSize="7" fontWeight="600">MUSCLE</text>
                      <text x="90" y="200" textAnchor="middle" fill="#3b9032" fontSize="7" fontWeight="600">BUILDER</text>
                      <rect x="72" y="212" width="36" height="1" fill="rgba(59,144,50,0.5)"/>
                      <text x="90" y="230" textAnchor="middle" fill="#3b9032" fontSize="6">Stickpack</text>
                    </g>

                    <g className="label-5">
                      <path d="M65 80 Q60 80 60 90 L60 300 Q60 310 65 310 L115 310 Q120 310 120 300 L120 90 Q120 80 115 80 Z" fill="url(#mobileCylinderGrad5)"/>
                      <image href="/logo.png" x="78" y="115" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
                      <text x="90" y="152" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Gotham, sans-serif">APEX</text>
                      <text x="90" y="163" textAnchor="middle" fill="white" fontSize="9" fontWeight="300" fontFamily="Raleway, sans-serif">NUTRA</text>
                      <text x="90" y="190" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">RECOVERY</text>
                      <text x="90" y="200" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">PLUS</text>
                      <rect x="72" y="212" width="36" height="1" fill="rgba(255,255,255,0.5)"/>
                      <text x="90" y="230" textAnchor="middle" fill="white" fontSize="6">Stickpack</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              {activeTab === 'mission' ? (
                <>
                  <p 
                    className="text-base sm:text-lg leading-relaxed mb-4 px-4"
                    style={{ color: '#6b7280' }}
                  >
                    To deliver exceptional products with rapid turnaround times, utilizing only the highest-quality ingredients that our clients can trust.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 px-4">
                    <div className="px-4 py-2 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(59, 144, 50, 0.15)',
                        color: '#3b9032',
                        border: `1px solid ${'rgba(59, 144, 50, 0.25)'}`
                      }}>
                      Exceptional Quality
                    </div>
                    <div className="px-4 py-2 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(59, 144, 50, 0.15)',
                        color: '#3b9032',
                        border: `1px solid ${'rgba(59, 144, 50, 0.25)'}`
                      }}>
                      Rapid Turnaround
                    </div>
                    <div className="px-4 py-2 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(59, 144, 50, 0.15)',
                        color: '#3b9032',
                        border: `1px solid ${'rgba(59, 144, 50, 0.25)'}`
                      }}>
                      Trusted Ingredients
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p 
                    className="text-base sm:text-lg leading-relaxed mb-4 px-4"
                    style={{ color: '#6b7280' }}
                  >
                    To become Utah's premier nutraceutical partner, empowering brands worldwide through sustainable growth, cutting-edge manufacturing, and unwavering integrity.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 px-4">
                    <div className="px-4 py-2 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(59, 144, 50, 0.15)',
                        color: '#3b9032',
                        border: `1px solid ${'rgba(59, 144, 50, 0.25)'}`
                      }}>
                      #1 in Utah
                    </div>
                    <div className="px-4 py-2 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(59, 144, 50, 0.15)',
                        color: '#3b9032',
                        border: `1px solid ${'rgba(59, 144, 50, 0.25)'}`
                      }}>
                      Global Reach
                    </div>
                    <div className="px-4 py-2 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(59, 144, 50, 0.15)',
                        color: '#3b9032',
                        border: `1px solid ${'rgba(59, 144, 50, 0.25)'}`
                      }}>
                      100% Integrity
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Owner's Profile Section - Minimalist Modern */}
      <div 
        data-section="owners"
        className="relative pt-4 pb-4 sm:pt-6 sm:pb-6 lg:pt-8 lg:pb-8 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-6 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('owners') ? 'visible' : ''}`}>
            <span 
              className="inline-block text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-4 sm:mb-6"
              style={{ 
                color: '#3b9032',
                backgroundColor: 'rgba(59, 144, 50, 0.1)'
              }}
            >
              Leadership
            </span>

            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4"
              style={{ color: '#161616' }}
            >
              Meet the Visionaries
              <br />
              <span 
                style={{
                  backgroundImage: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Behind the Brand
              </span>
            </h2>
          </div>

          {/* Clean Two-Column Layout */}
          <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8 lg:gap-12 px-4">
              {/* Kim Wybrow */}
              <div className={`group text-center section-animate animate-scaleIn stagger-2 ${visibleSections.has('owners') ? 'visible' : ''}`}>
                {/* Large Avatar */}
                <div 
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(59, 144, 50, 0.08)',
                    border: `3px solid ${'#3b9032'}`,
                    boxShadow: `0 4px 20px ${'rgba(59, 144, 50, 0.1)'}`
                  }}
                >
                  {/* Profile Icon SVG */}
                  <svg 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={'#3b9032'}
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="8" r="4" fill={'#3b9032'} />
                    <path d="M4 20c0-4 3-6 8-6s8 2 8 6" strokeLinecap="round" />
                  </svg>
                </div>
                
                {/* Info */}
                <h3 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2"
                  style={{ color: '#161616' }}
                >
                  Kim Wybrow
                </h3>
              </div>

              {/* Jeannette Wybrow */}
              <div className={`group text-center section-animate animate-scaleIn stagger-3 ${visibleSections.has('owners') ? 'visible' : ''}`}>
                {/* Large Avatar */}
                <div 
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(59, 144, 50, 0.08)',
                    border: `3px solid ${'#3b9032'}`,
                    boxShadow: `0 4px 20px ${'rgba(59, 144, 50, 0.1)'}`
                  }}
                >
                  {/* Profile Icon SVG */}
                  <svg 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={'#3b9032'}
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="8" r="4" fill={'#3b9032'} />
                    <path d="M4 20c0-4 3-6 8-6s8 2 8 6" strokeLinecap="round" />
                  </svg>
                </div>
                
                {/* Info */}
                <h3 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2"
                  style={{ color: '#161616' }}
                >
                  Jeannette Wybrow
                </h3>
              </div>
            </div>
          </div>

          {/* Simple Bio */}
          <div className={`max-w-3xl mx-auto text-center px-6 sm:px-8 section-animate animate-fadeInUp stagger-4 ${visibleSections.has('owners') ? 'visible' : ''}`}>
            <p 
              className="text-sm sm:text-base lg:text-lg leading-relaxed"
              style={{ color: '#6b7280' }}
            >
              Kim and Jeannette Wybrow bring over 20 years of hands-on experience in the nutraceutical industry. Their profound understanding spans formulation, regulatory compliance, and scalable production, ensuring Apex Nutra delivers excellence and exceeds industry standards through quality-driven partnerships.
            </p>
          </div>
        </div>
      </div>

      {/* Letter of Reference Section */}
      <div 
        id="reference"
        data-section="reference"
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-8 sm:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('reference') ? 'visible' : ''}`}>
            <span 
              className="inline-block text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-6"
              style={{ 
                color: '#3b9032',
                backgroundColor: 'rgba(59, 144, 50, 0.1)'
              }}
            >
              Letter of Reference
            </span>

            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              style={{ color: '#161616' }}
            >
              For{' '}
              <span 
                style={{
                  backgroundImage: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Mr. Kim Wybrow
              </span>
            </h2>
            <p 
              className="text-lg"
              style={{ color: '#6b7280' }}
            >
              Founder of Apex Nutra LLC
            </p>
          </div>

          {/* Letter Content */}
          <div className={`section-animate animate-fadeInUp stagger-2 ${visibleSections.has('reference') ? 'visible' : ''}`}>
            <div 
              className="relative rounded-2xl p-6 sm:p-8 lg:p-10"
              style={{
                backgroundColor: '#ffffff',
                border: `2px solid ${'rgba(59, 144, 50, 0.2)'}`,
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Quote Icon */}
              <div 
                className="absolute top-6 left-6 opacity-10"
              >
                <svg width="64" height="64" viewBox="0 0 48 48" fill={'#3b9032'}>
                  <path d="M12 34h6l4-8V14H10v12h6zm16 0h6l4-8V14H26v12h6z" opacity="0.3"/>
                </svg>
              </div>

              {/* Letter Text */}
              <div 
                className="relative z-10 space-y-6 text-base sm:text-lg leading-relaxed"
                style={{ color: '#4b5563' }}
              >
                <p className="font-semibold italic" style={{ color: '#161616' }}>
                  I am pleased to provide this letter of reference for Mr. Kim Wybrow, Founder of Apex Nutra LLC.
                </p>

                <p>
                  Kim began working with me at Global Health Industries around 2010, initially joining our team in a maintenance role. From the very beginning, his work ethic, mechanical aptitude, and problem-solving mindset set him apart. Through dedication and natural ability, he steadily advanced within the company and ultimately became Director.
                </p>

                <p>
                  Kim proved to be a natural mechanical engineer with a strong talent for process development. He played a key role in supporting both production and R&D by improving manufacturing techniques and contributing to the development of new products and technologies. He consistently sought out knowledge, attending nearly every industry training course available, and he made a point of bringing that expertise back to our production and development teams—raising the overall capability of the organization.
                </p>

                <p>
                  Today, Kim has built Apex Nutra into his own contract manufacturing company, and it has been incredibly rewarding to watch his personal growth and the development of his own legacy. He is a hands-on owner who genuinely cares about his team and operates his business with honesty, transparency, and straightforward integrity.
                </p>

                <p>
                  I have great respect for Kim as both a professional and a person, and I sincerely wish him continued success in the future with Apex Nutra.
                </p>
              </div>

              {/* Decorative Line */}
              <div 
                className="mt-8 w-24 h-1"
                style={{
                  background: 'linear-gradient(90deg, #3b9032, #81c029)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div 
        data-section="team"
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-6 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('team') ? 'visible' : ''}`}>
            <span 
              className="inline-block text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-6"
              style={{ 
                color: '#3b9032',
                backgroundColor: 'rgba(59, 144, 50, 0.1)'
              }}
            >
              Our Team
            </span>

            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: '#161616' }}
            >
              The Heart of
              <br />
              <span 
                style={{
                  backgroundImage: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Apex Nutra
              </span>
            </h2>

            <p 
              className="text-base lg:text-lg max-w-4xl mx-auto leading-relaxed"
              style={{ color: '#6b7280' }}
            >
              At Apex Nutra, our team is the heartbeat of our success. Comprising dedicated professionals with deep roots in the nutraceutical field, we foster a collaborative environment where expertise meets passion. We're currently building out detailed profiles for key members, including areas of expertise in formulation, quality control, and operations.
            </p>
          </div>

          {/* Team Grid */}
          <div className={`section-animate animate-scaleIn stagger-2 ${visibleSections.has('team') ? 'visible' : ''}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {[
                { name: 'Joseph Cronen', role: 'Quality Manager', gender: 'male' },
                { name: 'Lili Flores', role: 'Production Manager', gender: 'female' },
                { name: 'Trevor Greenwell', role: 'Continues Improvement', gender: 'female' },
                { name: 'Manuel Vasquez', role: 'Maintenance/Engineering', gender: 'male' },
                { name: 'Leslie Calles', role: 'Packet/Kitting', gender: 'female' }
              ].map((member, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div 
                    className="relative h-full rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff, #f3f4f6)',
                      border: `2px solid rgba(59, 144, 50, 0.3)`,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Top accent bar */}
                    <div 
                      className="h-1 w-full"
                      style={{
                        background: 'linear-gradient(90deg, #81c029, #3b9032)'
                      }}
                    />
                    
                    {/* Card content */}
                    <div className="p-6 flex flex-col items-center justify-center min-h-[280px]">
                      {/* Avatar/Profile Icon */}
                      <div 
                        className="w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, #3b9032, #81c029)',
                          boxShadow: '0 4px 20px rgba(59, 144, 50, 0.3)'
                        }}
                      >
                        {/* Profile Icon SVG */}
                        <svg 
                          className="w-14 h-14 lg:w-16 lg:h-16"
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="8" r="4" fill="#ffffff" />
                          <path d="M4 20c0-4 3-6 8-6s8 2 8 6" strokeLinecap="round" />
                        </svg>
                      </div>
                      
                      {/* Name */}
                      <h3 
                        className="text-base lg:text-lg font-bold mb-2 text-center leading-tight px-2"
                        style={{ color: '#161616' }}
                      >
                        {member.name}
                      </h3>
                      
                      {/* Role with decorative dots */}
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-1 h-1 rounded-full"
                          style={{ background: '#3b9032' }}
                        />
                        <p 
                          className="text-xs lg:text-sm font-medium text-center leading-tight px-1"
                          style={{ color: '#6b7280' }}
                        >
                          {member.role}
                        </p>
                        <div 
                          className="w-1 h-1 rounded-full"
                          style={{ background: '#3b9032' }}
                        />
                      </div>
                    </div>

                    {/* Hover gradient effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.05) 0%, transparent 100%)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Facility Preview Section */}
      <div 
        data-section="facility"
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-6 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('facility') ? 'visible' : ''}`}>
            <div className="inline-block mb-4">
              <span 
                className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.1)'
                }}
              >
                Our Facility
              </span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#161616' }}
            >
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #3b9032, #81c029)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                State-of-the-Art
              </span>{' '}
              Manufacturing
            </h2>
            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: '#6b7280' }}
            >
              Explore our advanced facility equipped with cutting-edge technology
            </p>
          </div>

          {/* Gallery Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 section-animate animate-fadeInUp stagger-2 ${visibleSections.has('facility') ? 'visible' : ''}`}>
            {[
              {
                id: 1,
                title: 'Packaging Equipment Room',
                description: 'Advanced VFFS and packaging machinery in a clean, controlled environment for precision production.',
                image: '/image%201.jpeg'
              },
              {
                id: 2,
                title: 'Multi-Lane Stickpack Machine',
                description: 'High-speed stickpack production line with multiple lanes for efficient single-serve packaging.',
                image: '/image%202.jpg'
              },
              {
                id: 3,
                title: 'Manufacturing Equipment',
                description: 'Precision machinery and production equipment ensuring consistent quality in every batch.',
                image: '/image%203.jpg'
              },
              {
                id: 4,
                title: 'Tablet Press Operation',
                description: 'State-of-the-art tablet manufacturing equipment producing high-quality supplement tablets.',
                image: '/image%204.jpg'
              }
            ].map((facility, index) => (
              <div
                key={facility.id}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: '#ffffff',
                  border: `2px solid ${'rgba(59, 144, 50, 0.15)'}`,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Facility Image */}
                <img 
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay with Title */}
                <div 
                  className="absolute inset-0 flex items-end p-4"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                  }}
                >
                  <h3 
                    className="text-sm sm:text-base font-semibold text-white"
                  >
                    {facility.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* View Machinery Button */}
          <div className="mt-8 lg:mt-16 flex justify-center px-4">
            <a
              href="/manufacturer#machinery"
              className="group inline-flex items-center gap-2 lg:gap-3 px-5 py-3 lg:px-8 lg:py-4 rounded-full font-semibold text-sm lg:text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #3b9032, #81c029)',
                color: '#ffffff',
                boxShadow: '0 4px 16px rgba(59, 144, 50, 0.3)'
              }}
            >
              <span>View Our Machinery & Technologies</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1 lg:w-5 lg:h-5"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Certified Excellence Section - Modern Layout */}
      <div 
        data-section="certifications"
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-6 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('certifications') ? 'visible' : ''}`}>
            <div className="inline-block mb-4">
              <span 
                className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.1)'
                }}
              >
                Certifications
              </span>
            </div>

            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#161616' }}
            >
              Certified for{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #3b9032, #81c029)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Excellence
              </span>
            </h2>

            <p 
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: '#6b7280' }}
            >
              Meeting the highest industry standards through rigorous compliance
            </p>
          </div>

          {/* Grid Layout */}
          <div className={`grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 section-animate animate-fadeInUp stagger-2 ${visibleSections.has('certifications') ? 'visible' : ''}`}>
            
            {/* FDA Certification Card */}
            <div 
              className="group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'rgba(59, 144, 50, 0.03)',
                border: `1px solid ${'rgba(59, 144, 50, 0.1)'}`,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: '#ffffff',
                  border: `3px solid ${'#3b9032'}`,
                  boxShadow: `0 4px 12px ${'rgba(59, 144, 50, 0.15)'}`
                }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke={'#3b9032'} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 
                className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2"
                style={{ color: '#161616' }}
              >
                FDA Certified
              </h3>

              <p 
                className="text-xs sm:text-sm mb-3 sm:mb-4"
                style={{ color: '#6b7280' }}
              >
                Fully compliant with Food & Drug Administration regulations
              </p>

              {/* Status Badge */}
              <div 
                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(59, 144, 50, 0.1)',
                  border: `1px solid ${'rgba(59, 144, 50, 0.25)'}`
                }}
              >
                <div 
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{ backgroundColor: '#3b9032' }}
                ></div>
                <span 
                  className="text-[10px] sm:text-xs font-semibold"
                  style={{ color: '#3b9032' }}
                >
                  Active
                </span>
              </div>
            </div>

            {/* Utah Dept. of Agriculture Card */}
            <div 
              className="group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'rgba(59, 144, 50, 0.03)',
                border: `1px solid ${'rgba(59, 144, 50, 0.1)'}`,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: '#ffffff',
                  border: `3px solid ${'#3b9032'}`,
                  boxShadow: `0 4px 12px ${'rgba(59, 144, 50, 0.15)'}`
                }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke={'#3b9032'} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2C9.5 4 8 7 8 10c0 3 2 5 4 5s4-2 4-5c0-3-1.5-6-4-8z"/>
                  <path d="M12 15v7M8 19h8"/>
                </svg>
              </div>

              {/* Content */}
              <h3 
                className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2"
                style={{ color: '#161616' }}
              >
                State Certified
              </h3>

              <p 
                className="text-xs sm:text-sm mb-3 sm:mb-4"
                style={{ color: '#6b7280' }}
              >
                Utah Department of Agriculture approved for state compliance
              </p>

              {/* Status Badge */}
              <div 
                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(59, 144, 50, 0.1)',
                  border: `1px solid ${'rgba(59, 144, 50, 0.25)'}`
                }}
              >
                <div 
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{ backgroundColor: '#3b9032' }}
                ></div>
                <span 
                  className="text-[10px] sm:text-xs font-semibold"
                  style={{ color: '#3b9032' }}
                >
                  Active
                </span>
              </div>
            </div>

            {/* NSF Certification Card - In Progress */}
            <div 
              className="group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 col-span-2 lg:col-span-1 max-w-sm mx-auto lg:max-w-none"
              style={{
                backgroundColor: 'rgba(59, 144, 50, 0.03)',
                border: `1px dashed ${'rgba(59, 144, 50, 0.25)'}`,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: '#ffffff',
                  border: `3px solid ${'rgba(59, 144, 50, 0.4)'}`,
                  boxShadow: `0 4px 12px ${'rgba(59, 144, 50, 0.1)'}`
                }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke={'#3b9032'} strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>

              {/* Content */}
              <h3 
                className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2"
                style={{ color: '#161616' }}
              >
                NSF Certification
              </h3>

              <p 
                className="text-xs sm:text-sm mb-3 sm:mb-4"
                style={{ color: '#6b7280' }}
              >
                Pursuing NSF International certification for quality standards
              </p>

              {/* Status Badge */}
              <div 
                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(59, 144, 50, 0.08)',
                  border: `1px solid ${'rgba(59, 144, 50, 0.2)'}`
                }}
              >
                <div 
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#3b9032' }}
                ></div>
                <span 
                  className="text-[10px] sm:text-xs font-semibold"
                  style={{ color: '#3b9032' }}
                >
                  In Progress
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Trust Banner */}
          <div 
            className="mt-8 rounded-2xl p-4 sm:p-6"
            style={{
              backgroundColor: 'rgba(59, 144, 50, 0.03)',
              border: `1px solid ${'rgba(59, 144, 50, 0.1)'}`
            }}
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#ffffff',
                    border: `2px solid ${'#3b9032'}`
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke={'#3b9032'} strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <div 
                    className="text-base sm:text-xl font-bold leading-tight"
                    style={{ color: '#3b9032' }}
                  >
                    100%
                  </div>
                  <div 
                    className="text-[10px] sm:text-xs leading-tight"
                    style={{ color: '#6b7280' }}
                  >
                    Compliant
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#ffffff',
                    border: `2px solid ${'#3b9032'}`
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke={'#3b9032'} strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <div 
                    className="text-base sm:text-xl font-bold leading-tight"
                    style={{ color: '#3b9032' }}
                  >
                    Verified
                  </div>
                  <div 
                    className="text-[10px] sm:text-xs leading-tight"
                    style={{ color: '#6b7280' }}
                  >
                    Safety Standards
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: '#ffffff',
                    border: `2px solid ${'#3b9032'}`
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke={'#3b9032'} strokeWidth="2.5">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <div 
                    className="text-base sm:text-xl font-bold leading-tight"
                    style={{ color: '#3b9032' }}
                  >
                    Trusted
                  </div>
                  <div 
                    className="text-[10px] sm:text-xs leading-tight"
                    style={{ color: '#6b7280' }}
                  >
                    Quality Partner
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="relative py-8 sm:py-12 lg:py-16 border-t" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(59, 144, 50, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    backgroundImage: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
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

