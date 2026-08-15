import type { CaseProps } from "../types"
import { formatterUSD } from "../utils"

export interface CaseUIProps extends CaseProps {
    enabled: boolean,
    onClick: (num: number) => void
}

export const Case = ({ id, amount, opened, userCase, enabled, onClick }: CaseUIProps) => {
    const bgColor = userCase ? 'bg-yellow-400' : opened ? 'bg-red-400' : 'bg-green-400'
    return <button className={`flex flex-col justify-center items-center min-w-32 h-24 ${bgColor} rounded-xl`} disabled={!enabled} onClick={() => onClick(id)}>
        <span className='font-bold text-2xl'>{id}</span>
        <span>{opened ? formatterUSD.format(amount) : '?'}</span>
    </button>
}