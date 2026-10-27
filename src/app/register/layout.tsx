import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/auth";

export default async function RegisterLayout({ children }: { children: React.ReactNode }) {
  const userId = await getSessionUserId();
  if (userId) redirect("/dashboard");
  return <>{children}</>;
}
