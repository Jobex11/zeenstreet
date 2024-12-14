import { useGoldFormatter } from '@hooks/useGoldformatter'

export function ShareFormatter(shares: number) {
    const formatShare = useGoldFormatter(shares)
    return formatShare
}
