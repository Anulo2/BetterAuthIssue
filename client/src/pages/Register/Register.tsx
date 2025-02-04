import { useEffect, useMemo, useState } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "@tanstack/react-router";

import { jwtDecode } from "jwt-decode";
import { app } from "@/shared/app";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { authClient } from "@/shared/auth";

function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: session, isPending, error } = authClient.useSession();

  // Redirect if already logged in
  if (session && !isPending) {
    toast({
      title: "You're already logged in.",
    });
    navigate({ to: "/dashboard" });
  }

  const formSchema = z
    .object({
      name: z.string({}).min(2, {
        message: "At least 2 chars",
      }),

      email: z.string().email({
        message: "Must be a valid email address",
      }),
      password: z
        .string()
        .min(8, {
          message: "Password must be at least 8 characters long",
        })
        .regex(
          // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
          new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          ),

          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        ),
      confirmPassword: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    console.log(formData);
    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
      {
        onRequest: () => {
          //show loading
          console.log("loading");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          console.log(ctx);
          toast({
            title: "Registered successfully",
          });
          navigate({ to: "/dashboard" });
        },
        onError: (ctx) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: ctx.error.message,
          });
        },
      },
    );
    console.log(data);
    console.log(error);
  }

  return (
    <Card className="  w-full flex px-4 max-w-2xl py-4 flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-primary ">
          Register to your account
        </CardTitle>
        <CardDescription>Register with your data </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            className="flex flex-col "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-base">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-base">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-base">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-base">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />
            <Button className="mt-4" type="submit">
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Register;
