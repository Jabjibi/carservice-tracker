'use client'

import { Fragment, createContext, use } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type StepperContextValue = {
  state: { currentStep: number; totalSteps: number }
  actions: { next: () => void; back: () => void }
  meta: { canAdvance: boolean; labels: string[] }
}

const StepperContext = createContext<StepperContextValue | null>(null)

function useStepperContext() {
  const ctx = use(StepperContext)
  if (!ctx) throw new Error('Stepper components must be used inside Stepper.Root')
  return ctx
}

type RootProps = {
  currentStep: number
  totalSteps: number
  labels: string[]
  canAdvance: boolean
  onNext: () => void
  onBack: () => void
  children: React.ReactNode
}

function Root({
  currentStep,
  totalSteps,
  labels,
  canAdvance,
  onNext,
  onBack,
  children,
}: RootProps) {
  return (
    <StepperContext
      value={{
        state: { currentStep, totalSteps },
        actions: { next: onNext, back: onBack },
        meta: { canAdvance, labels },
      }}
    >
      {children}
    </StepperContext>
  )
}

function Indicator() {
  const {
    state: { currentStep, totalSteps },
    meta: { labels },
  } = useStepperContext()

  return (
    <div className="mb-8 flex items-start">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1
        const isCompleted = step < currentStep
        const isActive = step === currentStep
        const isLast = step === totalSteps

        return (
          <Fragment key={step}>
            <div className="flex min-w-0 shrink-0 flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex size-7 items-center justify-center rounded-full text-[12px] font-semibold ring-1 transition',
                  isCompleted || isActive
                    ? 'bg-[#1D1D1F] text-white ring-[#1D1D1F]'
                    : 'bg-white text-[#AEAEB2] ring-black/[0.12]',
                )}
              >
                {isCompleted ? <Check className="size-3.5" /> : step}
              </div>
              <p
                className={cn(
                  'max-w-[56px] text-center text-[11px] leading-tight font-medium transition',
                  isActive ? 'text-[#1D1D1F]' : isCompleted ? 'text-[#6E6E73]' : 'text-[#AEAEB2]',
                )}
              >
                {labels[i]}
              </p>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'mt-3.5 h-px flex-1 transition',
                  isCompleted ? 'bg-[#1D1D1F]' : 'bg-black/[0.1]',
                )}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

type NavProps = {
  submitLabel: string
  backLabel: string
  nextLabel: string
}

function Nav({ submitLabel, backLabel, nextLabel }: NavProps) {
  const {
    state: { currentStep, totalSteps },
    actions: { next, back },
    meta: { canAdvance },
  } = useStepperContext()

  const isLastStep = currentStep === totalSteps

  return (
    <div className="mt-6 flex gap-3">
      {currentStep > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={back}
          className="h-12 flex-1 rounded-[12px] border-black/[0.1] text-[15px] font-semibold text-[#1D1D1F] hover:bg-black/[0.03]"
        >
          {backLabel}
        </Button>
      )}
      {isLastStep ? (
        <Button
          type="submit"
          className="h-12 flex-1 rounded-[12px] bg-[#1D1D1F] text-[15px] font-semibold text-white hover:bg-[#1D1D1F]/90"
        >
          {submitLabel}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={next}
          disabled={!canAdvance}
          className="h-12 flex-1 rounded-[12px] bg-[#1D1D1F] text-[15px] font-semibold text-white hover:bg-[#1D1D1F]/90 disabled:opacity-40"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  )
}

export const Stepper = { Root, Indicator, Nav }
