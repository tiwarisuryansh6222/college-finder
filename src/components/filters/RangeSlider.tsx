'use client';

import React, { useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
}

export function RangeSlider({ min, max, value, onChange, formatLabel }: RangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - 10000);
    const newValue: [number, number] = [newMin, localValue[1]];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + 10000);
    const newValue: [number, number] = [localValue[0], newMax];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const format = formatLabel || ((v: number) => `₹${(v / 100000).toFixed(1)}L`);

  // Sync when external value changes
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
          {format(localValue[0])}
        </span>
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
          {format(localValue[1])}
        </span>
      </div>
      <div className="relative h-6">
        {/* Track background */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full" />
        {/* Active track */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-indigo-500 rounded-full"
          style={{
            left: `${getPercent(localValue[0])}%`,
            width: `${getPercent(localValue[1]) - getPercent(localValue[0])}%`,
          }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={10000}
          value={localValue[0]}
          onChange={handleMinChange}
          className="range-slider-thumb absolute top-0 w-full h-6 appearance-none bg-transparent pointer-events-none z-10"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={10000}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="range-slider-thumb absolute top-0 w-full h-6 appearance-none bg-transparent pointer-events-none z-20"
        />
      </div>
    </div>
  );
}
