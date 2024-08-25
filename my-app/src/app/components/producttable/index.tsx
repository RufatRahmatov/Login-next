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
    <div>
      <h2>Product Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => setEditingProduct(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct ? (
        <div>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
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
          />
          <button onClick={() => updateProduct(editingProduct)}>Save</button>
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>Add Product</h3>
          <input
            type="text"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
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
          />
          <button onClick={addProduct}>Add Product</button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
