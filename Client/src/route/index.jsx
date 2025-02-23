import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VarifyForgotPasswordOtp from "../pages/VarifyForgotPasswordOtp";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrderPage from "../pages/MyOrderPage";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import AdminProduct from "../pages/AdminProduct";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPages from "../pages/ProductDisplayPages";
import MobileCart from "../pages/MobileCart";
import CheckOutPage from "../pages/CheckOutPage";
import Success from "../components/Success";
import Cancle from "../components/Cancle";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/search",
                element: <SearchPage />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "/verification-otp",
                element: <VarifyForgotPasswordOtp />
            },
            {
                path: "/reset-password",
                element: <ResetPassword />
            },
            {
                path: "/user",
                element: <UserMenuMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "myorders",
                        element: <MyOrderPage />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "category",
                        element: <AdminPermision> <CategoryPage /> </AdminPermision>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermision><SubCategoryPage /></AdminPermision>
                    },
                    {
                        path: "admin-product",
                        element: <AdminPermision> <AdminProduct /></AdminPermision>
                    },
                    {
                        path: "upload-product",
                        element: <AdminPermision><UploadProduct /></AdminPermision>
                    }
                ]
            },
            {
                path: ":category",
                children: [
                    {
                        path: ":subCategory",
                        element: <ProductListPage />
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPages/>
            },
            {
                path : "cart",
                element : <MobileCart/>
            },
            {
                path : "checkout",
                element : <CheckOutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : "cancel",
                element : <Cancle/>
            }
        ]
    }
])

export default router;