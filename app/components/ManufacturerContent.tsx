"use client";

import { useEffect, useState } from "react";

export default function ManufacturerContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  const [activeStep, setActiveStep] = useState(0);
  const [expandedMachinery, setExpandedMachinery] = useState<Set<number>>(new Set());

  const toggleMachinery = (index: number) => {
    setExpandedMachinery((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'  // Only remove when scrolled 100px past bottom
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
              // Only remove if truly out of view
              const rect = entry.target.getBoundingClientRect();
              if (rect.bottom < 0 || rect.top > window.innerHeight) {
                newSet.delete(sectionId);
              }
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

  // Auto-progress through steps when process section is visible
  useEffect(() => {
    if (visibleSections.has('process')) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 5);
      }, 3000); // Change step every 3 seconds

      return () => clearInterval(interval);
    } else {
      // Don't reset when scrolling away, keep the last step
      // This prevents the jarring reset when section goes out of view
    }
  }, [visibleSections]);

  const processSteps = [
    {
      number: "01",
      title: "Concept & Research",
      description: "We ideate and refine formulas using our in-house expertise, leveraging data-driven insights on trends, efficacy, and stability.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )
    },
    {
      number: "02",
      title: "Prototyping",
      description: "Small-scale batches are developed and tested in our state-of-the-art lab for taste, texture, and nutritional profile.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 2v6h6V2M9 8H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      )
    },
    {
      number: "03",
      title: "Quality Assurance",
      description: "Rigorous testing—including potency, purity, and contaminant checks—ensures compliance with FDA and Utah Department of Agriculture standards.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      number: "04",
      title: "Scaling & Production",
      description: "Once approved, we ramp up using our advanced stick pack and blending equipment for efficient, high output runs.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="8" width="18" height="12" rx="2"/>
          <path d="M12 8V4M9 4h6"/>
          <line x1="7" y1="14" x2="7" y2="14"/>
          <line x1="12" y1="14" x2="12" y2="14"/>
          <line x1="17" y1="14" x2="17" y2="14"/>
        </svg>
      )
    },
    {
      number: "05",
      title: "Packaging & Delivery",
      description: "Custom kitting and labeling wrap it up, with rapid turnaround to meet your timelines.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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
        .stagger-6 { animation-delay: 0.6s; }

        .icon-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes moveAlongPath {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }

        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }

        .progress-indicator {
          animation: moveAlongPath 15s linear infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div 
        data-section="hero"
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
            background: `radial-gradient(circle, rgba(59, 144, 50, 0.1), transparent)`,
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(129, 192, 41, 0.1), transparent)`,
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite 2s'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-8 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('hero') ? 'visible' : ''}`}>
            <div className="inline-block mb-6">
              <span 
                className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.1)',
                  border: `1px solid rgba(59, 144, 50, 0.2)`
                }}
              >
                Manufacturing Excellence
              </span>
            </div>
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
              style={{ color: '#161616' }}
            >
              Custom Formulation
              <br />
              <span 
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Process
              </span>
            </h1>
            
            <p 
              className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed"
              style={{ color: '#6b7280' }}
            >
              Our custom formulation process is a collaborative, end-to-end journey designed to bring your vision to life with precision and speed. It begins with a deep-dive consultation to understand your goals, target audience, and unique requirements.
            </p>
          </div>

          {/* Turnaround Time Badge */}
          <div className={`text-center section-animate animate-fadeInUp stagger-2 ${visibleSections.has('hero') ? 'visible' : ''}`}>
            <div 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))',
                border: `2px solid #3b9032`,
                boxShadow: `0 10px 40px rgba(59, 144, 50, 0.3)`
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke='#3b9032' strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <div className="text-left">
                <div className="text-2xl font-bold" style={{ color: '#3b9032' }}>
                  6-8 Weeks
                </div>
                <div className="text-sm" style={{ color: '#6b7280' }}>
                  Turnaround for Most Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps Section */}
      <div 
        data-section="process"
        className="relative py-8 sm:py-12 lg:py-16"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('process') ? 'visible' : ''}`}>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: '#161616' }}
            >
              Our{' '}
              <span 
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                5-Step Process
              </span>
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#6b7280' }}
            >
              A streamlined approach that guarantees quality, minimizes waste, and maximizes your time-to-market
            </p>
          </div>

          {/* Integrated Route with Step Details */}
          <div className="relative">
            {/* Desktop Layout - Horizontal Route with Details */}
            <div className="hidden lg:block space-y-16">
              {/* SVG Route Path */}
              <div className="relative">
                <svg 
                  className="w-full" 
                  height="140" 
                  viewBox="0 0 1200 140"
                  style={{ overflow: 'visible' }}
                >
                  {/* Background Path */}
                  <path
                    d="M 120 70 L 360 70 L 600 70 L 840 70 L 1080 70"
                    stroke='rgba(59, 144, 50, 0.2)'
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Active Progress Path */}
                  <path
                    d="M 120 70 L 360 70 L 600 70 L 840 70 L 1080 70"
                    stroke="url(#routeGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="960"
                    strokeDashoffset="960"
                    style={{
                      strokeDashoffset: `${960 - (activeStep * 240)}`,
                      transition: 'stroke-dashoffset 0.8s ease-in-out'
                    }}
                  />
                  
                  {/* Step Nodes */}
                  {[0, 1, 2, 3, 4].map((step) => (
                    <g key={step}>
                      <circle
                        cx={120 + step * 240}
                        cy="70"
                        r="24"
                        fill={activeStep >= step ? '#3b9032' : '#e5e7eb'}
                        stroke={activeStep >= step ? '#3b9032' : 'rgba(59, 144, 50, 0.3)'}
                        strokeWidth="3"
                        style={{
                          transition: 'all 0.5s ease',
                          filter: activeStep === step ? 'drop-shadow(0 0 16px rgba(129, 192, 41, 0.9))' : 'none'
                        }}
                      />
                      <text
                        x={120 + step * 240}
                        y="78"
                        textAnchor="middle"
                        fill={activeStep >= step ? '#ffffff' : '#9ca3af'}
                        fontSize="18"
                        fontWeight="bold"
                      >
                        {step + 1}
                      </text>
                    </g>
                  ))}
                  
                  {/* Moving Progress Indicator */}
                  <circle
                    cx={120 + activeStep * 240}
                    cy="70"
                    r="14"
                    fill='#3b9032'
                    style={{
                      transition: 'cx 0.8s ease-in-out',
                      filter: 'drop-shadow(0 0 24px rgba(129, 192, 41, 1))'
                    }}
                  >
                    <animate
                      attributeName="r"
                      values="14;18;14"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="1;0.6;1"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b9032" />
                      <stop offset="100%" stopColor="#81c029" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Step Details Cards positioned below nodes */}
              <div className="px-8">
                <div className="flex justify-between gap-6">
                  {processSteps.map((step, index) => {
                    const isActive = activeStep === index;
                    
                    return (
                      <div
                        key={index}
                        className="transition-all duration-500"
                        style={{
                          width: '18%',
                          opacity: isActive ? 1 : 0.5,
                          transform: isActive ? 'translateY(0) scale(1.05)' : 'translateY(10px) scale(0.95)'
                        }}
                      >
                        <div
                          className="rounded-2xl p-6"
                          style={{
                            background: isActive
                                ? 'linear-gradient(135deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))'
                                : 'linear-gradient(135deg, #ffffff, #f9fafb)',
                            border: `2px solid ${isActive ? '#3b9032' : 'rgba(59, 144, 50, 0.15)'}`,
                            boxShadow: isActive
                              ? `0 20px 50px rgba(59, 144, 50, 0.3)`
                              : 'none'
                          }}
                        >
                          {/* Icon */}
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto"
                            style={{
                              background: 'rgba(59, 144, 50, 0.1)',
                              border: `2px solid rgba(59, 144, 50, 0.2)`,
                              color: '#3b9032'
                            }}
                          >
                            {step.icon}
                          </div>

                          {/* Title */}
                          <h3 
                            className="text-lg font-bold mb-3 text-center"
                            style={{ color: '#161616' }}
                          >
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p 
                            className="text-sm leading-relaxed text-center"
                            style={{ 
                              color: '#6b7280',
                              minHeight: '100px'
                            }}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Layout - Clean Vertical Stack */}
            <div className="lg:hidden space-y-6">
              {processSteps.map((step, index) => {
                const isActive = activeStep === index;
                const isCompleted = activeStep > index;
                
                return (
                  <div key={index} className="relative">
                    {/* Connector Line (except for last item) */}
                    {index < processSteps.length - 1 && (
                      <div 
                        className="absolute left-6 top-16 w-0.5 h-full"
                        style={{
                          background: isCompleted 
                            ? `linear-gradient(180deg, #3b9032, rgba(59, 144, 50, 0.3))` 
                            : 'rgba(59, 144, 50, 0.2)',
                          marginTop: '24px'
                        }}
                      />
                    )}
                    
                    {/* Step Card */}
                    <div
                      className="relative transition-all duration-500"
                      style={{
                        opacity: isActive ? 1 : 0.7,
                        transform: isActive ? 'scale(1.02)' : 'scale(1)'
                      }}
                    >
                      <div
                        className="rounded-2xl p-5"
                        style={{
                          background: isActive
                              ? 'linear-gradient(135deg, rgba(59, 144, 50, 0.12), rgba(129, 192, 41, 0.08))'
                              : 'linear-gradient(135deg, #ffffff, #fafafa)',
                          border: `2px solid ${isActive ? '#3b9032' : 'rgba(59, 144, 50, 0.2)'}`,
                          boxShadow: isActive
                            ? `0 12px 35px rgba(59, 144, 50, 0.25)`
                            : `0 4px 15px rgba(0, 0, 0, 0.08)`
                        }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Step Number Circle */}
                          <div 
                            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative"
                            style={{
                              background: isCompleted || isActive 
                                ? `linear-gradient(135deg, #3b9032, #81c029)`
                                : '#e5e7eb',
                              border: `3px solid ${isCompleted || isActive ? '#3b9032' : 'rgba(59, 144, 50, 0.3)'}`,
                              boxShadow: isActive ? `0 0 20px rgba(59, 144, 50, 0.6)` : 'none'
                            }}
                          >
                            <span 
                              className="text-lg font-bold"
                              style={{ 
                                color: isCompleted || isActive ? '#ffffff' : '#9ca3af'
                              }}
                            >
                              {index + 1}
                            </span>
                            
                            {/* Pulsing Ring for Active Step */}
                            {isActive && (
                              <div 
                                className="absolute inset-0 rounded-full animate-ping"
                                style={{
                                  border: `2px solid #3b9032`,
                                  opacity: 0.4
                                }}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            {/* Step Number Badge */}
                            <div 
                              className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2"
                              style={{
                                background: 'rgba(59, 144, 50, 0.15)',
                                color: '#3b9032'
                              }}
                            >
                              Step {step.number}
                            </div>

                            {/* Title */}
                            <h3 
                              className="text-lg font-bold mb-2"
                              style={{ color: '#161616' }}
                            >
                              {step.title}
                            </h3>

                            {/* Icon */}
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                              style={{
                                background: 'rgba(59, 144, 50, 0.1)',
                                border: `2px solid rgba(59, 144, 50, 0.25)`,
                                color: '#3b9032'
                              }}
                            >
                              <div className="scale-90">
                                {step.icon}
                              </div>
                            </div>

                            {/* Description */}
                            <p 
                              className="text-sm leading-relaxed"
                              style={{ color: '#4b5563' }}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Machinery & Technology Section */}
      <div 
        id="machinery"
        data-section="machinery"
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 144, 50, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 144, 50, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-8 sm:mb-10 lg:mb-12 section-animate animate-fadeInDown stagger-1 ${visibleSections.has('machinery') ? 'visible' : ''}`}>
            <div className="inline-block mb-6">
              <span 
                className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.1)',
                  border: `1px solid rgba(59, 144, 50, 0.2)`
                }}
              >
                State-of-the-Art Equipment
              </span>
            </div>
            
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: '#161616' }}
            >
              Machinery &{' '}
              <span 
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Technology
              </span>
            </h2>
            
            <p 
              className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: '#6b7280' }}
            >
              Cutting-edge manufacturing equipment ensuring precision, efficiency, and uncompromising quality
            </p>
          </div>

          {/* Machinery Grid */}
          <div className={`space-y-12 lg:space-y-16 section-animate animate-fadeInUp stagger-2 ${visibleSections.has('machinery') ? 'visible' : ''}`}>
            {/* 10-Lane Stick Pack Machine */}
            <div 
              className="group relative overflow-hidden rounded-3xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.05), rgba(129, 192, 41, 0.02))',
                border: `2px solid rgba(59, 144, 50, 0.15)`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Mobile View */}
              <div className="lg:hidden">
                {/* Image + Title */}
                <div>
                  <div 
                    className="relative h-64 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/10-lane-stick-pack.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  {/* Title Section */}
                  <div className="p-6">
                    <div 
                      className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                      style={{
                        background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                        color: '#3b9032'
                      }}
                    >
                      High-Volume Production
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: '#161616' }}
                    >
                      10-Lane Stick Pack Machine
                    </h3>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => toggleMachinery(0)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-300"
                      style={{
                        background: 'rgba(59, 144, 50, 0.1)',
                        border: `2px solid rgba(59, 144, 50, 0.25)`,
                        color: '#3b9032'
                      }}
                    >
                      <span className="font-semibold text-sm">
                        {expandedMachinery.has(0) ? 'Hide Details' : 'View Details'}
                      </span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        className={`transition-transform duration-300 ${expandedMachinery.has(0) ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    {/* Expandable Details */}
                    <div 
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: expandedMachinery.has(0) ? '1000px' : '0',
                        opacity: expandedMachinery.has(0) ? 1 : 0
                      }}
                    >
                      <div className="pt-6">
                        <p 
                          className="text-base leading-relaxed mb-6"
                          style={{ color: '#6b7280' }}
                        >
                          High-volume production capability with precision filling and sealing technology, producing up to 15,000 units per hour with exceptional accuracy and reliability.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Output: Up to 15,000 units/hour
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Maximum production capacity for large-scale operations
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Multi-lane efficiency
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                10 parallel lanes ensure consistent quality across all units
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Precision dosing system
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Automated filling ensures accurate dosage in every pack
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-0">
                {/* Left: Image/Video Area */}
                <div 
                  className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/10-lane-stick-pack.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Right: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div 
                    className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4 w-fit"
                    style={{
                      background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                      color: '#3b9032'
                    }}
                  >
                    High-Volume Production
                  </div>
                  
                  <h3 
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{ color: '#161616' }}
                  >
                    10-Lane Stick Pack Machine
                  </h3>
                  
                  <p 
                    className="text-base lg:text-lg leading-relaxed mb-8"
                    style={{ color: '#6b7280' }}
                  >
                    High-volume production capability with precision filling and sealing technology, producing up to 15,000 units per hour with exceptional accuracy and reliability.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Output: Up to 15,000 units/hour
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Maximum production capacity for large-scale operations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Multi-lane efficiency
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          10 parallel lanes ensure consistent quality across all units
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Precision dosing system
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Automated filling ensures accurate dosage in every pack
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Lane Stick Pack Machine */}
            <div 
              className="group relative overflow-hidden rounded-3xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.05), rgba(129, 192, 41, 0.02))',
                border: `2px solid rgba(59, 144, 50, 0.15)`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Mobile View */}
              <div className="lg:hidden">
                <div>
                  <div 
                    className="relative h-64 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/4-lane-stick-pack.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div className="p-6">
                    <div 
                      className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                      style={{
                        background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                        color: '#3b9032'
                      }}
                    >
                      Mid-Volume Flexibility
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: '#161616' }}
                    >
                      4-Lane Stick Pack Machine
                    </h3>

                    <button
                      onClick={() => toggleMachinery(1)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-300"
                      style={{
                        background: 'rgba(59, 144, 50, 0.1)',
                        border: `2px solid rgba(59, 144, 50, 0.25)`,
                        color: '#3b9032'
                      }}
                    >
                      <span className="font-semibold text-sm">
                        {expandedMachinery.has(1) ? 'Hide Details' : 'View Details'}
                      </span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        className={`transition-transform duration-300 ${expandedMachinery.has(1) ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    <div 
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: expandedMachinery.has(1) ? '1000px' : '0',
                        opacity: expandedMachinery.has(1) ? 1 : 0
                      }}
                    >
                      <div className="pt-6">
                        <p 
                          className="text-base leading-relaxed mb-6"
                          style={{ color: '#6b7280' }}
                        >
                          Versatile mid-volume production with enhanced flexibility for smaller batch runs and product testing, perfect for growing brands.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Output: Up to 6,000 units/hour
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Ideal production capacity for mid-sized operations
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Flexible batch sizing
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Adaptable for various production volumes and requirements
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Quick changeover capability
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Efficient switching between different product formulations
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-0">
                {/* Left: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div 
                    className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4 w-fit"
                    style={{
                      background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                      color: '#3b9032'
                    }}
                  >
                    Mid-Volume Flexibility
                  </div>
                  
                  <h3 
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{ color: '#161616' }}
                  >
                    4-Lane Stick Pack Machine
                  </h3>
                  
                  <p 
                    className="text-base lg:text-lg leading-relaxed mb-8"
                    style={{ color: '#6b7280' }}
                  >
                    Versatile mid-volume production with enhanced flexibility for smaller batch runs and product testing, perfect for growing brands.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Output: Up to 6,000 units/hour
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Ideal production capacity for mid-sized operations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Flexible batch sizing
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Adaptable for various production volumes and requirements
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Quick changeover capability
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Efficient switching between different product formulations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Image/Video Area */}
                <div 
                  className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden order-1 lg:order-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/4-lane-stick-pack.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            {/* Rotary Premade Pouch Filling and Sealing Machine */}
            <div 
              className="group relative overflow-hidden rounded-3xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.05), rgba(129, 192, 41, 0.02))',
                border: `2px solid rgba(59, 144, 50, 0.15)`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Mobile View */}
              <div className="lg:hidden">
                <div>
                  <div 
                    className="relative h-64 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/rotary-pouch-machine.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div className="p-6">
                    <div 
                      className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                      style={{
                        background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                        color: '#3b9032'
                      }}
                    >
                      Flexible Pouch Packaging
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: '#161616' }}
                    >
                      Rotary Premade Pouch Filling and Sealing Machine
                    </h3>

                    <button
                      onClick={() => toggleMachinery(2)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-300"
                      style={{
                        background: 'rgba(59, 144, 50, 0.1)',
                        border: `2px solid rgba(59, 144, 50, 0.25)`,
                        color: '#3b9032'
                      }}
                    >
                      <span className="font-semibold text-sm">
                        {expandedMachinery.has(2) ? 'Hide Details' : 'View Details'}
                      </span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        className={`transition-transform duration-300 ${expandedMachinery.has(2) ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    <div 
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: expandedMachinery.has(2) ? '1000px' : '0',
                        opacity: expandedMachinery.has(2) ? 1 : 0
                      }}
                    >
                      <div className="pt-6">
                        <p 
                          className="text-base leading-relaxed mb-6"
                          style={{ color: '#6b7280' }}
                        >
                          Advanced rotary system for premade pouch filling and sealing, offering versatility in packaging formats with reliable hermetic sealing for extended shelf life.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Versatile pouch formats
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Compatible with various pouch styles and sizes
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Hermetic sealing technology
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Ensures product freshness and extended shelf life
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                High-speed automation
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Efficient rotary design for optimized production throughput
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-0">
                {/* Left: Image/Video Area */}
                <div 
                  className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/rotary-pouch-machine.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Right: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div 
                    className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4 w-fit"
                    style={{
                      background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                      color: '#3b9032'
                    }}
                  >
                    Flexible Pouch Packaging
                  </div>
                  
                  <h3 
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{ color: '#161616' }}
                  >
                    Rotary Premade Pouch Filling and Sealing Machine
                  </h3>
                  
                  <p 
                    className="text-base lg:text-lg leading-relaxed mb-8"
                    style={{ color: '#6b7280' }}
                  >
                    Advanced rotary system for premade pouch filling and sealing, offering versatility in packaging formats with reliable hermetic sealing for extended shelf life.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Versatile pouch formats
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Compatible with various pouch styles and sizes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Hermetic sealing technology
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Ensures product freshness and extended shelf life
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          High-speed automation
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Efficient rotary design for optimized production throughput
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Form-Film-Seal (HFFS) Packaging Machine */}
            <div 
              className="group relative overflow-hidden rounded-3xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.05), rgba(129, 192, 41, 0.02))',
                border: `2px solid rgba(59, 144, 50, 0.15)`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Mobile View */}
              <div className="lg:hidden">
                <div>
                  <div 
                    className="relative h-64 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/vffs-machine.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div className="p-6">
                    <div 
                      className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                      style={{
                        background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                        color: '#3b9032'
                      }}
                    >
                      Form-Fill-Seal Technology
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: '#161616' }}
                    >
                      Horizontal Form-Film-Seal (HFFS) Packaging Machine
                    </h3>

                    <button
                      onClick={() => toggleMachinery(3)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-300"
                      style={{
                        background: 'rgba(59, 144, 50, 0.1)',
                        border: `2px solid rgba(59, 144, 50, 0.25)`,
                        color: '#3b9032'
                      }}
                    >
                      <span className="font-semibold text-sm">
                        {expandedMachinery.has(3) ? 'Hide Details' : 'View Details'}
                      </span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        className={`transition-transform duration-300 ${expandedMachinery.has(3) ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    <div 
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: expandedMachinery.has(3) ? '1000px' : '0',
                        opacity: expandedMachinery.has(3) ? 1 : 0
                      }}
                    >
                      <div className="pt-6">
                        <p 
                          className="text-base leading-relaxed mb-6"
                          style={{ color: '#6b7280' }}
                        >
                          Integrated horizontal packaging system that forms, fills, and seals packages from roll stock film, providing cost-effective and efficient packaging solutions.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                All-in-one integration
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Forms bags from film, fills, and seals in one continuous process
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Cost-effective operation
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Reduces material waste with roll stock film usage
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Flexible bag configurations
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Easily adjustable for different bag sizes and styles
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-0">
                {/* Left: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div 
                    className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4 w-fit"
                    style={{
                      background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                      color: '#3b9032'
                    }}
                  >
                    Form-Fill-Seal Technology
                  </div>
                  
                  <h3 
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{ color: '#161616' }}
                  >
                    Horizontal Form-Film-Seal (HFFS) Packaging Machine
                  </h3>
                  
                  <p 
                    className="text-base lg:text-lg leading-relaxed mb-8"
                    style={{ color: '#6b7280' }}
                  >
                    Integrated vertical packaging system that forms, fills, and seals packages from roll stock film, providing cost-effective and efficient packaging solutions.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          All-in-one integration
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Forms bags from film, fills, and seals in one continuous process
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Cost-effective operation
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Reduces material waste with roll stock film usage
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Flexible bag configurations
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Easily adjustable for different bag sizes and styles
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Image/Video Area */}
                <div 
                  className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden order-1 lg:order-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/vffs-machine.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            {/* Single Lane Stick Pack Powder Filling Machine */}
            <div 
              className="group relative overflow-hidden rounded-3xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.05), rgba(129, 192, 41, 0.02))',
                border: `2px solid rgba(59, 144, 50, 0.15)`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Mobile View */}
              <div className="lg:hidden">
                <div>
                  <div 
                    className="relative h-64 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/single-lane-stick-pack.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div className="p-6">
                    <div 
                      className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                      style={{
                        background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                        color: '#3b9032'
                      }}
                    >
                      Precision Small Batch
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: '#161616' }}
                    >
                      Single Lane Stick Pack Powder Filling Machine
                    </h3>

                    <button
                      onClick={() => toggleMachinery(4)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-300"
                      style={{
                        background: 'rgba(59, 144, 50, 0.1)',
                        border: `2px solid rgba(59, 144, 50, 0.25)`,
                        color: '#3b9032'
                      }}
                    >
                      <span className="font-semibold text-sm">
                        {expandedMachinery.has(4) ? 'Hide Details' : 'View Details'}
                      </span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        className={`transition-transform duration-300 ${expandedMachinery.has(4) ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    <div 
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: expandedMachinery.has(4) ? '1000px' : '0',
                        opacity: expandedMachinery.has(4) ? 1 : 0
                      }}
                    >
                      <div className="pt-6">
                        <p 
                          className="text-base leading-relaxed mb-6"
                          style={{ color: '#6b7280' }}
                        >
                          Compact and precise single-lane filling system ideal for small batch production, product testing, and specialized powder formulations requiring maximum accuracy.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Small batch specialization
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Perfect for R&D, testing, and limited production runs
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Maximum filling accuracy
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Precision dosing for consistent powder measurements
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Cost-effective for trials
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Minimizes waste during product development phases
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-0">
                {/* Left: Image/Video Area */}
                <div 
                  className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/single-lane-stick-pack.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Right: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div 
                    className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4 w-fit"
                    style={{
                      background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                      color: '#3b9032'
                    }}
                  >
                    Precision Small Batch
                  </div>
                  
                  <h3 
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{ color: '#161616' }}
                  >
                    Single Lane Stick Pack Powder Filling Machine
                  </h3>
                  
                  <p 
                    className="text-base lg:text-lg leading-relaxed mb-8"
                    style={{ color: '#6b7280' }}
                  >
                    Compact and precise single-lane filling system ideal for small batch production, product testing, and specialized powder formulations requiring maximum accuracy.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Small batch specialization
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Perfect for R&D, testing, and limited production runs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Maximum filling accuracy
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Precision dosing for consistent powder measurements
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Cost-effective for trials
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Minimizes waste during product development phases
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rotary Tablet Press Machine */}
            <div 
              className="group relative overflow-hidden rounded-3xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.05), rgba(129, 192, 41, 0.02))',
                border: `2px solid rgba(59, 144, 50, 0.15)`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Mobile View */}
              <div className="lg:hidden">
                <div>
                  <div 
                    className="relative h-64 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/rotary-tablet-press.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div className="p-6">
                    <div 
                      className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                      style={{
                        background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                        color: '#3b9032'
                      }}
                    >
                      Tablet Manufacturing
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: '#161616' }}
                    >
                      Rotary Tablet Press Machine
                    </h3>

                    <button
                      onClick={() => toggleMachinery(5)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-300"
                      style={{
                        background: 'rgba(59, 144, 50, 0.1)',
                        border: `2px solid rgba(59, 144, 50, 0.25)`,
                        color: '#3b9032'
                      }}
                    >
                      <span className="font-semibold text-sm">
                        {expandedMachinery.has(5) ? 'Hide Details' : 'View Details'}
                      </span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        className={`transition-transform duration-300 ${expandedMachinery.has(5) ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    <div 
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: expandedMachinery.has(5) ? '1000px' : '0',
                        opacity: expandedMachinery.has(5) ? 1 : 0
                      }}
                    >
                      <div className="pt-6">
                        <p 
                          className="text-base leading-relaxed mb-6"
                          style={{ color: '#6b7280' }}
                        >
                          High-performance rotary tablet press for consistent tablet production with precise weight control, uniform compression, and customizable tablet designs.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                High-volume tablet production
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Efficient continuous operation for large-scale manufacturing
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Precise weight and hardness control
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Consistent tablet specifications across entire production run
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `linear-gradient(135deg, #3b9032, #81c029)`,
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                                Custom tablet shapes and sizes
                              </h4>
                              <p className="text-sm" style={{ color: '#6b7280' }}>
                                Flexible tooling options for unique tablet designs
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-0">
                {/* Left: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div 
                    className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4 w-fit"
                    style={{
                      background: `linear-gradient(90deg, rgba(59, 144, 50, 0.15), rgba(129, 192, 41, 0.1))`,
                      color: '#3b9032'
                    }}
                  >
                    Tablet Manufacturing
                  </div>
                  
                  <h3 
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{ color: '#161616' }}
                  >
                    Rotary Tablet Press Machine
                  </h3>
                  
                  <p 
                    className="text-base lg:text-lg leading-relaxed mb-8"
                    style={{ color: '#6b7280' }}
                  >
                    High-performance rotary tablet press for consistent tablet production with precise weight control, uniform compression, and customizable tablet designs.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          High-volume tablet production
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Efficient continuous operation for large-scale manufacturing
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Precise weight and hardness control
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Consistent tablet specifications across entire production run
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, #3b9032, #81c029)`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#161616' }}>
                          Custom tablet shapes and sizes
                        </h4>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                          Flexible tooling options for unique tablet designs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Image/Video Area */}
                <div 
                  className="relative h-80 lg:h-full flex items-center justify-center overflow-hidden order-1 lg:order-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/rotary-tablet-press.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className={`mt-10 lg:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 section-animate animate-fadeInUp stagger-3 ${visibleSections.has('machinery') ? 'visible' : ''}`}>
            <div className="text-center">
              <div 
                className="text-3xl lg:text-4xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                16,000+
              </div>
              <div className="text-sm" style={{ color: '#6b7280' }}>
                sq ft Facility
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-3xl lg:text-4xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                24/7
              </div>
              <div className="text-sm" style={{ color: '#6b7280' }}>
                Production Capability
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-3xl lg:text-4xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                99.9%
              </div>
              <div className="text-sm" style={{ color: '#6b7280' }}>
                Precision Accuracy
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-3xl lg:text-4xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                FDA
              </div>
              <div className="text-sm" style={{ color: '#6b7280' }}>
                Registered & Certified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        data-section="cta"
        className="relative py-8 sm:py-12 lg:py-16"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`section-animate animate-fadeInUp stagger-1 ${visibleSections.has('cta') ? 'visible' : ''}`}>
            <h2 
              className="text-3xl lg:text-5xl font-bold mb-6"
              style={{ color: '#161616' }}
            >
              Ready to Start Your
              <br />
              <span 
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Custom Formula
              </span>
              ?
            </h2>
            <p 
              className="text-lg lg:text-xl mb-10"
              style={{ color: '#6b7280' }}
            >
              Let&apos;s collaborate to bring your supplement vision to life with our proven process
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
              Get Started Today
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
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
                          stroke='#3b9032' 
                          strokeWidth="2" 
                          fill="none"/>
                    <circle cx="12" cy="9" r="2.5" 
                            stroke='#3b9032' 
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
                          stroke='#3b9032' 
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
                          stroke='#3b9032' 
                          strokeWidth="2"/>
                    <path d="M3 7l9 6 9-6" 
                          stroke='#3b9032' 
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

            {/* Right Column - Social Media */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-6" style={{ color: '#161616' }}>
                Follow Us
              </h3>
              <div className="flex gap-3 justify-center md:justify-start">
                {/* Facebook */}
                <a 
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(59, 144, 50, 0.1)',
                    border: `1px solid rgba(59, 144, 50, 0.3)`
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill='#3b9032'>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(59, 144, 50, 0.1)',
                    border: `1px solid rgba(59, 144, 50, 0.3)`
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill='#3b9032'>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(59, 144, 50, 0.1)',
                    border: `1px solid rgba(59, 144, 50, 0.3)`
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill='#3b9032'>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Email */}
                <a 
                  href="mailto:contact@apexnutra.com"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(59, 144, 50, 0.1)',
                    border: `1px solid rgba(59, 144, 50, 0.3)`
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill='#3b9032'>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
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

