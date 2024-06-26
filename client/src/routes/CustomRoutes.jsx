import { Route, Routes } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function CustomRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
