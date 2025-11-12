import { prisma } from "@/database";
import Link from "next/link";
import { redirect } from "next/navigation";

async function deleteBlock(blockId: number) {
  "use server";
  await prisma.block.delete({
    where: { id: blockId },
  });
  redirect("/");
}

export default async function BlockDetailPage({
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

  const deleteBlockWithId = deleteBlock.bind(null, blockId);

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back
          </Link>
          <div className="flex gap-2">
            <form action={deleteBlockWithId}>
              <button type="submit" className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                delete
              </button>
            </form>
            <Link href={`/blocks/${block.id}/edit`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              edit
            </Link>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">{block.title}</h1>

        <pre className="bg-gray-100 p-4 rounded border overflow-x-auto">
          <code>{block.code}</code>
        </pre>
      </div>
    </div>
  );
}

