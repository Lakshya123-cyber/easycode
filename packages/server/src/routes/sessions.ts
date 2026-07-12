import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { findSupportedChatModel } from "@easycode/shared";

type MockMessage = {
  id: string;
  role: string;
  content: string;
  mode: string;
  model: string;
  status: string;
  parts: null;
  duration: null;
  createdAt: string;
  sessionId: string;
};

type MockSession = {
  id: string;
  title: string;
  cwd: string | null;
  userId: string;
  createdAt: string;
  messages: MockMessage[];
};

const sessions: MockSession[] = [];
let nextId = 1;

const createSessionSchema = z.object({
  title: z.string(),
  cwd: z.string().optional(),
  initialMessage: z
    .object({
      role: z.string(),
      content: z.string(),
      mode: z.string(),
      model: z
        .string()
        .refine((id) => !!findSupportedChatModel(id), "Unsupported model"),
    })
    .optional(),
});

const createSessionValidator = zValidator(
  "json",
  createSessionSchema,
  (result, c) => {
    if (!result.success) {
      return c.json({ error: "Invalid request body" }, 400);
    }
  },
);

const app = new Hono()
  .get("/", (c) => {
    const result = sessions.map(({ id, title, createdAt }) => ({
      id,
      title,
      createdAt,
    }));
    return c.json(result);
  })
  .get("/:id", async (c) => {
    // MOCK
    // await new Promise((r) => setTimeout(r, 5000))

    // MOCK
    // throw new HTTPException(500, {message: "Mock error: session.loading failed"})

    const id = c.req.param("id");
    const session = sessions.find((s) => s.id === id);

    if (!session) {
      return c.json({ error: "Session not found" }, 404);
    }

    return c.json(session);
  })
  .post("/", createSessionValidator, async (c) => {
    // MOCK
    // await new Promise((r) => setTimeout(r, 5000))

    // MOCK
    // throw new HTTPException(500, {message: "Mock error: session.loading failed"})

    const { initialMessage, ...data } = c.req.valid("json");
  });

//   3.56.54
