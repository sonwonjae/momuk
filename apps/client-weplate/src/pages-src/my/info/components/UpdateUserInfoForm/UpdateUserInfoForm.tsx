import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shad-cn/components/ui/form";
import { RQClient } from "@/utils/react-query";
import { cn } from "@/utils/tailwind";

import { useUpdatableUserInfoStore } from "../../stores/updatable-user-info";

import { BAD_WORD_LIST } from "./UpdateUserInfoForm.constants";
import UserInfoFormSubmitButton from "./UserInfoFormSubmitButton";

export const userInfoForm = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2글자 이상 입력해주세요.")
    .max(8, "닉네임은 최대 8글자 이하 입력해주세요.")
    .refine((value) => {
      return !BAD_WORD_LIST.some((badWord) => {
        return value.includes(badWord);
      });
    }, "부적절한 어휘가 포함되어 있습니다."),
});

function UpdateUserInfoForm() {
  const router = useRouter();
  const authQuery = new RQClient({ url: "/api/user/auth/check" });
  const { data: userInfo } = useQuery(authQuery.queryOptions);

  const form = useForm<z.infer<typeof userInfoForm>>({
    resolver: zodResolver(userInfoForm),
    defaultValues: {
      nickname: userInfo?.nickname ?? "",
    },
  });

  const isUpdatable = useUpdatableUserInfoStore((state) => {
    return state.isUpdatable;
  });

  useEffect(() => {
    form.reset();
  }, [router.pathname]);

  return (
    <section className={cn("w-full", "py-4", "px-5", "bg-background")}>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name={"nickname"}
            render={({ field }) => {
              return (
                <FormItem>
                  <UserInfoFormSubmitButton />
                  <FormLabel className={cn("text-sm")}>닉네임</FormLabel>
                  <FormControl>
                    <FormInput
                      disabled={!isUpdatable}
                      type="text"
                      placeholder="닉네임은여덟글자"
                      counter={!!isUpdatable}
                      maxLength={8}
                      className={cn(
                        isUpdatable && "border-primary",
                        "border-2",
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </section>
  );
}

export default UpdateUserInfoForm;
