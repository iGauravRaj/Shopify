import doNetworkCall from "../services/service.js";

window.addEventListener("load", bindEvents);
let row;
let cart = [];
let cartContainer;

function bindEvents() {
  row = document.querySelector("#row");
  cartContainer = document.querySelector("#cart1");
  getData();
}

async function getData() {
  const data = await doNetworkCall();
  showProducts(data);
}

function showProducts(data) {
  data.map((ele) => printCard(ele));
}

function printCard(ele) {
  const div = document.createElement("div");
  div.className = "card";
  div.style.width = "18rem";
  div.style.width = "100%";

  const img = document.createElement("img");
  img.src = ele.image;
  img.className = "card-img-top";
  img.style.height = "18rem";

  div.appendChild(img);

  const body = document.createElement("div");
  body.className = "card-body";
  div.style.height = "30rem";

  div.appendChild(body);

  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = ele.title;

  body.appendChild(h5);

  const h6 = document.createElement("h5");
  h6.className = "card-title";
  h6.innerText = ele.price;

  body.appendChild(h6);

  const button = document.createElement("button");
  button.className = "btn btn-primary";
  button.innerText = "Add To Cart";
  button.style.marginTop = "-0.1rem";

  button.addEventListener("click", function () {
    addToCart(ele);
  });

  body.appendChild(button);

  const col = document.createElement("div");
  col.className = "col-lg-4 col-md-6 col-sm-12";
  col.style.marginBottom = "2rem";

  col.appendChild(div);

  row.appendChild(col);
}

function addToCart(product) {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  // Store cart data in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}
