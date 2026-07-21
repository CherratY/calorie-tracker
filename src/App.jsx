import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Diary from "./views/Diary";
import Progress from "./views/Progress";
import Settings from "./views/Settings";

import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <NavBar />
    </div>
  );
}