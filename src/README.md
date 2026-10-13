# Giao diện danh mục BONITA SHOP

Chạy `npm run dev` trong thư mục `frontend`, mở URL Vite in trong terminal. `App` hiển thị trực tiếp `CategoryPage` trong `SiteLayout`; chưa sử dụng React Router.

## Cấu trúc

```text
App
└── SiteLayout
    ├── SiteHeader
    ├── CategoryNav
    ├── children: CategoryPage
    │   ├── Breadcrumb
    │   └── CatalogLayout
    │       ├── sidebar: FilterSidebar
    │       └── children: ProductSection
    │           ├── ProductToolbar
    │           ├── ProductGrid
    │           │   └── ProductCard
    │           └── Pagination
    └── SiteFooter
```

## Props và hợp đồng callback

Callback tùy chọn. Các hàm nhỏ trong JSX chỉ chuyển tiếp sự kiện/giá trị về callback; không thực hiện lọc, sắp xếp, chuyển trang hay thao tác giỏ hàng.

| Component / file | Props dữ liệu | Callback |
| --- | --- | --- |
| `App.jsx` | Không có; nơi nối dữ liệu và callback của ứng dụng | — |
| `components/layout/SiteLayout.jsx` | `children`, `headerProps`, `navProps`, `footerProps`; 3 object được chuyển tiếp tới component tương ứng | Qua các object props |
| `components/layout/SiteHeader.jsx` | `brandName`, `searchValue?`, `searchPlaceholder`, `cartCount` | `onSearchChange(event)`, `onSearchClick(event)`, `onAccountClick(event)`, `onCartClick(event)`, `onBrandClick(event)` |
| `components/layout/CategoryNav.jsx` | `items: { id, label, hasChildren? }[]`, `activeId`; `hasChildren` chỉ hiển thị mũi tên | `onSelect(item)` |
| `components/layout/SiteFooter.jsx` | `brandName`, `description`, `contactLines: string[]`, `groups: { id, title, links: { id, label }[], description? }[]`, `copyright` | `onLinkClick(link)` |
| `pages/category/CategoryPage.jsx` | `breadcrumbItems`, `filterProps`, `productSectionProps` | `onBreadcrumbSelect(item)`; callback khác truyền trong 2 object props |
| `components/common/Breadcrumb.jsx` | `items: { id, label }[]`; phần tử cuối là trang hiện tại | `onSelect(item)` |
| `components/catalog/CatalogLayout.jsx` | `sidebar: ReactNode`, `children: ReactNode` | — |
| `components/catalog/FilterSidebar.jsx` | `categories: { id, label, count? }[]`, `priceRanges: { id, label, min?, max? }[]`, `selectedCategoryIds: string[]`, `selectedPriceId` | `onCategoryChange(categoryId)`, `onPriceChange(priceId)`, `onReset(event)` |
| `components/catalog/ProductSection.jsx` | `categoryName?`, `title?`, `subtitle?`, `products`, `toolbarProps`, `paginationProps`, `fallbackImage?`; chuyển tiêu đề xuống toolbar | `onProductClick(product)`; callback toolbar/pagination nằm trong object tương ứng |
| `components/catalog/ProductToolbar.jsx` | `categoryName?`, `title?`, `subtitle?`, `resultStart`, `resultEnd`, `total`, `sortOptions: { value, label }[]`, `sortValue`; ưu tiên `categoryName` rồi `title` | `onSortChange(value)` |
| `components/catalog/ProductGrid.jsx` | `products`, `fallbackImage?`, `emptyMessage?` | `onProductClick(product)` |
| `components/catalog/ProductCard.jsx` | `product` theo mẫu dưới, `fallbackImage?` | `onProductClick(product)` |
| `components/catalog/Pagination.jsx` | `currentPage`, `totalPages`, `pages: (number \| string)[]`; chuỗi biểu diễn dấu `…` | `onPageChange(pageNumber)` |
| `components/common/Icon.jsx` | `name: 'search' \| 'user' \| 'bag' \| 'chevron' \| 'filter' \| 'star'`, `className?`; icon trang trí | — |

```js
const product = {
  id: 'product-id',
  name: 'Tên sản phẩm',
  price: 500000, // number, VND
  original_price: 600000, // tùy chọn; chỉ hiện khi lớn hơn price
  image_url: '/path/to/image.jpg', // thiếu hoặc lỗi sẽ dùng ảnh dự phòng
  image_alt: 'Mô tả hình ảnh', // tùy chọn, mặc định dùng name
  category: 'Mô hình', // tùy chọn
  badge: 'Đặt trước', // tùy chọn; cũng có thể là Mới hoặc nhãn khác
}
```

