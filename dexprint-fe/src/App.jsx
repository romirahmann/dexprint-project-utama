import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/Routes";
import { AlertProvider } from "./store/AlertContext";
import { useEffect } from "react";
import { connectSocket } from "./services/socket.service";

function App() {
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </>
  );
}

export default App;
