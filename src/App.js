import { HashRouter as Router } from "react-router-dom";
import { RouterView } from "./router/routerView";
import "./App.css";

export default function App() {
  return (
    <Router>
      <RouterView />
    </Router>
  );
}
