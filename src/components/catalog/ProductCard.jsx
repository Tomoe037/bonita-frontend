import defaultFallback from '../../assets/product-placeholder.svg'

const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })

export default function ProductCard({ product, onProductClick, fallbackImage = defaultFallback }) {
  return (
    <article className="product-card">
      <button type="button" className="product-link" onClick={() => onProductClick?.(product)}>
        <div className="product-image-wrap">
          <img src={product.image_url || fallbackImage} alt={product.image_alt || product.name} loading="lazy" width="400" height="400" onError={(event) => {
            // Image recovery only; catalog/application behavior belongs to the parent.
            const image = event.currentTarget
            if (image.getAttribute('src') !== fallbackImage) image.src = fallbackImage
          }} />
          {product.badge && <span className={`product-badge${product.badge === 'Đặt trước' ? ' product-badge-preorder' : ''}`}>{product.badge}</span>}
        </div>
        {product.category && <span className="product-category">{product.category}</span>}
        <h2 title={product.name}>{product.name}</h2>
        <div className="product-prices"><span>{currency.format(product.price)}</span>{product.original_price > product.price && <del>{currency.format(product.original_price)}</del>}</div>
      </button>
    </article>
  )
}
