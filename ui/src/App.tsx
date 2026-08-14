import { useState } from 'react'
import { Case } from './ui/Case'
import { shuffleCases } from './utils'
import type { CaseProps } from './types'

function App() {

  const [cases] = useState<Array<CaseProps>>(shuffleCases())

  return (
    <>
      <div className='flex flex-wrap gap-3 w-1/2 p-3'>
      {cases.map((curCase: CaseProps) => <Case {...curCase} />)}
      </div>
    </>
  )
}

export default App
