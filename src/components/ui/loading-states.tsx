import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  message = "Carregando...",
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      {message && (
        <span className="ml-3 text-sm text-muted-foreground">{message}</span>
      )}
    </div>
  );
}

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({
  error,
  onRetry,
  className = "",
}: ErrorDisplayProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 space-y-4 ${className}`}
    >
      <div className="text-destructive text-sm text-center">
        Erro ao carregar os dados: {error}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
