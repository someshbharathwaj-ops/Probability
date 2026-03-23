import { env } from "@/shared/config/env";

const order = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
} as const;

function shouldLog(level: keyof typeof order) {
  return order[level] >= order[env.logLevel];
}

function write(
  level: keyof typeof order,
  message: string,
  context?: Record<string, unknown>
) {
  if (!shouldLog(level)) {
    return;
  }

  const payload = context ? { context } : undefined;
  console[level](`[${level.toUpperCase()}] ${message}`, payload ?? "");
}

export const logger = {
  debug(message: string, context?: Record<string, unknown>) {
    write("debug", message, context);
  },
  info(message: string, context?: Record<string, unknown>) {
    write("info", message, context);
  },
  warn(message: string, context?: Record<string, unknown>) {
    write("warn", message, context);
  },
  error(message: string, context?: Record<string, unknown>) {
    write("error", message, context);
  },
};
