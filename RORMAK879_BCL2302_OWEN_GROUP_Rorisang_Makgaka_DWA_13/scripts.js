// Part 1

const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

// using 'forEach' to console log each name:

names.forEach(name => {
    console.log(name);
});
  
// using 'forEach' to console log each name with a matching province:
names.forEach((name, index) => {
    console.log(`${name} (${provinces[index]})`);
});

// using 'map' to convert province namees to uppercase:
  const uppercaseProvinces = provinces.map(province => province.toUpperCase());
console.log(uppercaseProvinces);

//using 'map' to create an ew array with the amount of charicters in each name:
 const nameLengths = names.map(name => name.length);
console.log(nameLengths);

//using 'sort' to sort all the provinces alphabetically:
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

//using 'filter' to remove provinces with the word "Cape" and returning the remaining count:
const filteredProvinces = provinces.filter(province => !province.includes('Cape'));
const remainingCount = filteredProvinces.length;

console.log(remainingCount);

//Using 'map' and 'some' to create a boolean array indicating wether a name contains an 'S' character:
const hasSCharacter = names.map(name => name.includes('S'));
console.log(hasSCharacter);


//Using only reduce, turn the above into an object that indicates the province of an individual:
const provinceObject = names.reduce((obj, name, index) => {
    obj[name] = provinces[index];
    return obj;
  }, {});
  
console.log(provinceObject);
 

//Part 2

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ]

  console.log(
    // Exercise 1: forEach to console.log each product name
    (() => {
      products.forEach(product => console.log(product.product));
    })(),
    // Exercise 2: filter out products with names longer than 5 characters
    (() => {
      return products.filter(product => product.product.length <= 5);
    })(),
    // Exercise 3: filter and map to convert prices and remove products without prices, then reduce to calculate the combined price
    (() => {
      return products
        .filter(product => typeof product.price === 'number' && !isNaN(product.price))
        .map(product => {
          product.price = parseFloat(product.price);
          return product;
        })
        .reduce((totalPrice, product) => totalPrice + product.price, 0);
    })(),
    // Exercise 4: reduce to concatenate all product names
    (() => {
      return products.reduce((result, product, index) => {
        if (index === 0) {
          return product.product;
        } else if (index === products.length - 1) {
          return `${result} and ${product.product}`;
        } else {
          return `${result}, ${product.product}`;
        }
      }, '');
    })(),
    // Exercise 5: reduce to calculate the highest and lowest-priced items
    (() => {
      const { highest, lowest } = products.reduce(
        (result, product) => {
          const price = typeof product.price === 'number' ? product.price : 0;
          if (price > result.highest.price) {
            result.highest = product;
          }
          if (price < result.lowest.price) {
            result.lowest = product;
          }
          return result;
        },
        {
          highest: { product: '', price: Number.NEGATIVE_INFINITY },
          lowest: { product: '', price: Number.POSITIVE_INFINITY },
        }
      );
      return `Highest: ${highest.product}. Lowest: ${lowest.product}.`;
    })(),
    // Exercise 6: Object.entries and reduce to recreate the object with modified keys
    (() => {
      return Object.entries(products).reduce((newObj, [key, value]) => {
        const newKey = key === 'product' ? 'name' : key === 'price' ? 'cost' : key;
        newObj[newKey] = value;
        return newObj;
      }, {});
    })()
  );
  