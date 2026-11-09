import { Component, type ReactNode } from 'react';

export function WebGLFallback({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        background:
          'linear-gradient(135deg, var(--color-hero-gradient-1) 0%, var(--color-hero-gradient-2) 55%, var(--color-hero-gradient-3) 100%)',
      }}
    />
  );
}

interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  state: WebGLErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
