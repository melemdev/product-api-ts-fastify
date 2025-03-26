import { fastify } from "fastify";

const server = fastify();

server.get("/", () => {
  return { msg: "Hello World!" };
});

server.listen({ port: 3333 }).then(() => {
  console.log("Server running at port 3333");
});
