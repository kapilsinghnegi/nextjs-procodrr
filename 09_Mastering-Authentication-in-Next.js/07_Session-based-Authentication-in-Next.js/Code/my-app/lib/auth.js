import { cookies } from "next/headers";
import { createHmac } from "crypto";
import User from "@/models/user.model.js";
import Session from "@/models/session.model.js";

export async function getLoggedInUser() {
  const cookieStore = await cookies();

  const errorResponse = Response.json(
    { error: "Please login" },
    {
      status: 401,
    },
  );

  const cookie = cookieStore.get("userId")?.value;
  if (!cookie) return errorResponse;

  const sessionId = verifyCookie(cookie);
  if (!sessionId) return errorResponse;

  const session = await Session.findById(sessionId);
  if (!session) return errorResponse;

  const user = await User.findById(session.userId);
  if (!user) {
    return errorResponse;
  }
  return user;
}

export function signCookie(cookie) {
  const signature = createHmac("sha-256", process.env.COOKIE_SECRET)
    .update(cookie)
    .digest("hex");

  return `${cookie}.${signature}`;
}

export function verifyCookie(signedCookie) {
  const [cookie, cookieSignature] = signedCookie.split(".");
  const signature = signCookie(cookie).split(".")[1];

  if (signature === cookieSignature) return cookie;
  return false;
}
