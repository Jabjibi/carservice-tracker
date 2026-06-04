'use client'

import Link from 'next/link'
import {
  Banknote,
  CalendarDays,
  ChevronLeft,
  ClipboardCheck,
  ClipboardList,
  Disc3,
  Droplets,
  Filter,
  Gauge,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn, baht } from '@/lib/utils'
import { useCar } from '@/lib/hooks/use-car'
import {
  useLogServiceForm,
  SERVICE_TYPES,
  type ServiceTypeKey,
} from '@/lib/hooks/use-log-service-form'
import { FormField } from '@/components/shared/FormField'
import { Stepper } from '@/components/shared/Stepper'
import { SectionCard } from '@/components/shared/SectionCard'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const SERVICE_ICON: Record<ServiceTypeKey, LucideIcon> = {
  oil: Droplets,
  tire: Disc3,
  filter: Filter,
  brake: Gauge,
  electrical: Zap,
  inspection: ClipboardList,
  other: Wrench,
}

const inputClass =
  'h-11 rounded-[10px] border-black/[0.1] bg-white/[0.6] px-3 text-[14px] text-text-primary placeholder:text-text-disabled focus-visible:border-black/[0.2] focus-visible:ring-0'

type Props = { id: string }

export function LogServiceClient({ id }: Props) {
  const t = useTranslations('logService')
  const car = useCar(id)
  const { state, actions, meta } = useLogServiceForm(id)

  const stepLabels = [t('steps.type'), t('steps.datetime'), t('steps.cost'), t('steps.confirm')]
  const stepIcons = [Wrench, CalendarDays, Banknote, ClipboardCheck] as const

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    actions.submit()
  }

  return (
    <>
      <Link
        href={meta.backHref}
        className="text-text-secondary hover:text-text-primary mb-6 flex w-fit items-center gap-1 text-[13px] transition"
      >
        <ChevronLeft className="size-4" />
        {car ? `${car.brand} ${car.model}` : t('back')}
      </Link>

      <header className="mb-6">
        <h1 className="text-text-primary text-[28px] font-semibold tracking-tight">{t('title')}</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <Stepper.Root
          currentStep={state.step}
          totalSteps={meta.totalSteps}
          labels={stepLabels}
          icons={stepIcons}
          canAdvance={meta.canAdvance}
          onNext={actions.next}
          onBack={actions.back}
        >
          <SectionCard className="flex flex-col">
            <Stepper.Indicator />

            {/* Step 1 — ประเภทการซ่อม */}
            {state.step === 1 && (
              <div>
                <p className="text-text-secondary mb-4 text-[13px] font-medium">{t('typeLabel')}</p>
                <div className="grid grid-cols-4 gap-3">
                  {SERVICE_TYPES.map((type) => {
                    const Icon = SERVICE_ICON[type]
                    const isActive = state.serviceType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => actions.setServiceType(type)}
                        className={cn(
                          'flex flex-col items-center justify-center gap-2.5 rounded-[16px] px-2 py-4 ring-1 transition',
                          isActive
                            ? 'bg-text-primary text-white ring-transparent'
                            : 'text-text-secondary hover:text-text-primary bg-white/[0.6] ring-black/[0.06] hover:bg-black/[0.04] hover:ring-black/[0.1]',
                        )}
                      >
                        <Icon className="size-5 shrink-0" />
                        <span className="text-center text-[11px] leading-tight font-medium">
                          {t(`types.${type}`)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 2 — วันที่ & เลขไมล์ */}
            {state.step === 2 && (
              <div className="flex flex-col gap-4">
                <FormField label={t('date')}>
                  <Input
                    type="date"
                    value={state.date}
                    onChange={(e) => actions.setDate(e.target.value)}
                    required
                    className={inputClass}
                  />
                </FormField>
                <FormField label={t('mileage')}>
                  <Input
                    type="number"
                    value={state.mileage}
                    onChange={(e) => actions.setMileage(e.target.value)}
                    placeholder={t('mileagePlaceholder')}
                    min={0}
                    required
                    className={inputClass}
                  />
                </FormField>
              </div>
            )}

            {/* Step 3 — ค่าใช้จ่าย & ร้าน */}
            {state.step === 3 && (
              <div className="flex flex-col gap-4">
                <FormField label={t('cost')}>
                  <Input
                    type="number"
                    value={state.cost}
                    onChange={(e) => actions.setCost(e.target.value)}
                    placeholder={t('costPlaceholder')}
                    min={0}
                    required
                    className={inputClass}
                  />
                </FormField>
                <FormField label={t('shop')}>
                  <Input
                    value={state.shop}
                    onChange={(e) => actions.setShop(e.target.value)}
                    placeholder={t('shopPlaceholder')}
                    className={inputClass}
                  />
                </FormField>
              </div>
            )}

            {/* Step 4 — หมายเหตุ + ยืนยัน */}
            {state.step === 4 && (
              <div className="flex flex-col gap-5">
                {/* Summary */}
                <div>
                  <p className="text-text-secondary mb-3 text-[13px] font-medium">{t('review')}</p>
                  <div className="rounded-[14px] bg-black/[0.02] ring-1 ring-black/[0.06]">
                    <SummaryRow label={t('reviewType')} value={t(`types.${state.serviceType}`)} />
                    <Separator className="bg-black/[0.05]" />
                    <SummaryRow label={t('reviewDate')} value={state.date} />
                    <Separator className="bg-black/[0.05]" />
                    <SummaryRow
                      label={t('reviewMileage')}
                      value={`${Number(state.mileage).toLocaleString('th-TH')} กม.`}
                    />
                    <Separator className="bg-black/[0.05]" />
                    <SummaryRow label={t('reviewCost')} value={baht(state.cost)} />
                    {state.shop && (
                      <>
                        <Separator className="bg-black/[0.05]" />
                        <SummaryRow label={t('reviewShop')} value={state.shop} />
                      </>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <FormField label={t('notes')}>
                  <textarea
                    value={state.notes}
                    onChange={(e) => actions.setNotes(e.target.value)}
                    placeholder={t('notesPlaceholder')}
                    rows={3}
                    className={cn(inputClass, 'h-auto resize-none py-3 leading-relaxed')}
                  />
                </FormField>
              </div>
            )}

            <Stepper.Nav submitLabel={t('submit')} backLabel={t('back')} nextLabel={t('next')} />
          </SectionCard>
        </Stepper.Root>
      </form>
    </>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-text-secondary text-[13px]">{label}</span>
      <span className="text-text-primary text-[13px] font-medium">{value}</span>
    </div>
  )
}
