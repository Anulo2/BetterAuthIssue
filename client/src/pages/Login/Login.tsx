import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { authClient } from "@/shared/auth";

function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: session, isPending, error } = authClient.useSession();

  // Redirect if already logged in
  if (session && !isPending) {
    toast({
      title: "You're already logged in",
    });
    navigate({ to: "/dashboard" });
  }

  // 1. Define the form schema with Zod
  const loginSchema = z.object({
    email: z.string().email({ message: "Must be a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

  // 2. Use React Hook Form with zodResolver
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Define the submit handler
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;

    // Perform the login request
    await authClient.signIn.email(
      { email, password },
      {
        onRequest: () => {
          // Optional: show some loading state, if needed
          console.log("Attempting to log in...");
        },
        onSuccess: (ctx) => {
          // Login successful. Redirect or do any other needed actions
          console.log("Login successful:", ctx);
          toast({
            title: "Login successful",
          });
          navigate({ to: "/dashboard" });
        },
        onError: (ctx) => {
          // Show toast with error
          toast({
            variant: "destructive",
            title: "Error while logging in",
            description: ctx.error?.message || "Invalid credentials",
          });
        },
      },
    );
  }

  // 4. Markup
  return (
    <Card className="  w-full flex px-4 max-w-2xl py-4 flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-primary">Log in to your account</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-base">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input className=" " placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-base">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button className="mt-4" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="px-0">
        <div className="flex gap-2">
          <div className=" ">Need an account?</div>
          <Link to="/register" className="underline">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Login;
