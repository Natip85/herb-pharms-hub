"use client";
import * as z from "zod";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/validations";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { register } from "@/actions/auth/register";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth/login";

type UserVariant = "LOGIN" | "REGISTER";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [variant, setVariant] = useState<UserVariant>("LOGIN");
  const [isPending, startTransition] = useTransition();

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof LoginSchema>) {
    if (variant === "LOGIN") {
      startTransition(() => {
        login(data)
          .then((data) => {
            if (data.error) {
              toast({
                title: "Error",
                description: `${data.error}`,
                variant: "destructive",
              });
              router.refresh();
            } else {
              toast({
                title: "Success",
                description: `${data.success}`,
                variant: "success",
              });
              setVariant("LOGIN");
              router.refresh();
            }
          })
          .catch(() => console.log("Something went wrong at login"));
      });
    } else {
      startTransition(() => {
        register(data).then((data) => {
          if (data.error) {
            toast({
              title: "Error",
              description: `${data.error}`,
              variant: "destructive",
            });
            router.push("/add-business");
            router.refresh();
          }
          if (data.success) {
            toast({
              title: "Success",
              description: `${data.success}`,
              variant: "success",
            });
            setVariant("LOGIN");
            form.reset();
            router.refresh();
          }
        });
      });
    }
  }
  return (
    <>
      <DialogTitle className="text-2xl md:text-3xl">
        {variant === "LOGIN" ? (
          <>
            <span className="text-[#1AB266]">HerbPharmsHub</span> login
          </>
        ) : (
          <>
            <span className="text-[#1AB266]">HerbPharmsHub</span> register
          </>
        )}
      </DialogTitle>
      <DialogDescription>
        {variant === "LOGIN"
          ? "Log in to your account below"
          : "Register your account to start advertising your business"}
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input id="email" {...field} />
                </FormControl>
                <FormDescription>Please provide a valid email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input id="password" {...field} type="password" />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              disabled={isPending}
              className="flex items-center gap-2 w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Submiting
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div>
        {variant === "LOGIN" ? (
          <span className="flex items-center gap-2">
            Don&apos;t have an account?{" "}
            <span
              onClick={toggleVariant}
              className="text-[#1AB266] cursor-pointer"
            >
              Create account
            </span>
            <ArrowRight size={16} className="text-[#1AB266]" />
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Already have an account?{" "}
            <span
              onClick={toggleVariant}
              className="text-[#1AB266] cursor-pointer"
            >
              Log in
            </span>
            <ArrowRight size={16} className="text-[#1AB266]" />
          </span>
        )}
      </div>
    </>
  );
}
