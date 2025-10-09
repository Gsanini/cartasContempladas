"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { CartaConsorcio } from "@/types/consorcio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, CarFront, House } from "lucide-react";
import Image from "next/image";

const creditoCache = new Map<string, number>();

const parseCredito = (credito: string): number => {
  if (creditoCache.has(credito)) {
    return creditoCache.get(credito)!;
  }

  const parsed = Number(credito.replace(/[R$.\s]/g, "").replace(",", "."));
  creditoCache.set(credito, parsed);
  return parsed;
};

const createWhatsAppUrl = (carta: CartaConsorcio): string => {
  const phoneNumber = "5551996561641";

  const message = `Olá! Tenho interesse e gostaria de saber mais sobre a carta de consórcio com as seguintes informações:

• Categoria: ${carta.categoria}
• Valor do Crédito: ${carta["valor-do-credito"]}
• Entrada: ${carta.entrada}
• Parcela: ${carta.parcelas}
• Situação: ${carta["situacao-da-carta"]}
${carta.observacoes ? `• Observações: ${carta.observacoes}` : ""}`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface ConsorcioTableProps {
  data: CartaConsorcio[];
}

const getDisponibilidadeClassName = (disponibilidade: string): string => {
  switch (disponibilidade) {
    case "Disponível":
      return "bg-emerald-500 text-white py-1 px-3 rounded-full";
    case "Reservada":
      return "bg-yellow-500 text-white py-1 px-3 rounded-full";
    case "Vendido":
      return "bg-red-500 text-white py-1 px-3 rounded-full";
    default:
      return "default";
  }
};

export function ConsorcioTable({ data }: ConsorcioTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedCategoria, setSelectedCategoria] = useState<string>("all");
  const [selectedDisponibilidade, setSelectedDisponibilidade] =
    useState<string>("all");
  const [maxCredito, setMaxCredito] = useState<number[]>([600000]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const debouncedCategoria = useDebounce(selectedCategoria, 300);
  const debouncedDisponibilidade = useDebounce(selectedDisponibilidade, 150);
  const debouncedMaxCredito = useDebounce(maxCredito, 150);

  const categorias = useMemo(() => {
    const categoriaSet = new Set<string>();
    for (const item of data) {
      categoriaSet.add(item.categoria);
    }
    return Array.from(categoriaSet).sort();
  }, [data]);

  const disponibilidades = useMemo(() => {
    const disponibilidadeSet = new Set<string>();
    for (const item of data) {
      disponibilidadeSet.add(item["situacao-da-carta"]);
    }
    return Array.from(disponibilidadeSet).sort();
  }, [data]);

  const maxCreditoValue = useMemo(() => {
    let max = 0;
    for (const item of data) {
      const value = parseCredito(item["valor-do-credito"]);
      if (value > max) max = value;
    }
    return max + 1000;
  }, [data]);

  const processedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      creditoNumerico: parseCredito(item["valor-do-credito"]),
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return processedData.filter((item) => {
      const matchCategoria =
        debouncedCategoria === "all" || item.categoria === debouncedCategoria;
      const matchDisponibilidade =
        debouncedDisponibilidade === "all" ||
        item["situacao-da-carta"] === debouncedDisponibilidade;
      const matchCredito = item.creditoNumerico <= debouncedMaxCredito[0];
      return matchCategoria && matchDisponibilidade && matchCredito;
    });
  }, [
    processedData,
    debouncedCategoria,
    debouncedDisponibilidade,
    debouncedMaxCredito,
  ]);

  const columns: ColumnDef<CartaConsorcio>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Selecionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "categoria",
        header: "Categoria",
        cell: ({ row }) => (
          <div className="font-semibold text-[12.5px] flex items-center gap-1.5">
            {row.getValue("categoria") === "Imóvel" ? (
              <House size={19} />
            ) : (
              <CarFront size={19} />
            )}
            {row.getValue("categoria")}
          </div>
        ),
      },
      {
        accessorKey: "valor-do-credito",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Crédito
              <ArrowUpDown className="ml-2 size-[13px]" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-semibold text-[12.5px]">
            {row.getValue("valor-do-credito")}
          </div>
        ),
      },
      {
        accessorKey: "entrada",
        header: "Entrada",
        cell: ({ row }) => (
          <div className="text-[12.5px] font-semibold">
            {row.getValue("entrada")}
          </div>
        ),
      },
      {
        accessorKey: "parcelas",
        header: "Parcela",
        cell: ({ row }) => (
          <div className="text-[12.5px] font-semibold">
            {row.getValue("parcelas")}
          </div>
        ),
      },
      {
        accessorKey: "observacoes",
        header: () => <div className="text-center">Observações</div>,
        cell: ({ row }) => (
          <div className="max-w-xs truncate text-[12.5px] text-center">
            {row.getValue("observacoes")}
          </div>
        ),
      },
      {
        accessorKey: "situacao-da-carta",
        header: "Disponibilidade",
        cell: ({ row }) => {
          const disponibilidade = row.getValue("situacao-da-carta") as string;
          return (
            <Badge className={getDisponibilidadeClassName(disponibilidade)}>
              {disponibilidade}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="text-center">Reservar</div>,
        cell: ({ row }) => {
          const carta = row.original;

          return (
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  const whatsappUrl = createWhatsAppUrl(carta);
                  window.open(whatsappUrl, "_blank");
                }}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full h-8.5 w-8.5 p-0 flex items-center justify-center cursor-pointer"
                disabled={carta["situacao-da-carta"] !== "Disponível"}
              >
                <Image
                  src="/whatsapp.svg"
                  alt="WhatsApp"
                  width={15}
                  height={15}
                  className="text-white"
                />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
    manualPagination: false,
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
  });

  const handleCategoriaChange = useCallback((value: string) => {
    setSelectedCategoria(value);
  }, []);

  const handleDisponibilidadeChange = useCallback((value: string) => {
    setSelectedDisponibilidade(value);
  }, []);

  const handleCreditoChange = useCallback((value: number[]) => {
    setMaxCredito(value);
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 md:col-span-4">
          <div className="mb-1">
            <label className="text-[13px] font-medium text-foreground">
              Categoria
            </label>
          </div>

          <Select
            value={selectedCategoria}
            onValueChange={handleCategoriaChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-6 md:col-span-4">
          <div className="mb-1">
            <label className="text-[13px] font-medium text-foreground">
              Disponibilidade
            </label>
          </div>

          <Select
            value={selectedDisponibilidade}
            onValueChange={handleDisponibilidadeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma disponibilidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {disponibilidades.map((disponibilidade) => (
                <SelectItem key={disponibilidade} value={disponibilidade}>
                  {disponibilidade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-medium text-foreground">
              Crédito máximo
            </label>
            <span className="text-sm font-semibold text-primary">
              R$ {maxCredito[0].toLocaleString("pt-BR")}
            </span>
          </div>
          <div className="mt-5.5">
            <Slider
              value={maxCredito}
              onValueChange={handleCreditoChange}
              max={maxCreditoValue}
              min={0}
              step={10000}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 space-y-4 py-4 flex-wrap">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[100px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[25, 50, 100, 200].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 ">
          <div className="flex items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir para primeira página</span>
              {"<<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir para página anterior</span>
              {"<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir para próxima página</span>
              {">"}
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir para última página</span>
              {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
