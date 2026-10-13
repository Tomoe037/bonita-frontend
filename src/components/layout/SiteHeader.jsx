import Icon from '../common/Icon'

export default function SiteHeader({ brandName = 'BONITA SHOP', searchValue, searchPlaceholder = 'Tìm mô hình, blind box và nhiều hơn nữa...', cartCount = 0, onSearchChange, onSearchClick, onAccountClick, onCartClick, onBrandClick }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" type="button" onClick={onBrandClick} aria-label={`${brandName} — Trang chủ`}>
          <span className="brand-mark" aria-hidden="true">b<span>✦</span></span>
          <span className="brand-wordmark">{brandName}<small>A LITTLE JOY, EVERY DAY</small></span>
        </button>
        <div className="header-search" role="search" aria-label="Tìm kiếm sản phẩm">
          <input type="search" aria-label="Từ khóa tìm kiếm" placeholder={searchPlaceholder} value={searchValue} onChange={onSearchChange} readOnly={searchValue !== undefined && !onSearchChange} />
          <button type="button" onClick={onSearchClick} aria-label="Tìm kiếm"><Icon name="search" /></button>
        </div>
        <div className="header-actions">
          <button type="button" onClick={onAccountClick}><Icon name="user" /><span>Đăng nhập</span></button>
          <button type="button" onClick={onCartClick} aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}>
            <span className="cart-icon"><Icon name="bag" /><span className="cart-count">{cartCount}</span></span><span>Giỏ hàng</span>
          </button>
        </div>
      </div>
    </header>
  )
}
