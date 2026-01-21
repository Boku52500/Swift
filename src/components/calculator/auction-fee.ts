type AuctionType = 'Copart' | 'IAAI'

const COPART_FEE_TIERS = [
  { min: 0, max: 99, fee: 131 },
  { min: 100, max: 199, fee: 205 },
  { min: 200, max: 299, fee: 240 },
  { min: 300, max: 349, fee: 265 },
  { min: 350, max: 399, fee: 280 },
  { min: 400, max: 449, fee: 305 },
  { min: 450, max: 499, fee: 315 },
  { min: 500, max: 549, fee: 340 },
  { min: 550, max: 599, fee: 350 },
  { min: 600, max: 699, fee: 365 },
  { min: 700, max: 799, fee: 390 },
  { min: 800, max: 899, fee: 410 },
  { min: 900, max: 999, fee: 425 },
  { min: 1000, max: 1199, fee: 465 },
  { min: 1200, max: 1299, fee: 485 },
  { min: 1300, max: 1399, fee: 500 },
  { min: 1400, max: 1499, fee: 515 },
  { min: 1500, max: 1599, fee: 540 },
  { min: 1600, max: 1699, fee: 555 },
  { min: 1700, max: 1799, fee: 575 },
  { min: 1800, max: 1999, fee: 595 },
  { min: 2000, max: 2399, fee: 630 },
  { min: 2400, max: 2499, fee: 665 },
  { min: 2500, max: 2999, fee: 700 },
  { min: 3000, max: 3499, fee: 745 },
  { min: 3500, max: 3999, fee: 795 },
  { min: 4000, max: 4499, fee: 855 },
  { min: 4500, max: 4999, fee: 880 },
  { min: 5000, max: 5499, fee: 905 },
  { min: 5500, max: 5999, fee: 930 },
  { min: 6000, max: 6499, fee: 975 },
  { min: 6500, max: 6999, fee: 995 },
  { min: 7000, max: 7499, fee: 1030 },
  { min: 7500, max: 7999, fee: 1050 },
  { min: 8000, max: 8499, fee: 1090 },
  { min: 8500, max: 9999, fee: 1110 },
  { min: 10000, max: 11499, fee: 1140 },
  { min: 11500, max: 11999, fee: 1150 },
  { min: 12000, max: 12499, fee: 1165 },
  { min: 12500, max: 14999, fee: 1180 },
  { min: 15000, max: 15000, fee: 1190 },
] as const

const IAAI_EXTRA_FEE = 35
const HIGH_BID_THRESHOLD = 15000
const HIGH_BID_BASE_FEE = 1190
const HIGH_BID_RATE = 0.06

export function calculateAuctionFee(bidAmount: number, auctionType: AuctionType): number {
  // Handle negative or zero bids
  if (bidAmount <= 0) return 0

  // Calculate base fee
  let fee: number

  if (bidAmount > HIGH_BID_THRESHOLD) {
    // For bids above $15,000
    fee = HIGH_BID_BASE_FEE + HIGH_BID_RATE * (bidAmount - HIGH_BID_THRESHOLD)
  } else {
    // For bids up to $15,000, use tiered structure
    const tier = COPART_FEE_TIERS.find(
      tier => bidAmount >= tier.min && bidAmount <= tier.max
    )
    fee = tier ? tier.fee : 0
  }

  // Add IAAI premium if applicable
  if (auctionType === 'IAAI') {
    fee += IAAI_EXTRA_FEE
  }

  // Round to 2 decimal places
  return Math.round(fee * 100) / 100
}
