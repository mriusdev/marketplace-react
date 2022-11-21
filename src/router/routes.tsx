import { Routes, Route } from "react-router-dom"
import { AuthVerify } from "../auth/AuthVerify"
import { ProtectedRoute } from "../auth/ProtectedRoute"
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
      {/* TODO: refactor this to only be on actual auth related pages */}
      <Route element={<AuthVerify />}>
        <Route element={<RootLayout />} >
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/listings">
            <Route index element={<Listings />} />
            <Route path=":id" element={<Listing />} />
          </Route>

          {/* 
          private for now, but refactor to be public in the future with
          different permission features ( logged in vs not shows different options ) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/users">
              <Route index element={<SelfProfile />} path=':username' />
            </Route>
          </Route>

        </Route>

        {/* public, but dont show these for logged in users or leave it as */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}
