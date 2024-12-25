import type { CustomIncomingMessage } from "@/middlewares/type";
import type { ServerResponse } from "http";

import { createRouter } from "next-connect";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { makeGetServerSideProps } from "@/middlewares/common/makeGetServerSideProps";
import {
  FavoriteDescriptionSection,
  StepSection,
  SearchSection,
  FoodListSection,
  CheckedFoodBadgeListSection,
} from "@/pages-src/assemble/[assembleId]/regist-food/components";
import Layout, {
  foodSurveyForm,
} from "@/pages-src/assemble/[assembleId]/regist-food/layout";
import middleware from "@/pages-src/assemble/[assembleId]/regist-food/middleware";
import { useFavoriteFoodStore } from "@/pages-src/assemble/[assembleId]/regist-food/stores/favorite-food";
import { cn } from "@/utils/tailwind";

const router = createRouter<CustomIncomingMessage, ServerResponse>();
router.get(middleware);

export const getServerSideProps = makeGetServerSideProps(router);

function AssembleRegistFoodPage() {
  const search = useFavoriteFoodStore((state) => {
    return state.search;
  });

  const form = useFormContext<z.infer<typeof foodSurveyForm>>();
  const onSubmit = ({ favorite }: z.infer<typeof foodSurveyForm>) => {
    search(favorite);
  };

  return (
    <form
      className={cn("flex", "flex-col", "h-full")}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <StepSection />
      <FavoriteDescriptionSection />
      <SearchSection />
      <CheckedFoodBadgeListSection />

      <FoodListSection />
    </form>
  );
}

AssembleRegistFoodPage.Layout = Layout;

export default AssembleRegistFoodPage;