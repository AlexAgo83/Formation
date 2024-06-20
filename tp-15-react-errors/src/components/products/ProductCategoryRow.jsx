/**
 * Product category row component that displays a category in a table row with its name in a single column
 * @param {string} name 
 * @returns 
 */
export function ProductCategoryRow ({name}) {
    return <tr>
        <td colSpan="2"><strong>{name}</strong></td>
    </tr>
}