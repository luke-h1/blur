/* eslint-disable react/no-array-index-key */
import React, { HtmlHTMLAttributes } from 'react';

interface RadialBlurProps extends HtmlHTMLAttributes<HTMLDivElement> {
  strength?: number;
  steps?: number;
  falloffPercentage?: number;
  tint?: string;
}

export default function RadialBlur({
  strength = 64,
  steps = 8,
  falloffPercentage = 100,
  tint = 'transparent',
  ...props
}: RadialBlurProps) {
  // Ensure that the strength is within the range of 1 to 100
  const actualSteps = Math.max(1, steps);
  const step = falloffPercentage / actualSteps;
  const factor = 0.5;

  const base = (strength / factor) ** (1 / (actualSteps - 1));
  const centerPercentage = 100 - falloffPercentage;

  const getBackdropFilter = (index: number) => {
    return `blur(${factor * base ** (actualSteps - index - 1)}px)`;
  };

  return (
    <div
      {...props}
      style={{
        pointerEvents: 'none',
        ...props.style,
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(closest-side, rgb(from ${tint} r g b / alpha) 0%, rgb(from ${tint} r g b / 0%) 100%)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
            inset: 0,
            mask: `radial-gradient(closest-side, rgba(0, 0, 0, 1) ${centerPercentage}%, rgba(0, 0, 0, 0) ${centerPercentage + step}%)`,
            backdropFilter: getBackdropFilter(0),
            WebkitBackdropFilter: getBackdropFilter(0),
          }}
        />
        {actualSteps > 1 && (
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              inset: 0,
              mask: `radial-gradient(closest-side, rgba(0, 0, 0, 1) ${centerPercentage}%,
              rgba(0, 0, 0, 1) ${centerPercentage + step}%,
              rgba(0, 0, 0, 0) ${centerPercentage + step * 2}%)`,
              backdropFilter: getBackdropFilter(1),
              WebkitBackdropFilter: getBackdropFilter(1),
            }}
          />
        )}
        {actualSteps > 2 &&
          Array.from({ length: actualSteps - 2 }).map((_, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                zIndex: index + 2,
                inset: 0,
                mask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) ${centerPercentage + index * step}%,
              rgba(0, 0, 0, 1) ${centerPercentage + (index + 1) * step}%,
              rgba(0, 0, 0, 1) ${centerPercentage + (index + 2) * step}%,
              rgba(0, 0, 0, 0) ${centerPercentage + (index + 3) * step}%)`,
                backdropFilter: getBackdropFilter(index + 2),
                WebkitBackdropFilter: getBackdropFilter(index + 2),
              }}
            />
          ))}
      </div>
    </div>
  );
}
