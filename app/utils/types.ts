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
  worn: boolean
  consumable: boolean
  quantity: number
  category: string
  // gearItemId: string
}

export interface Packlist {
  uid: string
  name: string
  description: string
  units: WeightUnit
  totalPackWeight: number
  baseWeight: number
  totalConsumableWeight: number
  totalWornWeight: number
  userId: string
  categories: Category[]
}

export interface Category {
  name: string
  totalWeight: number
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
