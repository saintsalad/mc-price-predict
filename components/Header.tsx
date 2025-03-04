"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isResultPage = pathname?.startsWith("/result");

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    if (isResultPage) {
      // First navigate to home page
      await router.push("/");
      // Wait for navigation to complete
      setTimeout(() => {
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      // Just scroll if we're already on home page
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({
        behavior: "smooth",
      });
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
            <Link
              href='/#hero'
              onClick={(e) => handleClick(e, "hero")}
              className='flex items-center space-x-2'>
              <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold'>
                MP
              </div>
              <span className='text-lg font-semibold text-blue-950'>
                MotorPrice
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className='flex items-center space-x-8'>
            <Link
              href='/#hero'
              onClick={(e) => handleClick(e, "hero")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              Home
            </Link>
            <Link
              href='/#how-it-works'
              onClick={(e) => handleClick(e, "how-it-works")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              How It Works
            </Link>
            <Link
              href='/#about'
              onClick={(e) => handleClick(e, "about")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
