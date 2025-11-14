import { Zap } from 'lucide-react';

export default function Splash() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] flex items-center justify-center animate-fade-in">
      <div className="text-center animate-scale-in">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-[20px] backdrop-blur-sm mb-4">
          <Zap className="w-10 h-10 text-white" fill="white" />
        </div>
        <h1 className="text-white mb-2">Lazy Man</h1>
        <p className="text-white/90">तुरंत मदद पाएँ</p>
      </div>
    </div>
  );
}
