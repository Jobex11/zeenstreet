import { useState } from "react";

export function usePagination(initialPage = 1) {
    const [page, setPage] = useState<number>(initialPage);

    const handleNextPage = (currentPage: number, totalPages: number) => {
        if (currentPage < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = (currentPage: number) => {
        if (currentPage > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return {
        page,
        handleNextPage,
        handlePreviousPage,
        setPage,
    };
}
