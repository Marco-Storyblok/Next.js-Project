import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionStore } from "@storyblok/app-extension-auth";
import { authHandlerParams } from "../../../../config/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = Array.isArray(req.query.userId)
    ? req.query.userId[0]
    : req.query.userId;

  const spaceId = Array.isArray(req.query.spaceId)
    ? req.query.spaceId[0]
    : req.query.spaceId;

  if (!userId || !spaceId) {
    return res.status(400).json({
      error: "Missing userId or spaceId",
    });
  }

  const sessionStore = getSessionStore(authHandlerParams)({ req, res });

  const appSession = await sessionStore.get({
    userId,
    spaceId,
  });

  if (!appSession) {
    return res.status(401).json({
      error: "Session not found",
    });
  }

  return res.status(200).json({
    userId: appSession.userId,
    spaceId: appSession.spaceId,
    region: appSession.region,
    accessToken: appSession.accessToken,
  });
}