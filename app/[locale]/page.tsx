import {
  LandingNav,
  HeroSection,
  FeaturesSection,
  DataSection,
  CtaSection,
  LandingFooter,
} from '@/components/landing'

export default function LandingPage() {
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
