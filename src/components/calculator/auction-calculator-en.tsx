"use client"

import { useState } from 'react'
import { calculateAuctionFee } from './auction-fee'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function AuctionCalculatorEn() {
  const [bidAmount, setBidAmount] = useState<string>('')
  const [auctionType, setAuctionType] = useState<'Copart' | 'IAAI'>('Copart')
  const [fee, setFee] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)

  const handleCalculate = () => {
    const amount = parseFloat(bidAmount)
    if (!isNaN(amount)) {
      const calculatedFee = calculateAuctionFee(amount, auctionType)
      setFee(calculatedFee)
      setTotal(Math.round((amount + calculatedFee) * 100) / 100)
    }
  }

  const handleBidChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBidAmount(value)
      setFee(null)
      setTotal(null)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <p className="text-sm text-neutral-600 mb-2">
          Note: this calculator estimates auction surcharges using the minimum grid (Fee A). Typical deviation is 15–35$.
        </p>
        <p className="text-sm text-neutral-600">
          Heads-up: CrashedToys locations may apply different fees.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Auction</Label>
          <RadioGroup
            value={auctionType}
            onValueChange={(value: 'Copart' | 'IAAI') => {
              setAuctionType(value)
              setFee(null)
            }}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Copart" id="copart-en" />
              <Label htmlFor="copart-en">Copart</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="IAAI" id="iaai-en" />
              <Label htmlFor="iaai-en">IAAI</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="bidAmount-en">Hammer price ($)</Label>
          <Input
            id="bidAmount-en"
            type="text"
            value={bidAmount}
            onChange={(e) => handleBidChange(e.target.value)}
            placeholder="Enter hammer price"
            className="mt-2"
          />
        </div>

        <Button 
          onClick={handleCalculate}
          className="w-full"
          disabled={!bidAmount || isNaN(parseFloat(bidAmount))}
        >
          Calculate
        </Button>

        {fee !== null && total !== null && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-neutral-100 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Hammer price:</span>
                  <span className="font-medium text-lg">${parseFloat(bidAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Auction fee:</span>
                  <span className="font-medium text-lg text-red-600">${fee}</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-xl text-red-600">${total}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
