import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import Palette from "@/components/Palette";
function RootComponent() {
  const location = useLocation();

  return (
    <>
      <Toaster />
      <div className="w-screen  mx-auto h-screen bg-background items-center flex flex-col justify-center py-2">
        <Outlet />
      </div>
    </>
  );
}
