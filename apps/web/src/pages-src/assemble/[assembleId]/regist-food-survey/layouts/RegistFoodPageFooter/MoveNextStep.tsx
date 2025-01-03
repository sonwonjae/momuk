import { useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shad-cn/components/ui/button";
import { cn } from "@/utils/tailwind";

import { foodSurveyForm } from "../../layout";
import { useRegistFoodStore } from "../../stores/regist-foods";
import { useRegistStepsStore } from "../../stores/regist-foods-steps";

function MoveNextStep() {
  const isLastStep = useRegistStepsStore((state) => {
    return state.isLastStep();
  });
  const currentStep = useRegistStepsStore((state) => {
    return state.currentStep();
  });
  const moveNextStep = useRegistStepsStore((state) => {
    return state.moveNextStep;
  });
  const { preList = [], list = [] } =
    useWatch<z.infer<typeof foodSurveyForm>>()?.[currentStep] || {};

  const searchActiveState = useRegistFoodStore((state) => {
    return state.searchActiveState();
  });
  const isReadyMoveToNextStep =
    !isLastStep && !!list.length && searchActiveState === "out";

  if (!isReadyMoveToNextStep) {
    return null;
  }

  return (
    <Button
      size="lg"
      round
      className={cn("w-full")}
      disabled={!isReadyMoveToNextStep && !preList.length}
      onClick={moveNextStep}
    >
      선호 음식 등록 완료
    </Button>
  );
}

export default MoveNextStep;