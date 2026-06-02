import NavBar from './components/NavBar.jsx'
import HeroSection from './components/HeroSection.jsx'
import DifferentiatorsBar from './components/DifferentiatorsBar.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ProcessSection from './components/ProcessSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div style={{ background: '#0A0A0B', minHeight: '100vh', overflowX: 'hidden' }}>
      <NavBar />
      <HeroSection />
      <DifferentiatorsBar />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaBanner />
      <ContactSection />
      <Footer />
    </div>
  )
}
