/**
 * @param {string} id
 * @param {number} min
 * @param {number} max
 * @param {number} value
 * @param {(n: number) => void} onChange
 * @param {string} label
 */
export function Range ({id, min, max, value, onChange, label}) {
    return <div className="form-range">
        <label htmlFor={id} className="form-range-label">{label} ({value})</label>
        <input
            id={id}
            type="range"
            className="form-range-input"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))} 
        />
    </div>
}