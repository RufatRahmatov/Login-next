import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductTableProps {
  token: string;
}

const ProductTable: React.FC<ProductTableProps> = ({ token }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ title: "", price: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?sortBy=title&order=asc")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const addProduct = () => {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const productToAdd = { ...newProduct, id: newId };
    setProducts([...products, productToAdd]);
    setNewProduct({ title: "", price: 0 });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
      <h2 className="text-xl font-bold mb-4 p-6 ml-[800px]">Product Table</h2>
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              ID
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Title
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Price
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-4 px-6 border-b border-gray-200">
                {product.id}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 truncate">
                {product.title}
              </td>
              <td className="py-4 px-6 border-b border-gray-200">
                ${product.price}
              </td>
              <td className="py-4 px-6 border-b border-gray-200">
                <button
                  className="bg-blue-700 text-white py-1 px-2 rounded mr-2 text-xs hover:scale-105 ease-in-out duration-300 w-[90px] h-[37px] "
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-700 text-white py-1 px-2 rounded text-xs hover:scale-105 ease-in-out duration-300 w-[90px] h-[37px]"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
          <input
            type="text"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
            className="border border-gray-300 rounded py-2 px-4 mb-2 w-full"
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: parseFloat(e.target.value),
              })
            }
            className="border border-gray-300 rounded py-2 px-4 mb-2 w-full"
          />
          <button
            className="bg-green-700 text-white py-2 px-4 rounded mr-2 hover:scale-105 ease-in-out duration-300"
            onClick={() => updateProduct(editingProduct)}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:scale-105 ease-in-out duration-300"
            onClick={() => setEditingProduct(null)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Add Product</h3>
          <input
            type="text"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            className="border border-gray-300 rounded py-2 px-4 mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            className="border border-gray-300 rounded py-2 px-4 mb-2 w-full"
          />
          <button
            className="bg-purple-700 text-white py-2 px-4 rounded hover:scale-105 ease-in-out duration-300 "
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
