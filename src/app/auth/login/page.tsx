'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogIn, Rocket } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";


const loginSchema = z.object({
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // Simulate API call
    toast({
      title: "Login Submitted (Mock)",
      description: "In a real app, this would log you in!",
      variant: "default",
    });
    // For now, we'll just log it and show a toast.
    // Potentially redirect or update auth state here.
  };


  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-border/60">
         <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="text-center">
              <Rocket className="mx-auto h-12 w-12 text-accent mb-3" />
              <CardTitle className="text-2xl font-bold text-primary">Welcome Back to CodeLeap!</CardTitle>
              <CardDescription>Log in to continue your coding journey.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                       <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs text-accent">
                         <Link href="#">Forgot password?</Link>
                       </Button>
                    </div>
                    <FormControl>
                      <Input id="password" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <LogIn className="mr-2 h-4 w-4" /> Log In
              </Button>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button variant="link" asChild className="p-0 h-auto text-accent">
                  <Link href="/auth/register">Sign up here</Link>
                </Button>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
