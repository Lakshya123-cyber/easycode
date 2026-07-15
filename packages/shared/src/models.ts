export type ModelPricing = {
  inputUsdPerMillionTokens: number;
  outputUsdPerMillionTokens: number;
};

export type SupportedProvider = "openrouter";

type SupportedChatModelDefinition = {
  id: string;
  provider: SupportedProvider;
  pricing?: ModelPricing;
};

export const SUPPORTED_CHAT_MODELS = [
  {
    id: "openrouter/free",
    provider: "openrouter",
  },
  {
    id: "google/gemini-2.5-pro",
    provider: "openrouter",
  },
  {
    id: "google/gemini-2.5-flash:free",
    provider: "openrouter",
  },
  {
    id: "deepseek/deepseek-chat-v3:free",
    provider: "openrouter",
  },
  {
    id: "qwen/qwen3-coder:free",
    provider: "openrouter",
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    provider: "openrouter",
  },
] as const satisfies readonly SupportedChatModelDefinition[];

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
export type SupportedChatModelId = SupportedChatModel["id"];

export function findSupportedChatModel(modelId: string) {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId);
}

export const DEFAULT_CHAT_MODEL_ID: SupportedChatModelId = "openrouter/free";
