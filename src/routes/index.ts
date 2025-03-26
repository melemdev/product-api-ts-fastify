import z from "zod";
import { FastifyTypedInstance } from "../shared/types";

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/products",
    {
      schema: {
        description: "List Products",
        tags: ["users"],
      },
    },
    () => {
      return [];
    }
  );

  app.post(
    "/products",
    {
      schema: {
        description: "Create a new product",
        tags: ["products"],
        body: z.object({
          title: z.string(),
          price: z.coerce.number().min(0.1),
        }),
      },
    },
    () => {
      return [];
    }
  );
}
