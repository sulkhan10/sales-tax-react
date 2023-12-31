// Helper function to calculate the sales tax
const calculateSalesTax = (price, taxRate) => {
    const tax = (price * taxRate) / 100;
    return Math.ceil(tax * 20) / 20; // Round up to the nearest 0.05
  };
  
  // Function to process the shopping basket and generate the receipt details
  const processBasket = (basket) => {
    let total = 0;
    let salesTaxes = 0;
    const receipt = {
        items: [],
        salesTaxes: 0,
        total: 0
    };
  
    basket.forEach((item) => {
      const { quantity, name, price, isImported, isExempt } = item;
      let taxRate = 0; // Basic sales tax rate
  
      if (isExempt) {
        if (isImported) {
          taxRate += 5;
        } else {
          taxRate += 0;
        }
      } else {
        if (isImported) {
          taxRate += 15;
        } else {
          taxRate += 10;
        }
      }
  
      const salesTax = calculateSalesTax(price * quantity, taxRate);
      const itemTotal = price * quantity + salesTax;
  
      salesTaxes += salesTax;
      total += itemTotal;
  
      const formattedItem = `${quantity} x ${
        isImported ? 'imported ' : ''
      }${name}\n@ ${price.toFixed(2)} : ${(quantity * price).toFixed(2)} + Tax (${salesTax.toFixed(2)}) ${itemTotal.toFixed(2)}`;
      
      
      receipt.items.push(formattedItem);
    });
  
    receipt.salesTaxes = salesTaxes.toFixed(2)
    receipt.total= total.toFixed(2)
  
    return receipt;
  };
  
  export default processBasket;
  