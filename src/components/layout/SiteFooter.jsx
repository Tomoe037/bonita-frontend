export default function SiteFooter({ brandName = 'BONITA SHOP', description, contactLines = [], groups = [], copyright, onLinkClick }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section className="footer-intro">
          <h2>{brandName}</h2><p>{description}</p>
          <ul>{contactLines.map((line) => <li key={line}>{line}</li>)}</ul>
          <span className="footer-signoff">Một chút đáng yêu, mỗi ngày.</span>
        </section>
        {groups.map((group) => (
          <section key={group.id}>
            <h2>{group.title}</h2>
            <ul>{group.links.map((link) => <li key={link.id}><button type="button" onClick={() => onLinkClick?.(link)}>{link.label}</button></li>)}</ul>
            {group.description && <p className="footer-note">{group.description}</p>}
          </section>
        ))}
      </div>
      <div className="footer-bottom"><div className="container"><span>{copyright}</span><span>Made for your little collection ♡</span></div></div>
    </footer>
  )
}
