import { useId } from "react"

/**
 * @param {string} placeholder
 * @param {string} value
 * @param {(s: string) => void} onChange
 */
export function Input ({label: label, value, onChange}) {
  const id = useId()
  return <div>
    <label 
      htmlFor={id} 
      className="form-label">
      {label}
      </label>
    <input
      id={id}
      type="text"
      className="form-control"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
}