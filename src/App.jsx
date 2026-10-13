import SiteLayout from "./components/layout/SiteLayout";
import CategoryPageContainer from "./pages/CategoryPageContainer";
import { siteDemo } from "./data/catalogDemo";
import "./App.css";

export default function App() {
  return (
    <SiteLayout {...siteDemo}>
      <CategoryPageContainer />
    </SiteLayout>
  );
}
