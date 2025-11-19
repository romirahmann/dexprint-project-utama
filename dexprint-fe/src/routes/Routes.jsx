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
  path: "portofolio/detail",
  component: PortofolioDetailPage,
});
const productsPage = createRoute({
  getParentRoute: () => userLayout,
  path: "products",
  component: ProductPage,
});
const contactPage = createRoute({
  getParentRoute: () => userLayout,
  path: "contact",
  component: ContactPage,
});

// ADMIN
const dashboardAdmin = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin",
  component: Dashboard,
});
const userManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "/users",
  component: UserManagementPage,
});
const profilManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "/profile",
  component: ProfileInfoPage,
});
const categoryManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "/products/categories",
  component: CategoryManagementPage,
});
const contentManagement = createRoute({
  getParentRoute: () => adminLayout,
  path: "/content",
  component: ContentPage,
});

const routeTree = rootRoute.addChildren([
  adminLayout.addChildren([
    dashboardAdmin,
    profilManagement,
    contentManagement,
    categoryManagement,
  ]),
  userLayout.addChildren([
    landingPage,
    portofolioDetail,
    productsPage,
    portofolioPage,
    contactPage,
    userManagement,
  ]),
  loginPage,
]);
export const router = createRouter({
  routeTree,
  context: { store },
});
