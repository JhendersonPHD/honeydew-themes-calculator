export interface ThemePackage {
  id: string
  name: string
  description: string
  price: number
  emoji: string
}

export interface ResultData {
  theme: ThemePackage
  quantity: number
  premiumSupport: boolean
  prioritySetup: boolean
  subtotal: number
  tax: number
  total: number
}
