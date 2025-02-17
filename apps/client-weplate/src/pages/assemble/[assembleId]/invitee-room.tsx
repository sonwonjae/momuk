import type { CustomIncomingMessage } from "@/middlewares/type";
import type { ServerResponse } from "http";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { createRouter } from "next-connect";

import { makeGetServerSideProps } from "@/middlewares/common/makeGetServerSideProps";
import Head from "@/pages-src/assemble/[assembleId]/invitee-room/head";
import Layout from "@/pages-src/assemble/[assembleId]/invitee-room/layout";
import middleware from "@/pages-src/assemble/[assembleId]/invitee-room/middleware";
import { Button } from "@/shad-cn/components/ui/button";
import { RQClient } from "@/utils/react-query";
import { cn } from "@/utils/tailwind";

const router = createRouter<CustomIncomingMessage, ServerResponse>();
router.get(middleware);

export const getServerSideProps = makeGetServerSideProps(router);

function AssembleInviteeRoomPage() {
  const router = useRouter();
  const assembleQuery = new RQClient({
    url: `/api/assemble/${router.query.assembleId}/item`,
  });
  const { data: assemble } = useQuery(assembleQuery.queryOptions);

  /** FIXME: 기획 상 풀방인 경우는 어떻게 할지 논의 필요 */
  const checkJoinableQuery = new RQClient({
    url: `/api/assemble/${router.query.assembleId}/check/full`,
  });
  const { data: checkJoinable } = useQuery(checkJoinableQuery.queryOptions);
  const { joinable = true } = checkJoinable || {};

  const requestJoin = () => {
    router.replace(`/api/assemble/${router.query.assembleId}/request/join`);
  };

  return (
    <section
      className={cn(
        "pt-32",
        "px-5",
        "flex",
        "flex-col",
        "gap-8",
        "justify-center",
        "items-center",
      )}
    >
      <Image
        width={110}
        height={128}
        src="/plate_chief_smile.svg"
        alt="chief"
      />
      <div
        className={cn(
          "flex",
          "flex-col",
          "gap-6",
          "justify-center",
          "items-center",
        )}
      >
        <h4 className={cn("font-bold")}>
          <span className={cn("text-primary")}>
            {assemble?.ownerInfo?.nickname}
          </span>
          님이 초대합니다.
        </h4>
        <h2 className={cn("font-bold", "text-xl")}>{assemble?.title}</h2>
        <p
          className={cn(
            "text-sm",
            "text-slate-500",
            "break-keep",
            "text-center",
          )}
        >
          초대를 수락하고 모임을 계획해보세요! 취향에 맞는 메뉴 추천으로 더욱
          즐거운 시간을 만들어 드립니다.
        </p>
      </div>

      <Button
        size="lg"
        round
        disabled={!joinable}
        className={cn("w-full")}
        onClick={requestJoin}
      >
        초대 수락하기
      </Button>
    </section>
  );
}

AssembleInviteeRoomPage.Head = Head;
AssembleInviteeRoomPage.Layout = Layout;

export default AssembleInviteeRoomPage;
