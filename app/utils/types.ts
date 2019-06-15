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
  quantity: number
  photoURL: string
  linkURL: string
  worn: boolean
  consumable: boolean
  // category,
  // belongsToLists,
  // user/owner
}

export interface Category {
  name: string
  items: GearItem[]
  totalWeight: number
}

export interface Packlist {
  name: string
  categories: Category[]
  units: WeightUnit
  totalPackWeight: 0
  baseWeight: 0
  totalConsumableWeight: 0
  totalWornWeight: 0
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
