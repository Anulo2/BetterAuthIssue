import Index from "@/pages/Index/Index.tsx";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <>
      <Index />
    </>
  ),
});
