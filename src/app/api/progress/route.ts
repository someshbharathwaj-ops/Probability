import { parseProgressMutation } from "@/features/learning/server/contracts";
import { learningService } from "@/features/learning/server/service";
import { ok, routeError } from "@/shared/api/route";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    return ok({ profile: learningService.getProfile() });
  } catch (error) {
    return routeError(error, "GET /api/progress");
  }
}

export async function POST(request: NextRequest) {
  try {
    const mutation = parseProgressMutation(await request.json());
    return ok({ profile: learningService.mutateProgress(mutation) });
  } catch (error) {
    return routeError(error, "POST /api/progress");
  }
}
