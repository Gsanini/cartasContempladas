"use client";

import Image from "next/image";
import { ThemeToggle } from "../theme/theme-switcher";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeaderPremium() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={` top-0 z-50 w-full bg-vermelho transition-all duration-500 ease-out px-4 md:px-10 lg:px-30 xl:px-60 ${
          isScrolled
            ? "py-3 shadow-lg shadow-black/20"
            : "py-5 md:py-6 shadow-md shadow-black/10"
        }`}
      >
        <div className='max-w-7xl'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-3 md:gap-6'>
              <div
                className={`relative border-r border-white/20 pr-3 md:pr-6 transition-all duration-500 ${
                  isScrolled ? "scale-95" : "scale-100"
                }`}
              >
                <Image
                  src={"/premiumLogo.png"}
                  alt='Logo Premium'
                  width={140}
                  height={50}
                  priority
                  className='w-24 md:w-32 lg:w-36 h-auto transition-all duration-300 hover:scale-105'
                />
              </div>

              <div
                className={`relative transition-all duration-500 ${
                  isScrolled ? "scale-95" : "scale-100"
                }`}
              >
                <Image
                  src={"/hsConsorcios.png"}
                  alt='Logo HS Consórcios'
                  width={140}
                  height={50}
                  priority
                  className='w-24 md:w-32 lg:w-36 h-auto transition-all duration-300 hover:scale-105'
                />
              </div>
            </div>

            <div className='flex items-center gap-0'>
              <button
                type='button'
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className='text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300'
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
              >
                <Menu size={16} />
              </button>

              <ThemeToggle />

              <div className='hidden md:block w-px h-6 bg-white/20 mx-1'></div>

              <Link
                href='https://wa.me/5551996561641?text=Ol%C3%A1!%20Vi%20as%20cartas%20de%20cons%C3%B3rcio%20dispon%C3%ADveis%20no%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es.'
                target='_blank'
                className='text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300'
                aria-label='WhatsApp'
              >
                <Image
                  src='/whatsapp.svg'
                  alt='WhatsApp'
                  width={16}
                  height={16}
                  priority
                  className='w-[16px] h-[16px] filter brightness-0 invert'
                />
              </Link>

              <Link
                href='https://www.instagram.com/premium.consorcios?igsh=MTF4emZicjZnMmhlNQ=='
                target='_blank'
                className='text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300'
                aria-label='Instagram'
              >
                <Image
                  src='/instagram.svg'
                  alt='Instagram'
                  width={16}
                  height={16}
                  priority
                  className='w-[16px] h-[16px] filter brightness-0 invert'
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <>
          <div
            className='fixed inset-0 bg-black/50 z-60 animate-in fade-in duration-300'
            onClick={() => setIsMenuOpen(false)}
          />

          <div className='fixed top-0 right-0 h-full w-full max-w-sm bg-vermelho z-[100] shadow-2xl animate-in slide-in-from-right duration-300'>
            <div className='flex flex-col h-full'>
              <div className='flex items-center justify-between p-6 border-b border-white/10'>
                <h2 className='text-white text-xl font-semibold'>Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className='text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95'
                  aria-label='Fechar menu'
                >
                  <X size={16} />
                </button>
              </div>

              <nav className='flex-1 py-6 pr-6 pl-2'>
                <div className='flex flex-col gap-0'>
                  <Link
                    href='/'
                    className='text-white text-[15px] font-medium hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cartas contempladas
                  </Link>
                  <Link
                    href='/simulador'
                    className='text-white text-[15px] font-medium hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Simulador
                  </Link>
                </div>
              </nav>

              <div className='p-6 border-t border-white/10'>
                <p className='text-white/60 text-sm text-center'>
                  Entre em contato
                </p>
                <div className='flex justify-center gap-4 mt-4'>
                  <Link
                    href='https://wa.me/5551996561641?text=Ol%C3%A1!%20Vi%20as%20cartas%20de%20cons%C3%B3rcio%20dispon%C3%ADveis%20no%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es.'
                    target='_blank'
                    className='bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110'
                  >
                    <Image
                      src='/whatsapp.svg'
                      alt='WhatsApp'
                      width={20}
                      height={20}
                      className='filter brightness-0 invert'
                    />
                  </Link>
                  <Link
                    href='https://www.instagram.com/premium.consorcios?igsh=MTF4emZicjZnMmhlNQ=='
                    target='_blank'
                    className='bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110'
                  >
                    <Image
                      src='/instagram.svg'
                      alt='Instagram'
                      width={20}
                      height={20}
                      className='filter brightness-0 invert'
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
