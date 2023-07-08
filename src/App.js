import "./App.css";
import processBasket from "./taxCalculator";
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
function App() {
  const [items, setItems] = useState([
    { id: 1, name: "book", price: 12.49, isImported: false, isExempt: true },
    {
      id: 2,
      name: "music CD",
      price: 14.99,
      isImported: false,
      isExempt: false,
    },
    {
      id: 3,
      name: "chocolate bar",
      price: 0.85,
      isImported: false,
      isExempt: true,
    },
    {
      id: 4,
      name: "imported box of chocolates",
      price: 10.0,
      isImported: true,
      isExempt: true,
    },
    {
      id: 5,
      name: "imported bottle of perfume",
      price: 47.5,
      isImported: true,
      isExempt: false,
    },
    {
      id: 6,
      name: "imported bottle of perfume",
      price: 27.99,
      isImported: true,
      isExempt: false,
    },
    {
      id: 7,
      name: "bottle of perfume",
      price: 18.99,
      isImported: false,
      isExempt: false,
    },
    {
      id: 8,
      name: "packet of headache pills",
      price: 9.75,
      isImported: false,
      isExempt: true,
    },
    {
      id: 9,
      name: "box of imported chocolates",
      price: 11.25,
      isImported: true,
      isExempt: true,
    },
  ]);

  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const handleRemoveFromCart = (item) => {
    setItems((prevItems) => [...prevItems, { ...item }]);
    setCart((prevCart) => prevCart.filter((i) => i.id !== item.id));
  };

  const handleQuantityChange = (event, item) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      const updatedCart = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: newQuantity } : i
      );
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      cart.forEach((item) => {
        const index = newItems.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          newItems.splice(index, 1);
        }
      });
      return newItems;
    });
  }, [cart]);

  const calculateReceipt = (basket) => {
    return processBasket(basket).join("\n");
  };

  const input1 = [
    {
      quantity: 1,
      name: "book",
      price: 12.49,
      isImported: false,
      isExempt: true,
    },
    {
      quantity: 1,
      name: "music CD",
      price: 14.99,
      isImported: false,
      isExempt: false,
    },
    {
      quantity: 1,
      name: "chocolate bar",
      price: 0.85,
      isImported: false,
      isExempt: true,
    },
  ];

  const output1 = processBasket(input1);

  const input2 = [
    {
      quantity: 1,
      name: "imported box of chocolates",
      price: 10.0,
      isImported: true,
      isExempt: true,
    },
    {
      quantity: 1,
      name: "imported bottle of perfume",
      price: 47.5,
      isImported: true,
      isExempt: false,
    },
  ];

  const output2 = processBasket(input2);

  const input3 = [
    {
      quantity: 1,
      name: "imported bottle of perfume",
      price: 27.99,
      isImported: true,
      isExempt: false,
    },
    {
      quantity: 1,
      name: "bottle of perfume",
      price: 18.99,
      isImported: false,
      isExempt: false,
    },
    {
      quantity: 1,
      name: "packet of headache pills",
      price: 9.75,
      isImported: false,
      isExempt: true,
    },
    {
      quantity: 1,
      name: "box of imported chocolates",
      price: 11.25,
      isImported: true,
      isExempt: true,
    },
  ];

  const output3 = processBasket(input3);

  return (
    <div className="App">
      <Navbar />
      <div className="flex h-[90vh] ">
        <div className="w-3/4 h-100 bg-red-200 overflow-y-scroll flex flex-wrap gap-8 p-4 justify-around">
          {items.map((item) => (
            <div className="w-1/5" key={item.id}>
              <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm ">
                <div className="mb-6">
                  <div className="flex items-center justify-between pb-6 mb-6 border-b">
                    <div>
                      <p className="text-sm font-bold tracking-wider uppercase">
                        {item.name}
                      </p>
                      <p className="text-3xl font-extrabold">$ {item.price}</p>
                    </div>
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-50">
                      <svg
                        className="w-10 h-10 text-gray-600"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLidth="2"
                      >
                        <path
                          d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                          fill="none"
                          stroke="currentColor"
                        />
                        <path
                          d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                          fill="none"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              {/* <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button> */}
            </div>
          ))}
        </div>
        <div className="w-1/4 bg-green-200">
          <div>
            <h2>Cart:</h2>
            {cart.map((item) => (
              <div className="item-card cart-item" key={item.id}>
                <h3>{item.name}</h3>
                <p>Price: {item.price}</p>
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item)}
                />
                <button onClick={() => handleRemoveFromCart(item)}>
                  Remove
                </button>
              </div>
            ))}
            <h2>Receipt:</h2>
            <p>{calculateReceipt(cart)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
