import type { CaseProps } from "./types"

export const formatterUSD = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

export const amounts = [
  0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000,
  25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000
]

export const shuffleCases = () => {
    const amountsCopy = [...amounts]
    const cases: Array<CaseProps> = []

    let count = 1
    while (amountsCopy.length) {
        const index = Math.floor(Math.random() * amountsCopy.length)
        const [amount] = amountsCopy.splice(index, 1)
        cases.push({ caseNum: count, amount, opened: false, userCase: false })
        count++
    }
    return cases
}