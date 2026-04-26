import { memo } from "react";

export const Input = memo(({ label, value, onChange, name, type = "text" }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400">{label}</label>

      <input
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        className="bg-white text-black p-3 rounded-xl outline-none"
      />
    </div>
  );
});

export const Select = memo(({ label, value, onChange, name, options }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400">{label}</label>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="bg-white text-black p-3 rounded-xl outline-none"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
});
