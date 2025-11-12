import Link from "next/link";
import { prisma } from "@/database";
import { redirect } from "next/navigation";

async function createBlock(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title || !code) return;

  await prisma.block.create({
    data: { title, code },
  });

  redirect("/");
}

export default function CreateBlock() {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back
        </Link>

        <h1 className="text-2xl font-bold mb-4">Create Block</h1>

        <form action={createBlock} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Block Title"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="code" className="block mb-1">Code</label>
            <textarea
              id="code"
              name="code"
              placeholder="your code goes here..."
              rows={10}
              className="w-full p-2 border rounded font-mono"
            />
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
