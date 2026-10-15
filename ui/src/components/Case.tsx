import type { CaseProps } from "../types"
import { formatterUSD } from "../utils"

export interface CaseUIProps extends CaseProps {
  enabled: boolean
  showAmount: boolean
  onClick: (num: number) => void
}

export const Case = ({
  id,
  amount,
  opened,
  userCase,
  enabled,
  showAmount,
  onClick
}: CaseUIProps) => {
  const bgColor = userCase
    ? "bg-yellow-400"
    : opened
      ? "bg-red-400"
      : "bg-green-400"
  return (
    <button
      className={`flex flex-col justify-center items-center w-16 h-12 sm:w-32 sm:h-24 ${bgColor} rounded-xl`}
      disabled={!enabled}
      onClick={() => onClick(id)}
    >
      <span className="font-bold text-sm sm:text-2xl">{id}</span>
      <span className="text-xs sm:text-base">{showAmount ? formatterUSD.format(amount) : "?"}</span>
    </button>
  )
}
