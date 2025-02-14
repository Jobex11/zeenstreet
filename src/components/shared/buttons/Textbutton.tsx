import { Button } from "@components/ui/button";
import arrowIcon from "@assets/images/icons/arrow-icon.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ButtonProps {
    name: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    type?: "button" | "submit";
}

export const TextButton = ({
    name,
    onClick,
    disabled = false,
    isLoading = false,
    className = "",
    type = "button",
}: ButtonProps) => {
    return (
        <Button
            type={type}
            disabled={disabled}
            onClick={(event) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                onClick && onClick(event);
                navigator.vibrate([50, 50]);
            }}
            className={`aqum flex items-center justify-between px-3 text-center w-full max-w-full text-sm h-[51px] rounded-xl bg-[#D25804] duration-200 hover:bg-orange-600 ${className}`}
        >
              <div/>
                <span className="ml-10">{isLoading ? "Please wait..." : name}</span>
                <LazyLoadImage effect="blur" src={arrowIcon} alt="arrow image" className="h-4 ml-2" />
        </Button>
    );
};
