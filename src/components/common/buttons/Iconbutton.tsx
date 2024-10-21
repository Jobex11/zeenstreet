import { Button } from "../../ui/button";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export const IconButton = (
    {
        children,
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
                disabled={disabled || isLoading}
                onClick={(event) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    onClick && onClick(event);
                    navigator.vibrate([50, 50]);
                }}
                className={`flex items-center justify-center w-full rounded-full p-2 border-none bg-[#D25804] duration-200 hover:bg-orange-600 ${className} `}>
                {children}
            </Button>
    );
};
