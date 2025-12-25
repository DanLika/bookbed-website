import HeroSection from '../components/HeroSection'
import TrustSection from '../components/TrustSection'
import FeaturesSection from '../components/FeaturesSection'
import ScreenshotGallery from '../components/ScreenshotGallery'
import PricingSection from '../components/PricingSection'
import FinalCTASection from '../components/FinalCTASection'

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <ScreenshotGallery />
      <PricingSection />
      <FinalCTASection />
    </div>
  )
}
