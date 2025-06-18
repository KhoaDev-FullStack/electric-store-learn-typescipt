import { BrowserRouter as Router } from "react-router-dom";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />
      </div>
    </Router>
  );
}

export default App;
