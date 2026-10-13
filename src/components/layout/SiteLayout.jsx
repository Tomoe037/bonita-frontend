import SiteHeader from './SiteHeader'
import CategoryNav from './CategoryNav'
import SiteFooter from './SiteFooter'

export default function SiteLayout({ children, headerProps, navProps, footerProps }) {
  return (
    <div className="site-layout">
      <a className="skip-link" href="#main-content">Đến nội dung chính</a>
      <SiteHeader {...headerProps} />
      <CategoryNav {...navProps} />
      <main id="main-content" className="site-main" tabIndex={-1}>{children}</main>
      <SiteFooter {...footerProps} />
    </div>
  )
}
