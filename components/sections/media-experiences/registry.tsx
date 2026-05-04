"use client";

import { ContactIntakeConsoleExperience } from "@/components/sections/media-experiences/contact-intake-console";
import { CountsLaneAtlasExperience } from "@/components/sections/media-experiences/counts-lane-atlas";
import { CustomProgramFlowComposerExperience } from "@/components/sections/media-experiences/custom-program-flow-composer";
import { DetailCountsStackdeckExperience } from "@/components/sections/media-experiences/detail-counts-stackdeck";
import { DetailStudiesLensLabExperience } from "@/components/sections/media-experiences/detail-studies-lens-lab";
import { DetailSurveysRibbonTrackExperience } from "@/components/sections/media-experiences/detail-surveys-ribbon-track";
import { StudiesEvidenceObservatoryExperience } from "@/components/sections/media-experiences/studies-evidence-observatory";
import { SurveysDecisionMatrixExperience } from "@/components/sections/media-experiences/surveys-decision-matrix";
import type { MediaExperienceProps } from "@/lib/types";

export function MediaExperienceRegistry(props: MediaExperienceProps) {
  const { experienceKind } = props.experienceConfig;

  if (experienceKind === "counts_lane_atlas") {
    return <CountsLaneAtlasExperience {...props} />;
  }

  if (experienceKind === "surveys_decision_matrix") {
    return <SurveysDecisionMatrixExperience {...props} />;
  }

  if (experienceKind === "studies_evidence_observatory") {
    return <StudiesEvidenceObservatoryExperience {...props} />;
  }

  if (experienceKind === "detail_counts_stackdeck") {
    return <DetailCountsStackdeckExperience {...props} />;
  }

  if (experienceKind === "detail_surveys_ribbon_track") {
    return <DetailSurveysRibbonTrackExperience {...props} />;
  }

  if (experienceKind === "detail_studies_lens_lab") {
    return <DetailStudiesLensLabExperience {...props} />;
  }

  if (experienceKind === "custom_program_flow_composer") {
    return <CustomProgramFlowComposerExperience {...props} />;
  }

  return <ContactIntakeConsoleExperience {...props} />;
}
