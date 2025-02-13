import type { CustomIncomingMessage } from "@/middlewares/type";
import type { ServerResponse } from "http";

import { useQueryClient } from "@tanstack/react-query";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useRouter } from "next/router";
import { createRouter } from "next-connect";

import { makeGetServerSideProps } from "@/middlewares/common/makeGetServerSideProps";
import { Profile } from "@/pages-src/my/info/components";
import { UpdateUserInfoForm } from "@/pages-src/my/info/components";
import Layout from "@/pages-src/my/info/layout";
import middleware from "@/pages-src/my/info/middleware";
import { Button } from "@/shad-cn/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/shad-cn/components/ui/dialog";
import { ConnectRequestNewFoodGoogleForm } from "@/ui/connect-external-link/google-form";
import { authAxios } from "@/utils/react-query";
import { cn } from "@/utils/tailwind";

const router = createRouter<CustomIncomingMessage, ServerResponse>();
router.get(middleware);

export const getServerSideProps = makeGetServerSideProps(router);

const titleVariants = cva(
  cn(
    "border-b",
    "border-l-slate-200",
    "w-full",
    "py-2",
    "px-5",
    "font-bold",
    "bg-slate-50",
    "text-slate-600",
    "text-sm",
  ),
);
const itemVariants = cva(
  cn(
    "block",
    "w-full",
    "border-b",
    "border-l-slate-200",
    "w-full",
    "py-4",
    "px-5",
    "text-left",
  ),
);

function MyInfo() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <>
      <ConnectRequestNewFoodGoogleForm />
      <Profile />
      <UpdateUserInfoForm />
      <section className={cn("w-full", "bg-background")}>
        <ul className={cn("pt-10", "pb-32")}>
          <li className={cn(titleVariants())}>음식 추가</li>
          <li>
            <Link
              href="http://bit.ly/3VQOABC"
              target="_blank"
              className={cn(itemVariants())}
            >
              새로운 음식 제안
            </Link>
          </li>

          <li className={cn(titleVariants())}>고객 지원</li>
          <li>
            <Link
              href="https://bit.ly/4hbv8HX"
              target="_blank"
              className={cn(itemVariants())}
            >
              버그 및 오류 신고
            </Link>
          </li>
          <li>
            <Link
              href="https://bit.ly/4jafrm8"
              target="_blank"
              className={cn(itemVariants())}
            >
              문의하기
            </Link>
          </li>

          <li className={cn(titleVariants())}>서비스 약관</li>
          <li className={cn(itemVariants())}>개인정보처리방침</li>
          <li className={cn(itemVariants())}>이용약관</li>
          <li>
            <Link
              href="/opensource-lincense"
              target="_blank"
              className={cn(itemVariants())}
            >
              오픈소스 라이선스
            </Link>
          </li>

          <li className={cn(titleVariants())}>계정 설정</li>
          <li>
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className={cn(itemVariants())}>
                  로그아웃
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>로그아웃 하시겠어요?</DialogDescription>
                </DialogHeader>
                <DialogFooter className={cn("flex-row")}>
                  <DialogClose asChild>
                    <Button type="button" outline className={cn("w-full")}>
                      취소
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    className={cn("w-full")}
                    onClick={async () => {
                      await authAxios.get("/api/user/auth/logout");
                      queryClient.removeQueries();
                      router.replace(
                        `/login?redirectUrl=${window.location.pathname}`,
                      );
                    }}
                  >
                    로그아웃
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
          <li>
            <Link href="/my/quit" className={cn(itemVariants())}>
              회원탈퇴
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

MyInfo.Layout = Layout;

export default MyInfo;
