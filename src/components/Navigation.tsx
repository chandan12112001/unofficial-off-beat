import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setScrolled(v > 0.02);
    });
    return unsub;
  }, [scrollYProgress]);

  const navLinks = [
    { label: "Builders", href: "#builders" },
    { label: "Philosophy", href: "#philosophy" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-[9990] flex items-center justify-between px-8 "
        style={{
          height: "72px",
          // background: scrolled ? "transparent" : "transparent",
          // backdropFilter: scrolled ? "blur(20px)" : "none",
          // borderBottom: scrolled
          //   ? "1px solid rgba(255,255,255,0.05)"
          //   : "1px solid transparent",
          transition:
            "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo — left side */}
        <a href="#" className="flex items-center gap-2 group" data-hover>
          <Image
            src="/off-beat-logo.png"
            alt="OffBeat Studios"
            width={140}
            height={40}
            priority
            style={{
              objectFit: "contain",
            }}
          />
        </a>

        {/* Right side — nav links pill + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Nav links inside a pill container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "999px",
              padding: "6px 6px",
            }}
          >
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                data-hover
                className="relative group"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.04em",
                  color: "rgba(255, 255, 255, 0.81)",
                  fontFamily: "Inter Tight, sans-serif",
                  fontWeight: 500,
                  textDecoration: "none",
                  padding: "6px 24px",
                  borderRadius: "999px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA button — pill shape */}
          <a
            href="#cta"
            data-hover
            className="flex items-center gap-2 group"
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: "12px",
              letterSpacing: "0.04em",
              color: "#080808",
              fontFamily: "Inter Tight, sans-serif",
              fontWeight: 600,
              textDecoration: "none",
              background: "#f8f8f8",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#6378ff";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow =
                "0 0 24px rgba(99,120,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8f8f8";
              e.currentTarget.style.color = "#080808";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Enter Ecosystem
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          data-hover
          style={{ background: "none", border: "none", cursor: "none" }}
        >
          <span
            style={{
              width: 20,
              height: 1,
              background: menuOpen ? "transparent" : "#f8f8f8",
              display: "block",
              transition: "all 0.3s",
            }}
          />
          <span
            style={{
              width: 20,
              height: 1,
              background: "#f8f8f8",
              display: "block",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            style={{
              width: 20,
              height: 1,
              background: "#f8f8f8",
              display: "block",
              transition: "all 0.3s",
              transform: menuOpen
                ? "rotate(-45deg) translateY(-4px)"
                : "none",
            }}
          />
        </button>

        {/* Scroll progress line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px]"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "left",
            background: "linear-gradient(90deg, #6378ff, #a78bfa)",
            width: "100%",
          }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-[72px] left-0 right-0 z-[9989] md:hidden"
        style={{
          background: "rgba(8,8,8,0.97)",
          backdropFilter: "blur(30px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <div className="flex flex-col px-8 py-8 gap-6">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "Inter Tight, sans-serif",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: "#6378ff",
              fontFamily: "Inter Tight, sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              textDecoration: "none",
              marginTop: "8px",
            }}
          >
            Enter Ecosystem →
          </a>
        </div>
      </motion.div>
    </>
  );
}
