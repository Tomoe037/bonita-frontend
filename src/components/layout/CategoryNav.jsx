import Icon from '../common/Icon'

export default function CategoryNav({ items = [], activeId, onSelect }) {
  return (
    <nav className="category-nav" aria-label="Danh mục chính">
      <ul className="container nav-list">{items.map((item) => (
        <li key={item.id}><button type="button" className={activeId === item.id ? 'is-active' : ''} aria-current={activeId === item.id ? 'page' : undefined} onClick={() => onSelect?.(item)}>
          {item.label}{item.hasChildren && <Icon name="chevron" className="chevron-down" />}
        </button></li>
      ))}</ul>
    </nav>
  )
}
