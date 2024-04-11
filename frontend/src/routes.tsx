import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Layout from "./Layouts/Layout";
import Error from "./pages/Error";
import AdminLayout from "./Layouts/AdminLayout";
import Analytics from "./pages/admin/Analytics";
import Signin from "./pages/auth/Signin";
import AuthLayout from "./Layouts/AuthLayout";
import Signup from "./pages/auth/Signup";
import NewProduct from "./pages/admin/NewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Signin /> },
      { path: "register", element: <Signup /> },
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
