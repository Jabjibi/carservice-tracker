'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useAddCarForm, CAR_TYPES } from '@/lib/hooks/use-add-car-form'
import { CarThumbnail } from '@/components/shared/CarThumbnail'
import { SectionCard } from '@/components/shared/SectionCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const inputClass =
  'h-11 rounded-[10px] border-black/[0.1] bg-white/[0.6] px-3 text-[14px] text-[#1D1D1F] placeholder:text-[#C7C7CC] focus-visible:border-black/[0.2] focus-visible:ring-0'

export function AddCarClient() {
  const t = useTranslations('addCar')
  const router = useRouter()
  const { state, actions } = useAddCarForm()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push('/mycar')
  }

  return (
    <>
      <Link
        href="/mycar"
        className="mb-6 flex w-fit items-center gap-1 text-[13px] text-[#6E6E73] transition hover:text-[#1D1D1F]"
      >
        <ChevronLeft className="size-4" />
        {t('back')}
      </Link>

      <header className="mb-6">
        <h1 className="text-[28px] font-semibold tracking-tight text-[#1D1D1F]">{t('title')}</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Car type selector */}
        <SectionCard>
          <p className="mb-3 text-[13px] font-medium text-[#6E6E73]">{t('typeLabel')}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CAR_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => actions.setCarType(type)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-[16px] p-3 ring-1 transition',
                  state.carType === type
                    ? 'bg-[#1D1D1F] ring-[#1D1D1F]'
                    : 'bg-black/[0.02] ring-black/[0.06] hover:bg-black/[0.04]',
                )}
              >
                <div className="relative h-12 w-full">
                  <CarThumbnail type={type} alt={t(`types.${type}`)} className="h-12 w-full" bare />
                </div>
                <span
                  className={cn(
                    'text-[12px] font-medium',
                    state.carType === type ? 'text-white' : 'text-[#6E6E73]',
                  )}
                >
                  {t(`types.${type}`)}
                </span>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Required fields */}
        <SectionCard className="flex flex-col gap-4">
          <Field label={t('brand')}>
            <Input
              value={state.brand}
              onChange={(e) => actions.setBrand(e.target.value)}
              placeholder={t('brandPlaceholder')}
              required
              className={inputClass}
            />
          </Field>
          <Field label={t('model')}>
            <Input
              value={state.model}
              onChange={(e) => actions.setModel(e.target.value)}
              placeholder={t('modelPlaceholder')}
              required
              className={inputClass}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label={t('year')}>
              <Input
                type="number"
                value={state.year}
                onChange={(e) => actions.setYear(e.target.value)}
                placeholder={t('yearPlaceholder')}
                min={1900}
                max={2099}
                required
                className={inputClass}
              />
            </Field>
            <Field label={t('plate')}>
              <Input
                value={state.plate}
                onChange={(e) => actions.setPlate(e.target.value)}
                placeholder={t('platePlaceholder')}
                required
                className={cn(inputClass, 'font-mono tracking-tight')}
              />
            </Field>
          </div>
        </SectionCard>

        {/* Optional fields */}
        <SectionCard className="flex flex-col gap-4">
          <Field label={t('color')}>
            <Input
              value={state.color}
              onChange={(e) => actions.setColor(e.target.value)}
              placeholder={t('colorPlaceholder')}
              className={inputClass}
            />
          </Field>
          <Field label={t('mileage')}>
            <Input
              type="number"
              value={state.mileage}
              onChange={(e) => actions.setMileage(e.target.value)}
              placeholder={t('mileagePlaceholder')}
              min={0}
              className={inputClass}
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
