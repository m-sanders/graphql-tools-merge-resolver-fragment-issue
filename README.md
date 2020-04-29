# Reproduction of graphql-tools issue

In summary, when adding resolvers between schemas, the fragment type must match the query type, it does not honour interfaces.

https://www.graphql-tools.com/docs/schema-stitching#adding-resolvers-between-schemas

## Running

```
nvm use
npm install
npm run dev
```

Visit: http://localhost:4000

### Query

```
{
  # PASS
  s1: collections {
    name
    products {
      title
      stockRecordViaConcrete {
        stock
      }
    }
  }

  # FAIL
  s2: collections {
    name
    products {
      ... on IProduct {
        title
        stockRecordViaConcrete {
          stock
        }
      }
    }
  }

  # PASS
  s3: collections {
    name
    products {
      ...InterfaceFragmentViaInterface
    }
  }

  # FAIL
  s4: collections {
    name
    products {
      ...InterfaceFragmentViaConcrete
    }
  }

  # FAIL
  s5: collections {
    name
    products {
      title
      stockRecordViaInterface {
        stock
      }
    }
  }

  # PASS
  s6: collections {
    name
    products {
      ... on IProduct {
        title
        stockRecordViaInterface {
          stock
        }
      }
    }
  }

  # FAIL
  s7: collections {
    name
    products {
      ...ConcreteFragmentViaInterface
    }
  }

  # PASS
  s8: collections {
    name
    products {
      ...ConcreteFragmentViaConcrete
    }
  }
}

fragment InterfaceFragmentViaInterface on IProduct {
  title
  stockRecordViaInterface {
    stock
  }
}

fragment InterfaceFragmentViaConcrete on IProduct {
  title
  stockRecordViaConcrete {
    stock
  }
}

fragment ConcreteFragmentViaInterface on Product {
  title
  stockRecordViaInterface {
    stock
  }
}

fragment ConcreteFragmentViaConcrete on Product {
  title
  stockRecordViaConcrete {
    stock
  }
}
```

### Result

