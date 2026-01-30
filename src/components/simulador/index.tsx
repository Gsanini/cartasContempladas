"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import SelectWithSearch from "../ui/select-with-search";
import {
  calculateAdministrativeFee,
  calculateInstallments,
  formatCurrency,
  optionsPrazo,
} from "./util";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SorteioSimulador } from "./sorteio";

import { Award, HandCoins } from "lucide-react";
import { LanceSimulador } from "./lance";

interface IndexSimuladorProps {
  typeConsorcio: "veículo" | "imóvel" | "investimento";
}

export default function IndexSimulador({ typeConsorcio }: IndexSimuladorProps) {
  const [prazoSelected, setPrazoSelected] = useState<string>("");
  const [taxaAdministrativa, setTaxaAdministrativa] = useState<number>(0);
  const [parcela, setParcela] = useState<number>(0);
  const [meiaParcela, setMeiaParcela] = useState<number>(0);
  const [saldoDevedor, setSaldoDevedor] = useState<number>(0);
  const [parcelasPagas, setParcelasPagas] = useState<number | undefined>(1);
  const [tab, setTab] = useState<string>("sorteio");
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const filteredOptionsPrazo = optionsPrazo.filter((option) => {
    const taxa = calculateAdministrativeFee(option.value);
    if (typeConsorcio === "imóvel") {
      return taxa === 23 || taxa === 24;
    } else if (typeConsorcio === "veículo") {
      return taxa === 9.5 || taxa === 15 || taxa === 16;
    }
    return true;
  });

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  const getDefaultValue = () => {
    return typeConsorcio === "imóvel" ? 500000 : 100000;
  };

  const [numericValue, setNumericValue] = useState<number>(getDefaultValue());
  const [value, setValue] = useState<string>(
    getDefaultValue().toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(0);

  useEffect(() => {
    const defaultValue = getDefaultValue();
    setNumericValue(defaultValue);
    setValue(
      defaultValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
    // Resetar prazo selecionado quando trocar tipo de consórcio
    setPrazoSelected("");
    setTaxaAdministrativa(0);
  }, [typeConsorcio]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatCurrency(inputValue);
    setValue(formatted);
    updateNumericValue(formatted);
  };

  const updateNumericValue = (formattedValue: string) => {
    const numeric = Number(formattedValue.replace(/\D/g, "")) / 100;
    setNumericValue(numeric);
  };

  const handleSliderChange = (newValue: number[]) => {
    const newNumericValue = newValue[0];
    setNumericValue(newNumericValue);
    setValue(
      newNumericValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
  };

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 16);
    }
  }, [value]);

  useEffect(() => {
    if (prazoSelected && taxaAdministrativa > 0) {
      const prazoNumber = Number(prazoSelected);
      const {
        parcela: parcelaValue,
        meiaParcela: meiaParcelaValue,
        saldoDevedor: saldoValue,
      } = calculateInstallments(numericValue, prazoNumber, taxaAdministrativa);
      setParcela(parcelaValue);
      setMeiaParcela(meiaParcelaValue);
      setSaldoDevedor(saldoValue);

      // Scroll do input para o topo
      setTimeout(() => {
        inputContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [numericValue, prazoSelected, taxaAdministrativa]);

  return (
    <div>
      <div
        className='flex flex-col items-center justify-center gap-3 w-full mx-auto max-w-md px-4'
        ref={inputContainerRef}
      >
        <h3 className='text-[13px] md:text-[14px]'>
          Escolha o valor do crédito para{" "}
          <span className='font-bold'>{typeConsorcio}</span>:
        </h3>
        <div className='text-[38px] flex items-center gap-3 -mr-7'>
          <p className='text-gray-400 font-[300]'>R$</p>
          <span
            ref={spanRef}
            className='absolute text-[38px] font-[500] text-cor-texto pointer-events-none px-2 '
            style={{ visibility: "hidden" }}
          >
            {value}
          </span>
          <Input
            ref={inputRef}
            type='text'
            value={value}
            onChange={handleChange}
            className='border-none text-[38px] font-[500] text-cor-texto p-0 focus:outline-none focus:ring-0'
            style={{ width: `${inputWidth}px` }}
          />
        </div>
        <div className='w-full -mt-1.5'>
          <Slider
            value={[numericValue]}
            onValueChange={handleSliderChange}
            max={
              typeConsorcio === "imóvel"
                ? 2000000
                : typeConsorcio === "investimento"
                  ? 1500000
                  : 1000000
            }
            min={0}
            step={10000}
            className='w-full'
          />
        </div>
      </div>
      <div className='mt-6 grid grid-cols-12 gap-4'>
        <div className='col-span-6 md:col-span-6 flex flex-col gap-2'>
          <Label>Prazo</Label>
          <SelectWithSearch
            options={filteredOptionsPrazo}
            value={prazoSelected}
            setValue={(value) => {
              setPrazoSelected(String(value));
              setTaxaAdministrativa(
                calculateAdministrativeFee(String(value)) ?? 0,
              );
            }}
          />
        </div>
        <div className='col-span-6 md:col-span-6 flex flex-col gap-2'>
          <Label className='hidden md:flex'>Taxa administrativa</Label>
          <Label className='flex md:hidden'>Taxa adm</Label>
          <Input value={`${taxaAdministrativa}%`} disabled />
        </div>
      </div>
      {parcela > 0 ? (
        <div>
          <div className='mt-6 grid grid-cols-12 gap-4'>
            <div className='col-span-6 md:col-span-4 flex flex-col items-center gap-3 border-2 border-transparent bg-accent text-cor-texto/80 rounded-lg p-4 px-2'>
              <Label className='text-cor-texto/70 uppercase tracking-wide text-[12px] leading-none'>
                Parcela
              </Label>
              <div className='text-[25px] font-extralight leading-none'>
                {parcela > 0
                  ? `R$ ${formatCurrency(parcela.toFixed(2))}`
                  : "R$ 0,00"}
              </div>
            </div>
            <div className='col-span-6 md:col-span-4 flex flex-col items-center gap-3 bg-teal-800/50 text-teal-300 border-2 border-teal-700/20 rounded-lg p-4 px-2'>
              <Label className='text-teal-200 uppercase tracking-wide text-[12px] leading-none'>
                Meia parcela
              </Label>
              <div className='text-[25px] font-bold leading-none'>
                {meiaParcela > 0
                  ? `R$ ${formatCurrency(meiaParcela.toFixed(2))}`
                  : "R$ 0,00"}
              </div>
            </div>
            <div className='col-span-12 md:col-span-4 flex flex-col items-center gap-3 border-2 border-transparent bg-accent text-cor-texto/80 rounded-lg p-4 px-2'>
              <Label className='text-cor-texto/70 uppercase tracking-wide text-[12px] leading-none'>
                Saldo devedor
              </Label>
              <div className='text-[25px] font-extralight leading-none'>
                {saldoDevedor > 0
                  ? `R$ ${formatCurrency(saldoDevedor.toFixed(2))}`
                  : "R$ 0,00"}
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <div className='flex items-center gap-3 mb-5'>
              <div className='h-[1px] flex-1 bg-border'></div>
              <h1 className='text-center font-medium text-[15px] text-cor-texto'>
                Contemplação
              </h1>
              <div className='h-[1px] flex-1 bg-border'></div>
            </div>
            <Tabs
              defaultValue='sorteio'
              className='w-full '
              value={tab}
              onValueChange={handleTabChange}
            >
              <TabsList className='grid w-full  grid-cols-2 gap-1 '>
                <TabsTrigger
                  value='sorteio'
                  className='text-[12px] data-[state=active]:bg-white flex items-center gap-1.5'
                >
                  <Award className='size-[15px]' />
                  Sorteio
                </TabsTrigger>
                <TabsTrigger
                  value='lance'
                  className='text-[12px] data-[state=active]:bg-white flex items-center gap-1.5'
                >
                  <HandCoins className='size-[15px]' />
                  Lance
                </TabsTrigger>
              </TabsList>
              <TabsContent value='sorteio' className='mt-4'>
                <SorteioSimulador
                  meiaParcela={meiaParcela}
                  parcelasPagas={parcelasPagas}
                  setParcelasPagas={setParcelasPagas}
                  creditoInicial={numericValue}
                  prazoTotal={Number(prazoSelected)}
                  saldoDevedor={saldoDevedor}
                />
              </TabsContent>

              <TabsContent value='lance' className='mt-4'>
                <LanceSimulador
                  meiaParcela={meiaParcela}
                  parcelasPagas={parcelasPagas}
                  setParcelasPagas={setParcelasPagas}
                  creditoInicial={numericValue}
                  prazoTotal={Number(prazoSelected)}
                  saldoDevedor={saldoDevedor}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className='w-full flex items-center justify-center bg-gray-100/60 dark:bg-accent rounded-lg p-3 px-2 mt-6 text-gray-500 dark:text-gray-400 text-[13px] h-15'>
          Escolha um prazo para ver as condições de parcelas.
        </div>
      )}
    </div>
  );
}
