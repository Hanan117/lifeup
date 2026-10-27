import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/auth";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const userId = await getSessionUserId();
  if (userId) redirect("/dashboard");
  return <>{children}</>;
}
