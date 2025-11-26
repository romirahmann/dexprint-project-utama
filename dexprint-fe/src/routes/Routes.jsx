/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserLayout } from "../layouts/UserLayout";
import { store } from "../store";
import { Dashboard } from "../pages/main/admin/Dashboard";
import { LoginPage } from "../pages/auth/LoginPage";
import { LandingPage } from "../pages/main/users/LandingPage";
import { PortofolioDetailPage } from "../pages/main/users/PortofolioDetail";
import { ProductPage } from "../pages/main/users/ProductPage";
import { PortfolioPage } from "../pages/main/users/PortofolioPage";
import ContactPage from "../pages/main/users/ContactPage";
import { UserManagementPage } from "../pages/main/admin/UserManagementPage";
import { ProfileInfoPage } from "../pages/main/admin/ProfilePage";
import { ContentPage } from "../pages/main/admin/ContentPage";
import { CategoryManagementPage } from "../pages/main/admin/products/categories";
import { MaterialManagementPage } from "../pages/main/admin/products/Materials";
import { ProductPageManagement } from "../pages/main/admin/products/ProductPage";
import { ProductDetailManagement } from "../pages/main/admin/products/ProductDetailManagement";
import { PortofolioManagement } from "../pages/main/admin/PortofolioMangement";
import { PortoDetailManagement } from "../pages/main/admin/portofolio/PortoDetailPage";
import { UserProductDetail } from "../pages/main/users/user-product/DetailUserProduct";

const rootRoute = createRootRoute({});

const adminLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
  beforeLoad: ({ context }) => {
    const { store } = context;
    const state = store.getState();

    if (!state.auth.isAuthenticated) {
      console.warn("UNAUTHORIZED! Redirecting to login...");
      throw redirect({
        to: "/auth/login",
      });
    }
  },
});

const loginPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: LoginPage,
});

// USER LAYOUT
const userLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "user-layout",
  component: UserLayout,
});
const landingPage = createRoute({
  getParentRoute: () => userLayout,
  path: "/",
  component: LandingPage,
});
const portofolioPage = createRoute({
  getParentRoute: () => userLayout,
  path: "portofolio",
  component: PortfolioPage,
});
const portofolioDetail = createRoute({
  getParentRoute: () => userLayout,
  path: "portofolio/detail/$portofolioId",
  component: PortofolioDetailPage,
});
const productsPage = createRoute({
  getParentRoute: () => userLayout,
  path: "products",
  component: ProductPage,
});
const productDetailPage = createRoute({
  getParentRoute: () => userLayout,
  path: "products/$productId/detail",
  component: UserProductDetail,
});
const contactPage = createRoute({
  getParentRoute: () => userLayout,
  path: "contact",
  component: ContactPage,
});

// ADMIN
const dashboardAdmin = createRoute({
  getParentRoute: () => adminLayout,
  path: "dashboad",
  component: Dashboard,
});
const userManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "users",
  component: UserManagementPage,
});
const profilManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "profile",
  component: ProfileInfoPage,
});
const portofolioManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "portofolio",
  component: PortofolioManagement,
});
const productsManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "products",
  component: ProductPageManagement,
});
const productDetailManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "products/detail/$productId",
  component: ProductDetailManagement,
});
const portofolioDetailManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "portofolio/detail/$portofolioId/management",
  component: PortoDetailManagement,
});
const categoryManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "products/categories",
  component: CategoryManagementPage,
});
const materialManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "products/materials",
  component: MaterialManagementPage,
});
const contentManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "content",
  component: ContentPage,
});

const routeTree = rootRoute.addChildren([
  adminLayout.addChildren([
    dashboardAdmin,
    profilManagement,
    contentManagement,
    categoryManagement,
    userManagement,
    materialManagement,
    productsManagement,
    productDetailManagement,
    portofolioManagement,
    portofolioDetailManagement,
  ]),
  userLayout.addChildren([
    landingPage,
    portofolioDetail,
    productsPage,
    portofolioPage,
    contactPage,
    productDetailPage,
  ]),
  loginPage,
]);
export const router = createRouter({
  routeTree,
  context: { store },
});
