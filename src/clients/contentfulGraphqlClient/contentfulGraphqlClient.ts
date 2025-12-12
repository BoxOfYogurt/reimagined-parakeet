import {
  ContentfulGraphQLExtensionCode,
  ContentfulGraphQLExtensionCodeType,
} from "@/constants/ContentfulGraphQLExtensionCode";
import {
  GetAccordionCollectionQuery,
  GetAccordionTeaserCollectionQuery,
  getSdk,
  Sdk,
} from "@/graphql/sdk/sdk";
import { SafeGraphResponse, ContentfulGraphQLExtension } from "@/types";
import { GraphQLClient, GraphQLResponse } from "graphql-request";

export class ContentfulGraphQLClientImpl extends GraphQLClient {
  private sdk: ReturnType<typeof getSdk>;
  public constructor() {
    const serviceUrl = new URL(
      `${process.env.CONTENTFUL_GRAPHQL_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`
    );

    super(serviceUrl.href, {
      errorPolicy: "all",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    });

    this.sdk = getSdk(this);
  }

  public async getAccordionTeaserCollection(): Promise<
    SafeGraphResponse<GetAccordionTeaserCollectionQuery, unknown>
  > {
    const safeResponse = await this.doQuery<"GetAccordionTeaserCollection">(
      this.sdk.GetAccordionTeaserCollection
    );
    return safeResponse;
  }

  public async getAccordionCollection(): Promise<
    SafeGraphResponse<GetAccordionCollectionQuery, unknown>
  > {
    const safeResponse = await this.doQuery<"GetAccordionCollection">(
      this.sdk.GetAccordionCollection
    );
    return safeResponse;
  }

  private async doQuery<TOperation extends keyof Sdk>(
    request: () => ReturnType<Sdk[TOperation]>
  ): Promise<
    SafeGraphResponse<Awaited<ReturnType<Sdk[TOperation]>>["data"], unknown>
  > {
    try {
      const response = await request();

      const isAttachedExtensions =
        this.isResponseWithContentfulExtension(response);

      if (isAttachedExtensions) {
        /**
        Normally for a "real" application I would probably log here

        @example
         this.logger.trackTrace({
            title: "Contentful GraphQL Extension Error",
            message: `Contentful GraphQL Extension returned an error with code: ${response.extensions.contentful.code}`,
            severity: Severity.Warning,
            properties: {
              requestId: response.extensions.contentful.requestId,
              details: JSON.stringify(response.extensions.contentful.details),
            },
         })
        */

        console.warn(
          `Contentful GraphQL Extension returned an error with code: ${response.extensions.contentful.code}`
        );

        if (this.shouldReturnPartialSuccess(response.extensions.contentful)) {
          return {
            success: "partially",
            data: response.data,
            errors: response.errors || [],
          };
        }
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Something went wrong while fetching from Contentful GraphQL API",
        error
      );

      return {
        success: false,
        errors: [error],
      };
    }
  }

  private isResponseWithContentfulExtension<TOperation extends keyof Sdk>(
    response: GraphQLResponse<Awaited<ReturnType<Sdk[TOperation]>>["data"]>
  ): response is GraphQLResponseWithExtensions<
    Awaited<ReturnType<Sdk[TOperation]>>["data"]
  > {
    const { extensions } = response;

    if (
      !extensions ||
      typeof extensions !== "object" ||
      !("contentful" in extensions)
    ) {
      return false;
    }

    const { contentful } = extensions;

    if (
      !contentful ||
      typeof contentful !== "object" ||
      !("code" in contentful)
    ) {
      return false;
    }

    const { code } = contentful;

    const isContentfulCodeValid =
      typeof code === "string" &&
      Object.values(ContentfulGraphQLExtensionCode).includes(
        code as ContentfulGraphQLExtensionCodeType
      );

    /** NB! I only check if the code is valid.
     *
     *  potentially extend this type guard to do more checks if needed.
     *  but for now i trust contentful to provide valid extension object if a code is present.
     *
     *  @see https://www.contentful.com/developers/docs/references/graphql/#/reference/graphql-errors
     */
    return isContentfulCodeValid;
  }

  private shouldReturnPartialSuccess(
    extension: ContentfulGraphQLExtension
  ): boolean {
    const partialSuccessErrorCodes: ContentfulGraphQLExtensionCodeType[] = [
      ContentfulGraphQLExtensionCode.UNKNOWN_LOCALE,
      ContentfulGraphQLExtensionCode.UNRESOLVABLE_LINK,
      ContentfulGraphQLExtensionCode.UNEXPECTED_LINKED_CONTENT_TYPE,
      ContentfulGraphQLExtensionCode.UNRESOLVABLE_RESOURCE_LINK,
      ContentfulGraphQLExtensionCode.RESOURCES_EXHAUSTED,
      ContentfulGraphQLExtensionCode.INTERNAL_SERVER_ERROR,
    ];
    return partialSuccessErrorCodes.includes(extension.code);
  }
}

type GraphQLResponseWithExtensions<
  TData extends Awaited<ReturnType<Sdk[keyof Sdk]>>["data"]
> = GraphQLResponse<TData> & {
  extensions: {
    contentful: ContentfulGraphQLExtension;
  } & { [key: string]: unknown };
};

// Authentication	401	ACCESS_TOKEN_MISSING	no
// Authentication	401	ACCESS_TOKEN_INVALID	no
// Schema generation	422	COLLIDING_TYPE_NAMES	no
// Schema generation	422	COLLIDING_FIELD_NAMES	no
// Schema generation	422	RESERVED_FIELD_NAME	no
// Validation	400	UNKNOWN_ENVIRONMENT	no
// Validation	400	UNKNOWN_SPACE	no
// Validation	400	MISSING_QUERY	no
// Validation	400	QUERY_TOO_BIG	no
// Validation	400	INVALID_QUERY_FORMAT	no
// Validation	404	PersistedQueryNotFound	no
// Validation	400	PersistedQueryMismatch	no
// Validation	400	INVALID_VARIABLES_FORMAT	no
// Validation	400	TOO_COMPLEX_QUERY	no
// Validation	400	QUERY_OPERATION_NAME_MISMATCH	no

// Query execution	200	UNKNOWN_LOCALE	yes
// Query execution	200	UNRESOLVABLE_LINK	yes
// Query execution	200	UNEXPECTED_LINKED_CONTENT_TYPE	yes
// Query execution	200	UNRESOLVABLE_RESOURCE_LINK	yes
// Query execution	200	RESOURCES_EXHAUSTED	yes
// System errors	200	INTERNAL_SERVER_ERROR	yes

// System errors	500	INTERNAL_SERVER_ERROR	no
// System errors	429	RATE_LIMIT_EXCEEDED	no
