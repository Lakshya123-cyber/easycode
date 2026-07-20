export type ModelPricing = {
  inputUsdPerMillionTokens: number;
  outputUsdPerMillionTokens: number;
};

export type SupportedProvider = "openrouter";

type SupportedChatModelDefinition = {
  id: string;
  provider: SupportedProvider;
  pricing: ModelPricing;
};

export const SUPPORTED_CHAT_MODELS = [
  {
    id: "openrouter/free",
    provider: "openrouter",
    pricing: {
      inputUsdPerMillionTokens: 0,
      outputUsdPerMillionTokens: 0,
    },
  },
  {
    id: "google/gemini-2.5-pro",
    provider: "openrouter",
    pricing: {
      inputUsdPerMillionTokens: 1.25,
      outputUsdPerMillionTokens: 10,
    },
  },
  {
    id: "google/gemini-2.5-flash",
    provider: "openrouter",
    pricing: {
      inputUsdPerMillionTokens: 0.3,
      outputUsdPerMillionTokens: 2.5,
    },
  },
  {
    id: "deepseek/deepseek-chat-v3",
    provider: "openrouter",
    pricing: {
      inputUsdPerMillionTokens: 0.27,
      outputUsdPerMillionTokens: 1.1,
    },
  },
  {
    id: "qwen/qwen3-coder",
    provider: "openrouter",
    pricing: {
      inputUsdPerMillionTokens: 0.3,
      outputUsdPerMillionTokens: 1.2,
    },
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    provider: "openrouter",
    pricing: {
      inputUsdPerMillionTokens: 0.72,
      outputUsdPerMillionTokens: 0.72,
    },
  },
] as const satisfies readonly SupportedChatModelDefinition[];

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
export type SupportedChatModelId = SupportedChatModel["id"];

export function findSupportedChatModel(modelId: string) {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId);
}

export const DEFAULT_CHAT_MODEL_ID: SupportedChatModelId = "openrouter/free";
