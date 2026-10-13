import ProductCard from './ProductCard'

export default function ProductGrid({ products = [], onProductClick, fallbackImage, emptyMessage = 'Chưa có sản phẩm trong danh mục này.' }) {
  if (products.length === 0) return <p className="empty-products" role="status">{emptyMessage}</p>
  return <ul className="product-grid">{products.map((product) => <li key={product.id}><ProductCard product={product} onProductClick={onProductClick} fallbackImage={fallbackImage} /></li>)}</ul>
}
