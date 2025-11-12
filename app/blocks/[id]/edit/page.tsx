import { prisma } from "@/database";
import Link from "next/link";
import { redirect } from "next/navigation";

async function updateBlock(blockId: number, formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title || !code) return;

  await prisma.block.update({
    where: { id: blockId },
    data: { title, code },
  });

  redirect(`/blocks/${blockId}`);
}

export default async function EditBlockPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blockId = parseInt(id);

  const block = await prisma.block.findUnique({
    where: { id: blockId },
  });

  if (!block) {
    return (
      <div className="p-8">
        <p className="text-red-600">Block not found</p>
        <Link href="/" className="text-blue-600 hover:underline">← Back</Link>
      </div>
    );
  }

  const updateBlockWithId = updateBlock.bind(null, blockId);

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <Link href={`/blocks/${block.id}`} className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back
        </Link>

        <h1 className="text-2xl font-bold mb-4">Edit Block</h1>

        <form action={updateBlockWithId} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={block.title}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="code" className="block mb-1">Code</label>
            <textarea
              id="code"
              name="code"
              defaultValue={block.code}
              rows={10}
              className="w-full p-2 border rounded font-mono"
            />
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            save
          </button>
        </form>
      </div>
    </div>
  );
}

