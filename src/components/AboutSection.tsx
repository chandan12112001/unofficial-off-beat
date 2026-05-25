"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

//  PHONE FRAME 
// Realistic iPhone-style phone frame with dynamic island notch
const PhoneFrame = ({
  src,
  alt,
  width = 220,
  height = 460,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <div
    className={`relative shrink-0 ${className}`}
    style={{ width, height }}
  >
    {/* Phone shell */}
    <div
      className="absolute inset-0 rounded-[36px] z-10 pointer-events-none"
      style={{
        background: "",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.08), 0 2px 4px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    />
    {/* Screen bezel inset */}
    <div
      className="absolute rounded-[30px] overflow-hidden"
      style={{ inset: "6px", zIndex: 5 }}
    >
      {/* Dynamic Island */}
      <div
        className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 rounded-full bg-black"
        style={{ width: "70px", height: "20px" }}
      />
      {/* Screen content */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="lazy"
      />
    </div>
    {/* Side buttons */}
    <div
      className="absolute left-[-2px] rounded-l-sm"
      style={{
        top: "80px", width: "2px", height: "28px",
        background: "linear-gradient(to right, #3a3a3a, #2a2a2a)",
      }}
    />
    <div
      className="absolute left-[-2px] rounded-l-sm"
      style={{
        top: "118px", width: "2px", height: "52px",
        background: "linear-gradient(to right, #3a3a3a, #2a2a2a)",
      }}
    />
    <div
      className="absolute right-[-2px] rounded-r-sm"
      style={{
        top: "100px", width: "2px", height: "64px",
        background: "linear-gradient(to left, #3a3a3a, #2a2a2a)",
      }}
    />
    {/* Glare */}
    <div
      className="absolute inset-0 rounded-[36px] pointer-events-none z-20"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)",
      }}
    />
  </div>
);

