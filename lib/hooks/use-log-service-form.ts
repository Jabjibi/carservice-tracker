import { useState } from 'react'

export const SERVICE_TYPES = [
  'oil',
  'tire',
  'filter',
  'brake',
  'electrical',
  'inspection',
  'other',
] as const

export type ServiceTypeKey = (typeof SERVICE_TYPES)[number]

export const TOTAL_STEPS = 4

export function useLogServiceForm() {
  const [step, setStep] = useState(1)
  const [serviceType, setServiceType] = useState<ServiceTypeKey>('oil')
  const [date, setDate] = useState('')
  const [mileage, setMileage] = useState('')
  const [cost, setCost] = useState('')
  const [shop, setShop] = useState('')
  const [notes, setNotes] = useState('')

  function canAdvance(): boolean {
    if (step === 1) return true
    if (step === 2) return date.trim() !== '' && mileage.trim() !== ''
    if (step === 3) return cost.trim() !== ''
    return true
  }

  function next() {
    if (step < TOTAL_STEPS && canAdvance()) setStep((s) => s + 1)
  }

  function back() {
    if (step > 1) setStep((s) => s - 1)
  }

  return {
    state: { step, serviceType, date, mileage, cost, shop, notes },
    actions: { setServiceType, setDate, setMileage, setCost, setShop, setNotes, next, back },
    meta: { totalSteps: TOTAL_STEPS, canAdvance: canAdvance() },
  }
}
