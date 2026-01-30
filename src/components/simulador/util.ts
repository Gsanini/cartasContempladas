export const formatCurrency = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  const amount = Number(numbers) / 100;
  return amount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const optionsPrazo = [
  { value: "36", label: "36 meses" },
  { value: "72", label: "72 meses" },
  { value: "100", label: "100 meses" },
  { value: "120", label: "120 meses" },
  { value: "140", label: "140 meses" },
  { value: "180", label: "180 meses" },
  { value: "200", label: "200 meses" },
  { value: "220", label: "220 meses" },
  { value: "240", label: "240 meses" },
];

export function calculateAdministrativeFee(prazo: string) {
  switch (prazo) {
    case "36":
      return 9.5;
    case "72":
      return 15;
    case "100":
      return 16;
    case "120":
      return 16;
    case "140":
      return 16;
    case "180":
      return 23;
    case "200":
      return 23;
    case "220":
      return 23;
    case "240":
      return 24;
  }
}

export function calculateInstallments(
  creditValue: number,
  prazo: number,
  taxaAdministrativa: number
) {
  const administrativeFeeValue = (creditValue * taxaAdministrativa) / 100;

  const totalValue = creditValue + administrativeFeeValue;

  const parcela = totalValue / prazo;

  const meiaParcela = parcela / 2;

  const saldoDevedor = totalValue;

  return {
    parcela,
    meiaParcela,
    saldoDevedor,
  };
}
