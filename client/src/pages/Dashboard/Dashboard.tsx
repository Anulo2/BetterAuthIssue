import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "@/shared/auth";

function Dashboard() {
  const navigate = useNavigate();
  const { data: session, isPending, error } = authClient.useSession();

  const { toast } = useToast();
  if (!session && !isPending) {
    toast({
      title: "You're not logged in",
    });
    navigate({ to: "/login" });
  }
  if (isPending) {
    return <>Loading...</>;
  }

  return <>Welcome {JSON.stringify(session)}</>;
}

export default Dashboard;
