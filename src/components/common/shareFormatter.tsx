import { useGoldFormatter } from "@hooks/useGoldformatter";

export function ShareFormatter({ shares }: { shares: number }) {
    const formatShare = useGoldFormatter(shares);
    return <span>{formatShare}</span>;
}
