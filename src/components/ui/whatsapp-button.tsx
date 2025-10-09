"use client";

import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  return (
    <Link
      href={
        "https://wa.me/5551996561641?text=Ol%C3%A1!%20Vi%20as%20cartas%20de%20cons%C3%B3rcio%20dispon%C3%ADveis%20no%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es."
      }
      target="_blank"
      className="fixed bottom-6 flex items-center justify-center left-6 z-50 size-12 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-110 bg-green-500 hover:bg-green-600 border-0"
    >
      <Image
        src="/whatsapp.svg"
        alt="WhatsApp"
        width={20}
        height={20}
        className="text-white"
      />
    </Link>
  );
}
