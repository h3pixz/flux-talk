export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[#a3a3a3] text-sm">Flux Talk. All rights reserved</span>

          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="text-sm text-[#a3a3a3] hover:text-white transition-colors">About</a>
            <a href="#privacy" className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Privacy</a>
            <a href="#terms" className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Terms</a>
          </div>

          <div className="text-sm text-[#525252]">
            © 2026 Flux Talk
          </div>
        </div>
      </div>
    </footer>
  );
}
