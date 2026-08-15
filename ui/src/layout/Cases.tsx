import { Case } from "../components/Case"
import type { CaseProps } from "../types"

interface CasesProps {
    cases: Array<CaseProps>
    allCasesEnabled: boolean
    allCasesDisabled: boolean
    showAllAmounts: boolean
    onClick: (num: number) => void
}

export const Cases = ({ cases, allCasesDisabled, allCasesEnabled, showAllAmounts, onClick }: CasesProps) => {
    return <div className='flex flex-wrap gap-3 h-full p-3'>
        {cases.map((curCase: CaseProps) => <Case {...curCase} enabled={allCasesEnabled || (!allCasesDisabled && !curCase.opened && !curCase.userCase)} showAmount={showAllAmounts || curCase.opened} onClick={() => onClick(curCase.id)} key={curCase.id} />)}
    </div>
}