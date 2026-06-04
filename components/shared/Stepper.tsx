'use client'

import { Fragment, createContext, use } from 'react'
import { Check, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type StepperContextValue = {
  state: { currentStep: number; totalSteps: number }
  actions: { next: () => void; back: () => void }
  meta: { canAdvance: boolean; labels: string[]; icons?: readonly LucideIcon[] }
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
  icons?: readonly LucideIcon[]
  canAdvance: boolean
  onNext: () => void
  onBack: () => void
  children: React.ReactNode
}

function Root({
  currentStep,
  totalSteps,
  labels,
  icons,
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
        meta: { canAdvance, labels, icons },
      }}
    >
      {children}
    </StepperContext>
  )
}

function Indicator() {
  const {
    state: { currentStep, totalSteps },
    meta: { labels, icons },
  } = useStepperContext()

  return (
    <div className="mb-8 flex items-start">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1
        const isCompleted = step < currentStep
        const isActive = step === currentStep
        const isLast = step === totalSteps
        const Icon = icons?.[i]

        return (
          <Fragment key={step}>
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div
                className={cn(
                  'flex size-10 items-center justify-center rounded-full transition',
                  isCompleted
                    ? 'bg-green text-white'
                    : isActive
                      ? 'bg-text-primary text-white ring-4 ring-black/[0.06]'
                      : 'text-text-disabled bg-white/[0.6] ring-1 ring-black/[0.1]',
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" />
                ) : Icon ? (
                  <Icon className="size-4" />
                ) : (
                  <span className="text-[12px] font-semibold">{step}</span>
                )}
              </div>
              <p
                className={cn(
                  'max-w-[56px] text-center text-[11px] leading-tight font-medium transition',
                  isActive ? 'text-text-primary' : isCompleted ? 'text-green' : 'text-text-muted',
                )}
              >
                {labels[i]}
              </p>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'mt-5 h-px flex-1 transition',
                  isCompleted ? 'bg-green' : 'bg-black/[0.1]',
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
          className="text-text-primary h-12 flex-1 rounded-[12px] border-black/[0.1] text-[15px] font-semibold hover:bg-black/[0.03]"
        >
          {backLabel}
        </Button>
      )}
      {isLastStep ? (
        <Button
          type="submit"
          className="bg-text-primary hover:bg-text-primary/90 h-12 flex-1 rounded-[12px] text-[15px] font-semibold text-white"
        >
          {submitLabel}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={next}
          disabled={!canAdvance}
          className="bg-text-primary hover:bg-text-primary/90 h-12 flex-1 rounded-[12px] text-[15px] font-semibold text-white disabled:opacity-40"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  )
}

export const Stepper = { Root, Indicator, Nav }
