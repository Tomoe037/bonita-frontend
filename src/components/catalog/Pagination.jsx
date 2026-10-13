import Icon from '../common/Icon'

export default function Pagination({ currentPage = 1, totalPages = 1, pages = [1], onPageChange }) {
  if (totalPages < 1) return null
  return (
    <nav className="pagination" aria-label="Phân trang sản phẩm">
      <button type="button" aria-label="Trang trước" disabled={currentPage <= 1} onClick={() => onPageChange?.(currentPage - 1)}><Icon name="chevron" className="chevron-left" /></button>
      {pages.map((page, index) => typeof page === 'number'
        ? <button key={page} type="button" className={page === currentPage ? 'is-active' : ''} aria-label={`Trang ${page}`} aria-current={page === currentPage ? 'page' : undefined} onClick={() => onPageChange?.(page)}>{page}</button>
        : <span key={`gap-${index}`} className="pagination-gap">…</span>)}
      <button type="button" aria-label="Trang sau" disabled={currentPage >= totalPages} onClick={() => onPageChange?.(currentPage + 1)}><Icon name="chevron" /></button>
    </nav>
  )
}
