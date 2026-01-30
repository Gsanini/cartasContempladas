"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CarFront, DollarSign, House } from "lucide-react";
import IndexSimulador from "../simulador";

export default function TableDivSimulador() {
  const [tab, setTab] = useState<string>("veiculo");

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className='w-full px-4 md:px-10 lg:px-30 xl:px-60 py-8 md:py-15'>
      <div>
        <h1 className='text-[25px] md:text-[30px] font-semibold mb-1 text-cor-texto leading-10'>
          Simulador de Consórcio
        </h1>
        <p className='text-gray-500/80 dark:text-gray-400/80 text-[12px] md:text-[13.5px] ml-0.5'>
          Utilize o simulador abaixo para programar seu consórcio de forma fácil
          e rápida.{" "}
          <span className='hidden md:inline'>
            Insira o valor do bem desejado, o prazo de pagamento e veja as
            opções de parcelas e condições disponíveis para você.
          </span>
        </p>
      </div>
      <div className='mt-6 md:mt-13'>
        <Tabs
          defaultValue='veiculo'
          className='w-full '
          value={tab}
          onValueChange={handleTabChange}
        >
          <TabsList className='grid w-full grid-cols-2 gap-1 '>
            <TabsTrigger
              value='veiculo'
              className='text-[12px] data-[state=active]:bg-white flex items-center gap-1.5'
            >
              <CarFront className='size-[15px]' />
              Veículo
            </TabsTrigger>
            <TabsTrigger
              value='imovel'
              className='text-[12px] data-[state=active]:bg-white flex items-center gap-1.5'
            >
              <House className='size-[15px]' />
              Imóvel
            </TabsTrigger>
          </TabsList>
          <TabsContent value='veiculo' className='mt-4'>
            <IndexSimulador typeConsorcio='veículo' />
          </TabsContent>

          <TabsContent value='imovel' className='mt-4'>
            <IndexSimulador typeConsorcio='imóvel' />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
