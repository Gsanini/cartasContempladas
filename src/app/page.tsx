import HeaderPremium from "@/components/header/header";
import TableDiv from "@/components/table-div/body-cartas-contempladas";
import { BackToTopButton } from "@/components/ui/back-to-top-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <section className="bg-cor-page min-h-screen">
      <HeaderPremium />
      <TableDiv />
      <BackToTopButton />
      <WhatsAppButton />
    </section>
  );
}
