import { motion } from "framer-motion";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
            className='flex items-center space-x-2 cursor-pointer'
            onClick={() => scrollToSection("hero")}>
            <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold'>
              MP
            </div>
            <span className='text-lg font-semibold text-blue-950'>
              MotorPrice
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className='flex items-center space-x-8'>
            <button
              onClick={() => scrollToSection("hero")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              Home
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className='text-sm font-medium text-blue-950 hover:text-blue-600 transition-colors'>
              About
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
