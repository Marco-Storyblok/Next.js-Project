import type { AuthHandlerParams } from "@storyblok/app-extension-auth";

export const authHandlerParams: AuthHandlerParams = {
  clientId: process.env.APP_CLIENT_ID!,
  clientSecret: process.env.APP_CLIENT_SECRET!,
  baseUrl: process.env.APP_URL!,
  successCallback: "/",
  errorCallback: "/",
  endpointPrefix: "/api/connect",
};