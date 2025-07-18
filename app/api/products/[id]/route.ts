import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Tipe konteks route dynamic (params)
type Context = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const { id } = context.params;

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
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    return NextResponse.json({ error: "Gagal menghapus produk" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    const { id } = context.params;
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
  } catch (error) {
    console.error("Gagal memperbarui produk:", error);
    return NextResponse.json({ error: "Gagal memperbarui produk" }, { status: 500 });
  }
}
