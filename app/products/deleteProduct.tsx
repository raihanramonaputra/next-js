"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import toast from "react-hot-toast";

type Product = {
  id: number;
  title: string;
  price: number;
  brandid: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/api/products/${product.id}`);
      
      if (response.status === 200) {
        // toast.success("Product deleted successfully");
        router.refresh();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      // toast.error("Failed to delete product");
      console.error("Error details:", error);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={handleModal}
        className="btn btn-error btn-sm px-5 py-2 bg-red-600 text-white rounded-md font-semibold"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete <b>{product.title}</b>?
            </h2>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;