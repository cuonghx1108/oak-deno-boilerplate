import { App } from "./src/app.ts";
import { ServiceNameEnum } from "./src/types/service.ts";
import { ConfigService } from "./src/services/config.service.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import {
  applyGraphQL,
  gql,
  GQLError,
} from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";
import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";

const types = gql`
type User {
  firstName: String
  lastName: String
}

input UserInput {
  firstName: String
  lastName: String
}

type ResolveType {
  done: Boolean
}

type Query {
  getUser(id: String): User 
}

type Mutation {
  setUser(input: UserInput!): ResolveType!
}
`;

const resolvers = {
  Query: {
    getUser: (parent: any, { id }: any, context: any, info: any) => {
      console.log("id", id, context);
      if (context.user === "Aaron") {
        throw new GQLError({ type: "auth error in context" });
      }
      return {
        firstName: "wooseok",
        lastName: "lee",
      };
    },
  },
  Mutation: {
    setUser: (
      parent: any,
      { input: { firstName, lastName } }: any,
      context: any,
      info: any,
    ) => {
      console.log("input:", firstName, lastName);
      return {
        done: true,
      };
    },
  },
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx) => {
    // this line is for passing a user context for the auth
    return { user: "Aaron" };
  },
});

async function bootstrap() {
  const app = new App();
  const configService = app.getService(
    ServiceNameEnum.ConfigService,
  ) as ConfigService;

  app.useMiddlewares(oakCors());
  app.useMiddlewares(GraphQLService.allowedMethods());
  app.useRoutes(GraphQLService.routes());

  await app.listen(configService.port);
}

bootstrap();
