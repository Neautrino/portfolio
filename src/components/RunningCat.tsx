import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * The classic oneko.js desktop cat, wired into the portfolio:
 *
 * 1. Starts asleep beside "Hi, my name is" in the hero section.
 * 2. Clicking the cat puts it right back to sleep where it is.
 * 3. Moving the cursor far enough away wakes it up and it chases the
 *    cursor with the 8-direction running cycle.
 * 4. Respects prefers-reduced-motion (renders nothing).
 */

type SpriteCoord = [number, number];

const SPRITES: Record<string, SpriteCoord[]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

const NEKO_SPEED = 10;
const FRAME_INTERVAL_MS = 100;

export function RunningCat() {
  const reduced = useReducedMotion();
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const el = elRef.current;
    if (!el) return;

    // Initial position: beside "Hi, my name is"
    let posX = window.innerWidth / 2;
    let posY = 150;

    const eyebrow = document.querySelector('.heroEyebrow');
    if (eyebrow) {
      const range = document.createRange();
      range.selectNodeContents(eyebrow);
      const textRect = range.getBoundingClientRect();
      if (textRect.width > 0) {
        posX = textRect.right + 24;
        posY = (textRect.top + textRect.bottom) / 2;
      }
    }

    let mouseX = posX;
    let mouseY = posY;
    let frameCount = 0;
    let idleTime = 0;
    // Start in sleeping state!
    let idleAnimation: string | null = 'sleeping';
    let idleAnimationFrame = 10;
    let isForcedSleeping = true;
    let lastFrameTimestamp = 0;
    let rafId: number;

    el.style.backgroundImage = 'url(/oneko.gif)';
    el.style.left = `${posX - 16}px`;
    el.style.top = `${posY - 16}px`;

    const setSprite = (name: string, frameIndex: number) => {
      const set = SPRITES[name] ?? SPRITES.idle;
      const [col, row] = set[frameIndex % set.length];
      el.style.backgroundPosition = `${col * 32}px ${row * 32}px`;
    };

    setSprite('sleeping', 0);

    const resetIdleAnimation = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };

    const handleIdle = () => {
      idleTime += 1;

      // Random idle action every ~20s if not already sleeping
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
        const available: string[] = ['sleeping', 'scratchSelf'];
        if (posX < 32) available.push('scratchWallW');
        if (posY < 32) available.push('scratchWallN');
        if (posX > window.innerWidth - 32) available.push('scratchWallE');
        if (posY > window.innerHeight - 32) available.push('scratchWallS');
        idleAnimation = available[Math.floor(Math.random() * available.length)];
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) {
            setSprite('tired', 0);
            break;
          }
          setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 240 && !isForcedSleeping) {
            resetIdleAnimation();
          }
          break;
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite('idle', 0);
          return;
      }
      idleAnimationFrame += 1;
    };

    const onFrame = () => {
      frameCount += 1;
      const diffX = posX - mouseX;
      const diffY = posY - mouseY;
      const distance = Math.hypot(diffX, diffY);

      // If forced sleeping (click or page load), stay asleep until the
      // cursor moves deliberately away (>64px)
      if (isForcedSleeping) {
        if (distance < 64) {
          handleIdle();
          return;
        }
        isForcedSleeping = false;
        resetIdleAnimation();
      }

      if (distance < NEKO_SPEED || distance < 48) {
        handleIdle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite('alert', 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = '';
      direction += diffY / distance > 0.5 ? 'N' : '';
      direction += diffY / distance < -0.5 ? 'S' : '';
      direction += diffX / distance > 0.5 ? 'W' : '';
      direction += diffX / distance < -0.5 ? 'E' : '';

      setSprite(direction || 'idle', frameCount);

      posX -= (diffX / distance) * NEKO_SPEED;
      posY -= (diffY / distance) * NEKO_SPEED;

      posX = Math.min(Math.max(16, posX), window.innerWidth - 16);
      posY = Math.min(Math.max(16, posY), window.innerHeight - 16);

      el.style.left = `${posX - 16}px`;
      el.style.top = `${posY - 16}px`;
    };

    const onAnimationFrame = (timestamp: number) => {
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > FRAME_INTERVAL_MS) {
        lastFrameTimestamp = timestamp;
        onFrame();
      }
      rafId = requestAnimationFrame(onAnimationFrame);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    // Click on the cat puts it right back to sleep!
    const onClick = (event: MouseEvent) => {
      event.stopPropagation();
      isForcedSleeping = true;
      idleAnimation = 'sleeping';
      idleAnimationFrame = 8;
      setSprite('sleeping', 0);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('click', onClick);
    rafId = requestAnimationFrame(onAnimationFrame);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={elRef}
      aria-label="Interactive desktop cat"
      title="Click me to sleep"
      style={{
        width: '32px',
        height: '32px',
        position: 'fixed',
        pointerEvents: 'auto',
        cursor: 'pointer',
        imageRendering: 'pixelated',
        zIndex: 9999,
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
