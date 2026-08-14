import type { CaseProps } from "../types"
import { formatterUSD } from "../utils"

export const Case = ({ caseNum, amount, opened, userCase }: CaseProps) => {
    const bgColor = userCase ? 'bg-yellow-400' : opened ? 'bg-red-400' : 'bg-green-400'
    return <div className={`flex flex-col justify-center items-center min-w-32 h-24 ${bgColor} rounded-xl`}>
        <span className='font-bold text-2xl'>{caseNum}</span>
        <span>{formatterUSD.format(amount)}</span>
    </div>
}