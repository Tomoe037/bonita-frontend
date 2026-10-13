export default function ProductToolbar({ categoryName, title = 'Tất cả sản phẩm', subtitle, resultStart = 0, resultEnd = 0, total = 0, sortOptions = [], sortValue, onSortChange }) {
  return (
    <>
      <div className="section-heading">
        <div>
          <h1 id="catalog-title">{categoryName ?? title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <span className="collection-label">THE LITTLE JOY COLLECTION</span>
      </div>
      <div className="product-toolbar">
        <p>Hiển thị <strong>{resultStart}–{resultEnd}</strong> trong <strong>{total}</strong> sản phẩm</p>
        <label className="sort-control">
          <span>Sắp xếp:</span>
          <select aria-label="Sắp xếp sản phẩm" value={sortValue} onChange={(event) => onSortChange?.(event.target.value)}>
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>
    </>
  )
}
