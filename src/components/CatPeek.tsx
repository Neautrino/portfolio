import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

// Maximum pupil travel inside the r=34 inner eye cavity, and how strongly
// cursor distance maps to that travel.
const MAX_PUPIL_TRAVEL = 14.5;
const SENSITIVITY = 0.08;
const EASE = 0.18;

/**
 * Silhouette cat peeking over the terminal's bottom ledge. Both eyes track
 * the cursor independently (binocular convergence) via a hand-rolled
 * exponential-decay loop on requestAnimationFrame — no animation library.
 */
export function CatPeek() {
  const reduced = useReducedMotion();
  const leftEyeRef = useRef<SVGGElement>(null);
  const rightEyeRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const target = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 });

  useEffect(() => {
    if (reduced) return;

    const onMouseMove = (event: MouseEvent) => {
      const leftEye = leftEyeRef.current;
      const rightEye = rightEyeRef.current;
      if (!leftEye || !rightEye) return;

      const leftRect = leftEye.getBoundingClientRect();
      const leftDx = event.clientX - (leftRect.left + leftRect.width / 2);
      const leftDy = event.clientY - (leftRect.top + leftRect.height / 2);
      const leftDist = Math.min(MAX_PUPIL_TRAVEL, Math.hypot(leftDx, leftDy) * SENSITIVITY);
      const leftAngle = Math.atan2(leftDy, leftDx);

      const rightRect = rightEye.getBoundingClientRect();
      const rightDx = event.clientX - (rightRect.left + rightRect.width / 2);
      const rightDy = event.clientY - (rightRect.top + rightRect.height / 2);
      const rightDist = Math.min(MAX_PUPIL_TRAVEL, Math.hypot(rightDx, rightDy) * SENSITIVITY);
      const rightAngle = Math.atan2(rightDy, rightDx);

      target.current = {
        lx: Math.cos(leftAngle) * leftDist,
        ly: Math.sin(leftAngle) * leftDist,
        rx: Math.cos(rightAngle) * rightDist,
        ry: Math.sin(rightAngle) * rightDist,
      };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const current = { lx: 0, ly: 0, rx: 0, ry: 0 };
    let rafId: number;
    const tick = () => {
      const t = target.current;
      current.lx += (t.lx - current.lx) * EASE;
      current.ly += (t.ly - current.ly) * EASE;
      current.rx += (t.rx - current.rx) * EASE;
      current.ry += (t.ry - current.ry) * EASE;
      leftPupilRef.current?.setAttribute(
        'transform',
        `translate(${current.lx.toFixed(2)}, ${current.ly.toFixed(2)})`,
      );
      rightPupilRef.current?.setAttribute(
        'transform',
        `translate(${current.rx.toFixed(2)}, ${current.ry.toFixed(2)})`,
      );
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-5 bottom-[45px] hidden h-[126px] w-[300px] min-[860px]:block"
    >
      <svg viewBox="0 0 1000 420" className="block h-full w-full overflow-visible">
        <defs>
          <filter id="catEyeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="catLeftEyeClip">
            <circle cx="505" cy="340" r="34" />
          </clipPath>
          <clipPath id="catRightEyeClip">
            <circle cx="660" cy="340" r="34" />
          </clipPath>
        </defs>

        {/* Head silhouette with cheek tufts and alert ears */}
        <path
          fill="var(--color-bg)"
          stroke="var(--color-muted)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          d="M 380 400 L 385 365 L 380 355 L 392 340 L 385 325 L 402 300
             C 400 250, 390 190, 420 135 C 438 105, 465 145, 485 185
             L 500 200 L 515 196 L 530 204 L 548 198 L 565 205 L 582 199
             L 600 205 L 618 198 L 635 204 L 650 196 L 665 185
             C 685 145, 712 105, 730 135 C 760 190, 750 250, 748 300
             L 765 325 L 758 340 L 770 355 L 765 365 L 770 400"
        />

        {/* Left paw gripping the terminal ledge */}
        <path
          fill="var(--color-bg)"
          stroke="var(--color-muted)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          d="M 230 400 C 225 365, 230 335, 255 330 C 270 328, 280 338, 290 332
             C 305 326, 320 326, 335 332 C 345 338, 355 330, 365 338
             C 380 348, 380 375, 375 400"
        />

        {/* Right paw gripping the terminal ledge */}
        <path
          fill="var(--color-bg)"
          stroke="var(--color-muted)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          d="M 775 400 C 770 375, 770 348, 785 338 C 795 330, 805 338, 815 332
             C 830 326, 845 326, 860 332 C 870 338, 880 328, 895 330
             C 920 335, 925 365, 920 400"
        />

        {/* Left eye: glowing iris ring + cursor-tracking pupil */}
        <g ref={leftEyeRef}>
          <circle
            cx="505"
            cy="340"
            r="40"
            fill="color-mix(in srgb, var(--color-accent) 22%, var(--color-bg))"
            stroke="var(--color-accent)"
            strokeWidth="8.5"
            filter="url(#catEyeGlow)"
          />
          <g clipPath="url(#catLeftEyeClip)">
            <g transform="translate(505, 340)">
              <g ref={leftPupilRef}>
                <circle cx="0" cy="0" r="20" fill="#000000" />
                <circle cx="3" cy="3" r="8" fill="#ffffff" />
                <circle cx="-3" cy="-4" r="3.2" fill="#ffffff" opacity="0.75" />
              </g>
            </g>
          </g>
        </g>

        {/* Right eye: glowing iris ring + cursor-tracking pupil */}
        <g ref={rightEyeRef}>
          <circle
            cx="660"
            cy="340"
            r="40"
            fill="color-mix(in srgb, var(--color-accent) 22%, var(--color-bg))"
            stroke="var(--color-accent)"
            strokeWidth="8.5"
            filter="url(#catEyeGlow)"
          />
          <g clipPath="url(#catRightEyeClip)">
            <g transform="translate(660, 340)">
              <g ref={rightPupilRef}>
                <circle cx="0" cy="0" r="20" fill="#000000" />
                <circle cx="-3" cy="3" r="8" fill="#ffffff" />
                <circle cx="3" cy="-4" r="3.2" fill="#ffffff" opacity="0.75" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
