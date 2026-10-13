import Breadcrumb from '../components/common/Breadcrumb'
import CatalogLayout from '../components/catalog/CatalogLayout'
import FilterSidebar from '../components/catalog/FilterSidebar'
import ProductSection from '../components/catalog/ProductSection'

export default function CategoryPage({ breadcrumbItems, onBreadcrumbSelect, filterProps, productSectionProps }) {
  return (
    <div className="container category-page">
      <Breadcrumb items={breadcrumbItems} onSelect={onBreadcrumbSelect} />
      <CatalogLayout sidebar={<FilterSidebar {...filterProps} />}>
        <ProductSection {...productSectionProps} />
      </CatalogLayout>
    </div>
  )
}
