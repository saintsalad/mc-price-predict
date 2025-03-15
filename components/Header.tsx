"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Navigation helper that works from any page
  const handleScrollToAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchorId: string
  ) => {
    e.preventDefault();

    // If we're already on the homepage, just scroll
    if (pathname === "/" || pathname === "") {
      document.getElementById(anchorId)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      // Otherwise, navigate to homepage with the hash
      window.location.href = `/#${anchorId}`;
    }
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b border-blue-100 bg-white/80 backdrop-blur-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='flex items-center space-x-2'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold'>
                MP
              </div>
              <span className='text-lg font-semibold text-blue-950'>
                Moto Price Predictor
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className='flex items-center space-x-8'>
            <Link
              href='/'
              onClick={(e) => handleScrollToAnchor(e, "hero")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              Home
            </Link>
            <Link
              href='/#how-it-works'
              onClick={(e) => handleScrollToAnchor(e, "how-it-works")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              How It Works
            </Link>
            <Link
              href='/#about'
              onClick={(e) => handleScrollToAnchor(e, "about")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
