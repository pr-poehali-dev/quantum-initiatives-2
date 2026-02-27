import { Hero3DWebGL as Hero3D } from "@/components/hero-webgl"
import { FeaturesSection } from "@/components/features-section"
import { TechnologySection } from "@/components/technology-section"
import { ApplicationsTimeline } from "@/components/applications-timeline"
import { AboutSection } from "@/components/about-section"
import { SafetySection } from "@/components/safety-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NetworkBackground } from "@/components/network-background"

export default function Index() {
  return (
    <div className="dark relative">
      <NetworkBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero3D />
          <div className="bg-black/60 backdrop-blur-sm">
            <FeaturesSection />
          </div>
          <section id="technology" className="bg-black/50 backdrop-blur-sm">
            <TechnologySection />
          </section>
          <div className="bg-black/40 backdrop-blur-sm">
            <ApplicationsTimeline />
          </div>
          <div className="bg-black/60 backdrop-blur-sm">
            <AboutSection />
          </div>
          <section id="safety" className="bg-black/50 backdrop-blur-sm">
            <SafetySection />
          </section>
          <div className="bg-black/60 backdrop-blur-sm">
            <TestimonialsSection />
          </div>
          <section id="faq" className="bg-black/50 backdrop-blur-sm">
            <FAQSection />
          </section>
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
