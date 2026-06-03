'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useCar } from '@/lib/hooks/use-car'
import { SectionCard } from '@/components/shared/SectionCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SERVICE_TYPES = [
  'oil',
  'tire',
  'filter',
  'brake',
  'electrical',
  'inspection',
  'other',
] as const
type ServiceTypeKey = (typeof SERVICE_TYPES)[number]

const inputClass =
  'h-11 rounded-[10px] border-black/[0.1] bg-white/[0.6] px-3 text-[14px] text-[#1D1D1F] placeholder:text-[#C7C7CC] focus-visible:border-black/[0.2] focus-visible:ring-0'

type Props = { id: string }

export function LogServiceClient({ id }: Props) {
  const t = useTranslations('logService')
  const router = useRouter()
  const car = useCar(id)

  const [serviceType, setServiceType] = useState<ServiceTypeKey>('oil')
  const [date, setDate] = useState('')
  const [mileage, setMileage] = useState('')
  const [cost, setCost] = useState('')
  const [shop, setShop] = useState('')
  const [notes, setNotes] = useState('')

  const backHref = id ? `/mycar/${id}` : '/mycar'

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    // mock — navigate back after submit
    router.push(backHref)
  }

  return (
    <>
      <Link
        href={backHref}
        className="mb-6 flex w-fit items-center gap-1 text-[13px] text-[#6E6E73] transition hover:text-[#1D1D1F]"
      >
        <ChevronLeft className="size-4" />
        {car ? `${car.brand} ${car.model}` : t('back')}
      </Link>

      <header className="mb-6">
        <h1 className="text-[28px] font-semibold tracking-tight text-[#1D1D1F]">{t('title')}</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Service type selector */}
        <SectionCard>
          <p className="mb-3 text-[13px] font-medium text-[#6E6E73]">{t('typeLabel')}</p>
          <div className="flex flex-wrap gap-2">
            {SERVICE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setServiceType(type)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-[13px] font-medium ring-1 transition',
                  serviceType === type
                    ? 'bg-[#1D1D1F] text-white ring-[#1D1D1F]'
                    : 'bg-black/[0.02] text-[#6E6E73] ring-black/[0.06] hover:bg-black/[0.04]',
                )}
              >
                {t(`types.${type}`)}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Main fields */}
        <SectionCard className="flex flex-col gap-4">
          <Field label={t('date')}>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputClass}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label={t('mileage')}>
              <Input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder={t('mileagePlaceholder')}
                min={0}
                required
                className={inputClass}
              />
            </Field>
            <Field label={t('cost')}>
              <Input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder={t('costPlaceholder')}
                min={0}
                required
                className={inputClass}
              />
            </Field>
          </div>
        </SectionCard>

        {/* Optional fields */}
        <SectionCard className="flex flex-col gap-4">
          <Field label={t('shop')}>
            <Input
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              placeholder={t('shopPlaceholder')}
              className={inputClass}
            />
          </Field>
          <Field label={t('notes')}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('notesPlaceholder')}
              rows={3}
              className={cn(inputClass, 'h-auto resize-none py-3 leading-relaxed')}
            />
          </Field>
        </SectionCard>

        <Button
          type="submit"
          className="h-12 w-full rounded-[12px] bg-[#1D1D1F] text-[15px] font-semibold text-white hover:bg-[#1D1D1F]/90"
        >
          {t('submit')}
        </Button>
      </form>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#1D1D1F]">{label}</label>
      {children}
    </div>
  )
}
