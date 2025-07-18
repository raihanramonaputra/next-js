"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";

// import { useState } from "react";
// ✅ pakai prisma dari lib
import type { Brand } from "@prisma/client";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post('/api/products',{
      title: title,
      price: Number(price),
      brandid: Number(brand)
    })
    setTitle("");
    setPrice("");
    setBrand("");
    router.refresh();
    setIsOpen(false)
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleModal} className="px-5 py-2 bg-gray-800 text-white rounded-md font-semibold">
        ADD NEW
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Product Name</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Name" className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>

              <div className="mb-3">
                <label className="block font-semibold mb-1">Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full px-3 py-2 border rounded-md outline-none" />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Brand</label>
                <select className="w-full px-3 py-2 border rounded-md outline-none" value={brand} onChange={(e) => setBrand(e.target.value)}>
                  <option value="">Select a Brand</option>
                  {brands.map((brand) => (
                    <option value={brand.id} key={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={handleModal} className="px-4 py-2 bg-gray-800 text-white rounded-md">
                  CLOSE
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md">
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
