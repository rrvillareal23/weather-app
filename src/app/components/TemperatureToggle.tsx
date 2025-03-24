import React from "react";

interface TemperatureButtonProps {
  unit: string;
  currentUnit: string;
  onClick: (unit: string) => void;
}

const TemperatureButton = ({
  unit,
  currentUnit,
  onClick,
}: TemperatureButtonProps) => {
  return (
    <button
      className={`px-3 py-1 rounded transition-all duration-200 hover:cursor-pointer ${
        currentUnit === unit
          ? "bg-[#1e1e1e] text-white shadow-md"
          : "text-gray-300 hover:bg-[#2a2a2a]"
      }`}
      onClick={() => onClick(unit)}
      aria-pressed={currentUnit === unit}
      aria-label={`Switch to ${unit}°`}
    >
      °{unit}
    </button>
  );
};

interface TemperatureToggleProps {
  unit: string;
  onToggle: (unit: string) => void;
}

const TemperatureToggle = ({ unit, onToggle }: TemperatureToggleProps) => {
  return (
    <div
      className="flex items-center bg-[#363636] rounded-lg p-1"
      role="radiogroup"
      aria-label="Temperature unit"
    >
      <TemperatureButton unit="F" currentUnit={unit} onClick={onToggle} />
      <TemperatureButton unit="C" currentUnit={unit} onClick={onToggle} />
    </div>
  );
};

export default TemperatureToggle;
