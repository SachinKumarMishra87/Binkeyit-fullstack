
export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "post"
    },
    login: {
        url: "/api/user/login",
        method: "post"
    },
    forgotPassword: {
        url: "/api/user/forgot-password",
        method: "put"
    },
    varifyForgotPasswordOtp: {
        url: "/api/user/verify-forgot-password-otp",
        method: "put"
    },
    resetPassword: {
        url: "/api/user/reset-password",
        method: "put"
    },
    refreshToken: {
        url: "/api/user/refresh-token",
        method: "post"

    },
    userDetails: {
        url: "/api/user/user-details",
        method: "get"
    },
    logout: {
        url: "/api/user/logout",
        method: "get"
    },
    uploadAvtar: {
        url: "/api/user/upload-avtar",
        method: "put"
    },
    updateUsersDetails: {
        url: "/api/user/update-user",
        method: "put"
    },
    addCategory: {
        url: "/api/category/add-category",
        method: "post"
    },
    uploadImage: {
        url: "/api/file/upload",
        method: "post"
    },
    getAllCategory: {
        url: "/api/category/get",
        method: "get"
    },
    updateCategory: {
        url: "/api/category/update",
        method: "put"
    },
    deleteCategory: {
        url: "/api/category/delete",
        method: "delete"
    },
    createSubCategory: {
        url: "/api/subcategory/create",
        method: "post"
    },
    getSubcategory: {
        url: "/api/subcategory/get",
        method: "post"
    },
    updateSubCategory: {
        url: "/api/subcategory/update",
        method: "put"
    },
    deleteSubCategory: {
        url: "/api/subcategory/delete",
        method: "delete"
    },
    createProduct: {
        url: "/api/product/create",
        method: "post"
    },
    getProduct: {
        url: "/api/product/get",
        method: "post"
    },
    getProductByCategories: {
        url: "/api/product/get-product-by-category",
        method: "post"
    },
    getProductByCategoryAndSubcategory: {
        url: "/api/product/get-product-by-category-and-subcategory",
        method: "post"
    },
    getProductDetails: {
        url: "/api/product/get-product-details",
        method: "post"
    },
    updateProductDetails: {
        url: "/api/product/update-product-details",
        method: "put"
    },
    deleteProductDetails: {
        url: "/api/product/delete-product-details",
        method: "delete"

    },
    searchProduct: {
        url: "/api/product/search-product",
        method: "post"
    },
    addToCart: {
        url: "/api/cart/create",
        method: "post"
    },
    getCartItem: {
        url: "/api/cart/get",
        method: "get"
    },
    updateCartItemQty: {
        url: "/api/cart/update-qty",
        method: "put"
    },
    deleteCartItem: {
        url: "/api/cart/delete-cart-item",
        method: "delete"
    },
    createAddress: {
        url: "/api/address/create",
        method: "post"
    },
    getAddress: {
        url: "/api/address/get",
        method: "get"
    },
    updateAddress: {
        url: "/api/address/update",
        method: "put"
    },
    deleteAddress: {
        url: "/api/address/delete",
        method: "delete"
    },
    cashOnDeliveryOrder: {
        url: "/api/order/cash-on-delivery",
        method: "post"
    },
    payment_url: {
        url: "/api/order/checkout",
        method: "post"
    },
    getOrderItems: {
        url: "/api/order/get-order-list",
        method: "get"
    }
}

export default SummaryApi;