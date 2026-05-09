"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    hotelName: "",
    hotelRole: "",
    hotelSize: "",
    phoneNumber: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");

  // Refs for smooth scroll
  const featuresRef = useRef(null);
  const philosophyRef = useRef(null);
  const roadmapRef = useRef(null);
  const hotelsRef = useRef(null);
  const integrationsRef = useRef(null);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.body.classList.add("light-mode");
    } else {
      setIsDarkMode(true);
      document.body.classList.remove("light-mode");
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector(`.${styles.navbar}`);
      const menuButton = document.querySelector(`.${styles.menuButton}`);
      if (
        isMobileMenuOpen &&
        nav &&
        !nav.contains(event.target) &&
        !menuButton?.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu when window is resized above 1200px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menuOpen");
    } else {
      document.body.classList.remove("menuOpen");
    }

    return () => {
      document.body.classList.remove("menuOpen");
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("light-mode");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.add("light-mode");
    }
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false); // Close menu after clicking
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
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
      message: "",
    });
    setFormStatus("idle");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

    try {
      // Optional fake delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fd = new FormData();

      fd.append("email", formData.email);
      fd.append("email_type", "JOIN_WAIT_LIST");
      fd.append("to_ghai", "to_ghai");

      fd.append("hotel_name", formData.hotelName || "");
      fd.append("full_name", formData.fullName || "");
      fd.append("phone", formData.phoneNumber || "");
      fd.append("hotel_size", formData.hotelSize || "");
      fd.append("message", formData.message || "");

      const response = await fetch(
        "https://email2.magicchat.io/prod/send_email",
        {
          method: "POST",
          headers: {
            "x-api-key": "justanything",
          },
          body: fd,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setFormStatus("success");

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      console.error("❌ Error sending waitlist email:", error);
      setFormStatus("error");
      alert("Something went wrong while joining the waitlist.");
    }
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
    <div
      className={`${styles.container} ${!isDarkMode ? styles.lightContainer : ""}`}
    >
      {/* Navbar */}
      <nav
        className={`${styles.navbar} ${!isDarkMode ? styles.lightNavbar : ""}`}
      >
        <div className={styles.logo}>
          <Image
            src="/getHoltelAiLogo.svg"
            alt="GetHotelAI Logo"
            width={80}
            height={60}
            priority
          />
          <h3>GetHotelAI</h3>
        </div>

        {/* Burger Menu Button */}
        <button
          className={`${styles.menuButton} ${isMobileMenuOpen ? styles.menuButtonActive : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.burgerIcon}></span>
          <span className={styles.burgerIcon}></span>
          <span className={styles.burgerIcon}></span>
        </button>

        <ul
          className={`${styles.navItems} ${isMobileMenuOpen ? styles.navItemsOpen : ""}`}
        >
          <li
            className={styles.navItem}
            onClick={() => scrollToSection(featuresRef)}
          >
            Features
          </li>
          <li
            className={styles.navItem}
            onClick={() => scrollToSection(philosophyRef)}
          >
            Philosophy
          </li>
          <li
            className={styles.navItem}
            onClick={() => scrollToSection(roadmapRef)}
          >
            Roadmap
          </li>
          <li
            className={styles.navItem}
            onClick={() => scrollToSection(integrationsRef)}
          >
            Integrations
          </li>
          <li
            className={styles.navItem}
            onClick={() => scrollToSection(hotelsRef)}
          >
            For Hotels
          </li>
          {/* Mobile Coming Soon Button - Only shows in mobile menu */}
          <li className={styles.mobileComingSoon}>
            <button className={styles.mobileBtnDark} onClick={openModal}>
              Coming Soon →
            </button>
          </li>
        </ul>

        <div className={styles.navIcons}>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          {/* Desktop Coming Soon Button - Hidden on mobile via CSS */}
          <button className={styles.btnDark} onClick={openModal}>
            Coming Soon →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className={`${styles.banner} ${!isDarkMode ? styles.lightBanner : ""}`}
      >
        <div className={styles.bannerText}>
          <h1>
            AI that <span className={styles.gradientText}>disappears.</span>
            <br />
            Hospitality that shines.
          </h1>
          <p>
            Full concierge AI that handles bookings, cancellations, room
            service, and more.
            <br />
            Handoff to humans in seconds. Never robotic. Always efficient.
          </p>
          <div className={styles.bannerButtons}>
            <button className={styles.btnOrange} onClick={openModal}>
              Join Waitlist →
            </button>
            <button className={styles.btnDark}>See Demo</button>
          </div>
          <div className={styles.trustBadges}>
            <span>🔐 Enterprise-grade RBAC</span>
            <span>🎤 Voice ready (Q4 2026)</span>
            <span>🤝 Human-in-the-loop</span>
            <span>🌍 Multi-region (Global &lt; 100ms)</span>
          </div>
        </div>
        <div className={styles.bannerImage}>
          <div className={styles.imagePlaceholder}>
            <Image
              src="/banners.svg"
              alt="GetHotelAI banner"
              width={550}
              height={500}
            />
            <div className={styles.chatPreview}>
              "I've cancelled your reservation. Refund will process in 3-5 days.
              Need anything else?"
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={`${styles.modalContent} ${!isDarkMode ? styles.lightModal : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={closeModal}>
              ×
            </button>
            <h2 className={styles.modalTitle}>Join the Waitlist</h2>
            <p className={styles.modalSubtitle}>
              Be among the first 50 hotels to experience GetHotelAI
            </p>

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
                  <label className={styles.formLabel}>
                    Phone Number (Optional)
                  </label>
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
                  <label className={styles.formLabel}>
                    Message / Specific Needs (Optional)
                  </label>
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
                  {formStatus === "loading"
                    ? "Submitting..."
                    : "Join Waitlist →"}
                </button>

                <p className={styles.formNote}>
                  We'll notify you once GetHotelAI launches. No spam, just
                  updates.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Philosophy Section */}
      <section
        ref={philosophyRef}
        className={`${styles.philosophy} ${!isDarkMode ? styles.lightPhilosophy : ""}`}
      >
        <div className={styles.philosophyContainer}>
          <h2>Our Philosophy</h2>
          <p className={styles.philosophySubhead}>
            AI should empower humans, not replace them.
          </p>
          <div className={styles.philosophyGrid}>
            <div
              className={`${styles.philosophyCard} ${!isDarkMode ? styles.lightCard : ""}`}
            >
              <div className={styles.philosophyIcon}>🎯</div>
              <h3>Handoff in &lt;3 seconds</h3>
              <p>
                When AI confidence drops below 85%, human takes over. Seamless.
                No "I don't understand" loops.
              </p>
            </div>
            <div
              className={`${styles.philosophyCard} ${!isDarkMode ? styles.lightCard : ""}`}
            >
              <div className={styles.philosophyIcon}>🧠</div>
              <h3>Real NLP, not keywords</h3>
              <p>
                Full intent detection. "I need to leave early" = cancellation
                flow. "Can I get fresh towels?" = housekeeping.
              </p>
            </div>
            <div
              className={`${styles.philosophyCard} ${!isDarkMode ? styles.lightCard : ""}`}
            >
              <div className={styles.philosophyIcon}>👥</div>
              <h3>Role-Based Access</h3>
              <p>
                Front desk sees guests. Managers see analytics. Owners see
                revenue. Granular permissions built-in.
              </p>
            </div>
            <div
              className={`${styles.philosophyCard} ${!isDarkMode ? styles.lightCard : ""}`}
            >
              <div className={styles.philosophyIcon}>🗣️</div>
              <h3>Voice Native</h3>
              <p>
                Q4 2026: Phone calls, room phones, Alexa-style voice commands.
                Same intelligence, new interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        ref={featuresRef}
        className={`${styles.features} ${!isDarkMode ? styles.lightFeatures : ""}`}
      >
        <h2>What Our AI Handles</h2>
        <div className={styles.featuresGrid}>
          <div
            className={`${styles.featureCard} ${!isDarkMode ? styles.lightCard : ""}`}
          >
            <div className={styles.featureIcon}>📅</div>
            <h3>Booking &amp; Reservations</h3>
            <p>
              New bookings, modifications, cancellations, refunds. Full calendar
              sync with your PMS.
            </p>
          </div>
          <div
            className={`${styles.featureCard} ${!isDarkMode ? styles.lightCard : ""}`}
          >
            <div className={styles.featureIcon}>🔧</div>
            <h3>Service Actions</h3>
            <p>
              Room service, maintenance, housekeeping, late checkout. Direct
              integration with hotel ops.
            </p>
          </div>
          <div
            className={`${styles.featureCard} ${!isDarkMode ? styles.lightCard : ""}`}
          >
            <div className={styles.featureIcon}>🔐</div>
            <h3>RBAC &amp; Permissions</h3>
            <p>
              Granular roles: Agent, Supervisor, Manager, Admin, Owner. Audit
              logs for compliance.
            </p>
          </div>
          <div
            className={`${styles.featureCard} ${!isDarkMode ? styles.lightCard : ""}`}
          >
            <div className={styles.featureIcon}>🎧</div>
            <h3>Live Human Handoff</h3>
            <p>
              AI escalates to support team instantly. Context preserved. No
              repetition needed.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section
        className={`${styles.waitlist} ${!isDarkMode ? styles.lightWaitlist : ""}`}
      >
        <div className={styles.waitlistContainer}>
          <h2>Be the first to know</h2>
          <p>Launching Q3 2026. Early access for first 50 hotels.</p>
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
      <footer
        className={`${styles.footer} ${!isDarkMode ? styles.lightFooter : ""}`}
      >
        <p>
          © 2026 GetHotelAI. Human-like AI for modern hotels. Built for global
          hospitality.
        </p>
      </footer>
    </div>
  );
}
