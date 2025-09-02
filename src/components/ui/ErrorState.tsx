'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto bg-error/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-10 w-10 text-error" />
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Something went wrong
        </h3>
        
        <p className="text-text-secondary mb-6">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className={cn(
              'inline-flex items-center space-x-2 px-4 py-2',
              'bg-primary/10 text-primary rounded-lg border border-primary/20',
              'hover:bg-primary/20 transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary/50'
            )}
            aria-label="Retry search"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}