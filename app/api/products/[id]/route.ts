import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "ID produk tidak valid" }, { status: 400 });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Produk berhasil dihapus",
      data: deletedProduct,
    });
  } catch {
  return NextResponse.json({ error: "Gagal ..." }, { status: 500 });
}

}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "ID produk tidak valid" }, { status: 400 });
    }

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
  } catch {
  return NextResponse.json({ error: "Gagal memperbarui produk" }, { status: 500 });
}

}
