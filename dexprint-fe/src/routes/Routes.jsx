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
  path: "/",
  component: UserLayout,
});

// ADMIN
const dashboardAdmin = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin",
  component: Dashboard,
});

const routeTree = rootRoute.addChildren([
  adminLayout.addChildren([dashboardAdmin]),
  userLayout,
  loginPage,
]);
export const router = createRouter({
  routeTree,
  context: { store },
});
