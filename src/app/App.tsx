import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturePreview from "./components/FeaturePreview";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="min-h-screen text-white bg-[#121212]" style={{fontFamily: "'JetBrains Mono', monospace"}}>
      <Header />
      <Hero />
      <FeaturePreview />
      <Pricing />
      <Footer />
    </div>
  );
}
