import type { CaseProps } from "../types";
import { DollarAmount } from "../components/DollarAmount";

export interface DollarAmountsProps {
    cases: Array<CaseProps>
}

export const DollarAmounts = ({ cases }: DollarAmountsProps) => {
    const sortedCases = cases.toSorted((a, b) => a.amount - b.amount)
    return <div className={`grid grid-flow-col grid-cols-2 grid-rows-13 gap-2`}>
        {sortedCases.map(curCase => <DollarAmount amount={curCase.amount} revealed={curCase.opened} key={curCase.id} />)}
    </div>
}