"use client";
import { useState, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  
  // Refs for smooth scroll
  const featuresRef = useRef(null);
  const philosophyRef = useRef(null);
  const roadmapRef = useRef(null);
  const hotelsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      console.log("Email saved:", email);
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
            <button className={styles.btnOrange}>Join Waitlist →</button>
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

      {/* Architecture Section */}
      <section className={styles.architecture}>
        <h2>Built for Global Hospitality</h2>
        <p className={styles.architectureSubhead}>Enterprise-grade infrastructure that most AI tools ignore</p>
        <div className={styles.architectureGrid}>
          <div className={styles.architectureCard}>
            <div className={styles.architectureIcon}>🎮</div>
            <h3>Control Plane</h3>
            <p>Global orchestration. Intent routing. Model selection. Load balancing across regions.</p>
            <ul>
              <li>✓ Centralized model management</li>
              <li>✓ Real-time failover</li>
              <li>✓ Unified analytics</li>
            </ul>
          </div>
          <div className={styles.architectureCard}>
            <div className={styles.architectureIcon}>🌍</div>
            <h3>Regional Planes</h3>
            <p>Deployed in US, EU, Asia, Middle East. Guest requests stay in their region.</p>
            <ul>
              <li>✓ <strong>&lt;100ms latency</strong> for any hotel globally</li>
              <li>✓ Local data compliance (GDPR, CCPA, PDPA)</li>
              <li>✓ No cross-region bottlenecks</li>
            </ul>
          </div>
          <div className={styles.architectureCard}>
            <div className={styles.architectureIcon}>⚡</div>
            <h3>Hot Path Optimization</h3>
            <p>Frequently used intents (booking, cancellation) cached and routed instantly.</p>
            <ul>
              <li>✓ 10x faster for common requests</li>
              <li>✓ Auto-scaling during peak hours</li>
              <li>✓ 99.99% uptime SLA</li>
            </ul>
          </div>
        </div>
        <div className={styles.architectureNote}>
          💡 Most hotel AI runs on single-region servers. Your guests in Tokyo wait 2-3 seconds. We fixed that.
        </div>
      </section>

      {/* Roadmap Section */}
      <section ref={roadmapRef} className={styles.roadmap}>
        <h2>Roadmap to Human-like Hospitality</h2>
        <p className={styles.roadmapSubhead}>We're building the most human AI for hotels. Here's how.</p>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <span className={styles.badge}>Q3 2025</span>
              <h3>Text Concierge Launch</h3>
              <p>Bookings, cancellations, refunds, FAQs. Intent detection at 90% accuracy. Human handoff at 85% confidence.</p>
              <ul>
                <li>✅ NLP-based intent recognition</li>
                <li>✅ Full RBAC (5 permission levels)</li>
                <li>✅ Real-time handoff to support team</li>
                <li>✅ Multi-region control plane ready</li>
              </ul>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <span className={styles.badge}>Q4 2025</span>
              <h3>Voice Integration</h3>
              <p>Phone calls, room phones, voice assistants. Same AI, now spoken.</p>
              <ul>
                <li>🎤 In-room voice commands ("Hey Hotel...")</li>
                <li>📞 Phone call handling (IVR replacement)</li>
                <li>🗣️ Multi-language support</li>
              </ul>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <span className={styles.badge}>Q1 2026</span>
              <h3>Predictive Hospitality</h3>
              <p>AI learns guest preferences. Proactive upsells. "Welcome back! Your usual room type is available."</p>
              <ul>
                <li>📊 Guest preference memory</li>
                <li>💡 Proactive suggestions (late checkout, upgrades)</li>
                <li>📈 Revenue optimization</li>
              </ul>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <span className={styles.badge}>Q2 2026</span>
              <h3>Multi-Property Intelligence</h3>
              <p>Analytics across hotel groups. Train AI on YOUR brand's voice and service standards.</p>
              <ul>
                <li>🏨 Cross-property analytics</li>
                <li>🎨 Custom AI personality (luxury, budget, boutique)</li>
                <li>🤝 Staff training mode</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For Hotels Section */}
      <section ref={hotelsRef} className={styles.forHotels}>
        <h2>Built <span className={styles.gradientText}>For Hotels</span>, By People Who Care</h2>
        <div className={styles.hotelsGrid}>
          <div className={styles.hotelsCard}>
            <div className={styles.hotelsIcon}>🏨</div>
            <h3>Your Website. Your Brand.</h3>
            <p>Guest never leaves your domain. No third-party chat widgets. No WhatsApp forwarding. Everything happens on YOUR site.</p>
          </div>
          <div className={styles.hotelsCard}>
            <div className={styles.hotelsIcon}>⚡</div>
            <h3>Global Speed Guarantee</h3>
            <p>Multi-region deployment means your Dubai, Singapore, and London guests all get &lt;100ms response times. Most AI tools ignore this. We built for it.</p>
          </div>
          <div className={styles.hotelsCard}>
            <div className={styles.hotelsIcon}>🔒</div>
            <h3>You Stay in Control</h3>
            <p>Full RBAC. Audit logs. Approve all AI actions. Your data never leaves your region (GDPR, CCPA compliant).</p>
          </div>
          <div className={styles.hotelsCard}>
            <div className={styles.hotelsIcon}>🤝</div>
            <h3>We Work WITH Your Team</h3>
            <p>AI handles 80% of repetitive queries. Your staff handles VIPs and complex issues. No layoffs. Just efficiency.</p>
          </div>
        </div>
      </section>

      {/* Why Hotels Choose Us */}
      <section className={styles.whyUs}>
        <h2>Why Hoteliers Trust Us</h2>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <div className={styles.whyNumber}>1</div>
            <h3>No "Robotic" Responses</h3>
            <p>Our AI sounds like your best front desk agent. Empathetic. Fast. Human-like.</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyNumber}>2</div>
            <h3>Works WITH Your Team</h3>
            <p>AI handles 80% of repetitive queries. Humans focus on complex issues and VIP guests.</p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyNumber}>3</div>
            <h3>Global Infrastructure</h3>
            <p>Most hotel AI runs on US servers only. We deploy regional planes. Your guests get sub-100ms responses anywhere.</p>
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
            <form onSubmit={handleSubmit} className={styles.waitlistForm}>
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
