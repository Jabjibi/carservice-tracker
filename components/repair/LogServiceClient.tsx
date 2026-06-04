'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn, baht } from '@/lib/utils'
import { useCar } from '@/lib/hooks/use-car'
import { useLogServiceForm, SERVICE_TYPES } from '@/lib/hooks/use-log-service-form'
import { Stepper } from '@/components/shared/Stepper'
import { SectionCard } from '@/components/shared/SectionCard'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const inputClass =
  'h-11 rounded-[10px] border-black/[0.1] bg-white/[0.6] px-3 text-[14px] text-text-primary placeholder:text-text-disabled focus-visible:border-black/[0.2] focus-visible:ring-0'

type Props = { id: string }

export function LogServiceClient({ id }: Props) {
  const t = useTranslations('logService')
  const router = useRouter()
  const car = useCar(id)
  const { state, actions, meta } = useLogServiceForm()

  const backHref = id ? `/mycar/${id}` : '/mycar'

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    router.push(backHref)
  }

  const stepLabels = [t('steps.type'), t('steps.datetime'), t('steps.cost'), t('steps.confirm')]

  return (
    <>
      <Link
        href={backHref}
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
          canAdvance={meta.canAdvance}
          onNext={actions.next}
          onBack={actions.back}
        >
          <SectionCard className="flex flex-col">
            <Stepper.Indicator />

            {/* Step 1 — ประเภทการซ่อม */}
            {state.step === 1 && (
              <div>
                <p className="text-text-secondary mb-3 text-[13px] font-medium">{t('typeLabel')}</p>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => actions.setServiceType(type)}
                      className={cn(
                        'rounded-full px-4 py-1.5 text-[13px] font-medium ring-1 transition',
                        state.serviceType === type
                          ? 'bg-text-primary ring-text-primary text-white'
                          : 'text-text-secondary bg-black/[0.02] ring-black/[0.06] hover:bg-black/[0.04]',
                      )}
                    >
                      {t(`types.${type}`)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — วันที่ & เลขไมล์ */}
            {state.step === 2 && (
              <div className="flex flex-col gap-4">
                <Field label={t('date')}>
                  <Input
                    type="date"
                    value={state.date}
                    onChange={(e) => actions.setDate(e.target.value)}
                    required
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
                    required
                    className={inputClass}
                  />
                </Field>
              </div>
            )}

            {/* Step 3 — ค่าใช้จ่าย & ร้าน */}
            {state.step === 3 && (
              <div className="flex flex-col gap-4">
                <Field label={t('cost')}>
                  <Input
                    type="number"
                    value={state.cost}
                    onChange={(e) => actions.setCost(e.target.value)}
                    placeholder={t('costPlaceholder')}
                    min={0}
                    required
                    className={inputClass}
                  />
                </Field>
                <Field label={t('shop')}>
                  <Input
                    value={state.shop}
                    onChange={(e) => actions.setShop(e.target.value)}
                    placeholder={t('shopPlaceholder')}
                    className={inputClass}
                  />
                </Field>
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
                <Field label={t('notes')}>
                  <textarea
                    value={state.notes}
                    onChange={(e) => actions.setNotes(e.target.value)}
                    placeholder={t('notesPlaceholder')}
                    rows={3}
                    className={cn(inputClass, 'h-auto resize-none py-3 leading-relaxed')}
                  />
                </Field>
              </div>
            )}

            <Stepper.Nav submitLabel={t('submit')} backLabel={t('back')} nextLabel={t('next')} />
          </SectionCard>
        </Stepper.Root>
      </form>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-text-primary text-[13px] font-medium">{label}</label>
      {children}
    </div>
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
