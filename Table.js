const apiUrl = "https://crudcrud.com/api/ede665cbd25b447eb9d2e39c68eae2e6/products";
let products = [];

// const ordersFromLocalStorage = localStorage.getItem("orders");
// if (ordersFromLocalStorage) {
//   orders = JSON.parse(ordersFromLocalStorage);
// }

function addProduct(event) {
  event.preventDefault();

  const priceInput = document.getElementById("price");
  const nameInput = document.getElementById("name");
  const categoryInput = document.getElementById("category");

  const price = priceInput.value;
  const name = nameInput.value;
  const category = categoryInput.value;

  axios.post(apiUrl, {
      price: price,
      name: name,
      category: category
    })
    .then(response => {
      const newPro = {
        _id: response.data._id,
        price: price,
        name: name,
        category: category
      };
      products.push(newPro);
      console.log(response)
      //localStorage.setItem("orders", JSON.stringify(orders));
      displayProducts();
    })
  priceInput.value = "";
  nameInput.value = "";
  categoryInput.value = "";
}

function deleteProduct(proId) {
  axios.delete(apiUrl + "/" + proId)
    .then(response => {
      products = products.filter(pro => pro._id !== proId);
      //localStorage.setItem("orders", JSON.stringify(orders));
      console.log(response);
      displayProducts();
    })
  }

function displayProducts() {
  const table1Div = document.getElementById('table1');
  const table2Div = document.getElementById('table2');
  const table3Div = document.getElementById('table3');

  table1Div.innerHTML = "";
  table2Div.innerHTML = "";
  table3Div.innerHTML = "";

  products.forEach(pro => {
    const productItem = document.createElement("div");
    productItem.textContent = ` ${pro.price}, - ${pro.name}, - ${pro.category}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteProduct(pro._id);
    });

    if (pro.category === "Electronic Items") {
      table1Div.appendChild(productItem);
      table1Div.appendChild(deleteButton);
    } else if (pro.category === "Food Items") {
      table2Div.appendChild(productItem);
      table2Div.appendChild(deleteButton);
    } else if (pro.category === "Skincare Items") {
      table3Div.appendChild(productItem);
      table3Div.appendChild(deleteButton);
    }
  });
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", addProduct);
displayProducts();