import Hero from '@/components/home/Hero';
import FeatureShowcase from '@/components/home/FeatureShowcase';
import LogoCloud from '@/components/home/LogoCloud';
import FeatureGateway from '@/components/home/FeatureGateway';
import Products from '@/components/home/Products';
import WhoAreWe from '@/components/home/WhoAreWe';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';
import Footer from '@/components/home/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeatureShowcase />
      <LogoCloud />
      <FeatureGateway />
      <Products />
      <WhoAreWe />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
  )
}