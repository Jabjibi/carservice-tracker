import { LandingNav } from './LandingNav'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { DataSection } from './DataSection'
import { CtaSection } from './CtaSection'
import { LandingFooter } from './LandingFooter'

export function LandingContent() {
  return (
    <>
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DataSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </>
  )
}
