'use client';

import {
  Card, CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { doLogin, LoginState } from "@/lib/api/login";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {

  const [ state, formAction, isPending ] = useActionState(doLogin, {
    success: null,
  } as LoginState);
  const [ now, setNow ] = useState(() => Date.now());
  const [ cooldown, setCooldown ] = useState(0);
  console.log(cooldown);
  console.log(state);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setCooldown((v) => v - 1)
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 拦截原生提交
    if (isPending || cooldown > 0) return;

    const formData = new FormData(event.currentTarget);

    // ⚡ 关键：点击即刻执行
    setCooldown(5); // 1. 立即开始 5 秒禁用
    startTransition(() => {
      formAction(formData); // 2. 发起 Server Action 请求
    });

    // 清除 Password 字段
    const passwordInput = event.currentTarget.querySelector(
      'input[type="password"]',
    ) as HTMLInputElement | null;
    if (passwordInput) {
      passwordInput.value = "";
    }
  };

  const isDisabled = isPending || (cooldown > 0);
  const buttonText = isDisabled
    ? (<span><Spinner /> Please wait</span>)
    : "Login";


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            { state.success === false &&
              <CardDescription className="text-red-600 mt-2">
                {state.message || 'Login failed, please try again.'}
              </CardDescription>
            }
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="user-login-email">E-mail</FieldLabel>
                  <Input
                    id="user-login-email"
                    name="username"
                    placeholder="user@doman.local"
                    required
                  ></Input>
                  <FieldLabel htmlFor="user-login-password">Password</FieldLabel>
                  <Input
                    id="user-login-password"
                    name="password"
                    type="password"
                    placeholder="Your password"
                    required
                  ></Input>
                </Field>
              </FieldGroup>
              <Field>
                <Button type="submit" className="w-full" disabled={isDisabled}>
                  {isDisabled ? (
                    <>
                    <Spinner /> Please wait
                    </>
                    ) : "Login" }
                </Button>
              </Field>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
