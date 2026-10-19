import React, { useEffect, useRef } from 'react';

export const HERO_STREAM = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

/**
 * Background HLS video. hls.js is loaded on demand; native HLS (iOS Safari) is the fallback.
 * With `lazy`, the stream only attaches once the video nears the viewport.
 */
const HlsVideo = ({ src = HERO_STREAM, className = '', lazy = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;
    let cancelled = false;

    const attach = async () => {
      const { default: Hls } = await import('hls.js');
      if (cancelled) return;
      if (Hls.isSupported()) {
        hls = new Hls({ capLevelToPlayerSize: true });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.play().catch(() => {});
      }
    };

    let observer;
    if (lazy && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            attach();
          }
        },
        { rootMargin: '400px' }
      );
      observer.observe(video);
    } else {
      attach();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      hls?.destroy();
    };
  }, [src, lazy]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      className={`absolute left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 ${className}`}
    />
  );
};

export default HlsVideo;
