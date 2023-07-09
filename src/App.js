import "./App.css";
import processBasket from "./taxCalculator";
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
function App() {
  let [dataSalesTax, setDataSalesTax] = useState({});
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
useEffect (() => {
  calculateReceipt(cart)
}, [cart])
  const calculateReceipt = (basket) => {
    let result = processBasket(basket)
    setDataSalesTax(result)
  };

  return (
    <div className="App bg-blue-50">
      <Navbar />
      <div className="flex flex-col sm:flex-row  sm:h-[90vh] ">
        <div className="sm:w-3/4 h-100  overflow-y-scroll flex flex-wrap gap-2 p-4 justify-around">
          {items.map((item) => (
            <div className="w-[48%] md:w-1/3 lg:w-1/4 xl:w-1/5 max-h-72 mb-4" key={item.id}>
              <div className="flex flex-col  justify-between p-5 bg-white border rounded-xl shadow-lg h-full">
                {/* <div className="mb-2"> */}
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-14 sm:h-14 mb-2 rounded-full bg-blue-200">
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
                    <p className="text-xl sm:text-3xl font-extrabold">$ {item.price}</p>
                  </div>
                </div>
                {/* </div> */}
                <div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="inline-flex items-center justify-between w-full h-12 px-6 mb-2 font-medium tracking-wide text-gray-100 transition duration-200 bg-blue-500 rounded-xl shadow-md hover:bg-blue-900 focus:shadow-outline focus:outline-none "
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      className="h-7"
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
                    <div className="text-sm">Add to Cart</div>
                  </button>
                </div>
              </div>
              {/* <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button> */}
            </div>
          ))}
        </div>
        <div className="sm:w-1/4  bg-blue-200 flex flex-col m-2  rounded-lg">
            <div className="h-[8%] px-4 py-2 text-gray-800">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
            </div>
            <div className="h-[84%]  overflow-y-scroll ">
              {cart.map((item) => (
                <div className="flex items-center bg-blue-300 my-2 px-4" key={item.id}>
                  <div className="w-[60%]">

                  <h3 className="uppercase">{item.name}</h3>
                  <p>Price: $ {item.price}</p>
                  </div>
                  <div className="flex gap-2 items-center w-[40%]">

                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2  "                />
                  <button onClick={() => handleRemoveFromCart(item)}>
                  <svg fill="none" stroke="currentColor " className="h-4" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
</svg>
                  </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-[8%] flex justify-between px-4 py-2 items-center">
              <h2 className="text-2xl font-semibold">Total:</h2>
              {/* {dataSalesTax.items?.map((item) => (
                <div className="item-card" key={item.id}>
                  <h3>{item}</h3>
                
                </div>
              ))} */}
              <h2 className="text-2xl font-bold">$ {dataSalesTax?.total}</h2>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
