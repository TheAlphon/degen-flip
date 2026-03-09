import { miniKitConfig } from "@/minikit.config";

export async function GET() {
  return Response.json(miniKitConfig.manifest);
}
