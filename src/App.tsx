import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { MainContent } from "./components/MainContent";
import { ProductPage } from "./components/ProductPage";
import { TopSeller } from "./components/TopSeller";
import { PopularBlog } from "./components/PopularBlog";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />

        <div className="rounded flex w-full justify_between flex-wrap">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  {/* Main content bên trái */}
                  <div className="flex-1">
                    <MainContent />
                  </div>

                  {/* Phần phụ bên phải */}
                  <div className="w-full">
                    <TopSeller />
                    <PopularBlog />
                  </div>
                </div>
              }
            />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
