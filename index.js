import readline from "readline/promises"

const CONSOLE_RESET = "\x1b[0m"
const CONSOLE_RED = "\x1b[31m"
const CONSOLE_GREEN = "\x1b[32m"
const CONSOLE_YELLOW = "\x1b[33m"

const amounts = [
  0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000,
  25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000,
]
const formatterUSD = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const amountsCopy = [...amounts]
const cases = []

while (amountsCopy.length) {
  const index = Math.floor(Math.random() * amountsCopy.length)
  const [amount] = amountsCopy.splice(index, 1)
  cases.push({ amount, opened: false, userCase: false })
}

// console.log(
//   JSON.stringify(
//     cases.map((curCase) => formatterUSD.format(curCase.amount)),
//     null,
//     2,
//   ),
// )

const promptForCase = async () => {
  while (true) {
    const selectedCaseStr = await rl.question("Select case: ")
    const selectedCase = parseInt(selectedCaseStr, 10)
    if (
      isNaN(selectedCase) ||
      !isFinite(selectedCase) ||
      selectedCase < 1 ||
      selectedCase > cases.length
    ) {
      continue
    }
    return selectedCase - 1
  }
}

const promptForUnopenedCase = async () => {
  while (true) {
    const index = await promptForCase()
    if (cases[index].opened || cases[index].userCase) {
      continue
    }
    return index
  }
}

const promptForCases = async (numCases) => {
  for (let i = 0; i < numCases; i++) {
    const index = await promptForUnopenedCase()
    cases[index].opened = true
    console.log(formatterUSD.format(cases[index].amount))
    renderCases()
  }
}

const calculateDealAmount = (roundNum) => {
  const unrevealedAmounts = cases
    .filter((curCase) => !curCase.opened)
    .map((curCase) => curCase.amount)
  const avgAmount =
    unrevealedAmounts.reduce((sum, cur) => sum + cur, 0) /
    unrevealedAmounts.length
  const roundMultiplier = roundNum / 10
  return Math.floor(avgAmount * roundMultiplier)
}

const promptForDeal = async (roundNum) => {
  const dealAmount = calculateDealAmount(roundNum)
  const response = await rl.question(
    `Offer: ${formatterUSD.format(dealAmount)}. Deal or no deal? `,
  )
  return response === "yes" || response === "y"
}

const renderByAmount = () => {
  const sortedCases = cases.toSorted((a, b) => a.amount - b.amount)
  for (const curCase of sortedCases) {
    console.log(
      `${curCase.opened ? CONSOLE_RED : CONSOLE_GREEN} ${formatterUSD.format(curCase.amount)} ${CONSOLE_RESET}`,
    )
  }
}

const renderCases = () => {
  console.log(
    cases
      .map(
        (curCase, index) =>
          `${curCase.userCase ? CONSOLE_YELLOW : curCase.opened ? CONSOLE_RED : CONSOLE_GREEN}${index + 1}${CONSOLE_RESET}`,
      )
      .join(" "),
  )
}

const userCase = await promptForCase()
cases[userCase].userCase = true

const caseNumbersPerRound = [
  ...[...Array(7).keys()].slice(1).reverse(),
  ...Array(3).fill(1),
]

for (const [index, numCases] of caseNumbersPerRound.entries()) {
  renderCases()
  await promptForCases(numCases)
  renderByAmount()
  const dealAccepted = await promptForDeal(index + 1)
  if (dealAccepted) {
    break
  }
}

console.log(`Your case contained: ${formatterUSD.format(cases[userCase].amount)}`)
rl.close()
