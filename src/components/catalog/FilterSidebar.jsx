import Icon from '../common/Icon'

export default function FilterSidebar({ categories = [], priceRanges = [], selectedCategoryIds = [], selectedPriceId = '', onCategoryChange, onPriceChange, onReset }) {
  // Share markup between responsive views; distinct radio names avoid cross-view grouping.
  const renderFilters = (view) => (
    <>
      <p className="filter-description">Tìm một chút đáng yêu cho bạn</p>
      <div className="filter-groups">
        <fieldset>
          <legend>Danh mục sản phẩm</legend>
          {categories.map((category) => (
            <label className="filter-option" key={category.id}>
              <input type="checkbox" name={`category-${view}`} value={category.id} checked={selectedCategoryIds.includes(category.id)} onChange={() => onCategoryChange?.(category.id)} />
              <span>{category.label}</span>
              {category.count != null && <small>{category.count}</small>}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Khoảng giá</legend>
          {priceRanges.map((range) => (
            <label className="filter-option" key={range.id}>
              <input type="radio" name={`price-range-${view}`} value={range.id} checked={selectedPriceId === range.id} onChange={() => onPriceChange?.(range.id)} />
              <span>{range.label}</span>
            </label>
          ))}
        </fieldset>
      </div>
      <button className="reset-filters" type="button" onClick={onReset}>Đặt lại bộ lọc</button>
      <div className="sidebar-note">
        <Icon name="star" />
        <p>Một mô hình nhỏ.<br /><strong>Một niềm vui thật to.</strong></p>
        <span>BONITA SHOP</span>
      </div>
    </>
  )

  return (
    <aside className="filter-sidebar" aria-label="Bộ lọc sản phẩm">
      <div className="filter-desktop">
        <h2><Icon name="filter" />Bộ lọc sản phẩm</h2>
        {renderFilters('desktop')}
      </div>
      <details className="filter-disclosure">
        <summary className="filter-toggle">
          <Icon name="filter" />
          <span>Bộ lọc sản phẩm</span>
          <Icon name="chevron" className="filter-toggle-chevron" />
        </summary>
        <div className="filter-content">{renderFilters('mobile')}</div>
      </details>
    </aside>
  )
}
