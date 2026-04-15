"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import SearchOverlay from "@/components/search-overlay";
import { springConfig } from "@/utils/spring-animations";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/legal", label: "Legal" },
  { href: "/stories", label: "Stories" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        rafId = 0;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.svg"
            alt="Lunive Logo"
            width={32}
            height={32}
            className="object-contain rounded-[6px]"
          />
          <span className="font-heading text-xl font-bold text-white">
            Lunive
          </span>
        </Link>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 text-white font-semibold">
          <ul className="flex justify-center space-x-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-auto">
          <SearchOverlay />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden ml-auto">
          <button
            type="button"
            className="text-white p-1 -mr-1"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <HamburgerIcon open={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md shadow-lg origin-top"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", ...springConfig.medium }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white font-semibold hover:text-gray-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-800">
                <SearchOverlay />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const barBase =
    "absolute left-[3px] right-[3px] h-[2px] bg-current rounded-full transition-transform duration-300 ease-out";
  return (
    <div className="relative w-6 h-6" aria-hidden>
      <span
        className={barBase}
        style={{
          top: "11px",
          transformOrigin: "center",
          transform: open ? "rotate(45deg)" : "translateY(-5px)",
        }}
      />
      <span
        className={barBase}
        style={{
          top: "11px",
          transformOrigin: "center",
          transform: open ? "rotate(-45deg)" : "translateY(5px)",
        }}
      />
    </div>
  );
}
