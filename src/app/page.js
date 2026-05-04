"use client";
import { useState, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    hotelName: "",
    hotelRole: "",
    hotelSize: "",
    phoneNumber: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("idle");
  
  // Refs for smooth scroll
  const featuresRef = useRef(null);
  const philosophyRef = useRef(null);
  const roadmapRef = useRef(null);
  const hotelsRef = useRef(null);
  const integrationsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      fullName: "",
      email: "",
      hotelName: "",
      hotelRole: "",
      hotelSize: "",
      phoneNumber: "",
      message: ""
    });
    setFormStatus("idle");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    
    // Log all form data to console
    console.log("=== New Waitlist Signup ===");
    console.log("Full Name:", formData.fullName);
    console.log("Email:", formData.email);
    console.log("Hotel Name:", formData.hotelName);
    console.log("Role:", formData.hotelRole);
    console.log("Hotel Size:", formData.hotelSize);
    console.log("Phone:", formData.phoneNumber);
    console.log("Message:", formData.message);
    console.log("Timestamp:", new Date().toISOString());
    console.log("==========================");
    
    // TODO: API call will be added here later
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        closeModal();
        alert("Thank you for joining the waitlist! We'll email you once GetHotelAI launches. 🏨✨");
      }, 1500);
    }, 1000);
  };

  const handleSimpleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    console.log("Simple email saved:", email);
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>🏨 GetHotelAI</div>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={() => scrollToSection(featuresRef)}>Features</li>
          <li className={styles.navItem} onClick={() => scrollToSection(philosophyRef)}>Philosophy</li>
          <li className={styles.navItem} onClick={() => scrollToSection(roadmapRef)}>Roadmap</li>
          <li className={styles.navItem} onClick={() => scrollToSection(integrationsRef)}>Integrations</li>
          <li className={styles.navItem} onClick={() => scrollToSection(hotelsRef)}>For Hotels</li>
        </ul>
        <div className={styles.navIcons}>
          <button className={styles.btnDark}>Coming Soon →</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.banner}>
        <div className={styles.bannerText}>
          <h1>AI that <span className={styles.gradientText}>disappears.</span><br />Hospitality that shines.</h1>
          <p>
            Full concierge AI that handles bookings, cancellations, room service, and more.<br />
            Handoff to humans in seconds. Never robotic. Always efficient.
          </p>
          <div className={styles.bannerButtons}>
            <button className={styles.btnOrange} onClick={openModal}>Join Waitlist →</button>
            <button className={styles.btnDark}>See Demo</button>
          </div>
          <div className={styles.trustBadges}>
            <span>🔐 Enterprise-grade RBAC</span>
            <span>🎤 Voice ready (Q4 2025)</span>
            <span>🤝 Human-in-the-loop</span>
            <span>🌍 Multi-region (Global &lt; 100ms)</span>
          </div>
        </div>
        <div className={styles.bannerImage}>
          <div className={styles.imagePlaceholder}>
            <div className={styles.aiPreview}>🤖 <span>Human-like AI</span></div>
            <div className={styles.chatPreview}>"I've cancelled your reservation. Refund will process in 3-5 days. Need anything else?"</div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>×</button>
            <h2 className={styles.modalTitle}>Join the Waitlist</h2>
            <p className={styles.modalSubtitle}>Be among the first 50 hotels to experience GetHotelAI</p>
            
            {formStatus === "success" ? (
              <div className={styles.successMessage}>
                ✓ Thank you for joining! We'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="john@hotel.com"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Hotel Name *</label>
                  <input
                    type="text"
                    name="hotelName"
                    required
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Grand Plaza Hotel"
                  />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Your Role *</label>
                    <select
                      name="hotelRole"
                      required
                      value={formData.hotelRole}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                    >
                      <option value="">Select role</option>
                      <option value="owner">Hotel Owner</option>
                      <option value="gm">General Manager</option>
                      <option value="frontdesk">Front Desk Manager</option>
                      <option value="revenue">Revenue Manager</option>
                      <option value="tech">IT Director</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Hotel Size *</label>
                    <select
                      name="hotelSize"
                      required
                      value={formData.hotelSize}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                    >
                      <option value="">Select size</option>
                      <option value="1-20">Boutique (1-20 rooms)</option>
                      <option value="21-50">Small (21-50 rooms)</option>
                      <option value="51-150">Medium (51-150 rooms)</option>
                      <option value="151-300">Large (151-300 rooms)</option>
                      <option value="300+">Grand (300+ rooms)</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Message / Specific Needs (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    placeholder="Tell us about your hotel's specific needs..."
                    rows="3"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={formStatus === "loading"}
                >
                  {formStatus === "loading" ? "Submitting..." : "Join Waitlist →"}
                </button>
                
                <p className={styles.formNote}>
                  We'll notify you once GetHotelAI launches. No spam, just updates.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Philosophy Section */}
      <section ref={philosophyRef} className={styles.philosophy}>
        <div className={styles.philosophyContainer}>
          <h2>Our Philosophy</h2>
          <p className={styles.philosophySubhead}>AI should empower humans, not replace them.</p>
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>🎯</div>
              <h3>Handoff in &lt;3 seconds</h3>
              <p>When AI confidence drops below 85%, human takes over. Seamless. No "I don't understand" loops.</p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>🧠</div>
              <h3>Real NLP, not keywords</h3>
              <p>Full intent detection. "I need to leave early" = cancellation flow. "Can I get fresh towels?" = housekeeping.</p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>👥</div>
              <h3>Role-Based Access</h3>
              <p>Front desk sees guests. Managers see analytics. Owners see revenue. Granular permissions built-in.</p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>🗣️</div>
              <h3>Voice Native</h3>
              <p>Q4 2025: Phone calls, room phones, Alexa-style voice commands. Same intelligence, new interface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className={styles.features}>
        <h2>What Our AI Handles</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📅</div>
            <h3>Booking &amp; Reservations</h3>
            <p>New bookings, modifications, cancellations, refunds. Full calendar sync with your PMS.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔧</div>
            <h3>Service Actions</h3>
            <p>Room service, maintenance, housekeeping, late checkout. Direct integration with hotel ops.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h3>RBAC &amp; Permissions</h3>
            <p>Granular roles: Agent, Supervisor, Manager, Admin, Owner. Audit logs for compliance.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎧</div>
            <h3>Live Human Handoff</h3>
            <p>AI escalates to support team instantly. Context preserved. No repetition needed.</p>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className={styles.waitlist}>
        <div className={styles.waitlistContainer}>
          <h2>Be the first to know</h2>
          <p>Launching Q3 2025. Early access for first 50 hotels.</p>
          {status === "success" ? (
            <div className={styles.successMessage}>
              ✓ You're on the list! We'll reach out.
            </div>
          ) : (
            <form onSubmit={handleSimpleSubmit} className={styles.waitlistForm}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={styles.submitButton}
              >
                {status === "loading" ? "..." : "Join Waitlist →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 GetHotelAI. Human-like AI for modern hotels. Built for global hospitality.</p>
      </footer>
    </div>
  );
}
