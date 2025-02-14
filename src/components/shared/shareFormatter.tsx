import { useGoldFormatter } from "@hooks/useGoldformatter";

export function ShareFormatter({ shares }: { shares: number | null }) {
    const formatShare = useGoldFormatter(shares);
    return <span>{formatShare || 0}</span>;
}
