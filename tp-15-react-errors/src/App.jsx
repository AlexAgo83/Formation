import { Input } from "./components/forms/Input"
import { Checkbox } from "./components/forms/Checkbox"
import { Range } from "./components/forms/Range"
import { ProductRow } from "./components/products/ProductRow"
import { ProductCategoryRow } from "./components/products/ProductCategoryRow"

import { ErrorBoundary } from 'react-error-boundary'
import { useState } from "react";

const PRODUCTS = [
  { category: 'Fruits', price: 1, stocked: true, name: 'Apple' },
  { category: 'Fruits', price: 1, stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: 2, stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: 2, stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: 4, stocked: false, name: 'Pumkin' },
  { category: 'Vegetables', price: 1, stocked: true, name: 'Peas' }
]

function App() {
  const [showStockOnly, setShowStockOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(5);

  const visibleProducts = PRODUCTS.filter(product => {
      if (showStockOnly && !product.stocked) return false
      if (search && !product.name.includes(search)) return false
      if (product.price > price) return false
      return true
  })

  return <div className="container my-5">
    <SearchBar 
      search={search}
      onSearchChange={setSearch}
      showStockOnly={showStockOnly} 
      onStockedOnlyChange={setShowStockOnly} 
      price={price}
      onPriceChange={setPrice}/>
    <ErrorBoundary
      fallback={<p>Erreur de chargement</p>}
      onReset={() => console.log()}>

      <ProductTable products={visibleProducts} />
      
    </ErrorBoundary>
  </div>
}

function AlertError({error, resetErrorBoundary}) {
  return <div>
    <h1>Une erreur est survenue</h1>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Réessayer</button>
  </div>
}

function SearchBar({search, showStockOnly, price, onSearchChange, onStockedOnlyChange, onPriceChange}) {
  return <div>
    <div className="mb-3">
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onSearchChange} />
      <Range
        id="price"
        min={0}
        max={5}
        value={price}
        onChange={onPriceChange}
        label="Price" />
      <Checkbox
        id="stocked"
        checked={showStockOnly}
        onChange={onStockedOnlyChange}
        label="Only show products in stock" />
    </div>
  </div>
}

function ProductTable({ products }) {
  const rows = []
  let lastCategory = null

  for (let product of products) {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow
        key={product.category}
        name={product.category} />)
    }
    lastCategory = product.category
    rows.push(<ProductRow
      key={product.name}
      product={product} />)
  }

  return <table className="table">
    <thead>
      <tr>
        <th>Name</th><th>Price</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}

export default App
