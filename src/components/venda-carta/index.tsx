import { useState } from "react";
import { TrendingUp, Sparkles, DollarSign } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { formatCurrency } from "../simulador/util";

interface VendaCartaProps {
  creditoLiquido: number;
  valorPago: number;
  parcelasPagas: number;
  prazoTotal: number;
}

export default function VendaCarta({
  creditoLiquido,
  valorPago,
  parcelasPagas,
  prazoTotal,
}: VendaCartaProps) {
  const [porcentagemCompra, setPorcentagemCompra] = useState<
    number | undefined
  >(undefined);

  // Cálculos
  const valorVenda = porcentagemCompra
    ? (creditoLiquido * porcentagemCompra) / 100
    : 0;
  const lucroLiquido = valorVenda - valorPago;
  const hasValues = porcentagemCompra && porcentagemCompra > 0;

  return (
    <div className='mt-5'>
      <div className='flex items-center gap-3 mb-5'>
        <div className='h-[1px] flex-1 bg-border'></div>
        <h1 className='text-center font-medium text-[15px] text-cor-texto'>
          Venda da Carta
        </h1>
        <div className='h-[1px] flex-1 bg-border'></div>
      </div>

      <div className='grid grid-cols-12 gap-4 w-full'>
        {/* Input de Porcentagem */}
        <div className='col-span-12 md:col-span-6 flex flex-col items-start justify-center gap-3 rounded-lg p-4 bg-accent/80 dark:bg-accent/40'>
          <Label className='uppercase tracking-wide text-[12px] leading-none'>
            Porcentagem da compra
          </Label>
          <div className='flex items-center gap-2 w-full'>
            <Input
              type='text'
              inputMode='numeric'
              value={porcentagemCompra ?? ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                const numValue = Number(value);
                // Limita a 100%
                if (numValue > 100) {
                  setPorcentagemCompra(100);
                } else {
                  setPorcentagemCompra(value === "" ? undefined : numValue);
                }
              }}
              placeholder='0'
              className='text-[12px] placeholder:text-[12px]'
            />
            <span className='text-[14px] font-medium text-muted-foreground'>
              %
            </span>
          </div>
        </div>

        {/* Valor da Venda */}
        <div
          className={`col-span-12 md:col-span-6 flex flex-col items-center justify-center gap-2 rounded-lg p-3 transition-all ${
            hasValues
              ? "bg-gradient-to-br from-blue-100/60 to-cyan-100/80 dark:from-blue-950/40 dark:to-cyan-950/40 border border-blue-200/50 dark:border-blue-800/50"
              : "bg-gradient-to-br from-blue-100/30 to-cyan-100/40 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200/20 dark:border-blue-800/20"
          }`}
        >
          <Label
            className={`uppercase tracking-wide text-[11px] leading-none transition-colors ${
              hasValues
                ? "text-blue-700 dark:text-blue-400"
                : "text-blue-700/60 dark:text-blue-400/60"
            }`}
          >
            Valor da Venda
          </Label>
          <div
            className={`text-[22px] font-bold leading-none transition-colors ${
              hasValues
                ? "text-blue-700 dark:text-blue-400"
                : "text-blue-600/50 dark:text-blue-400/50"
            }`}
          >
            R$ {formatCurrency(valorVenda.toFixed(2))}
          </div>
          {hasValues && (
            <p className='text-[10px] text-blue-600/70 dark:text-blue-400/70 text-center -mt-1'>
              {porcentagemCompra}% de R${" "}
              {formatCurrency(creditoLiquido.toFixed(2))}
            </p>
          )}
        </div>
      </div>

      {/* Detalhamento dos valores */}
      {hasValues && (
        <div className='mt-4 space-y-4'>
          <div className='flex flex-col gap-1.5 p-3 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/40 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50'>
            <p className='text-[11px] text-slate-700 dark:text-slate-300 font-medium uppercase tracking-wide mb-1'>
              Parcelas Pagas
            </p>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-[10px] text-slate-600/70 dark:text-slate-400/70 mb-1'>
                  Quantidade
                </p>
                <div className='flex items-baseline gap-2'>
                  <p className='text-[18px] font-semibold text-slate-700 dark:text-slate-300'>
                    {parcelasPagas} de {prazoTotal}
                  </p>
                  <p className='text-[11px] text-slate-600/70 dark:text-slate-400/70'>
                    ({((parcelasPagas / prazoTotal) * 100).toFixed(0)}%)
                  </p>
                </div>
              </div>
              <div>
                <p className='text-[10px] text-slate-600/70 dark:text-slate-400/70 mb-1'>
                  Valor
                </p>
                <p className='text-[18px] font-semibold text-slate-700 dark:text-slate-300'>
                  R$ {formatCurrency(valorPago.toFixed(2))}
                </p>
              </div>
            </div>
          </div>

          <div className='relative overflow-hidden'>
            <div className='relative flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-br from-emerald-500/70 via-emerald-600/70 to-teal-600/70 dark:from-emerald-600/60 dark:via-emerald-700/60 dark:to-teal-700/60 shadow-xl shadow-emerald-500/30 dark:shadow-emerald-900/40 border-2 border-emerald-400/50 dark:border-emerald-500/50'>
              <div className='flex flex-col items-center gap-2'>
                <div className='flex items-center gap-0  -ml-2'>
                  <DollarSign className='inline size-[18px] text-emerald-700 dark:text-emerald-300 mr-1 -mt-0.5' />
                  <p className='text-[11px] text-white/70 font-semibold uppercase tracking-wide'>
                    Líquido a Receber
                  </p>
                </div>
                <p className='text-[30px] font-bold text-white leading-none tracking-wide drop-shadow-lg'>
                  R$ {formatCurrency(lucroLiquido.toFixed(2))}
                </p>
              </div>

              {valorPago > 0 && (
                <div className='flex items-center gap-2 px-4 py-1 rounded-lg bg-white/10 backdrop-blur-sm'>
                  <TrendingUp className='size-4 text-green-400  ' />
                  <p className='text-[10px] font-semibold text-green-400'>
                    {((lucroLiquido / valorPago) * 100).toFixed(1)}%{" "}
                    <span className='font-normal'>de retorno</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
