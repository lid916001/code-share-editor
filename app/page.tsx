import { prisma } from "@/database";
import Link from "next/link";
import { getSession } from "@/app/lib/session";
import { logout } from "@/app/actions/auth";

export default async function Home() {
  const session = await getSession();
  const user = session?.userId 
    ? await prisma.user.findUnique({ where: { id: Number(session.userId) } })
    : null;

  const blocks = await prisma.block.findMany();

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Code Blocks</h1>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <span className="text-sm">Welcome, {user.username}!</span>
                <form action={logout}>
                  <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                  </button>
                </form>
                <Link href="/blocks/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                  New
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
                <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {blocks.length === 0 ? (
          <p className="text-gray-500">No blocks yet. Create one to get started!</p>
        ) : (
          <ul className="space-y-2">
            {blocks.map((block) => (
              <li key={block.id}>
                <Link href={`/blocks/${block.id}`} className="block p-4 bg-white border rounded hover:bg-gray-50">
                  {block.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
