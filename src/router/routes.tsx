import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/home"
import { Listings } from "../pages/listings"

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listings" element={<Listings />} />
    </Routes>
  )
}

