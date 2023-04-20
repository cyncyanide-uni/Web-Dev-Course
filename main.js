let products = [];

async function fetchData() {
  const response = await fetch("https://dummyjson.com/products");
  products = await response.json();
  populateCategorySelect();
}

function populateCategorySelect() {
  console.log(products);
  const categories = [
    ...new Set(products.products.map((product) => product.category)),
  ];
  const select = document.getElementById("categorySelect");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    select.appendChild(option);
  });
}

function displayProductsByCategory() {
  const selectedCategory = document.getElementById("categorySelect").value;
  if (selectedCategory) {
    const filteredProducts = products.products.filter(
      (product) => product.category === selectedCategory
    );
    displayProducts(filteredProducts);
  } else {
    displayProducts();
  }
}

function displayProducts(productData = products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  productData.forEach((product) => {
    const productCard = `
      <div class="col-md-4 mb-4">
          <div class="card">
              <img src="${product.images[0]}"  class="fixed-height h-60 object-contain"  alt="${product.title}">
              <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">Brand: ${product.brand}</p>
                  <p class="card-text">Category: ${product.category}</p>
                  <p class="card-text">Price: $${product.price}</p>
              </div>
          </div>
      </div>`;
    productList.innerHTML += productCard;
  });
}
fetchData();
