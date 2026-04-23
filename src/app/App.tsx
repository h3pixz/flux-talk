import Header from "./components/Header";
import Hero from "./components/Hero"

export default function App() {
  return (
    <div className="min-h-screen text-white bg-[#121212]" style={{fontFamily: "'JetBrains Mono', monospace"}}>
      <Header />
      <Hero />
    </div>
  );
}
