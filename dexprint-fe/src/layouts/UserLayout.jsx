import { Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/main/navbar";
import { WAButton } from "../shared/WAButton";
import { Footer } from "../components/main/landingpage/Footer";

export function UserLayout() {
  return (
    <>
      <div className="max-w-full">
        <Navbar />
        <div className="mt-[5em] ">
          <Outlet />
        </div>
        <WAButton />
        <Footer />
      </div>
    </>
  );
}
