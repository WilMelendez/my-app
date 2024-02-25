'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={`fixed ${isDesktop ? 'top-0 left-0 right-0' : 'bottom-0 left-0 right-0'} bg-black bg-opacity-50 py-3 px-6 md:relative md:flex md:items-center md:justify-between md:z-50 ${isMenuOpen && 'h-auto'}`}>
      <div className={`flex items-center ${isMenuOpen ? 'hidden md:flex' : 'block'}`}>
        <Image
          src="/LogoThreads.png"
          alt="Threads Logo"
          width={30}
          height={30}
          className="h-8 mr-4"
        />
        <h1 className="text-white text-lg font-bold">Threads</h1>
      </div>
      <div className={`flex items-center space-x-4 md:flex ${isMenuOpen ? 'flex-row' : 'hidden'}`}>
        {["/feed.png", "/explore.png", "/write.png", "/like.png", "/account.png"].map((icon, index) => (
          <NavigationBarItem key={index} icon={icon} />
        ))}
      </div>
      <div className="cursor-pointer md:hidden" onClick={toggleMenu}>
        <Image src="/hamburgerButom.png" alt="Menu" width={40} height={30} className="h-6 md:h-8" />
      </div>
    </nav>
  );
};

const NavigationBarItem = ({ icon }) => (
  <div className="relative flex items-center justify-center">
    {icon === "/feed.png" ? (
      <a href="#" className="block" onClick={() => window.scrollTo(0, 0)}>
        <div className="rounded-full bg-gray-900 w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition duration-300">
          <Image src={icon} alt="Icon" width={24} height={24} className="text-white" />
        </div>
      </a>
    ) : (
      <div className="rounded-full bg-gray-900 w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition duration-300">
        <Image src={icon} alt="Icon" width={24} height={24} className="text-white" />
      </div>
    )}
  </div>
);

export default NavBar;
