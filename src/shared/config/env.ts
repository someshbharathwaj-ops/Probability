type AppEnv = {
  appUrl: string;
  logLevel: "debug" | "info" | "warn" | "error";
  nodeEnv: "development" | "test" | "production";
};

function parseLogLevel(value: string | undefined): AppEnv["logLevel"] {
  if (
    value === "debug" ||
    value === "info" ||
    value === "warn" ||
    value === "error"
  ) {
    return value;
  }

  return "info";
}

export const env: AppEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  logLevel: parseLogLevel(process.env.LOG_LEVEL),
  nodeEnv:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
      ? process.env.NODE_ENV
      : "development",
};
