"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Close menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Updated navigation helper
  const handleScrollToAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchorId: string
  ) => {
    e.preventDefault();

    setActiveSection(anchorId);
    setMobileMenuOpen(false);

    setTimeout(() => {
      if (pathname === "/" || pathname === "") {
        document.getElementById(anchorId)?.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        window.location.href = `/#${anchorId}`;
      }
    }, 100);
  };

  // Helper to check if link should be highlighted
  const isActive = (sectionId: string) => activeSection === sectionId;

  return (
    <header className='sticky top-0 z-50 w-full border-b border-blue-100 bg-white/90 backdrop-blur-md'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo - responsive adjustments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold'>
                MP
              </div>
              <span className='text-base sm:text-lg font-semibold text-blue-950 truncate max-w-[140px] sm:max-w-none'>
                Moto Price Predictor
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              onClick={(e) => handleScrollToAnchor(e, "hero")}
              className={`text-sm font-medium transition-colors ${
                isActive("hero")
                  ? "text-blue-600"
                  : "text-blue-950 hover:text-blue-600"
              }`}>
              Home
            </Link>
            <Link
              href='/#how-it-works'
              onClick={(e) => handleScrollToAnchor(e, "how-it-works")}
              className={`text-sm font-medium transition-colors ${
                isActive("how-it-works")
                  ? "text-blue-600"
                  : "text-blue-950 hover:text-blue-600"
              }`}>
              How It Works
            </Link>
            <Link
              href='/#about'
              onClick={(e) => handleScrollToAnchor(e, "about")}
              className={`text-sm font-medium transition-colors ${
                isActive("about")
                  ? "text-blue-600"
                  : "text-blue-950 hover:text-blue-600"
              }`}>
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden p-2 rounded-md text-blue-950 hover:bg-blue-50 active:bg-blue-100 transition-colors'
            aria-label='Toggle menu'
            aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation - improved styling */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`md:hidden overflow-hidden ${
            mobileMenuOpen ? "border-t border-blue-100" : ""
          }`}>
          <div className='py-3 space-y-1 flex flex-col'>
            <Link
              href='/'
              onClick={(e) => handleScrollToAnchor(e, "hero")}
              className={`px-2 py-3 rounded-md text-sm font-medium transition-all ${
                isActive("hero")
                  ? "bg-blue-50 text-blue-600"
                  : "text-blue-950 hover:bg-gray-50 hover:text-blue-600"
              }`}>
              Home
            </Link>
            <Link
              href='/#how-it-works'
              onClick={(e) => handleScrollToAnchor(e, "how-it-works")}
              className={`px-2 py-3 rounded-md text-sm font-medium transition-all ${
                isActive("how-it-works")
                  ? "bg-blue-50 text-blue-600"
                  : "text-blue-950 hover:bg-gray-50 hover:text-blue-600"
              }`}>
              How It Works
            </Link>
            <Link
              href='/#about'
              onClick={(e) => handleScrollToAnchor(e, "about")}
              className={`px-2 py-3 rounded-md text-sm font-medium transition-all ${
                isActive("about")
                  ? "bg-blue-50 text-blue-600"
                  : "text-blue-950 hover:bg-gray-50 hover:text-blue-600"
              }`}>
              About
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
