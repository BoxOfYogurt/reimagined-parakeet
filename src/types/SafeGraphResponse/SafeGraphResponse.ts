import { GraphQLError } from "graphql/error";

export type SafeGraphResponse<TData, TError, TPartialData = TData> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: "partially";
      data: TPartialData;
      errors: readonly GraphQLError[];
    }
  | {
      success: false;
      errors: TError;
    };
