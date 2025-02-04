import Register from "@/pages/Register/Register.tsx";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/register")({
  component: () => (
    <>
      <Register />
    </>
  ),
});
