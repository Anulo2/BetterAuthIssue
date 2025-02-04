import Dashboard from "@/pages/Dashboard/Dashboard.tsx";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard")({
  component: () => (
    <>
      <Dashboard />
    </>
  ),
});
