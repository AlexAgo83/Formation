import { useId } from "react"

/**
 * @param {string} placeholder
 * @param {string} value
 * @param {(s: string) => void} onChange
 */
export function Input ({placeholder, value, onChange}) {
  const id = useId()
  return <div>
    <input
      id={id}
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
}