import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, LogOut, Copy, Check } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      // Clear session keys in localStorage
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("ac.") || key.includes("token") || key.includes("session"))) {
          localStorage.removeItem(key);
        }
      }
    } catch {
      // Ignore storage errors
    }
    window.location.href = window.location.origin;
  };

  handleCopy = () => {
    const text = [
      `Error: ${this.state.error?.message}`,
      `Stack: ${this.state.error?.stack || "none"}`,
      `Component Stack: ${this.state.errorInfo?.componentStack || "none"}`,
    ].join("\n\n");

    navigator.clipboard.writeText(text).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-page p-4 text-ink">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-xl sm:p-8">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-tight text-ink sm:text-lg">
                  Something went wrong
                </h1>
                <p className="text-xs text-ink-3 sm:text-sm">
                  একটি অপ্রত্যাশিত ত্রুটি দেখা দিয়েছে
                </p>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
              The application encountered an unexpected error while rendering this page. You can
              reload the page, or clear the local session and sign back in.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-xs font-medium text-page shadow-sm hover:opacity-90 active:scale-95 transition"
              >
                <RefreshCw size={14} />
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-4 text-xs font-medium text-ink hover:bg-surface-3 active:scale-95 transition"
              >
                <LogOut size={14} />
                Sign Out & Reset
              </button>
            </div>

            {this.state.error && (
              <details className="mt-6 border-t border-line pt-4 text-left">
                <summary className="cursor-pointer text-xs font-medium text-ink-3 hover:text-ink select-none">
                  Technical error details
                </summary>
                <div className="relative mt-2 rounded-xl border border-line bg-page p-3 font-mono text-[11px] text-ink-2">
                  <button
                    type="button"
                    onClick={this.handleCopy}
                    className="absolute right-2 top-2 inline-flex items-center gap-1 rounded bg-surface-2 px-2 py-1 text-[10px] text-ink-2 hover:text-ink"
                    title="Copy error to clipboard"
                  >
                    {this.state.copied ? (
                      <>
                        <Check size={11} className="text-emerald-500" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={11} /> Copy
                      </>
                    )}
                  </button>
                  <p className="font-semibold text-critical">
                    {this.state.error.name}: {this.state.error.message}
                  </p>
                  {this.state.error.stack && (
                    <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap text-[10px] text-ink-3">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
