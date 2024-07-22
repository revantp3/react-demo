import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./styles/app.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
