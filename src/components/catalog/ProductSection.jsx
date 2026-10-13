import ProductToolbar from './ProductToolbar'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination'

export default function ProductSection({ categoryName, title, subtitle, products = [], toolbarProps, paginationProps, onProductClick, fallbackImage }) {
  return (
    <section className="product-section" aria-labelledby="catalog-title">
      <ProductToolbar categoryName={categoryName} title={title} subtitle={subtitle} {...toolbarProps} />
      <ProductGrid products={products} onProductClick={onProductClick} fallbackImage={fallbackImage} />
      <Pagination {...paginationProps} />
    </section>
  )
}
