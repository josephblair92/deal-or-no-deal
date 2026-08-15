import { formatterUSD } from "../utils"

interface DealOfferProps {
    dealAmount: number,
    onAccept: (amount: number) => void,
    onReject: () => void
}

export const DealOffer = ({ dealAmount, onAccept, onReject }: DealOfferProps) => {
return <div className='flex flex-col gap-2'>
        <p className='text-2xl'>Deal or No Deal?</p>
        <p>Offer: <b>{formatterUSD.format(dealAmount)}</b></p>
        <div className='flex gap-3'>
          <button className='bg-green-400 rounded-md p-3 min-w-32' onClick={() => onAccept(dealAmount)}>Deal</button>
          <button className='bg-red-400 rounded-md p-3 min-w-32' onClick={onReject}>No Deal</button>
        </div>
      </div>
}