"use client";

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
      );
    }
    return this.props.children;
  }
}

/**
 * Canvas3D Component
 * Provides a WebGL canvas for Three.js rendering with error boundary.
 * Falls back to a static gradient if WebGL fails.
 */
export function Canvas3D() {
  return (
    <CanvasErrorBoundary
      fallback={
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
      }
    >
      <div className="absolute inset-0" aria-hidden="true">
        <canvas className="h-full w-full" />
      </div>
    </CanvasErrorBoundary>
  );
}
