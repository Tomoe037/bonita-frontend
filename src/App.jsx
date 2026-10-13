
import { Route, Routes } from "react-router";
import SiteLayout from "./components/layout/SiteLayout";
import CategoryPageContainer from "./pages/category/CategoryPageContainer";
import { siteDemo } from "./data/catalogDemo";
import "./App.css";
import ProductDetailPageContainer from "./pages/product-detail/ProductDetailPageContainer";

export default function App() {
  return (
   <SiteLayout {...siteDemo}>
      <Routes>
        <Route path="/" element={<CategoryPageContainer />} />

        <Route
          path="/products/:id"
           element={<ProductDetailPageContainer />}
        />
      </Routes>
    </SiteLayout>
  );
}
