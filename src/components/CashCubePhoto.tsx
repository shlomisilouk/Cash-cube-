import { useState, useEffect, useRef } from 'react';

export default function CashCubePhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoError, setVideoError] = useState<boolean>(false);

  // Play video continuously; restart playback on mount, tab focus, or viewport intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // If browser blocks immediate autoplay, resume on first user interaction anywhere
            const handleFirstInteraction = () => {
              video.play().catch(() => {});
              window.removeEventListener('click', handleFirstInteraction);
              window.removeEventListener('touchstart', handleFirstInteraction);
              window.removeEventListener('scroll', handleFirstInteraction);
            };
            window.addEventListener('click', handleFirstInteraction, { once: true });
            window.addEventListener('touchstart', handleFirstInteraction, { once: true });
            window.addEventListener('scroll', handleFirstInteraction, { once: true });
          });
        }
      }
    };

    // Initial play attempt
    playVideo();

    // IntersectionObserver to pause when off-screen to conserve GPU/CPU, and resume when visible
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            video.pause();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }

    // Resume when browser tab gains visibility
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playVideo();
      } else {
        video.pause();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // If for any reason playback ends or pauses unexpectedly, keep it looping/playing
    const handlePause = () => {
      if (!document.hidden && containerRef.current) {
        playVideo();
      }
    };
    video.addEventListener('pause', handlePause);

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoError]);

  return (
    <div 
      ref={containerRef}
      className="relative z-10 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.25)] group aspect-square select-none bg-matte-black"
    >
      {/* Screen reader description for accessibility */}
      <span id="cashcube-video-description" className="sr-only">
        סרטון של תא כסף CASH CUBE שקוף באירוע עם שטרות מתעופפים בסחרור באוויר
      </span>

      {videoError ? (
        /* Fallback if video fails to load */
        <img
          src="/cashcash.jpg"
          alt="תא כסף CASH CUBE שקוף באירוע עם שטרות מתעופפים"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width="800"
          height="800"
          loading="eager"
        />
      ) : (
        <video
          ref={videoRef}
          src="/Cash_Cube_Motion.mp4"
          poster="/cashcash.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-describedby="cashcube-video-description"
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
        />
      )}

      {/* Subtle ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-matte-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
