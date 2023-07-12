import { HashRouter as Router } from "react-router-dom";
import { RouterView } from "./router/routerView";
import "./App.css";

export default function App() {
  localStorage.setItem("token", "111111111111");

  return (
    <Router>
      <RouterView />
    </Router>
  );
}
