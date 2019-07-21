import { PackItem, WeightUnit } from './types'

export const calculateWeight = (items: PackItem[]) => {
  if (items.length === 0) {
    return 0
  }
  return items
    .map(item => {
      const weight = Number(item.weight) * item.quantity
      if (item.units === WeightUnit.GRAMS) {
        return weight / 453.592
      }
      if (item.units === WeightUnit.KILOGRAMS) {
        return weight * 2.205
      }
      if (item.units === WeightUnit.OUNCES) {
        return weight / 16
      }
      return weight
    })
    .reduce((prevVal, current) => prevVal + current)
    .toFixed(2)
}
