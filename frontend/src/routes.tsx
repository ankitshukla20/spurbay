import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./Layouts/AdminLayout";
import AuthLayout from "./Layouts/AuthLayout";
import Layout from "./Layouts/Layout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Analytics from "./pages/admin/Analytics";
import NewProduct from "./pages/admin/NewProduct";
import AdminSignin from "./pages/auth/AdminSignin";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
    ],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Signin /> },
      { path: "register", element: <Signup /> },
      { path: "admin", element: <AdminSignin /> },
    ],
  },
  {
    path: "/admin/",
    element: <AdminLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Analytics /> },
      { path: "new-product", element: <NewProduct /> },
    ],
  },
]);

export default router;
