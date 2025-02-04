import Login from "@/pages/Login/Login.tsx";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: () => (
    <>
      <Login />
    </>
  ),
});
