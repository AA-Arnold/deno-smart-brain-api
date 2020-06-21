import { Router } from "https://deno.land/x/oak/mod.ts";
import db from "./database.ts";
// import database from "./db.ts";
const router = new Router();

const users = db.collection("users");

router.post("/signin", async (ctx) => {
  const user = await (await ctx.request.body()).value;
  let email = user.email;
  let password = user.password;
  const credentials = await users.findOne({ email: email, password: password });
  if (credentials) {
    ctx.response.body = credentials;
  } else {
    ctx.response.status = 404;
    ctx.response.body = "error logging in";
  }
});

router.post("/register", async (ctx) => {
  const { name, email, password } = (await ctx.request.body()).value;

  if (ctx.request.hasBody) {
    const { value } = await ctx.request.body();
    if (!value.email) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Please provide a valid email" };
      return;
    }
    if (!value.password) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Please provide a valid password" };
      return;
    }
    if (!value.name) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Please provide a valid name" };
      return;
    }
    const insertId = await users.insertOne(
      {
        name: value.name,
        password: value.password,
        email: value.email,
        entries: 0,
        joined: new Date(),
      },
    );

    ctx.response.status = 201;
    // ctx.response.body = insertId;
    ctx.response.body = await users.findOne({ _id: insertId });
  } else {
    ctx.response.status = 404;
    ctx.response.body = { error: "Please provide required data" };
  }
});

router.get("/profile/:id", async (ctx) => {
  // const { id:any } = ctx.params;
  const data = await users.findOne({ _id: { $oid: ctx.params.id } });
  if (!data) {
    ctx.response.status = 404;
    ctx.response.body = "sorry no such user";
  }
  ctx.response.body = data;
  //   ctx.response.body = id;
});

router.put("/images", async (ctx) => {
  const id: any = await (await ctx.request.body()).value.id;
  await users.updateOne(
    { _id: { "$oid": id } },
    { $inc: { entries: 1 } },
  );
  const user1_id = await users.findOne({ _id: { "$oid": id } });

  ctx.response.body = user1_id;
});

export default router;
