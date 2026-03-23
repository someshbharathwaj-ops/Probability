import { parseAnalyticsEventInput } from "@/features/learning/server/contracts";
import { learningService } from "@/features/learning/server/service";
import { ok, routeError } from "@/shared/api/route";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    return ok({ summary: learningService.getAnalyticsSummary() });
  } catch (error) {
    return routeError(error, "GET /api/analytics");
  }
}

export async function POST(request: NextRequest) {
  try {
    const event = learningService.recordAnalyticsEvent(
      parseAnalyticsEventInput(await request.json())
    );
    return ok(
      { event, summary: learningService.getAnalyticsSummary() },
      { status: 201 }
    );
  } catch (error) {
    return routeError(error, "POST /api/analytics");
  }
}
