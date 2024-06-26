import { Model } from "../model/model.js";

export default async function doNetworkCall() {
  const response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  console.log("Data is", data);

  data = data.map(
    (ele) => new Model(ele.id, ele.image, ele.title, ele.price, ele.description)
  );
  return data;
}