//  DESKTOP BROWSER FRAME ─
const DesktopFrame = ({
  src,
  alt,
  width = 660,
  height = 420,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) => (
  <div
    className="relative shrink-0"
    style={{ width, height }}
  >
    {/* Frame shell */}
    <div
      className="absolute inset-0 rounded-[12px]"
      style={{
        background: "linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    />
    {/* Browser chrome bar */}
    <div
      className="absolute top-0 left-0 right-0 rounded-t-[12px] flex items-center px-4 gap-2"
      style={{
        height: "32px",
        background: "linear-gradient(to bottom, #3a3a3c, #2c2c2e)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Traffic lights */}
      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      {/* URL bar */}
      <div
        className="flex-1 mx-4 rounded-md flex items-center px-3 gap-2"
        style={{
          height: "20px",
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <span className="text-white/30 text-[9px] font-mono truncate">linkedin/video/Ashutosh-Ghuge.co.in</span>
      </div>
    </div>
    {/* Screen */}
    <div
      className="absolute overflow-hidden rounded-b-[12px]"
      style={{ top: "32px", left: "0", right: "0", bottom: "0" }}
    >
      <video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  disablePictureInPicture
  controls={false}
  className="w-full h-full object-cover object-top"
>
  <source src="/tab-video.mp4" type="video/mp4" />
</video>
    </div>
    {/* Corner anchor dots */}
    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#141414] z-10" />
    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#141414] z-10" />
    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#141414] z-10" />
    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#141414] z-10" />
  </div>
);

//  LANDSCAPE CARD 
const LandscapeCard = ({
  src,
  alt,
  width = 300,
  height = 200,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <div
    className={`relative shrink-0 rounded-[16px] overflow-hidden ${className}`}
    style={{
      width,
      height,
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    {/* Corner anchor dots */}
    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#141414] z-10" />
    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#141414] z-10" />
    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#141414] z-10" />
    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#141414] z-10" />
  </div>
);

//  INFO CARD ──
const InfoCard = ({
  tag,
  title,
  description,
  color = "#a855f7",
  width = 380,
}: {
  tag: string;
  title: string;
  description: string;
  color?: string;
  width?: number;
}) => (
  <div
    className="flex flex-col gap-5 shrink-0"
    style={{
      width,
      background: "#141414",
      border: "1px solid rgba(255,255,255,0.07)",
      padding: "28px 28px 24px",
      borderRadius: "14px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}
  >
    <div className="flex items-center gap-2">
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
      />
      <span className="text-[11px] text-white/60 font-medium tracking-wide uppercase font-[Inter_Tight,sans-serif]">
        {tag}
      </span>
    </div>
    <h3
      className="text-[22px] font-medium tracking-tight text-[#f0f0f0] leading-[1.25] font-[Inter_Tight,sans-serif]"
    >
      {title}
    </h3>
    <p className="text-white/40 text-[14px] leading-[1.65] font-[Inter_Tight,sans-serif]">
      {description}
    </p>
    <button className="flex items-center gap-2 w-fit text-white/60 hover:text-white transition-colors duration-200 border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg text-[13px] font-[Inter_Tight,sans-serif]">
      View Project
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    </button>
  </div>
);

//  FIGMA TITLE 
const FigmaTitle = ({ title, eyebrow }: { title: string; eyebrow?: string }) => {
  return (
    <div  className="relative inline-flex flex-col items-center gap-3 z-20">
      {eyebrow && (
        <span className="text-[22px] tracking-tight font-[Inter_Tight,sans-serif]" style={{ color: "rgba(255,255,255,0.5)" }}>
          {eyebrow}?
        </span>
      )}
      <div className="relative px-8 py-5">
        <h2 id="main-heading" className="text-[5.5rem] md:text-[4rem] leading-[0.9] font-medium tracking-tighter text-[#f8f8f8] font-[Inter_Tight,sans-serif]">
  {title}
</h2>
      </div>
      <svg className="mt-6" width="24" height="64" viewBox="0 0 24 64" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
        <path d="M 12 0 L 12 52 M 5 46 L 12 52 L 19 46" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

//  MAIN COMPONENT 
export default function AboutSection() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const container = containerRef.current;
      const track = trackRef.current;
      if (!wrapper || !container || !track) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 64px",
          end: () => `+=${getScrollAmount() + window.innerHeight * 1.5}`,
          pin: true,
          scrub: 5,
          invalidateOnRefresh: true,
        },
      });
  gsap.set(["#main-heading", "#cta-heading"], {
        willChange: "filter, color",
        transform: "translateZ(0)",
      });
      // Phase 1: Expand container (0.95 → 1, rounded → full bleed)
      tl.to(container, {
        scale: 1,
        borderRadius: "0px",
        duration: 1,
        ease: "power2.inOut",
      });

// Main heading glow
      tl.fromTo(
        "#main-heading",
        {
          filter: "drop-shadow(0px 0px 0px rgba(255,255,255,0)) brightness(0.4)",
          color: "#444444",
        },
        {
          filter: "drop-shadow(0px 0px 12px rgba(220,210,255,0.5)) brightness(0.8)",
          color: "#cccccc",
          duration: 2,
          ease: "power1.in",
        },
        "<0.3"
      )
      .to("#main-heading", {
        filter: [
          "drop-shadow(0px 0px 4px rgba(255,255,255,0.95))",
          "drop-shadow(0px 0px 20px rgba(220,200,255,0.8))",
          "drop-shadow(0px 0px 60px rgba(190,160,255,0.5))",
          "brightness(1.15)",
        ].join(" "),
        color: "#ffffff",
        duration: 3,
        ease: "power3.out",
      });

      // Phase 2: Horizontal scroll
      tl.to(
        track,
        {
          x: () => -getScrollAmount(),
          duration: 10,
          ease: "none",
        },
        "<2"
      );

      // CTA heading glow
      tl.fromTo(
        "#cta-heading",
        {
          filter: "drop-shadow(0px 0px 0px rgba(255,255,255,0)) brightness(0.4)",
          color: "#444444",
        },
        {
          filter: "drop-shadow(0px 0px 12px rgba(220,210,255,0.5)) brightness(0.8)",
          color: "#cccccc",
          duration: 2,
          ease: "power1.in",
        },
        "-=3"
      )
      .to("#cta-heading", {
        filter: [
          "drop-shadow(0px 0px 4px rgba(255,255,255,0.95))",
          "drop-shadow(0px 0px 20px rgba(220,200,255,0.8))",
          "drop-shadow(0px 0px 60px rgba(190,160,255,0.5))",
          "brightness(1.15)",
        ].join(" "),
        color: "#ffffff",
        duration: 3,
        ease: "power3.out",
      });

      // Phase 3: Shrink back
      tl.to(container, {
        scale: 0.95,
        borderRadius: "32px",
        duration: 1,
        ease: "power2.inOut",
      });
    },
    { scope: wrapperRef, dependencies: [] }
  );
  return (
    <section
      ref={wrapperRef}
      id="studio"
      className="w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Section header — visible above the horizontal scroll area */}
      <div
        className="absolute top-[72px] left-0 right-0 z-30 flex items-center justify-between px-10 pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-1 h-1 rounded-full bg-white/40"
          />
          <span
            className="text-[11px] font-medium tracking-[0.2em] uppercase font-[Inter_Tight,sans-serif]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Studio
          </span>
        </div>
        <span
          className="text-[11px] font-medium tracking-[0.2em] uppercase font-[Inter_Tight,sans-serif]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Scroll to explore →
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full relative overflow-hidden"
        style={{ scale: 0.95, borderRadius: "32px", background: "#101010" }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full items-center"
          style={{ width: "max-content", willChange: "transform" }}
        >
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{ width: "100vw", height: "100%" }}
          >
            {/* LEFT — tall phone (Solent Rib Charter) */}
            <div className="absolute left-[6%] top-1/2 -translate-y-1/2 z-10">
              <PhoneFrame
                src="/1.jpeg"
                alt="Solent Rib Charter mobile"
                width={210}
                height={430}
              />
            </div>

            {/* TOP CENTER — landscape card (yacht) */}
            <div className="absolute top-[7%] left-1/2 -translate-x-1/2 z-10">
              <LandscapeCard
                src="/4.jpeg"
                alt="ANYA yacht"
                width={300}
                height={190}
              />
            </div>

            {/* BOTTOM CENTER — landscape card (sports car) */}
            <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 z-10">
              <LandscapeCard
                src="/6.jpeg"
                alt="Sports car"
                width={300}
                height={190}
              />
            </div>

            {/* RIGHT — tall phone (Wilderness safari) */}
            <div className="absolute right-[6%] top-1/2 -translate-y-1/2 z-10">
              <PhoneFrame
                src="/2.jpeg"
                alt="Wilderness safari app"
                width={210}
                height={430}
              />
            </div>

            {/* CENTER — Figma Title */}
            <FigmaTitle title="Keep them guessing" eyebrow="What we do" />
          </div>

          <div
            className="relative flex items-center shrink-0 h-full"
            style={{ width: "max-content", gap: 0 }}
          >
            {/* Two info cards — stacked vertically with absolute positioning */}
            <div className="relative shrink-0" style={{ width: "400px", height: "100%" }}>
              {/* Card 1 — upper */}
              <div className="absolute" style={{ top: "25%", left: "40px", transform: "translateY(-50%)" }}>
                <InfoCard
                  tag="High-Performing Website"
                  title="Modernising a group of sites for a marine services provider"
                  description="Breaking key pages into modular components allowed us to build a shared design system."
                  color="#a855f7"
                  width={340}
                />
              </div>
              {/* Card 2 — lower */}
              <div className="absolute" style={{ top: "72%", left: "40px", transform: "translateY(-50%)" }}>
                <InfoCard
                  tag="High-Performing Website"
                  title="Optimising conversion without compromising luxury"
                  description="We redesigned user journeys across the site to make them smoother and more intuitive."
                  color="#a855f7"
                  width={340}
                />
              </div>
            </div>

            {/* SVG connector — cards to desktop */}
            <div
              className="relative shrink-0 pointer-events-none"
              style={{ width: "120px", height: "100%" }}
            >
              <svg
                viewBox="0 0 120 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  d="M 0 25 C 60 25, 60 50, 120 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 0 72 C 60 72, 60 50, 120 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {/* Connector dots */}
              <div className="absolute w-2 h-2 rounded-full bg-white/30 border border-white/20" style={{ top: "25%", left: 0, transform: "translate(-50%, -50%)" }} />
              <div className="absolute w-2 h-2 rounded-full bg-white/30 border border-white/20" style={{ top: "72%", left: 0, transform: "translate(-50%, -50%)" }} />
              <div className="absolute w-2 h-2 rounded-full bg-white/30 border border-white/20" style={{ top: "50%", right: 0, transform: "translate(50%, -50%)" }} />
            </div>

            {/* Desktop browser mockup */}
            <div className="relative shrink-0 z-20 flex items-center" style={{ height: "100%" }}>
              <DesktopFrame
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400"
                alt="Solent Rib Charter desktop"
                width={640}
                height={410}
              />
            </div>

            {/* SVG connector — desktop to next card */}
            <div
              className="relative shrink-0 pointer-events-none"
              style={{ width: "100px", height: "100%" }}
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  d="M 0 50 C 50 50, 50 50, 100 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="absolute w-2 h-2 rounded-full bg-white/30 border border-white/20" style={{ top: "50%", left: 0, transform: "translate(-50%, -50%)" }} />
              <div className="absolute w-2 h-2 rounded-full bg-white/30 border border-white/20" style={{ top: "50%", right: 0, transform: "translate(50%, -50%)" }} />
            </div>

            {/* Third info card */}
            <div className="relative shrink-0 z-20 flex items-center" style={{ height: "100%" }}>
              <InfoCard
                tag="UI / UX"
                title="A bold new identity for a Shopify Platinum Partner"
                description="The new website needed to reflect Roswell's bold, confident identity while letting their work take center stage."
                color="#10b981"
                width={340}
              />
            </div>

            {/* SVG connector — card to Roswell phone */}
            <div
              className="relative shrink-0 pointer-events-none"
              style={{ width: "80px", height: "100%" }}
            >
              <svg
                viewBox="0 0 80 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  d="M 0 50 C 40 50, 40 50, 80 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="absolute w-2 h-2 rounded-full bg-white/30 border border-white/20" style={{ top: "50%", left: 0, transform: "translate(-50%, -50%)" }} />
              <div className="absolute w-2 h-2 rounded-full bg-white/30 border border-white/20" style={{ top: "50%", right: 0, transform: "translate(50%, -50%)" }} />
            </div>

            {/* Roswell mobile phone */}
            <div className="relative shrink-0 z-20 flex items-center" style={{ height: "100%" }}>
              <PhoneFrame
                src="/5.jpeg"
                alt="Roswell NYC mobile"
                width={210}
                height={430}
              />
            </div>

            {/* Spacer before screen 3 */}
            <div className="shrink-0" style={{ width: "80px" }} />
          </div>


          {/* ══════════════════ SCREEN 3: CTA + Surrounding Mockups ══════════════════ */}
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{ width: "100vw", height: "100%" }}
          >
            {/* Guide lines */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%", top: "15%", bottom: "15%",
                width: "1px",
                background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
              }}
            />

            {/* LEFT — Roswell NYC phone (white theme) */}
            <div className="absolute left-[8%] top-1/2 -translate-y-1/2 z-10">
              <PhoneFrame
                src="/9.jpeg"
                alt="Roswell NYC"
                width={200}
                height={430}
              />
            </div>

            {/* TOP CENTER — GK Beach Hotel card */}
            <div className="absolute top-[7%] left-1/2 -translate-x-1/2 z-10">
              <LandscapeCard
                src="/8.jpeg"
                alt="GK Beach Hotel"
                width={290}
                height={185}
              />
            </div>

            {/* BOTTOM CENTER — Amanacard */}
            <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 z-10">
              <LandscapeCard
                src="/3.jpeg"
                alt="Amanacard finance"
                width={290}
                height={185}
              />
            </div>

            {/* RIGHT — Octopus Money phone */}
            <div className="absolute right-[8%] top-1/2 -translate-y-1/2 z-10">
              <PhoneFrame
                src="/10.jpeg"
                alt="Octopus Money"
                width={200}
                height={430}
              />
            </div>

            {/* CENTER — CTA */}
            <div className="relative z-20 flex flex-col items-center gap-5 text-center">
              <span
                className="text-[15px] tracking-tight font-[Inter_Tight,sans-serif]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Keep them guessing
              </span>
              <h2
                id="cta-heading"
  className="font-[Inter_Tight,sans-serif] font-medium tracking-tighter leading-[1] text-[#f8f8f8]"
  style={{ fontSize: "clamp(3.5rem, 7vw, 4rem)" }}
              >
                We don't follow trends<br />We create them.
              </h2>
              <button
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl mt-2 text-white/70 hover:text-white transition-all duration-300 font-[Inter_Tight,sans-serif] text-[14px]"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                View all case studies
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>

              {/* Down arrow to bottom image */}
              <svg
                className="absolute -bottom-[110px] left-1/2 -translate-x-1/2 pointer-events-none overflow-visible"
                width="20" height="72" viewBox="0 0 20 72"
                fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
              >
                <path d="M 10 0 L 10 60 M 3 54 L 10 60 L 17 54" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