```
{
  "errors": [
    {
      "message": "Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
      "locations": [],
      "path": [
        "s2",
        0,
        "products",
        0,
        "stockRecordViaConcrete"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "message": "Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
          "locations": [],
          "stacktrace": [
            "GraphQLError: Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
            "    at combineErrors (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/stitch/errors.ts:84:12)",
            "    at handleNull (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/results/handleNull.ts:16:29)",
            "    at handleResult (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/checkResultAndHandleErrors.ts:56:12)",
            "    at checkResultAndHandleErrors (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/checkResultAndHandleErrors.ts:33:10)",
            "    at CheckResultAndHandleErrors.transformResult (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms/CheckResultAndHandleErrors.ts:35:12)",
            "    at /Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms.ts:40:21",
            "    at Array.reduceRight (<anonymous>)",
            "    at applyResultTransforms (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms.ts:37:21)",
            "    at delegateRequest (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/delegateToSchema.ts:216:12)",
            "    at delegateToSchema (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/delegateToSchema.ts:70:10)"
          ]
        }
      }
    },
    {
      "message": "Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
      "locations": [],
      "path": [
        "s4",
        0,
        "products",
        0,
        "stockRecordViaConcrete"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "message": "Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
          "locations": [],
          "stacktrace": [
            "GraphQLError: Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
            "    at combineErrors (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/stitch/errors.ts:84:12)",
            "    at handleNull (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/results/handleNull.ts:16:29)",
            "    at handleResult (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/checkResultAndHandleErrors.ts:56:12)",
            "    at checkResultAndHandleErrors (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/checkResultAndHandleErrors.ts:33:10)",
            "    at CheckResultAndHandleErrors.transformResult (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms/CheckResultAndHandleErrors.ts:35:12)",
            "    at /Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms.ts:40:21",
            "    at Array.reduceRight (<anonymous>)",
            "    at applyResultTransforms (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms.ts:37:21)",
            "    at delegateRequest (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/delegateToSchema.ts:216:12)",
            "    at delegateToSchema (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/delegateToSchema.ts:70:10)"
          ]
        }
      }
    },
    {
      "message": "Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
      "locations": [],
      "path": [
        "s5",
        0,
        "products",
        0,
        "stockRecordViaInterface"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "message": "Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
          "locations": [],
          "stacktrace": [
            "GraphQLError: Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
            "    at combineErrors (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/stitch/errors.ts:84:12)",
            "    at handleNull (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/results/handleNull.ts:16:29)",
            "    at handleResult (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/checkResultAndHandleErrors.ts:56:12)",
            "    at checkResultAndHandleErrors (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/checkResultAndHandleErrors.ts:33:10)",
            "    at CheckResultAndHandleErrors.transformResult (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms/CheckResultAndHandleErrors.ts:35:12)",
            "    at /Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms.ts:40:21",
            "    at Array.reduceRight (<anonymous>)",
            "    at applyResultTransforms (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms.ts:37:21)",
            "    at delegateRequest (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/delegateToSchema.ts:216:12)",
            "    at delegateToSchema (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/delegateToSchema.ts:70:10)"
          ]
        }
      }
    },
    {
      "message": "Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
      "locations": [],
      "path": [
        "s7",
        0,
        "products",
        0,
        "stockRecordViaInterface"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "message": "Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
          "locations": [],
          "stacktrace": [
            "GraphQLError: Variable \"$_v0_id\" got invalid value undefined; Expected non-nullable type ID! not to be null.",
            "    at combineErrors (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/stitch/errors.ts:84:12)",
            "    at handleNull (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/results/handleNull.ts:16:29)",
            "    at handleResult (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/checkResultAndHandleErrors.ts:56:12)",
            "    at checkResultAndHandleErrors (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/checkResultAndHandleErrors.ts:33:10)",
            "    at CheckResultAndHandleErrors.transformResult (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms/CheckResultAndHandleErrors.ts:35:12)",
            "    at /Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms.ts:40:21",
            "    at Array.reduceRight (<anonymous>)",
            "    at applyResultTransforms (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/wrap/transforms.ts:37:21)",
            "    at delegateRequest (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/delegateToSchema.ts:216:12)",
            "    at delegateToSchema (/Users/msanders/code/graphql-tools-merge-resolver-fragment-issue/node_modules/src/delegate/delegateToSchema.ts:70:10)"
          ]
        }
      }
    }
  ],
  "data": {
    "s1": [
      {
        "name": "Apparel",
        "products": [
          {
            "title": "T-Shirt",
            "stockRecordViaConcrete": {
              "stock": 100
            }
          }
        ]
      }
    ],
    "s2": [
      {
        "name": "Apparel",
        "products": [
          {
            "title": "T-Shirt",
            "stockRecordViaConcrete": null
          }
        ]
      }
    ],
    "s3": [
      {
        "name": "Apparel",
        "products": [
          {
            "title": "T-Shirt",
            "stockRecordViaInterface": {
              "stock": 100
            }
          }
        ]
      }
    ],
    "s4": [
      {
        "name": "Apparel",
        "products": [
          {
            "title": "T-Shirt",
            "stockRecordViaConcrete": null
          }
        ]
      }
    ],
    "s5": [
      {
        "name": "Apparel",
        "products": [
          {
            "title": "T-Shirt",
            "stockRecordViaInterface": null
          }
        ]
      }
    ],
    "s6": [
      {
        "name": "Apparel",
        "products": [
          {
            "title": "T-Shirt",
            "stockRecordViaInterface": {
              "stock": 100
            }
          }
        ]
      }
    ],
    "s7": [
      {
        "name": "Apparel",
        "products": [
          {
            "title": "T-Shirt",
            "stockRecordViaInterface": null
          }
        ]
      }
    ],
    "s8": [
      {
        "name": "Apparel",
        "products": [
          {
            "title": "T-Shirt",
            "stockRecordViaConcrete": {
              "stock": 100
            }
          }
        ]
      }
    ]
  }
}
```
