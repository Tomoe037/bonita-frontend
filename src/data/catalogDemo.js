import mintFigure from '../assets/products/mint-figure.svg'
import bunnyFigure from '../assets/products/bunny-figure.svg'
import catFigure from '../assets/products/cat-figure.svg'
import spaceFigure from '../assets/products/space-figure.svg'

// Presentation fixtures only; no API data or application behavior.
export const siteDemo = {
  headerProps: { brandName: 'BONITA SHOP', cartCount: 0 },
  navProps: {
    activeId: 'figures',
    items: [
      { id: 'figures', label: 'Mô hình', hasChildren: true },
      { id: 'mini', label: 'Mô hình mini', hasChildren: true },
      { id: 'cards', label: 'Pack Card' },
      { id: 'blind-box', label: 'Blind Box' },
      { id: 'accessories', label: 'Phụ kiện khác' },
      { id: 'preorder', label: 'Mô hình đặt trước', hasChildren: true },
      { id: 'contact', label: 'Liên hệ' },
      { id: 'news', label: 'Tin tức' },
    ],
  },
  footerProps: {
    brandName: 'BONITA SHOP',
    description: 'Góc nhỏ dành cho những bộ sưu tập và niềm vui của bạn. Khám phá thế giới mô hình cùng BONITA.',
    contactLines: [], // Add verified BONITA contact details here.
    copyright: '© 2026 BONITA SHOP. All rights reserved.',
    groups: [
      { id: 'support', title: 'Hỗ trợ đơn hàng', links: [
        { id: 'contact', label: 'Liên hệ hỗ trợ' },
        { id: 'tracking', label: 'Tra cứu đơn hàng' },
        { id: 'payment-guide', label: 'Hướng dẫn thanh toán' },
        { id: 'shopping-guide', label: 'Hướng dẫn mua hàng' },
      ] },
      { id: 'policies', title: 'Chính sách bán hàng', links: [
        { id: 'returns', label: 'Chính sách đổi trả' },
        { id: 'privacy', label: 'Chính sách bảo mật' },
        { id: 'payment', label: 'Chính sách thanh toán' },
        { id: 'inspection', label: 'Chính sách kiểm hàng' },
        { id: 'shipping', label: 'Chính sách giao hàng' },
      ] },
      { id: 'community', title: 'Cùng BONITA SHOP', links: [
        { id: 'membership', label: 'Chương trình thành viên' },
        { id: 'collection', label: 'Cảm hứng sưu tầm' },
        { id: 'careers', label: 'Trở thành đồng đội' },
      ], description: 'Kết nối những người yêu những điều nhỏ xinh.' },
    ],
  },
}

const demoProducts = [
  { id: 'mint-day', name: 'Mô hình Mint Girl — Ngày xanh dịu dàng', category: 'Mô hình', price: 500000, image_url: mintFigure, badge: 'Mới' },
  { id: 'bunny-cloud', name: 'Mô hình Cloud Bunny — Thỏ mây mộng mơ', category: 'Mô hình mini', price: 350000, image_url: bunnyFigure },
  { id: 'peach-cat', name: 'Mô hình Peach Cat — Mèo nhỏ mùa xuân', category: 'Blind Box', price: 280000, original_price: 320000, image_url: catFigure },
  { id: 'space-dream', name: 'Mô hình Little Astronaut — Giấc mơ vũ trụ', category: 'Mô hình đặt trước', price: 650000, image_url: spaceFigure, badge: 'Đặt trước' },
  { id: 'bunny-sweet', name: 'Mô hình Cloud Bunny — Sweet Dreams', category: 'Blind Box', price: 280000, image_url: bunnyFigure, badge: 'Mới' },
  { id: 'mint-garden', name: 'Mô hình Mint Girl — Khu vườn nhỏ', category: 'Mô hình đặt trước', price: 550000, image_url: mintFigure, badge: 'Đặt trước' },
  { id: 'space-mini', name: 'Mô hình Little Astronaut — Mini Space', category: 'Mô hình mini', price: 390000, image_url: spaceFigure },
  { id: 'cat-sunny', name: 'Mô hình Peach Cat — Một ngày đầy nắng', category: 'Mô hình', price: 450000, image_url: catFigure },
]

export const catalogDemo = {
  breadcrumbItems: [{ id: 'home', label: 'Trang chủ' }, { id: 'figures', label: 'Mô hình' }],
  filterProps: {
    categories: [
      { id: 'figures', label: 'Mô hình' },
      { id: 'mini', label: 'Mô hình mini' },
      { id: 'blind-box', label: 'Blind Box' },
      { id: 'preorder', label: 'Mô hình đặt trước' },
    ],
    priceRanges: [
      { id: 'all', label: 'Tất cả mức giá' },
      { id: 'under-300', label: 'Dưới 300.000 ₫', min: 0, max: 300000 },
      { id: '300-500', label: '300.000 ₫ – 500.000 ₫', min: 300000, max: 500000 },
      { id: '500-1000', label: '500.000 ₫ – 1.000.000 ₫', min: 500000, max: 1000000 },
      { id: 'over-1000', label: 'Trên 1.000.000 ₫', min: 1000000 },
    ],
    selectedCategoryIds: [],
    selectedPriceId: 'all',
  },
  productSectionProps: {
    title: 'Tất cả sản phẩm',
    subtitle: 'Thêm một người bạn nhỏ vào bộ sưu tập của bạn.',
    products: demoProducts,
    toolbarProps: {
      resultStart: demoProducts.length > 0 ? 1 : 0,
      resultEnd: demoProducts.length,
      total: demoProducts.length,
      sortValue: 'default',
      sortOptions: [
        { value: 'default', label: 'Thứ tự mặc định' },
        { value: 'newest', label: 'Mới nhất' },
        { value: 'price-asc', label: 'Giá: thấp đến cao' },
        { value: 'price-desc', label: 'Giá: cao đến thấp' },
      ],
    },
    paginationProps: { currentPage: 1, totalPages: 1, pages: [1] },
  },
}
