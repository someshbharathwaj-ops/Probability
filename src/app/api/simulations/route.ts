import { parseTopicId } from "@/features/learning/server/contracts";
import { learningService } from "@/features/learning/server/service";
import { ok, routeError } from "@/shared/api/route";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const topicId = parseTopicId(request.nextUrl.searchParams.get("topicId"));
    return ok({ simulations: learningService.listSimulations(topicId) });
  } catch (error) {
    return routeError(error, "GET /api/simulations");
  }
}
