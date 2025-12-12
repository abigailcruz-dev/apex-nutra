"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Manufacturer", href: "/manufacturer" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="shadow-md fixed w-full z-50" style={{ backgroundColor: '#ffffff' }} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex justify-between h-16" suppressHydrationWarning>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Apex Nutra Logo"
              className="h-8 w-auto"
            />
            <h1 className="text-2xl" suppressHydrationWarning>
              <span style={{ fontFamily: 'var(--font-gotham, sans-serif)', fontWeight: 700, color: '#1f2937' }} suppressHydrationWarning>APEX</span>
              <span style={{
                fontFamily: 'var(--font-raleway, sans-serif)',
                fontWeight: 300,
                marginLeft: '0.25rem',
                background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>NUTRA</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg transition-all duration-300 relative"
                style={{
                  color: isActive(item.href) ? '#81c029' : '#1f2937',
                  background: isActive(item.href) ? 'rgba(59, 144, 50, 0.15)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.background = 'rgba(129, 192, 41, 0.1)';
                    e.currentTarget.style.color = '#81c029';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#1f2937';
                  }
                }}
              >
                {item.label}
                {isActive(item.href) && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #3b9032 0%, #81c029 100%)',
                    }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Side - Contact Icon and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Contact Icon Button */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300"
              style={{
                color: isActive("/contact") ? "#81c029" : "#3b9032",
                background: isActive("/contact") ? "rgba(59, 144, 50, 0.15)" : "rgba(129, 192, 41, 0.1)",
              }}
              onMouseEnter={(e) => {
                if (!isActive("/contact")) {
                  e.currentTarget.style.background = "rgba(59, 144, 50, 0.2)";
                  e.currentTarget.style.color = "#81c029";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/contact")) {
                  e.currentTarget.style.background = "rgba(129, 192, 41, 0.1)";
                  e.currentTarget.style.color = "#3b9032";
                }
              }}
              title="Contact Us"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md md:hidden"
              style={{
                color: "#1f2937",
              }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 shadow-md" style={{ backgroundColor: '#f3f4f6' }} suppressHydrationWarning>
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md transition-all duration-300"
              style={{
                color: isActive(item.href) ? '#81c029' : '#1f2937',
                background: isActive(item.href) ? 'rgba(59, 144, 50, 0.15)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.background = 'rgba(129, 192, 41, 0.1)';
                  e.currentTarget.style.color = '#81c029';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#1f2937';
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

