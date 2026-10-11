import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    className = "px-4 py-2 text-sm w-full h-[40px]",
    onInput,
    ...props
  },
  ref,
) {
  const id = useId();

  // Dynamically scales height with user input
  const handleAutoGrow = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    if (onInput) onInput(e); // Maintain compatibility if you pass an onInput callback
  };

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block ml-2 pl-1 mb-1 text-sm font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        rows={1}
        className={`text-sm resize-none overflow-hidden ${className}`}
        ref={ref}
        onInput={handleAutoGrow}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;

