import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import router from "./router.ts";
import database from "./db.ts";

const env = config();
console.log(env);

const app = new Application();
const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 8000;

app.use(oakCors());
app.use(router.routes());

router.get("/", (ctx) => {
  ctx.response.body = database;
});

app.use((ctx) => {
  ctx.response.body = "Hellllllooooooo";
});

console.log(`server started at ${HOST}:${PORT}`);
await app.listen({ port: PORT });
