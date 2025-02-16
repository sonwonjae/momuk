import type { CustomIncomingMessage } from "@/middlewares/type";
import type { ServerResponse } from "http";

import Image from "next/image";
import { createRouter } from "next-connect";

import { makeGetServerSideProps } from "@/middlewares/common/makeGetServerSideProps";
import Layout from "@/pages-src/my/quit/complete/layout";
import middleware from "@/pages-src/my/quit/complete/middleware";
import { cn } from "@/utils/tailwind";

const router = createRouter<CustomIncomingMessage, ServerResponse>();
router.get(middleware);

export const getServerSideProps = makeGetServerSideProps(router);

function QuitComplete() {
  return (
    <>
      <section
        className={cn(
          "w-full",
          "bg-background",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "gap-8",
          "h-full",
          "py-2",
          "px-5",
          "bg-background",
        )}
      >
        <Image
          width={90}
          height={104}
          src="/plate_chief_smile.svg"
          alt="chief"
        />
        <div
          className={cn(
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "text-gray-600",
            "text-center",
            "break-keep",
          )}
        >
          <b>회원탈퇴가 완료되었습니다.</b>
          <p>
            지금까지 저희 서비스를 이용해 주셔서
            <br />
            진심으로 감사드립니다.
            <br />
            언제든 다시 찾아주시면 따뜻하게 환영하겠습니다. 😊
          </p>
        </div>
        <div
          className={cn(
            "w-full",
            "flex",
            "flex-col",
            "gap-4",
            "items-center",
            "bg-gray-100",
            "rounded-xl",
            "max-w-96",
            "p-5",
          )}
        >
          <h4 className={cn("text-primary", "font-bold")}>오늘의 메뉴 추천</h4>
          <p className={cn("w-full", "bg-white", "py-3", "px-5", "rounded-xl")}>
            🍚 든든한 집밥 한 끼, 어때요?
          </p>
        </div>
      </section>
    </>
  );
}

QuitComplete.Layout = Layout;

export default QuitComplete;
