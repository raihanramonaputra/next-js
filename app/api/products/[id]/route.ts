import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET parameter dari URL
function getIdFromUrl(url: string): string | null {
  const parts = url.split("/");
  const id = parts[parts.length - 1];
  return id || null;
}

export async function DELETE(request: Request) {
  const id = getIdFromUrl(request.url);

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID produk tidak valid" }, { status: 400 });
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Produk berhasil dihapus",
      data: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menghapus produk" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const id = getIdFromUrl(request.url);

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID produk tidak valid" }, { status: 400 });
  }

  try {
    const body = await request.json();

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        price: body.price,
        brandid: body.brandid,
      },
    });

    return NextResponse.json({
      message: "Produk berhasil diperbarui",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memperbarui produk" }, { status: 500 });
  }
}
