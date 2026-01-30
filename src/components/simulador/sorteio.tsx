import { DollarSign } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { formatCurrency } from "./util";

interface SorteioSimuladorProps {
  parcelasPagas: number | undefined;
  setParcelasPagas: (value: number | undefined) => void;
  meiaParcela: number;
  creditoInicial: number;
  prazoTotal: number;
  saldoDevedor: number;
}

export function SorteioSimulador({
  parcelasPagas,
  setParcelasPagas,
  meiaParcela,
  creditoInicial,
  prazoTotal,
  saldoDevedor,
}: SorteioSimuladorProps) {
  const valorPago = parcelasPagas ? parcelasPagas * meiaParcela : 0;
  const prazoRestante = parcelasPagas ? prazoTotal - parcelasPagas : prazoTotal;
  const saldoRestante = saldoDevedor - valorPago;
  const parcelaFinal = prazoRestante > 0 ? saldoRestante / prazoRestante : 0;

  return (
    <div>
      <div className='grid grid-cols-12 gap-4 w-full'>
        <div className='col-span-12 md:col-span-6 flex flex-col items-start justify-center gap-3 rounded-lg p-4 bg-accent/80 dark:bg-accent/40'>
          <Label className='uppercase tracking-wide text-[12px] leading-none'>
            Parcelas pagas
          </Label>
          <Input
            type='text'
            inputMode='numeric'
            value={parcelasPagas ?? ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              const numValue = Number(value);
              // Limita ao prazoTotal
              if (numValue > prazoTotal) {
                setParcelasPagas(prazoTotal);
              } else {
                setParcelasPagas(value === "" ? undefined : numValue);
              }
            }}
            onBlur={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              let numValue = value === "" ? 1 : Number(value);
              // Garante que está entre 1 e prazoTotal
              if (numValue < 1) numValue = 1;
              if (numValue > prazoTotal) numValue = prazoTotal;
              setParcelasPagas(numValue);
            }}
            placeholder='Mínimo 1 parcela'
            className='text-[12px] placeholder:text-[12px]'
          />
        </div>
        <div className='col-span-12 md:col-span-6 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-100/40 to-teal-100/70 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg p-3'>
          <Label className='uppercase tracking-wide text-[12px] leading-none'>
            Valor pago
          </Label>
          <div className='text-[25px] font-bold text-emerald-700 dark:text-emerald-400 leading-none'>
            R$ {formatCurrency(valorPago.toFixed(2))}
          </div>
          {parcelasPagas && parcelasPagas > 0 && (
            <p className='text-[11px] text-muted-foreground text-center -mt-2'>
              {parcelasPagas} parcela{parcelasPagas > 1 ? "s" : ""} × R${" "}
              {formatCurrency(meiaParcela.toFixed(2))}
            </p>
          )}
        </div>
      </div>

      <div className='flex items-center gap-3 mt-5'>
        <div className='h-[1px] flex-1 bg-border'></div>
        <h1 className='text-center font-medium text-[15px] text-cor-texto'>
          Resumo do Sorteio
        </h1>
        <div className='h-[1px] flex-1 bg-border'></div>
      </div>

      <div className='mt-4 space-y-3 '>
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col gap-1.5 p-3 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/40 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50'>
            <p className='text-[11px] text-muted-foreground font-medium uppercase tracking-wide'>
              Crédito Inicial
            </p>
            <p className='text-[18px] font-semibold text-slate-700 dark:text-slate-300'>
              R$ {formatCurrency(creditoInicial.toFixed(2))}
            </p>
          </div>

          <div className='flex flex-col gap-1.5 p-3 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/40 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50'>
            <p className='text-[11px] text-muted-foreground font-medium uppercase tracking-wide'>
              Parcela Inicial
            </p>
            <p className='text-[18px] font-semibold text-slate-700 dark:text-slate-300'>
              R$ {formatCurrency(meiaParcela.toFixed(2))}
            </p>
          </div>
        </div>

        {parcelasPagas && parcelasPagas > 0 && (
          <div className='flex flex-col gap-1.5 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200/50 dark:border-blue-800/50'>
            <p className='text-[11px] text-blue-700 dark:text-blue-400 font-medium uppercase tracking-wide mb-1'>
              Parcelas Pagas
            </p>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-[10px] text-blue-600/70 dark:text-blue-400/70 mb-1'>
                  Quantidade
                </p>
                <div className='flex items-baseline gap-2'>
                  <p className='text-[18px] font-semibold text-blue-700 dark:text-blue-300'>
                    {parcelasPagas} de {prazoTotal}
                  </p>
                  <p className='text-[11px] text-blue-600/70 dark:text-blue-400/70'>
                    ({((parcelasPagas / prazoTotal) * 100).toFixed(0)}%)
                  </p>
                </div>
              </div>
              <div>
                <p className='text-[10px] text-blue-600/70 dark:text-blue-400/70 mb-1'>
                  Valor
                </p>
                <p className='text-[18px] font-semibold text-blue-700 dark:text-blue-300'>
                  R$ {formatCurrency(valorPago.toFixed(2))}
                </p>
              </div>
            </div>
          </div>
        )}

        {parcelasPagas && parcelasPagas > 0 && (
          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1.5 p-3 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/40 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50'>
              <p className='text-[11px] text-muted-foreground font-medium uppercase tracking-wide'>
                Prazo Restante
              </p>
              <p className='text-[18px] font-semibold text-slate-700 dark:text-slate-300'>
                {prazoRestante} meses
              </p>
            </div>

            <div className='flex flex-col gap-1.5 p-3 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/40 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50'>
              <p className='text-[11px] text-muted-foreground font-medium uppercase tracking-wide'>
                Parcela Final
              </p>
              <p className='text-[18px] font-semibold text-slate-700 dark:text-slate-300'>
                R$ {formatCurrency(parcelaFinal.toFixed(2))}
              </p>
            </div>
          </div>
        )}
        <div className='flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/40 border-2 border-emerald-300/50 dark:border-emerald-700/50 shadow-sm'>
          <div className='flex items-center gap-0  -ml-2'>
            <DollarSign className='inline size-[18px] text-emerald-700 dark:text-emerald-300 mr-1 -mt-0.5' />
            <p className='text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold uppercase tracking-wide'>
              Crédito Líquido a Receber
            </p>
          </div>
          <p className='text-[30px] font-bold text-emerald-700 dark:text-emerald-400 leading-none'>
            R$ {formatCurrency(creditoInicial.toFixed(2))}
          </p>
          <p className='text-[10px] text-emerald-700/70 dark:text-emerald-400/70 -mt-1'>
            Valor disponível após contemplação
          </p>
        </div>
      </div>
    </div>
  );
}
