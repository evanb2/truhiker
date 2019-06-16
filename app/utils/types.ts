// PROJECT TYPES

export enum WeightUnit {
  OUNCES = 'oz',
  POUNDS = 'lb',
  GRAMS = 'g',
  KILOGRAMS = 'kg',
}

export interface GearItem {
  uid: string
  name: string
  description: string
  price: string
  weight: string
  units: WeightUnit
  photoURL: string
  linkURL: string
  userId: string
}

export interface PackItem extends GearItem {
  category: string
  worn: boolean
  consumable: boolean
  quantity: number
}

export interface Packlist {
  name: string
  categories: string[]
  packItems: PackItem[]
  units: WeightUnit
  totalPackWeight: 0
  baseWeight: 0
  totalConsumableWeight: 0
  totalWornWeight: 0
  userId: string
}

// export enum Region {
//   NONE = '',
//   EASTCOAST = 'east_coast',
//   ROCKIES = 'rockies',
//   PNW = 'pnw',
//   CALIFORNIA = 'california',
// }

// export enum Seasons {
//   SUMMER = 'summer',
//   SPRING = 'spring',
//   FALL = 'fall',
//   WINTER = 'winter',
// }
