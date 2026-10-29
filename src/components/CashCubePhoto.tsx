import { useState, useEffect, useRef } from 'react';

interface BillConfig {
  id: number;
  pathClass: string;
  flutterClass: string;
  duration: string;
  delay: string;
  scale: number;
  tone: 'green' | 'sage' | 'beige';
  desktopOnly?: boolean;
}

// 14 complementary bills: 6 visible on mobile, 8 additional on tablet/desktop
const BILLS: BillConfig[] = [
  { id: 1, pathClass: 'vortex-path-1', flutterClass: 'bill-flutter-1', duration: '4.2s', delay: '-0.8s', scale: 1.0, tone: 'green' },
  { id: 2, pathClass: 'vortex-path-2', flutterClass: 'bill-flutter-2', duration: '3.6s', delay: '-2.1s', scale: 0.9, tone: 'sage' },
  { id: 3, pathClass: 'vortex-path-3', flutterClass: 'bill-flutter-3', duration: '4.8s', delay: '-1.4s', scale: 0.85, tone: 'beige' },
  { id: 4, pathClass: 'vortex-path-4', flutterClass: 'bill-flutter-1', duration: '3.9s', delay: '-3.2s', scale: 1.05, tone: 'green' },
  { id: 5, pathClass: 'vortex-path-5', flutterClass: 'bill-flutter-2', duration: '4.5s', delay: '-0.3s', scale: 0.8, tone: 'sage' },
  { id: 6, pathClass: 'vortex-path-6', flutterClass: 'bill-flutter-3', duration: '3.4s', delay: '-2.7s', scale: 0.95, tone: 'beige' },
  // Desktop-only bills for richer atmosphere without overcrowding mobile
  { id: 7, pathClass: 'vortex-path-1', flutterClass: 'bill-flutter-2', duration: '4.6s', delay: '-2.9s', scale: 0.88, tone: 'sage', desktopOnly: true },
  { id: 8, pathClass: 'vortex-path-2', flutterClass: 'bill-flutter-3', duration: '3.8s', delay: '-0.5s', scale: 1.08, tone: 'green', desktopOnly: true },
  { id: 9, pathClass: 'vortex-path-3', flutterClass: 'bill-flutter-1', duration: '5.1s', delay: '-3.9s', scale: 0.78, tone: 'beige', desktopOnly: true },
  { id: 10, pathClass: 'vortex-path-4', flutterClass: 'bill-flutter-2', duration: '4.1s', delay: '-1.8s', scale: 0.92, tone: 'green', desktopOnly: true },
  { id: 11, pathClass: 'vortex-path-5', flutterClass: 'bill-flutter-3', duration: '4.7s', delay: '-4.2s', scale: 0.82, tone: 'sage', desktopOnly: true },
  { id: 12, pathClass: 'vortex-path-6', flutterClass: 'bill-flutter-1', duration: '3.7s', delay: '-1.1s', scale: 1.02, tone: 'beige', desktopOnly: true },
  { id: 13, pathClass: 'vortex-path-1', flutterClass: 'bill-flutter-3', duration: '4.4s', delay: '-3.5s', scale: 0.75, tone: 'green', desktopOnly: true },
  { id: 14, pathClass: 'vortex-path-3', flutterClass: 'bill-flutter-2', duration: '5.3s', delay: '-2.4s', scale: 0.96, tone: 'sage', desktopOnly: true }
];

