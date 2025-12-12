"use client";

import { useState } from "react";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Using Web3Forms - Get your access key from: https://web3forms.com
      // Replace with your own key or use environment variable
      const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "abc482a8-6c30-46ec-87f8-5a9e8d2c2150";
      
      // If you don't have a key yet, Web3Forms provides a demo key for testing:
      // Demo key (replace with your own): "access_key_goes_here"
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for contacting us! We'll get back to you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "30px",
        background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
        color: "#1f2937",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: "linear-gradient(90deg, #3b9032 0%, #81c029 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contact Us
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ color: "#4b5563" }}
          >
            Get in touch with our team. We're here to help you with your nutritional supplement needs.
          </p>
        </div>

        {/* Contact Information and Form Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div>
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: "#1f2937" }}
            >
              Get In Touch
            </h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(59, 144, 50, 0.05)",
                  border: `1px solid rgba(59, 144, 50, 0.2)`,
                }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #3b9032 0%, #81c029 100%)",
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-2"
                      style={{ color: "#3b9032" }}
                    >
                      Our Location
                    </h3>
                    <p style={{ color: "#4b5563" }}>
                      395 N 1140 W, Suite 2<br />
                      Ogden, UT 84404<br />
                      USA
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(59, 144, 50, 0.05)",
                  border: `1px solid rgba(59, 144, 50, 0.2)`,
                }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #3b9032 0%, #81c029 100%)",
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-2"
                      style={{ color: "#3b9032" }}
                    >
                      Phone
                    </h3>
                    <p style={{ color: "#4b5563" }}>
                      <a href="tel:+13852808343" className="hover:underline" style={{ color: "#4b5563" }}>
                        (385) 280-8343
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(59, 144, 50, 0.05)",
                  border: `1px solid rgba(59, 144, 50, 0.2)`,
                }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #3b9032 0%, #81c029 100%)",
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-2"
                      style={{ color: "#3b9032" }}
                    >
                      Email
                    </h3>
                    <p style={{ color: "#4b5563" }}>
                      <a href="mailto:kwybrow@apexnutraus.com" className="hover:underline" style={{ color: "#4b5563" }}>
                        kwybrow@apexnutraus.com
                      </a><br />
                      <span className="text-sm" style={{ color: "#6b7280" }}>
                        Contact: Kim Wybrow
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: "#1f2937" }}
            >
              Send Us A Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background:
                      submitStatus.type === "success"
                        ? "rgba(59, 144, 50, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                    border: `1px solid ${
                      submitStatus.type === "success"
                        ? "rgba(59, 144, 50, 0.3)"
                        : "rgba(239, 68, 68, 0.3)"
                    }`,
                    color: submitStatus.type === "success" ? "#3b9032" : "#ef4444",
                  }}
                >
                  {submitStatus.message}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#4b5563" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    background: "#ffffff",
                    border: `1px solid rgba(59, 144, 50, 0.2)`,
                    color: "#1f2937",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#4b5563" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    background: "#ffffff",
                    border: `1px solid rgba(59, 144, 50, 0.2)`,
                    color: "#1f2937",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#4b5563" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    background: "#ffffff",
                    border: `1px solid rgba(59, 144, 50, 0.2)`,
                    color: "#1f2937",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#4b5563" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 resize-none"
                  style={{
                    background: "#ffffff",
                    border: `1px solid rgba(59, 144, 50, 0.2)`,
                    color: "#1f2937",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: "linear-gradient(135deg, #3b9032 0%, #81c029 100%)",
                  boxShadow: "0 10px 30px rgba(59, 144, 50, 0.2)",
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