## Chỗ nối logic sau này

1. **`App.jsx`**: thay `siteDemo` và `catalogDemo` bằng dữ liệu thật, state và callback của bạn. Tách container/hook sau nếu cần. Không có fetch, effect hay state trong bản giao diện này.
2. **Tìm kiếm**: truyền `headerProps.searchValue`, đọc `event.target.value` trong `onSearchChange`, xử lý tìm kiếm trong `onSearchClick`. Khi chưa truyền `searchValue`, input vẫn nhập được theo hành vi HTML nhưng không tìm kiếm.
3. **Bộ lọc**: cập nhật `filterProps.selectedCategoryIds` và `selectedPriceId` từ callback; tự lọc danh sách sản phẩm. `min/max` chỉ là metadata mẫu, component không dùng để tính lọc. Bạn xác định quy tắc biên khoảng giá khi nối database.
4. **Sắp xếp**: cập nhật `productSectionProps.toolbarProps.sortValue`, tự sắp xếp `products`. Giá trị select được kiểm soát từ props.
5. **Phân trang**: tính `products`, `resultStart`, `resultEnd`, `total`, `currentPage`, `totalPages` và danh sách `pages` ở bên ngoài. Chỉ truyền các số trang hợp lệ. Component tự vô hiệu hóa nút trước/sau ở biên nhưng không cắt dữ liệu hay đổi trang.
6. **Điều hướng / tài khoản / giỏ hàng**: nối callback của header, nav, breadcrumb, footer và thẻ sản phẩm sau. Các mục hiện là button, không có URL giả hay trang bổ sung.
7. **Footer**: thêm thông tin liên hệ BONITA đã xác minh vào `contactLines`; không có địa chỉ, pháp lý, chứng nhận hoặc số điện thoại giả.
8. **Tiêu đề và số lượng**: demo truyền `productSectionProps.title: 'Tất cả sản phẩm'`, CSS hiển thị `TẤT CẢ SẢN PHẨM`. Tên danh mục đang xem nằm riêng trong `breadcrumbItems`; không truyền `categoryName` vào tiêu đề danh sách. `resultStart`, `resultEnd`, `total` và `categories[].count` đều nhận qua props; danh mục không có `count` sẽ không hiển thị số. Khi không có kết quả, truyền cả ba số toolbar bằng `0`.

## Dữ liệu, ảnh và CSS

- `data/catalogDemo.js`: 8 sản phẩm minh họa trên 1 trang. Số lượng toolbar lấy từ độ dài mảng `demoProducts`, hiển thị `1–8 trong 8 sản phẩm`. Không truyền số đếm danh mục mẫu; thêm `count` khi có dữ liệu chính xác.
- `assets/products/{mint,bunny,cat,space}-figure.svg`: 4 hình SVG minh họa tự tạo, dùng cục bộ; thay `image_url` bằng ảnh sản phẩm thật sau.
- `assets/product-placeholder.svg`: ảnh dự phòng khi thiếu URL hoặc khi ảnh lỗi. `onError` chỉ thay URL sang ảnh dự phòng, có kiểm tra để tránh vòng lặp nếu cả ảnh dự phòng lỗi. Đây là xử lý hiển thị duy nhất ngoài chuyển tiếp callback.
- `index.css`: reset, font hệ thống và biến màu; `App.css`: layout, breadcrumb, lưới/thẻ sản phẩm và responsive dùng chung; `pages/category/CategoryPage.css`: bố cục danh mục, bộ lọc, toolbar và phân trang cùng responsive riêng.
- Desktop từ 960px: sidebar trái và 4 sản phẩm/hàng. Tablet 701–959px: 3 sản phẩm/hàng. Mobile tối đa 700px: bộ lọc mặc định thu gọn bằng `<details>/<summary>`, bấm hoặc dùng bàn phím để mở/đóng; không có React state. CSS giữ nội dung bộ lọc luôn hiện trên desktop. Mobile có lưới 2 cột, menu cuộn ngang; footer 2 cột, xuống 1 cột ở màn hình rất nhỏ.
- Có focus bàn phím, nhãn input, `aria-current`, skip link, trạng thái danh sách rỗng và hỗ trợ giảm chuyển động.

## Kiểm tra

```sh
npm run lint
npm run build
```

Không thêm dependency, React Router, trang khác hoặc thay đổi backend.
