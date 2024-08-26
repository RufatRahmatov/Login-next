import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

interface CartProps {
  token: string;
}

const Card: React.FC<CartProps> = ({ token }) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [cartId, setCartId] = useState<number | string>("");
  const [userId, setUserId] = useState<number | string>("");
  const [totalProducts, setTotalProducts] = useState<number | string>("");
  const [totalQuantity, setTotalQuantity] = useState<number | string>("");
  const [total, setTotal] = useState<number>(0);
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((data) => setCarts(data.carts));
  }, []);

  const addCart = () => {
    const newCart = {
      userId: parseInt(userId as string, 10),
      totalProducts: parseInt(totalProducts as string, 10),
      totalQuantity: parseInt(totalQuantity as string, 10),
      total: total,
      discountedTotal: discountedTotal,
    };

    fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCart),
    })
      .then((res) => res.json())
      .then((data) => setCarts([...carts, data]));
  };

  const updateCart = () => {
    const updatedCart = {
      userId: parseInt(userId as string, 10),
      totalProducts: parseInt(totalProducts as string, 10),
      totalQuantity: parseInt(totalQuantity as string, 10),
      total: total,
      discountedTotal: discountedTotal,
    };

    fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCart),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCarts = carts.map((cart) =>
          cart.id === data.id ? data : cart
        );
        setCarts(updatedCarts);
      });
  };

  const deleteCart = (id: number) => {
    fetch(`https://dummyjson.com/carts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        const filteredCarts = carts.filter((cart) => cart.id !== id);
        setCarts(filteredCarts);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 ml-[800px] p-6">Shopping Carts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {carts.map((cart) => (
          <div key={cart.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">User ID: {cart.userId}</h2>
            <p>Total Products: {cart.totalProducts}</p>
            <p>Total Quantity: {cart.totalQuantity}</p>
            <p>Total Price: ${Number(cart.total).toFixed(2)}</p>
            <p>Discounted Total: ${Number(cart.discountedTotal).toFixed(2)}</p>

            <div className="mt-4 ">
              {cart.products &&
                cart.products.length > 0 &&
                cart.products.map((product) => (
                  <div key={product.id} className="flex items-center mb-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-16 h-16 rounded mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ${product.price}</p>
                      <p>Total: ${product.total}</p>
                      <p>Discount: {product.discountPercentage}%</p>
                      <p>Discounted Total: ${product.discountedTotal}</p>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={() => deleteCart(cart.id)}
              className="bg-red-700 text-white p-2 rounded mt-4 hover:scale-105 transition duration-300"
            >
              Delete Cart
            </button>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-4 ml-[800px] p-4">Dashboard</h1>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Cart ID (for update)"
          value={cartId}
          onChange={(e) => setCartId(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Total Products"
          value={totalProducts}
          onChange={(e) => setTotalProducts(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Total Quantity"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Total Price"
          value={total}
          onChange={(e) => setTotal(parseFloat(e.target.value))}
          className="border rounded p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Discounted Total"
          value={discountedTotal}
          onChange={(e) => setDiscountedTotal(parseFloat(e.target.value))}
          className="border rounded p-2 mb-2 w-full"
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={addCart}
          className="bg-purple-700 text-white p-2 rounded hover:scale-105 transition duration-300"
        >
          Add Cart
        </button>
        <button
          onClick={updateCart}
          className="bg-blue-700 text-white p-2 rounded hover:scale-105 transition duration-300"
        >
          Update Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
