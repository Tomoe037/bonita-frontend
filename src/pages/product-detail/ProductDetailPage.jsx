import Breadcrumb from "../../components/common/Breadcrumb";
import ProductGrid from "../../components/catalog/ProductGrid";
import Icon from "../../components/common/Icon";
import defaultFallback from "../../assets/product-placeholder.svg";
import "./ProductDetailPage.css";

const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

// Accept numeric API strings for display without treating missing values as zero.
const hasNumber = (value) =>
  (typeof value === "number" ||
    (typeof value === "string" && value.trim() !== "")) &&
  Number.isFinite(Number(value)) &&
  Number(value) >= 0;

export default function ProductDetailPage({
  product,
  relatedProducts = [],
  breadcrumbItems,
  isLoading = false,
  error = null,
  notFound = false,
  quantityDisabled = false,
  decreaseDisabled = false,
  increaseDisabled = false,
  purchaseDisabled = false,
  fallbackImage = defaultFallback,
  onBreadcrumbSelect,
  onQuantityChange,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onBuyNow,
  onAddToCart,
  onRelatedProductClick,
  onRetry,
  onBack,
  quantity,
  onQuantityBlur,
}) {
  const unavailable = notFound || !product;
  const breadcrumbs = breadcrumbItems ?? [
    { id: "home", label: "Trang chủ" },
    {
      id: "product-detail",
      label:
        !isLoading && !error && !unavailable && product.name
          ? product.name
          : "Chi tiết sản phẩm",
    },
  ];

  let content;

  if (isLoading) {
    content = (
      <section className="detail-state" role="status" aria-live="polite">
        <span className="detail-state-mark" aria-hidden="true">
          <Icon name="bag" />
        </span>
        <h1>Đang tải sản phẩm</h1>
        <p>Vui lòng chờ trong giây lát.</p>
      </section>
    );
  } else if (error) {
    content = (
      <section className="detail-state" role="alert">
        <h1>Không thể tải sản phẩm</h1>
        <p>{error}</p>
        <div className="detail-state-actions">
          {onRetry && (
            <button
              className="detail-button detail-button-primary"
              type="button"
              onClick={onRetry}
            >
              Thử lại
            </button>
          )}
          {onBack && (
            <button
              className="detail-button detail-button-secondary"
              type="button"
              onClick={onBack}
            >
              Quay lại
            </button>
          )}
        </div>
      </section>
    );
  } else if (unavailable) {
    content = (
      <section className="detail-state" role="status">
        <span className="detail-state-mark" aria-hidden="true">
          <Icon name="search" />
        </span>
        <h1>Không tìm thấy sản phẩm</h1>
        <p>Sản phẩm bạn đang tìm hiện không có thông tin để hiển thị.</p>
        {onBack && (
          <button
            className="detail-button detail-button-secondary"
            type="button"
            onClick={onBack}
          >
            Quay lại
          </button>
        )}
      </section>
    );
  } else {
    const hasPrice = hasNumber(product.price);
    const hasOriginalPrice =
      hasPrice &&
      hasNumber(product.original_price) &&
      Number(product.original_price) > Number(product.price);
    const hasStock = hasNumber(product.stock);
    const hasDescription =
      typeof product.description === "string" &&
      product.description.trim() !== "";

    content = (
      <>
        <article
          className="detail-product"
          aria-labelledby={product.name ? "detail-product-title" : undefined}
        >
          <div className="detail-image">
            <img
              src={product.image_url || fallbackImage}
              alt={product.image_alt || product.name || "Hình ảnh sản phẩm"}
              width="800"
              height="800"
              onError={(event) => {
                const image = event.currentTarget;
                if (image.getAttribute("src") !== fallbackImage)
                  image.src = fallbackImage;
              }}
            />
          </div>

          <div className="detail-info">
            {product.name && <h1 id="detail-product-title">{product.name}</h1>}

            {hasStock && (
              <p
                className={`detail-stock${Number(product.stock) === 0 ? " detail-stock-empty" : ""}`}
              >
                <span className="detail-stock-dot" aria-hidden="true" />
                Tình trạng:{" "}
                <strong>
                  {Number(product.stock) > 0 ? "Còn hàng" : "Hết hàng"}
                </strong>
              </p>
            )}

            {hasPrice && (
              <div className="detail-price" aria-label="Giá sản phẩm">
                <span className="detail-current-price">
                  {currency.format(Number(product.price))}
                </span>
                {hasOriginalPrice && (
                  <del aria-label="Giá gốc">
                    {currency.format(Number(product.original_price))}
                  </del>
                )}
              </div>
            )}

            <div className="detail-purchase">
              <label
                className="detail-quantity-label"
                htmlFor="detail-quantity"
              >
                Số lượng
              </label>
              <div className="detail-quantity">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  disabled={
                    quantityDisabled || decreaseDisabled || !onDecreaseQuantity
                  }
                  onClick={onDecreaseQuantity}
                >
                  −
                </button>
                <input
                  id="detail-quantity"
                  type="text"
                  inputMode="numeric"
                  value={quantity}
                  readOnly={!onQuantityChange}
                  disabled={quantityDisabled}
                  onChange={onQuantityChange}
                  onBlur={onQuantityBlur}
                />
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  disabled={
                    quantityDisabled || increaseDisabled || !onIncreaseQuantity
                  }
                  onClick={onIncreaseQuantity}
                >
                  +
                </button>
              </div>
              <div className="detail-purchase-actions">
                <button
                  className="detail-button detail-button-primary"
                  type="button"
                  disabled={purchaseDisabled || !onBuyNow}
                  onClick={() => onBuyNow?.(product, quantity)}
                >
                  Mua ngay
                </button>
                <button
                  className="detail-button detail-button-secondary"
                  type="button"
                  disabled={purchaseDisabled || !onAddToCart}
                  onClick={() => onAddToCart?.(product, quantity)}
                >
                  <Icon name="bag" />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>

          {hasDescription && (
            <section
              className="detail-description"
              aria-labelledby="detail-description-title"
            >
              <h2 id="detail-description-title">Mô tả sản phẩm</h2>
              <p>{product.description}</p>
            </section>
          )}
        </article>

        {relatedProducts.length > 0 && (
          <section
            className="detail-related"
            aria-labelledby="detail-related-title"
          >
            <h2 id="detail-related-title">Sản phẩm liên quan</h2>
            <ProductGrid
              products={relatedProducts}
              onProductClick={onRelatedProductClick}
              fallbackImage={fallbackImage}
            />
          </section>
        )}
      </>
    );
  }

  return (
    <div className="container product-detail-page">
      <Breadcrumb items={breadcrumbs} onSelect={onBreadcrumbSelect} />
      {content}
    </div>
  );
}
