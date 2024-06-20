import { useEffect } from "react"

/**
 * Product row component that displays a product in a table row with its name and price in columns
 * @param {{ category, price, stocked, name }} product
 * @returns 
 */
export function ProductRow ({product}) {
    const style = product.stocked ? undefined : {color: 'red'}

    useEffect(() => {
        throw new Error('useEffet', 'test missclicked')
    }, [])

    return <tr>
        <td style={style}>{product.name}</td>
        <td>$ {product.price}</td>
    </tr>
}