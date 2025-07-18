import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";

export const POST = async(request: Request) => {
    const body: Product = await request.json();
    const product = await prisma.product.create({
        data:{
            title: body.title,
            price: body.price,
            brandid: body.brandid
        }
    });
    return NextResponse.json(product);
}