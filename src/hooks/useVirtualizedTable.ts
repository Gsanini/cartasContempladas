import { useMemo, useState, useCallback } from "react";

export interface UseVirtualizedTableProps<T> {
  data: T[];
  pageSize?: number;
  searchFields?: (keyof T)[];
}

export function useVirtualizedTable<T>({
  data,
  pageSize = 50,
  searchFields = [],
}: UseVirtualizedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtrar dados baseado no termo de busca
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return data.filter((item) =>
      searchFields.some((field) => {
        const fieldValue = item[field];
        return String(fieldValue).toLowerCase().includes(lowerSearchTerm);
      })
    );
  }, [data, searchTerm, searchFields]);

  // Ordenar dados
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return sortDirection === "desc" ? -comparison : comparison;
    });
  }, [filteredData, sortField, sortDirection]);

  // Paginar dados
  const paginatedData = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  // Informações de paginação
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const totalItems = sortedData.length;
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  // Handlers
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(0); // Reset para primeira página ao pesquisar
  }, []);

  const handleSort = useCallback(
    (field: keyof T) => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
      setCurrentPage(0); // Reset para primeira página ao ordenar
    },
    [sortField, sortDirection]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
    },
    [totalPages]
  );

  const goToNextPage = useCallback(() => {
    handlePageChange(currentPage + 1);
  }, [currentPage, handlePageChange]);

  const goToPreviousPage = useCallback(() => {
    handlePageChange(currentPage - 1);
  }, [currentPage, handlePageChange]);

  const goToFirstPage = useCallback(() => {
    handlePageChange(0);
  }, [handlePageChange]);

  const goToLastPage = useCallback(() => {
    handlePageChange(totalPages - 1);
  }, [totalPages, handlePageChange]);

  return {
    // Dados
    data: paginatedData,
    filteredData,
    totalItems,

    // Paginação
    currentPage,
    totalPages,
    pageSize,
    startItem,
    endItem,

    // Estados
    searchTerm,
    sortField,
    sortDirection,

    // Handlers
    handleSearch,
    handleSort,
    handlePageChange,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,

    // Flags de navegação
    canGoNext: currentPage < totalPages - 1,
    canGoPrevious: currentPage > 0,
  };
}
