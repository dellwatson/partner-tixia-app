"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "~/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[2px] text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(hsl(188,100%,50%)_20%,hsl(188,100%,40%)_40%,transparent_70%)] opacity-[1] blur-[1px] shadow-[0_0_20px_hsl(188,100%,50%)]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx = "30%",
  ry = "30%",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => {
      try {
        return pathRef.current?.getPointAtLength(val)?.x ?? 0;
      } catch {
        return 0;
      }
    },
  );
  const y = useTransform(
    progress,
    (val) => {
      try {
        return pathRef.current?.getPointAtLength(val)?.y ?? 0;
      } catch {
        return 0;
      }
    },
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  // Create a rounded rectangle path
  const createRoundedRectPath = () => {
    const width = 100;
    const height = 100;
    const rxValue = parseFloat(rx.replace('%', '')) * width / 100;
    const ryValue = parseFloat(ry.replace('%', '')) * height / 100;
    
    return `
      M ${rxValue},0
      L ${width - rxValue},0
      Q ${width},0 ${width},${ryValue}
      L ${width},${height - ryValue}
      Q ${width},${height} ${width - rxValue},${height}
      L ${rxValue},${height}
      Q 0,${height} 0,${height - ryValue}
      L 0,${ryValue}
      Q 0,0 ${rxValue},0
      Z
    `;
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        {...otherProps}
      >
        <path
          fill="none"
          stroke="none"
          d={createRoundedRectPath()}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
