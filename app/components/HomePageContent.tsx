"use client";

import { useEffect, useRef, useState } from "react";

export default function HomeContent() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        } else {
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setSubscribeStatus("error");
      setSubscribeMessage("Please enter a valid email address");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
      return;
    }

    setSubscribeStatus("loading");

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setSubscribeStatus("success");
      setSubscribeMessage("Thank you for subscribing! Check your email for confirmation.");
      setEmail("");
      
      setTimeout(() => {
        setSubscribeStatus("idle");
        setSubscribeMessage("");
      }, 5000);
    } catch (error) {
      setSubscribeStatus("error");
      setSubscribeMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff', transition: 'background-color 0.3s ease' }}>
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-fade-in {
          opacity: 0;
          transition: opacity 0.8s ease-out;
        }

        .animate-fade-in.animate-in {
          opacity: 1;
        }

        .animate-slide-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .animate-slide-left.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        .animate-slide-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .animate-slide-right.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        .animate-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-scale.animate-in {
          opacity: 1;
          transform: scale(1);
        }

        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }

        .testimonial-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .testimonial-card:hover {
          transform: translateY(-8px);
        }

        @keyframes floatProduct1 {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes floatProduct2 {
          0%, 100% { transform: translateY(0px) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes floatProduct3 {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-18px) rotate(-1deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .product-card {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .product-card:hover {
          z-index: 20 !important;
          transform: scale(1.15) translateY(-20px) rotate(0deg) !important;
          animation: none !important;
        }
        
        .product-group:hover .product-card:not(:hover) {
          transform: scale(0.85) translateY(10px);
          opacity: 0.4;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 50px) scale(1.1); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.15); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.05); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes floatProduct {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes rotateHighlight {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
        }
        
        .grid-pattern {
          background-size: 50px 50px;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes orbitIcon {
          from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }

        @keyframes fadeSlideIn1 {
          0%, 100% { opacity: 0.4; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(10px); }
        }
        
        @keyframes fadeSlideIn2 {
          0%, 100% { opacity: 0.4; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(-10px); }
        }
        
        @keyframes fadeSlideIn3 {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(10px); }
        }
      `}</style>
      
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="grid-pattern absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(129, 192, 41, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 192, 41, 0.05) 1px, transparent 1px)`
            }}
          ></div>
          <div 
            className="blob" 
            style={{
              width: '500px',
              height: '500px',
              top: '10%',
              left: '10%',
              background: '#81c029',
              animation: 'float1 20s ease-in-out infinite',
              mixBlendMode: 'multiply',
              opacity: '0.3'
            }}
          ></div>
          <div 
            className="blob" 
            style={{
              width: '400px',
              height: '400px',
              top: '50%',
              right: '15%',
              background: '#3b9032',
              animation: 'float2 18s ease-in-out infinite',
              mixBlendMode: 'multiply',
              opacity: '0.3'
            }}
          ></div>
          <div 
            className="blob" 
            style={{
              width: '450px',
              height: '450px',
              bottom: '10%',
              left: '30%',
              background: '#81c029',
              animation: 'float3 22s ease-in-out infinite',
              mixBlendMode: 'multiply',
              opacity: '0.3'
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6"
                style={{ 
                  color: '#161616',
                  lineHeight: '1.2'
                }}
              >
                Your Trusted{' '}
                <span 
                  style={{
                    background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Nutraceutical Partner
                </span>
                {' '}in Utah
              </h1>
              <p 
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 lg:mb-10 px-4 lg:px-0"
                style={{ color: '#4b5563' }}
              >
                Delivering exceptional quality with rapid turnaround times, backed by industry-leading expertise
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8 px-4 lg:px-0">
                <a 
                  href="/capabilities"
                  className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                    color: 'white'
                  }}
                >
                  Our Capabilities
                </a>
                <a 
                  href="/about"
                  className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
                  style={{
                    border: `2px solid #3b9032`,
                    color: '#3b9032',
                    backgroundColor: 'rgba(129, 192, 41, 0.1)'
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right: Futuristic Tech Interface */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 hidden sm:flex">
              <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
                {/* Grid Texture Background */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59, 144, 50, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59, 144, 50, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                    maskImage: 'radial-gradient(circle, black 50%, transparent 100%)'
                  }}
                ></div>
                
                {/* Radial Gradient Glow */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, rgba(59, 144, 50, 0.1) 0%, transparent 70%)`,
                    animation: 'pulse 4s ease-in-out infinite'
                  }}
                ></div>
                
                {/* Single Circle with Rotating Highlight */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="absolute rounded-full"
                    style={{
                      width: '320px',
                      height: '320px',
                      border: `2px solid rgba(59, 144, 50, 0.3)`,
                      boxShadow: `0 0 40px rgba(59, 144, 50, 0.15)`,
                      position: 'relative',
                      overflow: 'visible'
                    }}
                  >
                    {/* Rotating Highlight Section */}
                    <div 
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        animation: 'rotateHighlight 4s linear infinite'
                      }}
                    >
                      <div 
                        style={{
                          position: 'absolute',
                          top: '-2px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '100px',
                          height: '100px',
                          background: `conic-gradient(from 0deg, transparent 0deg, ${'rgba(59, 144, 50, 0.8)'} 60deg, transparent 120deg)`,
                          borderRadius: '50%',
                          filter: 'blur(8px)'
                        }}
                      ></div>
                      
                      {/* Bright highlight arc */}
                      <svg 
                        style={{
                          position: 'absolute',
                          top: '-2px',
                          left: '-2px',
                          width: 'calc(100% + 4px)',
                          height: 'calc(100% + 4px)',
                          transform: 'rotate(-90deg)'
                        }}
                        viewBox="0 0 324 324"
                      >
                        <defs>
                          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                            <stop offset="50%" style={{ stopColor: '#3b9032', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                          </linearGradient>
                        </defs>
                        <circle 
                          cx="162" 
                          cy="162" 
                          r="160" 
                          fill="none" 
                          stroke="url(#highlightGradient)" 
                          strokeWidth="4"
                          strokeDasharray="251.2 753.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Central Shield Icon - Glassmorphism */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ animation: 'float 6s ease-in-out infinite' }}
                >
                  <div 
                    className="relative"
                    style={{
                      width: '180px',
                      height: '180px',
                      background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.15) 0%, rgba(129, 192, 41, 0.08) 100%)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '30px',
                      border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`,
                      boxShadow: `
                        0 8px 32px rgba(59, 144, 50, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {/* Scan Line Effect */}
                    <div 
                      className="absolute inset-0 overflow-hidden"
                      style={{ borderRadius: '30px' }}
                    >
                      <div 
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '50%',
                          background: `linear-gradient(180deg, transparent 0%, rgba(59, 144, 50, 0.15) 50%, transparent 100%)`,
                          animation: 'scan 3s ease-in-out infinite'
                        }}
                      ></div>
                    </div>
                    
                    {/* Shield Icon */}
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#3b9032', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#81c029', stopOpacity: 0.8 }} />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      <path 
                        d="M50 10 L80 20 L80 45 C80 65 65 80 50 90 C35 80 20 65 20 45 L20 20 Z" 
                        fill="url(#shieldGradient)"
                        filter="url(#glow)"
                        opacity="0.9"
                      />
                      
                      <polyline 
                        points="35,50 45,60 65,35" 
                        stroke='#ffffff'
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Floating Translucent Icons */}
                {/* DNA/Molecule Icon */}
                <div 
                  className="absolute"
                  style={{
                    top: '15%',
                    right: '10%',
                    animation: 'fadeInOut 3s ease-in-out infinite'
                  }}
                >
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'rgba(59, 144, 50, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '15px',
                      border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 16px rgba(59, 144, 50, 0.1)`
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32">
                      <circle cx="8" cy="8" r="3" fill={'#3b9032'} opacity="0.8"/>
                      <circle cx="24" cy="24" r="3" fill={'#3b9032'} opacity="0.8"/>
                      <circle cx="8" cy="24" r="3" fill={'#3b9032'} opacity="0.8"/>
                      <circle cx="24" cy="8" r="3" fill={'#3b9032'} opacity="0.8"/>
                      <path d="M 8 8 Q 16 16 24 24 M 24 8 Q 16 16 8 24" 
                            stroke={'#3b9032'} 
                            strokeWidth="1.5" 
                            fill="none"
                            opacity="0.6"/>
                    </svg>
                  </div>
                </div>
                
                {/* Lab Flask Icon */}
                <div 
                  className="absolute"
                  style={{
                    top: '55%',
                    left: '5%',
                    animation: 'fadeInOut 3s ease-in-out infinite 1s'
                  }}
                >
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'rgba(59, 144, 50, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '15px',
                      border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 16px rgba(59, 144, 50, 0.1)`
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 32 32">
                      <path d="M12 4 L12 12 L6 24 L26 24 L20 12 L20 4 Z" 
                            stroke={'#3b9032'} 
                            strokeWidth="2" 
                            fill="none"
                            opacity="0.8"/>
                      <rect x="12" y="18" width="8" height="6" 
                            fill={'#3b9032'} 
                            opacity="0.5"/>
                    </svg>
                  </div>
                </div>
                
                {/* Certificate/Quality Icon */}
                <div 
                  className="absolute"
                  style={{
                    bottom: '15%',
                    right: '12%',
                    animation: 'fadeInOut 3s ease-in-out infinite 2s'
                  }}
                >
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'rgba(59, 144, 50, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '15px',
                      border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 16px rgba(59, 144, 50, 0.1)`
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 32 32">
                      <circle cx="16" cy="12" r="8" 
                              stroke={'#3b9032'} 
                              strokeWidth="2" 
                              fill="none"
                              opacity="0.8"/>
                      <path d="M16 20 L16 28 M12 24 L16 28 L20 24" 
                            stroke={'#3b9032'} 
                            strokeWidth="2" 
                            fill="none"
                            opacity="0.8"/>
                      <circle cx="16" cy="12" r="3" 
                              fill={'#3b9032'} 
                              opacity="0.6"/>
                    </svg>
                  </div>
                </div>
                
                {/* Pill/Capsule Icon */}
                <div 
                  className="absolute"
                  style={{
                    top: '25%',
                    left: '12%',
                    animation: 'fadeInOut 3s ease-in-out infinite 0.5s'
                  }}
                >
                  <div 
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(59, 144, 50, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 16px rgba(59, 144, 50, 0.1)`
                    }}
                  >
                    <div 
                      style={{
                        width: '24px',
                        height: '12px',
                        borderRadius: '20px',
                        background: `linear-gradient(90deg, ${'#3b9032'} 0%, ${'#81c029'} 100%)`,
                        opacity: 0.8
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Graph/Analytics Icon */}
                <div 
                  className="absolute"
                  style={{
                    bottom: '28%',
                    left: '18%',
                    animation: 'fadeInOut 3s ease-in-out infinite 1.5s'
                  }}
                >
                  <div 
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(59, 144, 50, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 16px rgba(59, 144, 50, 0.1)`
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 32 32">
                      <polyline points="4,24 10,18 16,20 22,12 28,14" 
                                stroke={'#3b9032'} 
                                strokeWidth="2" 
                                fill="none"
                                opacity="0.8"/>
                    </svg>
                  </div>
                </div>
                
                {/* Tech Corner Accents */}
                <div 
                  className="absolute"
                  style={{
                    top: '10%',
                    left: '10%',
                    width: '30px',
                    height: '30px',
                    borderTop: `2px solid ${'rgba(59, 144, 50, 0.4)'}`,
                    borderLeft: `2px solid ${'rgba(59, 144, 50, 0.4)'}`,
                    opacity: 0.6
                  }}
                ></div>
                
                <div 
                  className="absolute"
                  style={{
                    bottom: '10%',
                    right: '10%',
                    width: '30px',
                    height: '30px',
                    borderBottom: `2px solid ${'rgba(59, 144, 50, 0.4)'}`,
                    borderRight: `2px solid ${'rgba(59, 144, 50, 0.4)'}`,
                    opacity: 0.6
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gradient Fade for Smooth Transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.7), #ffffff)'
          }}
        ></div>
      </div>

      {/* Built for Supplement Brands Section */}
      <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left: Interactive Product Display - Desktop Only */}
            <div className="relative order-2 lg:order-1 hidden lg:block">
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] product-group">
                {/* Background Glow */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, rgba(59, 144, 50, 0.1), transparent 70%)`,
                    filter: 'blur(40px)',
                    transform: 'scale(1.2)'
                  }}
                ></div>

                {/* Product Card 1 - Back Left */}
                <div 
                  className="product-card absolute left-0 sm:left-0 top-8 sm:top-16 lg:top-24 w-36 sm:w-48 lg:w-56 h-48 sm:h-60 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: '#ffffff',
                    border: `2px solid ${'rgba(59, 144, 50, 0.3)'}`,
                    boxShadow: `0 20px 60px ${'rgba(0, 0, 0, 0.15)'}`,
                    animation: 'floatProduct1 4s ease-in-out infinite',
                    zIndex: 1
                  }}
                >
                  <div className="relative w-full h-full p-3 sm:p-4 lg:p-6 flex flex-col items-center justify-center">
                    <div 
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: 'linear-gradient(90deg, #3b9032, #81c029, #3b9032)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s linear infinite'
                      }}
                    ></div>
                    <div 
                      className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mb-2 sm:mb-3 lg:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, rgba(59, 144, 50, 0.15), transparent)`
                      }}
                    >
                      <img 
                        src="/stickpacks.jpg" 
                        alt="Stick Packs" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 
                      className="text-sm sm:text-base lg:text-lg font-bold mb-1 sm:mb-2 text-center"
                      style={{ color: '#161616' }}
                    >
                      Stick Packs
                    </h4>
                    <p 
                      className="text-[10px] sm:text-xs text-center"
                      style={{ color: '#6b7280' }}
                    >
                      Convenient Single-Serve
                    </p>
                  </div>
                </div>

                {/* Product Card 2 - Front Center */}
                <div 
                  className="product-card absolute left-1/2 top-4 sm:top-8 lg:top-16 -translate-x-1/2 w-40 sm:w-52 lg:w-64 h-52 sm:h-68 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: '#ffffff',
                    border: `2px solid ${'rgba(59, 144, 50, 0.4)'}`,
                    boxShadow: `0 25px 70px ${'rgba(0, 0, 0, 0.2)'}`,
                    animation: 'floatProduct2 5s ease-in-out infinite',
                    zIndex: 10
                  }}
                >
                  <div className="relative w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
                    <div 
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: 'linear-gradient(90deg, #3b9032, #81c029, #3b9032)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s linear infinite 0.5s'
                      }}
                    ></div>
                    <div 
                      className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${'#3b9032'}, ${'#81c029'})`
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="white" className="sm:w-4 sm:h-4">
                        <path d="M8 1L10 6L15 6L11 9L13 14L8 11L3 14L5 9L1 6L6 6L8 1Z"/>
                      </svg>
                    </div>
                    <div 
                      className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-2 sm:mb-3 lg:mb-4 rounded-2xl sm:rounded-3xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, rgba(59, 144, 50, 0.15), transparent)`
                      }}
                    >
                      <img 
                        src="/logo.png" 
                        alt="Apex Nutra Logo" 
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain"
                      />
                    </div>
                    <h4 
                      className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-center"
                      style={{ color: '#161616' }}
                    >
                      Apex Nutra
                    </h4>
                    <p 
                      className="text-xs sm:text-sm text-center"
                      style={{ color: '#6b7280' }}
                    >
                      Convenient Packaging
                    </p>
                  </div>
                </div>

                {/* Product Card 3 - Back Right */}
                <div 
                  className="product-card absolute right-0 sm:right-4 top-16 sm:top-24 lg:top-32 w-36 sm:w-48 lg:w-56 h-48 sm:h-60 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: '#ffffff',
                    border: `2px solid ${'rgba(59, 144, 50, 0.3)'}`,
                    boxShadow: `0 20px 60px ${'rgba(0, 0, 0, 0.15)'}`,
                    animation: 'floatProduct3 4.5s ease-in-out infinite',
                    zIndex: 2
                  }}
                >
                  <div className="relative w-full h-full p-3 sm:p-4 lg:p-6 flex flex-col items-center justify-center">
                    <div 
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: 'linear-gradient(90deg, #3b9032, #81c029, #3b9032)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s linear infinite 1s'
                      }}
                    ></div>
                    <div 
                      className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mb-2 sm:mb-3 lg:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, rgba(59, 144, 50, 0.15), transparent)`
                      }}
                    >
                      <img 
                        src="/sachets.jpg" 
                        alt="Sachets" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 
                      className="text-sm sm:text-base lg:text-lg font-bold mb-1 sm:mb-2 text-center"
                      style={{ color: '#161616' }}
                    >
                      Sachets
                    </h4>
                    <p 
                      className="text-[10px] sm:text-xs text-center"
                      style={{ color: '#6b7280' }}
                    >
                      Flexible Packaging
                    </p>
                  </div>
                </div>

                {/* Decorative Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: i === 1 
                          ? '#3b9032'
                          : 'rgba(59, 144, 50, 0.3)'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2 animate-slide-right animate-on-scroll text-center lg:text-left">
              <div className="mb-6 flex justify-center lg:justify-start">
                <span 
                  className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                  style={{ 
                    color: '#3b9032',
                    backgroundColor: 'rgba(59, 144, 50, 0.1)'
                  }}
                >
                  Why Apex Nutra?
                </span>
              </div>
              
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                style={{ color: '#161616' }}
              >
                Built for Supplement Brands That Need
                <span 
                  style={{
                    background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {' '}Flexibility
                </span>
              </h2>

              {/* Product Cards - Mobile Only */}
              <div className="lg:hidden relative mb-4">
                <div className="relative h-[300px] sm:h-[400px] product-group">
                  {/* Background Glow */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at center, rgba(59, 144, 50, 0.1), transparent 70%)`,
                      filter: 'blur(40px)',
                      transform: 'scale(1.2)'
                    }}
                  ></div>

                  {/* Product Card 1 - Back Left */}
                  <div 
                    className="product-card absolute left-0 top-8 w-36 sm:w-48 h-48 sm:h-60 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                    style={{
                      backgroundColor: '#ffffff',
                      border: `2px solid ${'rgba(59, 144, 50, 0.3)'}`,
                      boxShadow: `0 20px 60px ${'rgba(0, 0, 0, 0.15)'}`,
                      animation: 'floatProduct1 4s ease-in-out infinite',
                      zIndex: 1
                    }}
                  >
                    <div className="relative w-full h-full p-3 sm:p-4 flex flex-col items-center justify-center">
                      <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{
                          background: 'linear-gradient(90deg, #3b9032, #81c029, #3b9032)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 3s linear infinite'
                        }}
                      ></div>
                      <div 
                        className="w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-3 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, rgba(59, 144, 50, 0.15), transparent)`
                        }}
                      >
                        <img 
                          src="/stickpacks.jpg" 
                          alt="Stick Packs" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 
                        className="text-sm sm:text-base font-bold mb-1 sm:mb-2 text-center"
                        style={{ color: '#161616' }}
                      >
                        Stick Packs
                      </h4>
                      <p 
                        className="text-[10px] sm:text-xs text-center"
                        style={{ color: '#6b7280' }}
                      >
                        Convenient Single-Serve
                      </p>
                    </div>
                  </div>

                  {/* Product Card 2 - Front Center */}
                  <div 
                    className="product-card absolute left-1/2 top-4 sm:top-8 -translate-x-1/2 w-40 sm:w-52 h-52 sm:h-68 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                    style={{
                      backgroundColor: '#ffffff',
                      border: `2px solid ${'rgba(59, 144, 50, 0.4)'}`,
                      boxShadow: `0 25px 70px ${'rgba(0, 0, 0, 0.2)'}`,
                      animation: 'floatProduct2 5s ease-in-out infinite',
                      zIndex: 10
                    }}
                  >
                    <div className="relative w-full h-full p-4 sm:p-6 flex flex-col items-center justify-center">
                      <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{
                          background: 'linear-gradient(90deg, #3b9032, #81c029, #3b9032)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 3s linear infinite 0.5s'
                        }}
                      ></div>
                      <div 
                        className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${'#3b9032'}, ${'#81c029'})`
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="white" className="sm:w-4 sm:h-4">
                          <path d="M8 1L10 6L15 6L11 9L13 14L8 11L3 14L5 9L1 6L6 6L8 1Z"/>
                        </svg>
                      </div>
                      <div 
                        className="w-24 h-24 sm:w-32 sm:h-32 mb-2 sm:mb-3 rounded-2xl sm:rounded-3xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, rgba(59, 144, 50, 0.15), transparent)`
                        }}
                      >
                        <img 
                          src="/logo.png" 
                          alt="Apex Nutra Logo" 
                          className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                        />
                      </div>
                      <h4 
                        className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-center"
                        style={{ color: '#161616' }}
                      >
                        Apex Nutra
                      </h4>
                      <p 
                        className="text-xs sm:text-sm text-center"
                        style={{ color: '#6b7280' }}
                      >
                        Convenient Packaging
                      </p>
                    </div>
                  </div>

                  {/* Product Card 3 - Back Right */}
                  <div 
                    className="product-card absolute right-0 sm:right-4 top-16 sm:top-24 w-36 sm:w-48 h-48 sm:h-60 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                    style={{
                      backgroundColor: '#ffffff',
                      border: `2px solid ${'rgba(59, 144, 50, 0.3)'}`,
                      boxShadow: `0 20px 60px ${'rgba(0, 0, 0, 0.15)'}`,
                      animation: 'floatProduct3 4.5s ease-in-out infinite',
                      zIndex: 2
                    }}
                  >
                    <div className="relative w-full h-full p-3 sm:p-4 flex flex-col items-center justify-center">
                      <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{
                          background: 'linear-gradient(90deg, #3b9032, #81c029, #3b9032)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 3s linear infinite 1s'
                        }}
                      ></div>
                      <div 
                        className="w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-3 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, rgba(59, 144, 50, 0.15), transparent)`
                        }}
                      >
                        <img 
                          src="/sachets.jpg" 
                          alt="Sachets" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 
                        className="text-sm sm:text-base font-bold mb-1 sm:mb-2 text-center"
                        style={{ color: '#161616' }}
                      >
                        Sachets
                      </h4>
                      <p 
                        className="text-[10px] sm:text-xs text-center"
                        style={{ color: '#6b7280' }}
                      >
                        Flexible Packaging
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p 
                className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8"
                style={{ color: '#6b7280' }}
              >
                Whether you're a small startup or an established brand, <strong style={{ color: '#3b9032' }}>APEX NUTRA</strong> supports 
                your growth by offering precision manufacturing and efficient labor solutions, especially when 
                deadlines are tight and labor is scarce.
              </p>

              <div className="mt-10">
                <a 
                  href="/capabilities"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                    color: 'white'
                  }}
                >
                  Explore Our Capabilities
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3l7 7-7 7M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fast but Careful Section */}
      <div className="relative py-16 sm:py-20 lg:py-24 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${'#3b9032'}, transparent)`,
              transform: 'translate(30%, -30%)',
              filter: 'blur(80px)'
            }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${'#81c029'}, transparent)`,
              transform: 'translate(-30%, 30%)',
              filter: 'blur(80px)'
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
            <div className="inline-block mb-4">
              <span 
                className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.1)'
                }}
              >
                Our Approach
              </span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: '#161616' }}
            >
              Fast, Yet
              <span 
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {' '}Meticulous
              </span>
            </h2>
            <p 
              className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto"
              style={{ color: '#6b7280' }}
            >
              We deliver speed without sacrificing quality—because your brand deserves both excellence and efficiency.
            </p>
          </div>

          {/* Machinery Grid - Compact Homepage Version */}
          <div className="mt-12 lg:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Machine Card 1 - 10-Lane Stick Pack */}
              <div 
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 animate-on-scroll"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  border: `2px solid ${'rgba(59, 144, 50, 0.2)'}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/10-lane-stick-pack.mp4" type="video/mp4" />
                  </video>
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  ></div>
                </div>
                <div className="p-6">
                  <p 
                    className="text-xl font-bold mb-4 leading-tight"
                    style={{ 
                      color: '#3b9032',
                      textShadow: 'none'
                    }}
                  >
                    Big volume? No problem.
                  </p>
                  <h3 
                    className="text-base font-semibold mb-2"
                    style={{ color: '#161616' }}
                  >
                    10-Lane Stick Pack Machine
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: '#6b7280' }}
                  >
                    Up to 10,000 units/hour with precision filling
                  </p>
                </div>
              </div>

              {/* Machine Card 2 - 4-Lane Stick Pack */}
              <div 
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 animate-on-scroll"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  border: `2px solid ${'rgba(59, 144, 50, 0.2)'}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/4-lane-stick-pack.mp4" type="video/mp4" />
                  </video>
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  ></div>
                </div>
                <div className="p-6">
                  <p 
                    className="text-xl font-bold mb-4 leading-tight"
                    style={{ 
                      color: '#3b9032',
                      textShadow: 'none'
                    }}
                  >
                    Efficiency meets precision — yes, we can pack that.
                  </p>
                  <h3 
                    className="text-base font-semibold mb-2"
                    style={{ color: '#161616' }}
                  >
                    4-Lane Stick Pack Machine
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: '#6b7280' }}
                  >
                    Up to 4,000 units/hour with flexible batch sizing
                  </p>
                </div>
              </div>

              {/* Machine Card 3 - Rotary Pouch */}
              <div 
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 animate-on-scroll"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  border: `2px solid ${'rgba(59, 144, 50, 0.2)'}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/rotary-pouch-machine.mp4" type="video/mp4" />
                  </video>
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  ></div>
                </div>
                <div className="p-6">
                  <p 
                    className="text-xl font-bold mb-4 leading-tight"
                    style={{ 
                      color: '#3b9032',
                      textShadow: 'none'
                    }}
                  >
                    Got a pouch? We’ll fill it, seal it, ship it.
                  </p>
                  <h3 
                    className="text-base font-semibold mb-2"
                    style={{ color: '#161616' }}
                  >
                    Rotary Pouch Machine
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: '#6b7280' }}
                  >
                    Versatile pouch formats with hermetic sealing
                  </p>
                </div>
              </div>

              {/* Machine Card 4 - VFFS */}
              <div 
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 animate-on-scroll"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  border: `2px solid ${'rgba(59, 144, 50, 0.2)'}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/vffs-machine.mp4" type="video/mp4" />
                  </video>
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  ></div>
                </div>
                <div className="p-6">
                  <p 
                    className="text-xl font-bold mb-4 leading-tight"
                    style={{ 
                      color: '#3b9032',
                      textShadow: 'none'
                    }}
                  >
                    From film to finished pack — fully automated.
                  </p>
                  <h3 
                    className="text-base font-semibold mb-2"
                    style={{ color: '#161616' }}
                  >
                    VFFS Machine
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: '#6b7280' }}
                  >
                    Automated bagging with continuous operation
                  </p>
                </div>
              </div>

              {/* Machine Card 5 - Auger Filler */}
              <div 
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 animate-on-scroll"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  border: `2px solid ${'rgba(59, 144, 50, 0.2)'}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/single-lane-stick-pack.mp4" type="video/mp4" />
                  </video>
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  ></div>
                </div>
                <div className="p-6">
                  <p 
                    className="text-xl font-bold mb-4 leading-tight"
                    style={{ 
                      color: '#3b9032',
                      textShadow: 'none'
                    }}
                  >
                    Small batches? Precise filling? Yes, we do that.
                  </p>
                  <h3 
                    className="text-base font-semibold mb-2"
                    style={{ color: '#161616' }}
                  >
                    Single Lane Auger Filler
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: '#6b7280' }}
                  >
                    Maximum accuracy for small batch production
                  </p>
                </div>
              </div>

              {/* Machine Card 6 - Tablet Press */}
              <div 
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 animate-on-scroll"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.1), rgba(129, 192, 41, 0.05))',
                  border: `2px solid ${'rgba(59, 144, 50, 0.2)'}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/rotary-tablet-press.mp4" type="video/mp4" />
                  </video>
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  ></div>
                </div>
                <div className="p-6">
                  <p 
                    className="text-xl font-bold mb-4 leading-tight"
                    style={{ 
                      color: '#3b9032',
                      textShadow: 'none'
                    }}
                  >
                    Your tablets — perfectly pressed, every cycle.
                  </p>
                  <h3 
                    className="text-base font-semibold mb-2"
                    style={{ color: '#161616' }}
                  >
                    Rotary Tablet Press
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: '#6b7280' }}
                  >
                    Consistent tablet production with weight control
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center animate-on-scroll mt-12">
            <p 
              className="text-base sm:text-lg mb-6"
              style={{ color: '#6b7280' }}
            >
              See all our state-of-the-art equipment and capabilities
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="/manufacturer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(90deg, ${'#3b9032'}, ${'#81c029'})`,
                  color: 'white'
                }}
              >
                <span className="hidden sm:inline">View Complete Equipment Details</span>
                <span className="sm:hidden">Equipment Details</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="sm:w-5 sm:h-5">
                  <path d="M10 3l7 7-7 7M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  border: `2px solid ${'#3b9032'}`,
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.1)'
                }}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Partners & Testimonials Section */}
      <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-on-scroll">
            <div className="inline-block mb-4">
              <span 
                className="text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ 
                  color: '#3b9032',
                  backgroundColor: 'rgba(59, 144, 50, 0.1)'
                }}
              >
                Client Success Stories
              </span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: '#161616' }}
            >
              Trusted by
              <span 
                style={{
                  background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {' '}Leading Brands
              </span>
            </h2>
            <p 
              className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4"
              style={{ color: '#6b7280' }}
            >
              Join hundreds of satisfied brands who trust APEX NUTRA for their supplement manufacturing needs
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="relative">
            {(() => {
              const testimonials = [
                {
                  name: "Trace Minerals Team",
                  role: "Partner",
                  company: "Trace Minerals",
                  review: "Apex Nutra has been a reliable partner with Trace Minerals in fulfilling stick pack and pack-out needs. They always hit due dates and when urgency is needed, always find a way to pull through! I highly recommend Apex for any project that requires a high level of quality and customer service!",
                  rating: 5,
                  image: "TM",
                  highlighted: true
                },
                {
                  name: "Courtney",
                  role: "Founder",
                  company: "Primal",
                  review: "They took the time to help me refine my first product until the finished result was exactly what I needed — not just for my business, but for my customers. That level of attention and pride in their work is rare in this industry, and it gave me peace of mind that's genuinely hard to find.",
                  rating: 5,
                  image: "CP"
                },
                {
                  name: "AV",
                  role: "Founder & CEO",
                  company: "HALO Hydration",
                  review: "We've been working with Apex Nutra for our stick pack manufacturing and kitting needs, and they continue to exceed our expectations. The production quality is consistently top-tier—perfect fill accuracy, clean seal integrity, and excellent attention to detail.",
                  rating: 5,
                  image: "AV"
                },
                {
                  name: "CLS Manufacturing",
                  role: "Partner",
                  company: "CLS Manufacturing",
                  review: "The production quality is excellent, fill accuracy and seal integrity are perfect, turnaround times are fast, and the team is proactive from artwork to delivery. They're easy to work with and they really do a great job.Highly recommend them as a reliable stickpack and contract packing partner!",
                  rating: 5,
                  image: "CLS"
                }
              ];

              return (
                <>
                  {/* Mobile Carousel */}
                  <div className="md:hidden relative pt-6 pb-4">
                    <div className="overflow-visible">
                      <div 
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                      >
                        {testimonials.map((testimonial, index) => (
                          <div 
                            key={index}
                            className="w-full flex-shrink-0 px-4"
                          >
                            <div 
                              className="testimonial-card group relative h-full rounded-2xl p-6"
                              style={{
                                backgroundColor: '#ffffff',
                                border: testimonial.highlighted 
                                  ? `2px solid ${'#3b9032'}`
                                  : `1px solid ${'rgba(59, 144, 50, 0.2)'}`,
                                boxShadow: testimonial.highlighted
                                  ? '0 8px 32px rgba(59, 144, 50, 0.2), 0 0 0 1px rgba(59, 144, 50, 0.1)'
                                  : '0 4px 20px rgba(0, 0, 0, 0.08)'
                              }}
                            >
                              {/* Featured Badge for Highlighted */}
                              {testimonial.highlighted && (
                                <div 
                                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 z-10"
                                  style={{
                                    background: `linear-gradient(90deg, ${'#3b9032'}, ${'#81c029'})`,
                                    color: 'white',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                                  }}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                  Featured
                                </div>
                              )}

                              {/* Quote Icon */}
                              <div 
                                className="absolute top-4 right-4 opacity-15 group-hover:opacity-25 transition-opacity duration-300"
                              >
                                <svg width="40" height="40" viewBox="0 0 48 48" fill={'#3b9032'}>
                                  <path d="M12 34h6l4-8V14H10v12h6zm16 0h6l4-8V14H26v12h6z" opacity="0.3"/>
                                </svg>
                              </div>

                              {/* Stars Rating */}
                              <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <svg 
                                    key={i}
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 18 18" 
                                    fill={'#3b9032'}
                                  >
                                    <path d="M9 1l2.5 5.5L17 7.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z"/>
                                  </svg>
                                ))}
                              </div>

                              {/* Review Text */}
                              <p 
                                className="text-sm leading-relaxed mb-6 relative z-10"
                                style={{ color: '#4b5563' }}
                              >
                                "{testimonial.review}"
                              </p>

                              {/* Divider */}
                              <div 
                                className="w-12 h-0.5 mb-5 transition-all duration-300 group-hover:w-20"
                                style={{
                                  background: `linear-gradient(90deg, ${'#3b9032'}, transparent)`
                                }}
                              ></div>

                              {/* Author Info */}
                              <div className="flex items-center gap-3">
                                <div 
                                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm"
                                  style={{
                                    background: `linear-gradient(135deg, ${'#3b9032'}, ${'#81c029'})`
                                  }}
                                >
                                  {testimonial.image}
                                </div>
                                <div>
                                  <h4 
                                    className="font-bold text-sm mb-0.5"
                                    style={{ color: '#161616' }}
                                  >
                                    {testimonial.name}
                                  </h4>
                                  {!testimonial.highlighted && testimonial.name !== "CLS Manufacturing" && (
                                    <>
                                      <p 
                                        className="text-xs"
                                        style={{ color: '#6b7280' }}
                                      >
                                        {testimonial.role}
                                      </p>
                                      <p 
                                        className="text-xs font-semibold"
                                        style={{ color: '#3b9032' }}
                                      >
                                        {testimonial.company}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Hover Gradient Effect */}
                              <div 
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.02) 0%, transparent 100%)'
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                      onClick={() => setCurrentTestimonial(prev => Math.max(0, prev - 1))}
                      disabled={currentTestimonial === 0}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'rgba(59, 144, 50, 0.2)',
                        border: `2px solid ${'#3b9032'}`
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={'#3b9032'} strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentTestimonial(prev => Math.min(testimonials.length - 1, prev + 1))}
                      disabled={currentTestimonial === testimonials.length - 1}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'rgba(59, 144, 50, 0.2)',
                        border: `2px solid ${'#3b9032'}`
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={'#3b9032'} strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className="w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: currentTestimonial === index 
                              ? ('#3b9032')
                              : ('rgba(59, 144, 50, 0.3)'),
                            width: currentTestimonial === index ? '24px' : '8px'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Desktop Layout - 4 Equal Cards with Trace Minerals Highlighted */}
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                      <div 
                        key={index}
                        className={`testimonial-card group animate-scale animate-on-scroll stagger-${index + 1}`}
                      >
                        <div 
                          className="relative h-full p-6 rounded-2xl flex flex-col"
                          style={{
                            backgroundColor: '#ffffff',
                            border: testimonial.highlighted 
                              ? `2px solid ${'#3b9032'}`
                              : `1px solid ${'rgba(59, 144, 50, 0.2)'}`,
                            boxShadow: testimonial.highlighted
                              ? '0 8px 32px rgba(59, 144, 50, 0.2), 0 0 0 1px rgba(59, 144, 50, 0.1)'
                              : '0 4px 20px rgba(0, 0, 0, 0.08)'
                          }}
                        >
                          {/* Featured Badge for Highlighted */}
                          {testimonial.highlighted && (
                            <div 
                              className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 z-10"
                              style={{
                                background: `linear-gradient(90deg, ${'#3b9032'}, ${'#81c029'})`,
                                color: 'white',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              Featured
                            </div>
                          )}
                          {/* Quote Icon */}
                          <div 
                            className="absolute top-4 right-4 opacity-15 group-hover:opacity-25 transition-opacity duration-300"
                          >
                            <svg width="40" height="40" viewBox="0 0 48 48" fill={'#3b9032'}>
                              <path d="M12 34h6l4-8V14H10v12h6zm16 0h6l4-8V14H26v12h6z" opacity="0.3"/>
                            </svg>
                          </div>

                          {/* Stars Rating */}
                          <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg 
                                key={i}
                                width="16" 
                                height="16" 
                                viewBox="0 0 18 18" 
                                fill={'#3b9032'}
                              >
                                <path d="M9 1l2.5 5.5L17 7.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z"/>
                              </svg>
                            ))}
                          </div>

                          {/* Review Text */}
                          <p 
                            className="text-sm leading-relaxed mb-6 relative z-10 flex-grow"
                            style={{ color: '#4b5563' }}
                          >
                            "{testimonial.review}"
                          </p>

                          {/* Divider */}
                          <div 
                            className="w-12 h-0.5 mb-5 transition-all duration-300 group-hover:w-20"
                            style={{
                              background: `linear-gradient(90deg, ${'#3b9032'}, transparent)`
                            }}
                          ></div>

                          {/* Author Info */}
                          <div className="flex items-center gap-3">
                            <div 
                              className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm"
                              style={{
                                background: `linear-gradient(135deg, ${'#3b9032'}, ${'#81c029'})`
                              }}
                            >
                              {testimonial.image}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 
                                className="font-bold text-sm mb-0.5 truncate"
                                style={{ color: '#161616' }}
                              >
                                {testimonial.name}
                              </h4>
                              {!testimonial.highlighted && testimonial.name !== "CLS Manufacturing" && (
                                <>
                                  <p 
                                    className="text-xs truncate"
                                    style={{ color: '#6b7280' }}
                                  >
                                    {testimonial.role}
                                  </p>
                                  <p 
                                    className="text-xs font-semibold truncate"
                                    style={{ color: '#3b9032' }}
                                  >
                                    {testimonial.company}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Hover Gradient Effect */}
                          <div 
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: 'linear-gradient(135deg, rgba(59, 144, 50, 0.02) 0%, transparent 100%)'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t" style={{ borderColor: 'rgba(59, 144, 50, 0.1)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 animate-on-scroll">
              {[
                { number: "100M+", label: "Units Produced" },
                { number: "99.8%", label: "Client Retention" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {stat.number}
                  </div>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: '#6b7280' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stay in the Loop Section */}
      <div className="relative py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: '#161616' }}
            >
              Stay in the
              <span style={{
                background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {' '}Loop
              </span>
            </h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              Get exclusive insights delivered to your inbox
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === "loading"}
              className="flex-1 px-5 py-3 rounded-xl outline-none transition-all duration-300"
              style={{
                backgroundColor: '#ffffff',
                border: `2px solid ${
                  subscribeStatus === "error" 
                    ? "#ef4444" 
                    : subscribeStatus === "success"
                    ? "#22c55e"
                    : 'rgba(59, 144, 50, 0.2)'
                }`,
                color: '#161616',
                opacity: subscribeStatus === "loading" ? 0.7 : 1
              }}
            />
            <button
              type="submit"
              disabled={subscribeStatus === "loading"}
              className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: subscribeStatus === "success" 
                  ? '#22c55e' 
                  : subscribeStatus === "error"
                  ? '#ef4444'
                  : 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)'
              }}
            >
              {subscribeStatus === "loading" ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </>
              ) : subscribeStatus === "success" ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <svg className="transition-transform duration-300 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3l7 7-7 7M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {subscribeMessage && (
            <div 
              className="mt-4 text-center text-sm font-medium animate-on-scroll animate-in"
              style={{ 
                color: subscribeStatus === "error" ? "#ef4444" : "#22c55e" 
              }}
            >
              {subscribeMessage}
            </div>
          )}

          <p className="text-xs text-center mt-4" style={{ color: '#9ca3af' }}>
            Unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="relative py-12 border-t" style={{ borderColor: 'rgba(59, 144, 50, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={'#3b9032'}>
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
                    border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={'#3b9032'}>
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
                    border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={'#3b9032'}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Email */}
                <a 
                  href="mailto:contact@apexnutra.com"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(59, 144, 50, 0.1)',
                    border: `1px solid ${'rgba(59, 144, 50, 0.3)'}`
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={'#3b9032'}>
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