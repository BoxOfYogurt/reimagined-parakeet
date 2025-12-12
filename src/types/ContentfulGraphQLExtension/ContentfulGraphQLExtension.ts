import { ContentfulGraphQLExtensionCodeType } from "@/constants/ContentfulGraphQLExtensionCode";

export type ContentfulGraphQLExtension = {
  code: ContentfulGraphQLExtensionCodeType;
  documentationUrl?: string;
  requestId?: string;
  details?: {
    [key: string]: unknown;
  };
};