export default function CashCubePhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver to pause animation when offscreen & Tab visibility listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Visibility listener
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const shouldAnimate = isInViewport && isTabVisible && !prefersReducedMotion;

  return (
    <div 
      ref={containerRef}
      className="relative z-10 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.25)] group aspect-square select-none"
    >
      {/* Component-scoped CSS Keyframes & Vortex Rules */}
      <style>{`
        /* Vortex Paths - translating within the 1:1 image bounds */
        @keyframes vortex-path-1 {
          0% { transform: translate3d(55%, 62%, 0); opacity: 0.82; }
          22% { transform: translate3d(47%, 54%, 0); opacity: 0.95; }
          45% { transform: translate3d(43%, 40%, 0); opacity: 0.88; }
          65% { transform: translate3d(47%, 29%, 0); opacity: 0.72; }
          82% { transform: translate3d(58%, 39%, 0); opacity: 0.65; }
          100% { transform: translate3d(55%, 62%, 0); opacity: 0.82; }
        }

        @keyframes vortex-path-2 {
          0% { transform: translate3d(44%, 59%, 0); opacity: 0.85; }
          25% { transform: translate3d(53%, 50%, 0); opacity: 0.95; }
          50% { transform: translate3d(58%, 32%, 0); opacity: 0.80; }
          75% { transform: translate3d(48%, 39%, 0); opacity: 0.62; }
          100% { transform: translate3d(44%, 59%, 0); opacity: 0.85; }
        }

        @keyframes vortex-path-3 {
          0% { transform: translate3d(50%, 65%, 0); opacity: 0.65; }
          22% { transform: translate3d(49%, 47%, 0); opacity: 0.90; }
          45% { transform: translate3d(54%, 28%, 0); opacity: 0.82; }
          65% { transform: translate3d(59%, 36%, 0); opacity: 0.70; }
          85% { transform: translate3d(56%, 53%, 0); opacity: 0.75; }
          100% { transform: translate3d(50%, 65%, 0); opacity: 0.65; }
        }

        @keyframes vortex-path-4 {
          0% { transform: translate3d(44%, 43%, 0); opacity: 0.90; }
          25% { transform: translate3d(52%, 35%, 0); opacity: 0.75; }
          50% { transform: translate3d(58%, 46%, 0); opacity: 0.85; }
          75% { transform: translate3d(49%, 56%, 0); opacity: 0.95; }
          100% { transform: translate3d(44%, 43%, 0); opacity: 0.90; }
        }

        @keyframes vortex-path-5 {
          0% { transform: translate3d(52%, 31%, 0); opacity: 0.78; }
          25% { transform: translate3d(58%, 34%, 0); opacity: 0.85; }
          50% { transform: translate3d(54%, 42%, 0); opacity: 0.70; }
          75% { transform: translate3d(45%, 36%, 0); opacity: 0.88; }
          100% { transform: translate3d(52%, 31%, 0); opacity: 0.78; }
        }

        @keyframes vortex-path-6 {
          0% { transform: translate3d(47%, 54%, 0); opacity: 0.92; }
          25% { transform: translate3d(56%, 58%, 0); opacity: 0.85; }
          50% { transform: translate3d(54%, 66%, 0); opacity: 0.70; }
          75% { transform: translate3d(45%, 63%, 0); opacity: 0.88; }
          100% { transform: translate3d(47%, 54%, 0); opacity: 0.92; }
        }

        /* Fluttering & 3D tumbling of individual bills */
        @keyframes bill-flutter-1 {
          0% { transform: rotate(-15deg) rotateY(0deg) scale(0.92); }
          50% { transform: rotate(18deg) rotateY(180deg) scale(1.08); }
          100% { transform: rotate(-15deg) rotateY(360deg) scale(0.92); }
        }

        @keyframes bill-flutter-2 {
          0% { transform: rotate(20deg) rotateX(0deg) scale(1.05); }
          50% { transform: rotate(-12deg) rotateX(180deg) scale(0.85); }
          100% { transform: rotate(20deg) rotateX(360deg) scale(1.05); }
        }

        @keyframes bill-flutter-3 {
          0% { transform: rotate(-8deg) rotateZ(0deg) scale(0.88); }
          50% { transform: rotate(25deg) rotateZ(180deg) scale(1.02); }
          100% { transform: rotate(-8deg) rotateZ(360deg) scale(0.88); }
        }

        .bill-mover {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .bill-card {
          position: absolute;
          left: 0;
          top: 0;
          width: 30px;
          height: 13px;
          margin-left: -15px;
          margin-top: -6.5px;
          pointer-events: none;
          transform-origin: center center;
          will-change: transform;
        }

        @media (min-width: 640px) {
          .bill-card {
            width: 36px;
            height: 15px;
            margin-left: -18px;
            margin-top: -7.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vortex-chamber-layer {
            display: none !important;
          }
        }
      `}</style>

      {/* Synchronized scaling wrapper on hover */}
      <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
        {/* Original untouched image */}
        <img 
          src="/cashcash.png" 
          alt="תא כסף לאירועים CASH CUBE - אטרקציית תפיסת כסף כסף על הרצפה" 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
          width="640"
          height="640"
          loading="eager"
          fetchPriority="high"
        />

        {/* 
          Complementary swirling bills layer:
          Clipped strictly along the inner boundary of the transparent chamber window.
          Points tested on 1254x1254 source image to never touch gold columns or black borders.
        */}
        <div 
          className="vortex-chamber-layer absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            clipPath: `polygon(
              40.2% 27.5%,
              45.1% 26.7%,
              50.5% 26.5%,
              55.8% 26.7%,
              60.6% 27.5%,
              60.9% 38.3%,
              60.9% 50.0%,
              60.6% 60.6%,
              60.6% 64.2%,
              57.0% 67.0%,
              50.5% 68.6%,
              43.9% 67.0%,
              40.3% 64.2%,
              40.3% 60.6%,
              40.0% 50.0%,
              40.0% 38.3%
            )`
          }}
        >
          {BILLS.map((bill) => {
            const toneColors = {
              green: { bg: '#e1e7da', border: '#4f6943', line: '#6a865d', text: '#3c5232' },
              sage:  { bg: '#d9e2d5', border: '#455f3c', line: '#5c7852', text: '#34492d' },
              beige: { bg: '#e5e1d3', border: '#5a6349', line: '#727c5f', text: '#434a34' }
            }[bill.tone];

            return (
              <div
                key={bill.id}
                className={`bill-mover ${bill.desktopOnly ? 'hidden sm:block' : ''}`}
                style={{
                  animation: `${bill.pathClass} ${bill.duration} cubic-bezier(0.42, 0, 0.58, 1) infinite`,
                  animationDelay: bill.delay,
                  animationPlayState: shouldAnimate ? 'running' : 'paused'
                }}
              >
                <div
                  className="bill-card"
                  style={{
                    animation: `${bill.flutterClass} 1.8s ease-in-out infinite alternate`,
                    animationDelay: bill.delay,
                    animationPlayState: shouldAnimate ? 'running' : 'paused',
                    transform: `scale(${bill.scale})`
                  }}
                >
                  <svg 
                    viewBox="0 0 44 19" 
                    className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Banknote body */}
                    <rect x="0.5" y="0.5" width="43" height="18" rx="1.5" fill={toneColors.bg} stroke={toneColors.border} strokeWidth="0.8" />
                    {/* Inner frame */}
                    <rect x="2.5" y="2" width="39" height="15" rx="1" stroke={toneColors.line} strokeWidth="0.5" strokeDasharray="1.5 0.5" fill={toneColors.bg} fillOpacity="0.4" />
                    {/* Center watermark oval */}
                    <ellipse cx="22" cy="9.5" rx="6.5" ry="5" fill="#f2f5ec" stroke={toneColors.border} strokeWidth="0.6" />
                    <text x="22" y="12" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill={toneColors.text} fontFamily="system-ui, sans-serif">$</text>
                    {/* Corner marks */}
                    <text x="4.5" y="6" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill={toneColors.text} fontFamily="system-ui, sans-serif">100</text>
                    <text x="39.5" y="16" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill={toneColors.text} fontFamily="system-ui, sans-serif">100</text>
                    {/* Micro security lines */}
                    <line x1="9" y1="5" x2="14" y2="5" stroke={toneColors.line} strokeWidth="0.5" />
                    <line x1="9" y1="14" x2="14" y2="14" stroke={toneColors.line} strokeWidth="0.5" />
                    <line x1="30" y1="5" x2="35" y2="5" stroke={toneColors.line} strokeWidth="0.5" />
                    <line x1="30" y1="14" x2="35" y2="14" stroke={toneColors.line} strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient shadow gradient at bottom of card */}
        <div className="absolute inset-0 bg-gradient-to-t from-matte-black/40 via-transparent to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
