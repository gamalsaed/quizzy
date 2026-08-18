import Result from "@/app/_components/result";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Loading from "@/app/loading";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) return <Loading />;
  return (
    <div>
      <Result userId={session.user.id!} />
    </div>
  );
}
