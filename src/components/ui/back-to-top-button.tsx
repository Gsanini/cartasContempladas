"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopButtonProps {
  showAfter?: number;
  className?: string;
}

export function BackToTopButton({
  showAfter = 300,
  className,
}: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      variant="default"
      className={cn(
        "fixed bottom-6 right-6 z-50 size-12 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-110",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none",
        className
      )}
      aria-label="Voltar ao topo"
    >
      <ChevronUp className="size-5" />
    </Button>
  );
}
