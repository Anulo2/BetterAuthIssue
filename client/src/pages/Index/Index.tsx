import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "@/shared/auth";

function Index() {
  const navigate = useNavigate();
  const { data: session, isPending, error } = authClient.useSession();

  const { toast } = useToast();
  if (session && !isPending) {
    toast({
      title: "You're already logged in",
    });
    navigate({ to: "/dashboard" });
  } else if (!isPending) {
    navigate({ to: "/login" });
  }

  return <>Loading...</>;
}

export default Index;
