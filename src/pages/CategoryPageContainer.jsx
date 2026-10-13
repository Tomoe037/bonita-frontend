import { useEffect, useState } from "react";
import CategoryPage from "./CategoryPage";
import { catalogDemo } from "../data/catalogDemo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CategoryPageContainer() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedPriceId, setSelectedPriceId] = useState("all");

  const handlePriceChange = (priceId) => {
    setSelectedPriceId(priceId);
  };

  const handleResetFilters = () => {
    setSelectedCategoryIds([]);
    setSelectedPriceId("all");
  };

  const handleCategoryChange = (categoryId) => {
    const isSelected = selectedCategoryIds.includes(categoryId);

    if (isSelected) {
      const nextIds = selectedCategoryIds.filter((selectedId) => {
        return selectedId !== categoryId;
      });

      setSelectedCategoryIds(nextIds);
    } else {
      const nextIds = [...selectedCategoryIds, categoryId];
      setSelectedCategoryIds(nextIds);
    }
  };
  const filterProps = {
    ...catalogDemo.filterProps,
    categories: categories,
    selectedCategoryIds: selectedCategoryIds,
    onCategoryChange: handleCategoryChange,
    onPriceChange: handlePriceChange,
    onReset: handleResetFilters,
  };

  let filteredProducts = products;

  if (selectedCategoryIds.length > 0) {
    filteredProducts = products.filter((product) => {
      return selectedCategoryIds.includes(String(product.category_id));
    });
  }
  const productCount = filteredProducts.length;

  const toolbarProps = {
    ...catalogDemo.productSectionProps.toolbarProps,
    resultStart: productCount > 0 ? 1 : 0,
    resultEnd: productCount,
    total: productCount,
  };
  const productSectionProps = {
    ...catalogDemo.productSectionProps,
    products: filteredProducts,
    toolbarProps: toolbarProps,
  };

  const pageProps = {
    ...catalogDemo,
    filterProps: filterProps,
    productSectionProps: productSectionProps,
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        const categoryOptions = result.data.map((category) => ({
          id: String(category.id),
          label: category.name,
        }));
        setCategories(categoryOptions);
        // console.log("Danh mục từ backend:", result);
      } catch (error) {
        console.error("Lỗi tải danh mục:", error);
      }
    };

    loadCategories();

    const loadProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const result = await response.json();
        if (!Array.isArray(result.data)) {
          throw new Error("API sản phẩm không trả về một mảng");
        }
        // console.log("SP từ backend:", result);
        setProducts(result.data);
      } catch (error) {
        console.error("Lỗi tải sp:", error);
      }
    };
    loadProducts();
  }, []);

  console.log("Products trong state:", products);
  return <CategoryPage {...pageProps} />;
}
