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
      iconSrc: "",
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

  return (
    <div className="App">
      <Navbar />
      <div className="flex h-[90vh] ">
        <div className="w-3/4 h-100 bg-blue-50 overflow-y-scroll flex flex-wrap gap-8 p-4 justify-around">
          {items.map((item) => (
            <div className="w-1/5 " key={item.id}>
              <div className="flex flex-col justify-between p-5 bg-white border rounded-xl shadow-lg h-full">
                {/* <div className="mb-2"> */}
                <div className="flex justify-between">
                <div className="flex items-center justify-center w-14 h-14 mb-2 rounded-full bg-blue-200">
                  {item.isImported ? (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-2/3 w-2/3 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-2/3 w-2/3 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                      ></path>
                    </svg>
                  )}
                </div>
                <div className="flex flex-col justify-around mb-2">
                <div className=" px-2 py-1 text-xs font-semibold h-1/3 flex items-center justify-center text-gray-800 rounded-xl bg-blue-200">
                  {item.isImported ? "Import Product" : "Local Product"}
                </div>
                <div className=" px-2 py-1 text-xs font-semibold h-1/3 flex items-center justify-center text-gray-100 rounded-xl bg-blue-400">
                  {item.isExempt ? "Exempt" : "Tax Applied"}
                </div>
            
                </div>
                </div>
                <div className="flex items-center justify-between pb-2 mb-4 border-b">
                  <div>
                    <p className="text-sm font-bold tracking-wider uppercase">
                      {item.name}
                    </p>
                    <p className="text-3xl font-extrabold">$ {item.price}</p>
                  </div>
                </div>
                {/* </div> */}
                <div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="inline-flex items-center justify-around w-full h-12 px-6 mb-2 font-medium tracking-wide text-white transition duration-200 bg-blue-500 rounded-xl shadow-md hover:bg-blue-900 focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      className="h-8"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      ></path>
                    </svg>
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
