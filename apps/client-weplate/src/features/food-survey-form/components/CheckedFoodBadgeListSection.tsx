import { XIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";

import { foodSurveyForm } from "@/features/food-survey-form/scheme";
import { useFoodSurveyStepsStore } from "@/features/food-survey-form/stores/food-survey-steps";
import { useSearchFoodStore } from "@/features/food-survey-form/stores/search-food";
import { Badge } from "@/shad-cn/components/ui/badge";
import { cn } from "@/utils/tailwind";

function CheckedFoodBadgeListSection() {
  const form = useFormContext<z.infer<typeof foodSurveyForm>>();

  const searchActiveState = useSearchFoodStore((state) => {
    return state.searchActiveState();
  });
  const currentStep = useFoodSurveyStepsStore((state) => {
    return state.currentStep();
  });

  const { list = [] } =
    useWatch<z.infer<typeof foodSurveyForm>>()?.[currentStep] || {};

  if (searchActiveState === "in") {
    return;
  }

  if (!list?.length) {
    const exampleBadgeText = (() => {
      switch (currentStep) {
        case "favorite":
          return "ex. 페퍼로니 피자";
        case "hate":
          return "ex. 꼼장어구이";
      }
    })();

    return (
      <section
        className={cn(
          "pb-4",
          "px-5",
          "flex",
          "w-full",
          "flex-col",
          "gap-2",
          "z-20",
          "bg-background",
          "overflow-auto",
        )}
      >
        <ul className={cn("inline-flex", "gap-1", "flex-wrap")}>
          <Badge outline color="secondary">
            <span>{exampleBadgeText}</span>
            <XIcon size={16} />
          </Badge>
        </ul>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "pb-4",
        "px-5",
        "flex",
        "w-full",
        "flex-col",
        "gap-2",
        "z-20",
        "bg-background",
        "overflow-auto",
      )}
    >
      <ul className={cn("inline-flex", "gap-1", "flex-wrap")}>
        {list.map(({ id: foodId, name: foodName }) => {
          return (
            <Badge
              key={foodId}
              outline
              onClick={() => {
                const filteredList = form
                  .getValues(`${currentStep}.list`)
                  .filter((food) => {
                    return food.id !== foodId;
                  });

                form.setValue(`${currentStep}.list`, filteredList);
              }}
            >
              <span>{foodName}</span>
              <XIcon size={16} />
            </Badge>
          );
        })}
      </ul>
    </section>
  );
}

export default CheckedFoodBadgeListSection;
