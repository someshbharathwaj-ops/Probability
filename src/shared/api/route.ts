import { NextResponse } from "next/server";
import { isAppError } from "@/shared/errors/app-error";
import { logger } from "@/shared/observability/logger";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function routeError(error: unknown, route: string) {
  if (isAppError(error)) {
    logger.warn(error.message, {
      route,
      code: error.code,
      details: error.details,
    });
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  logger.error("Unexpected route failure.", {
    route,
    error: error instanceof Error ? error.message : "unknown",
  });
  return NextResponse.json(
    { error: "Internal server error.", code: "INTERNAL_SERVER_ERROR" },
    { status: 500 }
  );
}
