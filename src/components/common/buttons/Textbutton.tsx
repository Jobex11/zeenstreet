import { Button } from "@/components/ui/button";
import arrowIcon from "../../../assets/images/icons/arrow-icon.svg"
import Image from "next/image";

interface ButtonProps {
    name: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Click handler
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    type?: "button" | "submit";
}

export const TextButton = (
    {
        name,
        onClick,
        disabled = false,
        isLoading = false,
        className = "",
        type = "button"
    }
        : ButtonProps) => {

    return (

        <Button
            type={type}
            disabled={disabled}
            onClick={(event) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                onClick && onClick(event);
                navigator.vibrate([50, 50]);
            }}
            className={`aqum flex items-center justify-between max-w-full text-[13px] h-[51px] rounded-xl bg-[#D25804] duration-200 hover:bg-orange-600 ${className}`}>
            <div></div>
            {isLoading ? "Please wait..." : name}
            <Image src={arrowIcon} alt="arrow image" className="h-[17px] w-[37px]" />
        </Button>
    );
};
