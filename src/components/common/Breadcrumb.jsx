import Icon from './Icon'

export default function Breadcrumb({ items = [], onSelect }) {
  return (
    <nav className="breadcrumb" aria-label="Đường dẫn trang">
      <ol>{items.map((item, index) => (
        <li key={item.id}>
          {index > 0 && <Icon name="chevron" />}
          {index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <button type="button" onClick={() => onSelect?.(item)}>{item.label}</button>}
        </li>
      ))}</ol>
    </nav>
  )
}
