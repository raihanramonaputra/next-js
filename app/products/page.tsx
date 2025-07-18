import AddProduct from "./addProduct";
import { prisma } from "@/lib/prisma"; // pakai alias path, atau
import DeleteProduct from "./deleteProduct";
import EditProduct from "./editProduct";

// const prisma = new PrismaClient();

type ProductWithBrand = {
  id: number;
  title: string;
  price: number;
  brandid: number;
  brand: {
    name: string;
  } | null; // karena relasi bisa null
};

const getProducts = async (): Promise<ProductWithBrand[]> => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandid: true,
      brand: {
        select: {
          name: true,
        },
      },
    },
  });
  return res;
};

const getBrands = async () => {
  const res = await prisma.brand.findMany();
  return res;
};

const Products = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <div className="p-6">
      <div className="mb-4">
        <AddProduct brands={brands} />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full table-auto text-sm text-left bg-white">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3 border-b">No</th>
              <th className="px-4 py-3 border-b">Product Name</th>
              <th className="px-4 py-3 border-b">Price</th>
              <th className="px-4 py-3 border-b">Brand</th>
              <th className="px-4 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{product.title}</td>
                <td className="px-4 py-2 border-b">{product.price}</td>
                <td className="px-4 py-2 border-b">{product.brand?.name ?? "-"}</td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <EditProduct product={product} brands={brands} />
                    <DeleteProduct product={product} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
