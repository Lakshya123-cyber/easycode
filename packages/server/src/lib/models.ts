import { createOpenRouter } from "@openrouter/ai-sdk-provider";

import {
  findSupportedChatModel,
  type SupportedChatModel,
  type SupportedChatModelId,
  type SupportedProvider,
} from "@easycode/shared";

import type { LanguageModel } from "ai";

export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export type ResolvedModel = {
  model: LanguageModel;
  provider: SupportedProvider;
  modelId: SupportedChatModelId;
};

function resolveSupportedChatModel(model: SupportedChatModel): ResolvedModel {
  return {
    model: openrouter.chat(model.id),
    provider: "openrouter",
    modelId: model.id,
  };
}

export function isSupportedChatModel(
  modelId: string,
): modelId is SupportedChatModelId {
  return findSupportedChatModel(modelId) != null;
}

export function resolveChatModel(modelId: string): ResolvedModel {
  const model = findSupportedChatModel(modelId);

  if (!model) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  return resolveSupportedChatModel(model);
}
