import { useState } from 'react'
import { Case } from './ui/Case'
import { formatterUSD, shuffleCases } from './utils'
import type { CaseProps } from './types'
import { DollarAmounts } from './ui/DollarAmounts'

const casesPerRound = [
  ...[...Array(7).keys()].slice(1).reverse(),
  ...Array(3).fill(1)
]

function App() {

  const [cases, setCases] = useState<Array<CaseProps>>(shuffleCases())
  const [userCaseSelected, setUserCaseSelected] = useState(false)
  const [round, setRound] = useState(0)
  const [casesLeftInRound, setCasesLeftInRound] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const advanceRound = () => {
    if (round === casesPerRound.length) {
      setGameOver(true)
    } else {
      setCasesLeftInRound(casesPerRound[round])
      setRound(round => round + 1)
    }
  }

  const calculateDealAmount = (roundNum: number) => {
    const unrevealedAmounts = cases
      .filter((curCase) => !curCase.opened)
      .map((curCase) => curCase.amount)
    const avgAmount =
      unrevealedAmounts.reduce((sum, cur) => sum + cur, 0) /
      unrevealedAmounts.length
    const roundMultiplier = roundNum / 10
    return Math.floor(avgAmount * roundMultiplier)
  }

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
    advanceRound()
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
    setCasesLeftInRound(casesLeftInRound => casesLeftInRound - 1)
  }

  const acceptDeal = () => {
    setGameOver(true)
  }

  const rejectDeal = () => {
    advanceRound()
  }

  let gameStatus
  if (gameOver) {
    gameStatus = <p className='text-2xl'>Game over.</p>
  }
  else if (!userCaseSelected) {
    gameStatus = <p className='text-2xl'>Select your case.</p>
  } else if (casesLeftInRound === 0) {
    gameStatus = <div className='flex flex-col gap-2'>
      <p className='text-2xl'>Deal or No Deal?</p>
      <p>Offer: <b>{formatterUSD.format(calculateDealAmount(round))}</b></p>
      <div className='flex gap-3'>
        <button className='bg-green-400 rounded-md p-3 min-w-32' onClick={acceptDeal}>Deal</button>
        <button className='bg-red-400 rounded-md p-3 min-w-32' onClick={rejectDeal}>No Deal</button>
      </div>
    </div>
  } else {
    gameStatus = <div><p className='text-2xl'>Open a case.</p><p>You have <b>{casesLeftInRound}</b> left to open before the next offer.</p></div>
  }

  return (
    <div className='flex h-screen'>
      <div className='flex flex-wrap gap-3 w-1/2 h-fit p-3'>
        {cases.map((curCase: CaseProps) => <Case {...curCase} enabled={!userCaseSelected || (casesLeftInRound > 0 && !curCase.opened && !curCase.userCase)} showAmount={curCase.opened || gameOver} onClick={!userCaseSelected ? selectUserCase : openCase} key={curCase.id} />)}
      </div>
      <div className='flex flex-col w-1/2 h-full p-2 justify-between'>
        {gameStatus}
        <DollarAmounts cases={cases} />
      </div>
    </div>
  )
}

export default App
