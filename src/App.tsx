import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { MainContent } from "./components/MainContent";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />

        <div className="rounded flex w-full justify_between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
