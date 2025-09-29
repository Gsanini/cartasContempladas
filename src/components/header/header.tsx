import Image from "next/image";
import { ThemeToggle } from "../theme/theme-switcher";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function HeaderPremium() {
  return (
    <header className="w-full bg-vermelho py-6 flex items-center justify-between gap-10 px-4 md:px-20 lg:px-40 xl:px-100">
      <Image
        src={"/premiumLogo.png"}
        alt="Logo Premium"
        width={140}
        height={50}
        priority
        className="w-27 md:w-35"
      />
      <div className="flex items-center gap-0.5">
        <ThemeToggle />
        <hr className="border-l border-gray-200/40 h-6 mx-1.5" />
        <Link
          href={
            "https://wa.me/5551996561641?text=Ol%C3%A1!%20Vi%20as%20cartas%20de%20cons%C3%B3rcio%20dispon%C3%ADveis%20no%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es."
          }
          target="_blank"
          className="text-white hover:bg-gray-300/30 p-2 rounded-full transition-colors duration-300 cursor-pointer"
        >
          <Image
            src={"/whatsapp.svg"}
            alt="Logo Premium"
            width={140}
            height={50}
            priority
            className="w-[16px] filter brightness-0 invert"
          />
        </Link>

        <div className="text-white hover:bg-gray-300/30 p-2 rounded-full transition-colors duration-300 cursor-pointer">
          <Mail size={18} />
        </div>
        <Link
          href={
            "https://www.instagram.com/premium.consorcios?igsh=MTF4emZicjZnMmhlNQ=="
          }
          target="_blank"
          className="text-white hover:bg-gray-300/30 p-2 rounded-full transition-colors duration-300 cursor-pointer"
        >
          <Image
            src={"/instagram.svg"}
            alt="Logo Premium"
            width={140}
            height={50}
            priority
            className="w-[16px] filter brightness-0 invert"
          />
        </Link>
      </div>
    </header>
  );
}
