export default function CatalogLayout({ sidebar, children }) {
  return <div className="catalog-layout">{sidebar}<div className="catalog-content">{children}</div></div>
}
