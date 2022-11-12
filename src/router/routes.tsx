import { Routes, Route } from "react-router-dom"
import { RootLayout } from "../components/root-layout/RootLayout"
import { Home } from "../pages/home"
import { Listing } from "../pages/listings/listing/Listing"
import { Listings } from "../pages/listings/Listings"
import { Login } from "../pages/login/Login"
import { SignUp } from "../pages/sign-up/SignUp"
import { SelfProfile } from "../pages/user-profile/self/SelfProfile"

export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/listings">
          <Route index element={<Listings />} />
          <Route path=":id" element={<Listing />} />
        </Route>
        <Route path="/users">
          <Route index element={<SelfProfile />} path=':username' />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}
