import { useEffect, useState } from "react";
import ProductDetailPage from "./ProductDetailPage";
import { useNavigate, useParams } from "react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductDetailPageContainer() {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const loadProduct = async () => {
      setIsLoading(true);
      setError("");
      setNotFound(false);
      setProduct(null);
      setQuantity("1");
      setRelatedProducts([]);

      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error("API không trả về sản phẩm");
        }

        const productData = result.data;

        const imageUrl = productData.image_url
          ? new URL(productData.image_url, API_BASE_URL).href
          : null;

        const productWithImageUrl = {
          ...productData,
          image_url: imageUrl,
        };

        setProduct(productWithImageUrl);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error("Lỗi tải sản phẩm:", loadError);
          setError("Không tải được sản phẩm. Vui lòng thử lại.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      controller.abort();
    };
  }, [productId]);
  useEffect(() => {
    if (!product) {
      return;
    }

    const controller = new AbortController();

    const loadRelatedProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error("API sản phẩm không trả về một mảng");
        }

        const productsInSameCategory = result.data.filter((otherProduct) => {
          const isSameCategory =
            String(otherProduct.category_id) === String(product.category_id);

          const isDifferentProduct =
            String(otherProduct.id) !== String(product.id);

          const isActive = otherProduct.status === "ACTIVE";

          return isSameCategory && isDifferentProduct && isActive;
        });

        const relatedProductOptions = productsInSameCategory
          .slice(0, 5)
          .map((relatedProduct) => {
            const imageUrl = relatedProduct.image_url
              ? new URL(relatedProduct.image_url, API_BASE_URL).href
              : null;

            return {
              ...relatedProduct,
              image_url: imageUrl,
            };
          });

        setRelatedProducts(relatedProductOptions);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error("Lỗi tải sản phẩm liên quan:", loadError);
        }
      }
    };

    loadRelatedProducts();

    return () => {
      controller.abort();
    };
  }, [product]);

  const handleRelatedProductClick = (selectedProduct) => {
    navigate(`/products/${selectedProduct.id}`);
  };

  let availableStock = 0;

  if (product) {
    availableStock = Number(product.stock);
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleQuantityBlur = () => {
    const enteredQuantity = Number(quantity);

    if (!Number.isInteger(enteredQuantity) || enteredQuantity < 1) {
      setQuantity("1");
      return;
    }

    if (enteredQuantity > availableStock) {
      setQuantity(String(availableStock));
      return;
    }

    setQuantity(String(enteredQuantity));
  };

  const handleDecreaseQuantity = () => {
    const currentQuantity = Number(quantity);

    if (!Number.isInteger(currentQuantity) || currentQuantity <= 1) {
      setQuantity("1");
      return;
    }

    setQuantity(String(Math.min(currentQuantity - 1, availableStock)));
  };

  const handleIncreaseQuantity = () => {
    let currentQuantity = Number(quantity);

    if (!Number.isInteger(currentQuantity) || currentQuantity < 1) {
      currentQuantity = 0;
    }

    if (currentQuantity >= availableStock) {
      setQuantity(String(availableStock));
      return;
    }

    setQuantity(String(currentQuantity + 1));
  };
  const breadcrumbItems = product
    ? [
        { id: "home", label: "Trang chủ" },
        {
          id: String(product.category_id),
          label: product.category_name || "Danh mục",
        },
        { id: String(product.id), label: product.name },
      ]
    : [];

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
      breadcrumbItems={breadcrumbItems}
      isLoading={isLoading}
      error={error}
      notFound={notFound}
      onRelatedProductClick={handleRelatedProductClick}
      quantity={quantity}
      quantityDisabled={availableStock < 1}
      decreaseDisabled={quantity <= 1}
      increaseDisabled={quantity >= availableStock}
      purchaseDisabled={true}
      onDecreaseQuantity={handleDecreaseQuantity}
      onIncreaseQuantity={handleIncreaseQuantity}
      onQuantityChange={handleQuantityChange}
      onQuantityBlur={handleQuantityBlur}
    />
  );
}
