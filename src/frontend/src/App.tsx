import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonPositioned, setIsNoButtonPositioned] = useState(false);
  const [shouldWiggle, setShouldWiggle] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize No button position on mount
  useEffect(() => {
    if (!isNoButtonPositioned && noButtonRef.current && containerRef.current) {
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate initial centered position relative to container
      const initialX = (containerRect.width - buttonRect.width) / 2;
      const initialY = 0;
      
      setNoButtonPosition({ x: initialX, y: initialY });
      setIsNoButtonPositioned(true);
    }
  }, [isNoButtonPositioned]);

  const moveNoButton = () => {
    if (!noButtonRef.current || !containerRef.current) return;

    // Trigger wiggle animation
    setShouldWiggle(true);
    setTimeout(() => setShouldWiggle(false), 500);

    const button = noButtonRef.current;
    const container = containerRef.current;
    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate safe boundaries with margin
    const margin = 20;
    const maxX = containerRect.width - buttonRect.width - margin;
    const maxY = containerRect.height - buttonRect.height - margin;

    // Generate random position within safe boundaries
    const newX = Math.max(margin, Math.random() * maxX);
    const newY = Math.max(margin, Math.random() * maxY);

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent | React.FocusEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  const handleYesClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAccepted(true);
      setIsTransitioning(false);
    }, 400);
  };

  // Floating hearts background component
  const FloatingHearts = () => (
    <div className="floating-hearts-container" aria-hidden="true">
      {[...Array(12)].map((_, i) => (
        <Heart
          key={i}
          className="floating-heart"
          style={{
            left: `${(i * 8.33) % 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${8 + (i % 4) * 2}s`,
          }}
        />
      ))}
    </div>
  );

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 relative overflow-hidden">
        <FloatingHearts />
        
        <div className={`max-w-2xl w-full text-center space-y-8 relative z-10 ${isTransitioning ? 'content-exit' : 'content-enter'}`}>
          <div className="space-y-4">
            <div className="flex justify-center gap-2 mb-6">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
              <Heart className="w-10 h-10 text-pink-500 fill-pink-500 animate-pulse delay-100" />
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse delay-200" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4">
              Good choice  betu❤️
            </h1>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-pink-200">
              <img
                src="/assets/generated/valentine-meme-good-choice.dim_800x600.png"
                alt="Good choice meme"
                className="w-full h-auto rounded-2xl shadow-lg mb-6"
              />
              
              <div className="space-y-4">
                <p className="text-xl text-gray-700 font-medium">
                  You know I call you by so many sweet names...
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                  {['shonu', 'pyara billu', 'shona beta', 'siyanu baby'].map((nickname, index) => (
                    <div
                      key={nickname}
                      className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-4 border-2 border-pink-300 transform hover:scale-105 transition-transform duration-200 nickname-card"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <p className="text-lg font-semibold text-rose-700 flex items-center justify-center gap-2">
                        <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
                        {nickname}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-bounce" />
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-bounce delay-100" />
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-bounce delay-200" />
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-sm text-gray-500 relative z-10">
          © 2026. Built with <Heart className="inline w-4 h-4 text-rose-500 fill-rose-500" /> using{' '}
          <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 font-medium">
            caffeine.ai
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 relative overflow-hidden">
      <FloatingHearts />
      
      <div className={`max-w-3xl w-full text-center space-y-12 relative z-10 ${isTransitioning ? 'content-exit' : ''}`}>
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex justify-center gap-3 mb-8">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
            <Heart className="w-16 h-16 text-pink-500 fill-pink-500 animate-pulse delay-100" />
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse delay-200" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 leading-tight">
            Will you be my Valentine?
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Choose wisely... 💕
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative min-h-[300px] flex items-center justify-center"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <Button
              size="lg"
              onClick={handleYesClick}
              disabled={isTransitioning}
              className="yes-button text-2xl md:text-3xl px-12 py-8 h-auto rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-200 border-4 border-white relative overflow-hidden"
            >
              <Heart className="w-8 h-8 mr-3 fill-white" />
              Yes! 💖
            </Button>

            <button
              ref={noButtonRef}
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              onFocus={handleNoInteraction}
              className={`no-button absolute text-2xl md:text-3xl px-12 py-8 rounded-3xl bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700 font-bold shadow-xl border-4 border-white transition-all duration-300 cursor-pointer touch-none ${shouldWiggle ? 'wiggle' : ''}`}
              style={{
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transform: 'translate(0, 0)',
              }}
              aria-label="No button (moves away when you try to click it)"
            >
              No 😢
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 italic mt-8">
          Hint: The "No" button is a bit shy... 😉
        </p>
      </div>
      
      <footer className="mt-12 text-center text-sm text-gray-500 relative z-10">
        © 2026. Built with <Heart className="inline w-4 h-4 text-rose-500 fill-rose-500" /> using{' '}
        <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 font-medium">
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
