"use client";

import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const DEFAULT_INNER_GRADIENT =
  'linear-gradient(160deg, #1B2A41 0%, #243447 48%, #1C7A6F33 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const KEYFRAMES_ID = 'pc-keyframes';

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  name?: string;
  title?: string;
  contactText?: string;
  onContactClick?: () => void;
  secondaryActionText?: string;
  onSecondaryActionClick?: () => void;
  compact?: boolean;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '<Placeholder for avatar URL>',
  iconUrl = '<Placeholder for icon URL>',
  grainUrl = '<Placeholder for grain URL>',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  name = 'Javi A. Torres',
  title = 'Software Engineer',
  contactText = 'Contact',
  onContactClick,
  secondaryActionText,
  onSecondaryActionClick,
  compact = false,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(KEYFRAMES_ID)) return;
    const style = document.createElement('style');
    style.id = KEYFRAMES_ID;
    style.textContent = `
      @keyframes pc-holo-bg {
        0% { background-position: 0 var(--background-y), 0 0, center; }
        100% { background-position: 0 var(--background-y), 90% 90%, center; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number): void => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number): void => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = (): void => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number): void {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number): void {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter(): void {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number): void {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent(): { x: number; y: number; tx: number; ty: number } {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel(): void {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement): { x: number; y: number } => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback((): void => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = (): void => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;
    const deviceOrientationHandler = handleDeviceOrientation as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = (): void => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;
      const anyMotion = window.DeviceMotionEvent as typeof DeviceMotionEvent & {
        requestPermission?: () => Promise<string>;
      };
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };
    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardRadius = compact ? '20px' : '30px';

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--behind-glow-color': behindGlowColor ?? 'rgba(27, 42, 65, 0.35)',
        '--behind-glow-size': behindGlowSize ?? '55%',
        '--pointer-x': '50%',
        '--pointer-y': '50%',
        '--pointer-from-center': '0',
        '--pointer-from-top': '0.5',
        '--pointer-from-left': '0.5',
        '--card-opacity': '0',
        '--rotate-x': '0deg',
        '--rotate-y': '0deg',
        '--background-x': '50%',
        '--background-y': '50%',
        '--card-radius': cardRadius,
        /* Institutional Ink — muted pillars, no neon */
        '--sunpillar-1': '#1B2A41',
        '--sunpillar-2': '#2A3D56',
        '--sunpillar-3': '#3D516C',
        '--sunpillar-4': '#2A9D8F',
        '--sunpillar-5': '#1C7A6F',
        '--sunpillar-6': '#A8B5C8',
        '--sunpillar-clr-1': 'var(--sunpillar-1)',
        '--sunpillar-clr-2': 'var(--sunpillar-2)',
        '--sunpillar-clr-3': 'var(--sunpillar-3)',
        '--sunpillar-clr-4': 'var(--sunpillar-4)',
        '--sunpillar-clr-5': 'var(--sunpillar-5)',
        '--sunpillar-clr-6': 'var(--sunpillar-6)'
      }),
      [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize, cardRadius]
    );

  const handleContactClick = useCallback((): void => {
    onContactClick?.();
  }, [onContactClick]);

  const handleSecondaryActionClick = useCallback((): void => {
    onSecondaryActionClick?.();
  }, [onSecondaryActionClick]);

  // Complex styles that require CSS variables and can't be done with Tailwind
  const shineStyle = {
    maskImage: 'var(--icon)',
    maskMode: 'luminance',
    maskRepeat: 'repeat',
    maskSize: '150%',
    maskPosition: 'top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x))',
      filter: 'brightness(0.85) contrast(1.05) saturate(0.45) opacity(0.28)',
      animation: 'pc-holo-bg 28s linear infinite',
      animationPlayState: 'running' as const,
      mixBlendMode: 'soft-light' as const,
    transform: 'translate3d(0, 0, 1px)',
    overflow: 'hidden' as const,
    zIndex: 3,
    background: 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `
      repeating-linear-gradient(
        0deg,
        var(--sunpillar-clr-1) 5%,
        var(--sunpillar-clr-2) 10%,
        var(--sunpillar-clr-3) 15%,
        var(--sunpillar-clr-4) 20%,
        var(--sunpillar-clr-5) 25%,
        var(--sunpillar-clr-6) 30%,
        var(--sunpillar-clr-1) 35%
      ),
      repeating-linear-gradient(
        -45deg,
        #0e152e 0%,
        hsl(210, 12%, 42%) 3.8%,
        hsl(174, 18%, 48%) 4.5%,
        hsl(210, 12%, 42%) 5.2%,
        #0e152e 10%,
        #0e152e 12%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsla(210, 25%, 20%, 0.08) 12%,
        hsla(210, 30%, 12%, 0.2) 20%,
        hsla(210, 35%, 8%, 0.35) 120%
      )
    `.replace(/\s+/g, ' '),
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none' as const
  };

  const glareStyle: React.CSSProperties = {
    transform: 'translate3d(0, 0, 1.1px)',
    overflow: 'hidden',
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsla(174, 35%, 72%, 0.35) 10%,
      hsla(210, 28%, 22%, 0.45) 90%
    )`,
    mixBlendMode: 'soft-light',
    filter: 'brightness(0.95) contrast(1.05)',
    zIndex: 4,
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none'
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`.trim()}
      style={{ perspective: '500px', transform: 'translate3d(0, 0, 0.1px)', ...cardStyle } as React.CSSProperties}
    >
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: 'blur(50px) saturate(1.1)',
            opacity: 'calc(0.8 * var(--card-opacity))'
          }}
        />
      )}
      <div ref={shellRef} className="relative z-[1] group">
        <section
          className="grid relative overflow-hidden"
          style={{
            height: compact ? '400px' : '80svh',
            maxHeight: compact ? '400px' : '540px',
            width: compact ? '100%' : undefined,
            aspectRatio: compact ? undefined : '0.718',
            borderRadius: cardRadius,
            backgroundBlendMode: 'normal',
            boxShadow:
              'rgba(27, 42, 65, 0.28) calc((var(--pointer-from-left) * 8px) - 2px) calc((var(--pointer-from-top) * 14px) - 4px) 22px -4px',
            transition: 'transform 1s ease',
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            background: '#1B2A41',
            border: '1px solid rgba(168, 181, 200, 0.18)',
            backfaceVisibility: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transition = 'none';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))';
          }}
          onMouseLeave={e => {
            const shell = shellRef.current;
            if (shell?.classList.contains('entering')) {
              e.currentTarget.style.transition = 'transform 180ms ease-out';
            } else {
              e.currentTarget.style.transition = 'transform 1s ease';
            }
            e.currentTarget.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: 'var(--inner-gradient)',
              backgroundColor: '#1B2A41',
              borderRadius: cardRadius,
              display: 'grid',
              gridArea: '1 / -1'
            }}
          >
            {/* Shine layer */}
            <div style={shineStyle} />

            {/* Glare layer */}
            <div style={glareStyle} />

            {/* Avatar — full-bleed, no header gap */}
            <div
              className="overflow-hidden"
              style={{
                mixBlendMode: 'normal',
                transform: 'translateZ(2px)',
                gridArea: '1 / -1',
                borderRadius: cardRadius,
                pointerEvents: 'none',
                backfaceVisibility: 'hidden'
              }}
            >
              <img
                className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-[120ms] ease-out object-cover object-top"
                src={avatarUrl}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                style={{
                  transformOrigin: '50% 60%',
                  transform:
                    'translate3d(calc((var(--pointer-from-left) - 0.5) * 8px), calc((var(--pointer-from-top) - 0.5) * 4px), 0) scale(calc(1.04 + var(--pointer-from-center) * 0.02))',
                  borderRadius: cardRadius,
                  backfaceVisibility: 'hidden',
                  filter: 'saturate(0.94) contrast(1.03)',
                }}
                onError={e => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                }}
              />

              {/* Readability gradient — bottom only, flush with content */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: '45%',
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(13, 21, 34, 0.15) 28%, rgba(13, 21, 34, 0.78) 62%, rgba(13, 21, 34, 0.96) 100%)',
                }}
              />
            </div>

            {/* Identity + actions — stacked tight at bottom */}
            <div
              className="relative z-[5] flex flex-col justify-end"
              style={{
                transform:
                  'translate3d(calc(var(--pointer-from-left) * -4px + 2px), calc(var(--pointer-from-top) * -4px + 2px), 0.1px)',
                mixBlendMode: 'normal',
                gridArea: '1 / -1',
                borderRadius: cardRadius,
                pointerEvents: 'none',
                padding: compact ? '14px' : '18px',
              }}
            >
              <div className="flex flex-col gap-2.5 pointer-events-auto">
                <div className="flex flex-col gap-1 text-left">
                  <h3
                    className="m-0 font-semibold leading-tight"
                    style={{
                      fontSize: compact ? '1.2rem' : 'min(4.2svh, 1.85rem)',
                      color: '#F4F6F8',
                      letterSpacing: '-0.025em',
                      textShadow: '0 2px 18px rgba(0, 0, 0, 0.45)',
                    }}
                  >
                    {name}
                  </h3>
                  <p
                    className="m-0 font-medium leading-snug"
                    style={{
                      fontSize: compact ? '12px' : '13px',
                      color: '#C5D0DC',
                    }}
                  >
                    {title}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 min-w-0 border border-white/15 rounded-lg px-3 py-2.5 text-[11px] font-bold text-white cursor-pointer transition-all duration-200 ease-out hover:border-[#2A9D8F]/60 hover:bg-[#2A9D8F]/20 hover:-translate-y-px backdrop-blur-[24px]"
                    onClick={handleContactClick}
                    type="button"
                    aria-label={`${contactText} ${name || 'user'}`}
                    style={{ background: 'rgba(42, 157, 143, 0.22)' }}
                  >
                    {contactText}
                  </button>
                  {secondaryActionText && onSecondaryActionClick && (
                    <button
                      className="flex-1 min-w-0 border border-white/15 rounded-lg px-3 py-2.5 text-[11px] font-bold text-white/95 cursor-pointer transition-all duration-200 ease-out hover:border-white/30 hover:bg-white/10 hover:-translate-y-px backdrop-blur-[24px]"
                      onClick={handleSecondaryActionClick}
                      type="button"
                      aria-label={`${secondaryActionText} ${name || 'user'}`}
                      style={{ background: 'rgba(244, 246, 248, 0.08)' }}
                    >
                      {secondaryActionText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
