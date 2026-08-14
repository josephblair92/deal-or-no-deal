import { useState } from 'react'
import { Case } from './ui/Case'
import { shuffleCases } from './utils'
import type { CaseProps } from './types'

function App() {

  const [cases, setCases] = useState<Array<CaseProps>>(shuffleCases())
  const [userCaseSelected, setUserCaseSelected] = useState(false)

  const selectUserCase = (caseNum: number) => {
    setCases(cases => {
      const index = caseNum - 1
      return [
        ...cases.slice(0, index),
        { ...cases[index], userCase: true },
        ...cases.slice(index + 1)
      ]
      return cases
    })
    setUserCaseSelected(true)
  }

  const openCase = (caseNum: number) => {
    setCases(cases => {
      const index = caseNum - 1
      return [
        ...cases.slice(0, index),
        { ...cases[index], opened: true },
        ...cases.slice(index + 1)
      ]
      return cases
    })
  }

  return (
    <div className='flex'>
      <div className='flex flex-wrap gap-3 w-1/2 p-3'>
        {cases.map((curCase: CaseProps) => <Case {...curCase} enabled={!userCaseSelected || (!curCase.opened && !curCase.userCase)} onClick={!userCaseSelected ? selectUserCase : openCase} key={curCase.id} />)}
      </div>
      <div className='flex flex-col w-1/2'>
        <p className='text-2xl'>{userCaseSelected ? 'Open a case.' : 'Select your case.'}</p>
      </div>
    </div>
  )
}

export default App
