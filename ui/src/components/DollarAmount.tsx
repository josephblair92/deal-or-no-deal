import { formatterUSD } from "../utils"

export interface DollarAmountProps {
  amount: number
  revealed: boolean
}

export const DollarAmount = ({ amount, revealed }: DollarAmountProps) => {
  return (
    <div
      className={`${revealed ? "bg-red-400" : "bg-green-400"} h-fit p-2 text-xs sm:text-base`}
    >
      {formatterUSD.format(amount)}
    </div>
  )
}
