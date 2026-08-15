import { formatterUSD } from "../utils"

interface GameOverProps {
  dealAccepted: number | undefined
  userCaseValue: number
}

export const GameOver = ({ dealAccepted, userCaseValue }: GameOverProps) => {
  return (
    <div>
      <p className="text-2xl">Game over.</p>
      {dealAccepted ? (
        <p>
          You accepted a deal of <b>{formatterUSD.format(dealAccepted)}</b>.
          Your case was worth <b>{formatterUSD.format(userCaseValue)}</b>.
        </p>
      ) : (
        <p>
          Your case was worth <b>{formatterUSD.format(userCaseValue)}</b>.
        </p>
      )}
    </div>
  )
}
