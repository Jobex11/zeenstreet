import {
  Component,
  type ComponentType,
  type GetDerivedStateFromError,
  type PropsWithChildren,
  type ReactNode,
  startTransition
} from 'react';
import { Button } from "@/components/ui/button";
import errorImage from "@assets/images/error_page.svg"

export interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: ReactNode | ComponentType<{ error: unknown }>;
}

interface ErrorBoundaryState {
  error?: unknown;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError: GetDerivedStateFromError<ErrorBoundaryProps, ErrorBoundaryState> = (error) => ({ error });

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const {
      state: {
        error,
      },
      props: {
        fallback: Fallback,
        children,
      },
    } = this;

    return 'error' in this.state
      ? typeof Fallback === 'function'
        ? <Fallback error={error} />
        : Fallback
      : children;
  }
}


export function ErrorBoundaryError(
  { error }: { error: unknown }
) {
  const handleReload = () => {
    startTransition(() => {
      window.location.reload();
    })
  };

  return (
    <section className='h-full flex flex-col relative  px-2 pt-10 items-center'>
      <img src={errorImage} alt="Image showing an Enginner" className={"h-48 w-48 object-contain object-center"} />
      <h2 className="text-xl font-semibold text-red-600 work-sans">Something went wrong!</h2>
      <p className="text-gray-300 mt-2 work-sans text-center">
        We couldn't load the content. Please check your network and reload the app.
        If the issue persists, close the app and reopen it. Sorry for the inconvenience.
      </p>
      {process.env.NODE_ENV === "development" &&
        <blockquote className="mt-4 p-3 bg-gray-50 border-l-4 border-red-500 text-sm text-gray-700">
          <code>
            {error instanceof Error
              ? error.message
              : typeof error === "string"
                ? error
                : JSON.stringify(error)}
          </code>
        </blockquote>
      }
      <Button onClick={handleReload} className="mt-6 bg-[#D25804] work-sans hover:bg-orange-700 transition-colors duration-300 min-w-full h-10 rounded-md shadow-md text-white ">
        Reload the App
      </Button>
    </section>
  );
}
