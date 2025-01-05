export function isAnswered(inputObj: any): boolean {
  const tempArr = Object.keys(inputObj).map(key => {
    if (!inputObj[key]) return false
    return true
  })
  return tempArr.every(cond => cond === true)
}
