// PROJECT TYPES

export enum WeightUnits {
  OUNCES = 'oz',
  POUNDS = 'lb',
  GRAMS = 'g',
}

export interface GearItem {
  name: string
  description: string
  price: string
  weight: string
  units: WeightUnits
  quantity: number
  photoURL: string
  linkURL: string
  worn: boolean
  consumable: boolean
  // category,
  // belongsToLists,
  // user/owner
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
