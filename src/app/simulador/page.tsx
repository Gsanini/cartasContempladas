import TableDivSimulador from "@/components/table-div/body-simulador";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium - Simulador",
  description: "Simule seu crédito de forma fácil e rápida.",
  openGraph: {
    title: "Premium - Simulador",
    description: "Simule seu crédito de forma fácil e rápida.",
    url: "/",
    siteName: "Premium Consórcios",
    locale: "pt-BR",
    type: "website",
  },
};

export default function SimuladorPage() {
  return (
    <section className='bg-cor-page min-h-screen'>
      <TableDivSimulador />
    </section>
  );
}
