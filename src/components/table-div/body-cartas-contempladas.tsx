"use client";

import { useEffect, useState } from "react";
import { ConsorcioTable } from "../ui/table-cartas-contempladas";
import { LoadingSpinner, ErrorDisplay } from "../ui/loading-states";

export default function TableDiv() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDados = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://api.themedeploy.com/api/fetch?url=https://consorcios-investimentos.themedeploy.com/api/db/contemplados/data",
        {
          cache: "no-store",
          signal: AbortSignal.timeout(30000),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDados();
  }, []);

  return (
    <div className='w-full px-4 md:px-10 lg:px-30 xl:px-60 pt-8 md:pt-15'>
      <div>
        <h1 className='text-[25px] md:text-[30px] font-semibold mb-1 text-cor-texto leading-10'>
          Cartas Contempladas
        </h1>
        <p className='text-gray-500/80 dark:text-gray-400/80 text-[12px] md:text-[13.5px] ml-0.5'>
          Veja abaixo as cartas contempladas disponíveis e aproveite a
          oportunidade de adquirir seu bem de forma rápida e sem burocracia.{" "}
          <span className='hidden md:inline'>
            Ao optar por uma carta contemplada, você tem acesso imediato ao
            crédito, sem precisar esperar sorteios ou lances. Solicite agora sua
            análise e conquiste o que deseja com agilidade e segurança.
          </span>
        </p>
      </div>
      <div className='mt-8 md:mt-15'>
        {loading ? (
          <LoadingSpinner message='Carregando cartas contempladas...' />
        ) : error ? (
          <ErrorDisplay error={error} onRetry={getDados} />
        ) : (
          <ConsorcioTable data={data} />
        )}
      </div>
    </div>
  );
}
