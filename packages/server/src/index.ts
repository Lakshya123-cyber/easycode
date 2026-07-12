import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json(
      {
        error: error.message || "Request failed",
      },
      error.status,
    );
  }

  console.error("Unhandled server error", error);
  return c.json({ error: "Internal server error" }, 500);
});

// idleTimeout should be high otherwise LLM toolcalls might not complete
export default { port: 3000, fetch: app.fetch, idleTimeout: 255 };
