import { useState } from 'react'
import { shuffleCases } from './utils'
import type { CaseProps } from './types'
import { DollarAmounts } from './layout/DollarAmounts'
import { GameOver } from './layout/GameOver'
import { DealOffer } from './layout/DealOffer'
import { Cases } from './layout/Cases'

const casesPerRound = [
  ...[...Array(7).keys()].slice(1).reverse(),
  ...Array(3).fill(1)
]

function App() {

  const [cases, setCases] = useState<Array<CaseProps>>(shuffleCases())
  const [userCaseSelected, setUserCaseSelected] = useState(false)
  const [userCaseValue, setUserCaseValue] = useState(0)
  const [round, setRound] = useState(0)
  const [casesLeftInRound, setCasesLeftInRound] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [dealAccepted, setDealAccepted] = useState<number>()

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
    const index = caseNum - 1
    setCases(cases => {
      return [
        ...cases.slice(0, index),
        { ...cases[index], userCase: true },
        ...cases.slice(index + 1)
      ]
      return cases
    })
    setUserCaseSelected(true)
    setUserCaseValue(cases[index].amount)
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

  const acceptDeal = (amount: number) => {
    setGameOver(true)
    setDealAccepted(amount)
  }

  const rejectDeal = () => {
    advanceRound()
  }

  let gameStatus
  if (gameOver) {
    gameStatus = <GameOver dealAccepted={dealAccepted} userCaseValue={userCaseValue} />
  }
  else if (!userCaseSelected) {
    gameStatus = <p className='text-2xl'>Select your case.</p>
  } else if (casesLeftInRound === 0) {
    const dealAmount = calculateDealAmount(round)
    gameStatus = <DealOffer dealAmount={dealAmount} onAccept={acceptDeal} onReject={rejectDeal} />
  } else {
    gameStatus = <div><p className='text-2xl'>Open a case.</p><p>You have <b>{casesLeftInRound}</b> left to open before the next offer.</p></div>
  }

  return (
    <div className='flex h-screen'>
      <div className='w-1/2 h-fit'>
        <Cases cases={cases} allCasesEnabled={!userCaseSelected} allCasesDisabled={casesLeftInRound === 0} onClick={!userCaseSelected ? selectUserCase : openCase} showAllAmounts={gameOver} />
      </div>
      <div className='flex flex-col w-1/2 h-full p-2 justify-between'>
        {gameStatus}
        <DollarAmounts cases={cases} />
      </div>
    </div>
  )
}

export default App
