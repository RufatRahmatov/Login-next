"use client";

import React, { useState } from "react";
import Login from "./components/login";
import ProductTable from "./components/producttable";
import Cart from "./components/cart";

const Loginpage: React.FC = () => {
  const [token, setToken] = useState<string>("");

  return (
    <div>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <>
          <ProductTable token={token} />
          <Cart token={token} />
        </>
      )}
    </div>
  );
};

export default Loginpage;
