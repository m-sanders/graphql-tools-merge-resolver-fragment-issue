import { ApolloServer } from "apollo-server";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

const STOCK_RECORDS = {
  1: {
    id: 1,
    stock: 100,
  },
};

const remote = makeExecutableSchema({
  typeDefs: `
    type StockRecord {
      id: ID!
      stock: Int!
    }

    type Query {
      stockRecord(id: ID!): StockRecord
    }
  `,
  resolvers: {
    Query: {
      stockRecord: (_, { id }) => STOCK_RECORDS[id],
    },
  },
});

const PRODUCTS = [
  {
    id: 1,
    title: "T-Shirt",
  },
];

const COLLECTIONS = [
  {
    id: 1,
    name: "Apparel",
    products: PRODUCTS,
  },
];

const local = makeExecutableSchema({
  typeDefs: `
    interface IProduct {
      id: ID!
      title: String!
    }

    type Product implements IProduct {
      id: ID!
      title: String!
    }

    type Collection {
      id: ID!
      name: String!
      products: [Product!]!
    }

    type Query {
      collections: [Collection!]!
    }
  `,
  resolvers: {
    Query: {
      collections: () => COLLECTIONS,
    },
  },
});

const runServer = async () => {
  const server = new ApolloServer({
    schema: mergeSchemas({
      inheritResolversFromInterfaces: true,
      subschemas: [
        {
          schema: local,
        },
        {
          schema: remote,
        },
      ],
      resolvers: {
        Product: {
          stockRecordViaInterface: {
            fragment: ` ... on IProduct { id } `,
            resolve(obj, __, ___, info) {
              return info.mergeInfo?.delegateToSchema({
                schema: remote,
                operation: "query",
                fieldName: "stockRecord",
                args: { id: obj.id },
                info,
              });
            },
          },
          stockRecordViaConcrete: {
            fragment: ` ... on Product { id } `,
            resolve(obj, __, ___, info) {
              return info.mergeInfo?.delegateToSchema({
                schema: remote,
                operation: "query",
                fieldName: "stockRecord",
                args: { id: obj.id },
                info,
              });
            },
          },
        },
      },
      typeDefs: `
        extend interface IProduct {
          stockRecordViaInterface: StockRecord
          stockRecordViaConcrete: StockRecord
        }

        extend type Product {
          stockRecordViaInterface: StockRecord
          stockRecordViaConcrete: StockRecord
        }
      `,
    }),
  });
  await server
    .listen({
      port: 4040,
    })
    .then(({ url }) => {
      console.log(`Running at ${url}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

runServer();
