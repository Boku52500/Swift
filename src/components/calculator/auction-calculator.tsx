"use client"

import { useState } from 'react'
import { calculateAuctionFee } from './auction-fee'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function AuctionCalculator() {
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
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBidAmount(value)
      // Clear calculations when input changes
      setFee(null)
      setTotal(null)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        
        <p className="text-sm text-neutral-600 mb-2">
          ყურადღება! ეს კალკულატორი ითვლის აუქციონის დარიცხვას მინიმალური (Fee A) დარიცხვის პრინციპით. კალკულატორის ცდომილება შეიძლება იყოს 15-35$ მაქსიმუმ.
        </p>
        <p className="text-sm text-neutral-600">
          ყურადღება! CrashedToys Locations ვრცელდება განსხვავებული დარიცხვა.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>აუქციონის ტიპი</Label>
          <RadioGroup
            value={auctionType}
            onValueChange={(value: 'Copart' | 'IAAI') => {
              setAuctionType(value)
              setFee(null)
            }}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Copart" id="copart" />
              <Label htmlFor="copart">Copart</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="IAAI" id="iaai" />
              <Label htmlFor="iaai">IAAI</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="bidAmount">ლოტის ფასი ($)</Label>
          <Input
            id="bidAmount"
            type="text"
            value={bidAmount}
            onChange={(e) => handleBidChange(e.target.value)}
            placeholder="შეიყვანეთ ლოტის ფასი"
            className="mt-2"
          />
        </div>

        <Button 
          onClick={handleCalculate}
          className="w-full"
          disabled={!bidAmount || isNaN(parseFloat(bidAmount))}
        >
          გამოთვლა
        </Button>

        {fee !== null && total !== null && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-neutral-100 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>ლოტის ფასი:</span>
                  <span className="font-medium text-lg">${parseFloat(bidAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>აუქციონის საკომისიო:</span>
                  <span className="font-medium text-lg text-red-600">${fee}</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-bold">ჯამი:</span>
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
