import HeaderPremium from "@/components/header/header";
import TableDiv from "@/components/table-div/body-cartas-contempladas";
import { BackToTopButton } from "@/components/ui/back-to-top-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium - Cartas Contempladas",
  description: "Encontre cartas contempladas de forma fácil e rápida.",
  openGraph: {
    title: "Premium - Cartas Contempladas",
    description: "Encontre cartas contempladas de forma fácil e rápida.",
    url: "/",
    siteName: "Premium Consórcios",
    locale: "pt-BR",
    type: "website",
  },
};

export default function Home() {
  return (
    <section className='bg-cor-page min-h-screen'>
      <TableDiv />
      <BackToTopButton />
      <WhatsAppButton />
    </section>
  );
}
