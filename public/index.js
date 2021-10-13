const socket = io();
//New product Form:
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const formPrice = document.getElementById("formPrice");
const formThumbnail = document.getElementById("formThumbnail");

submitBtn.addEventListener("click", (event) => {
  console.log(formTitle.value, formPrice.value, formThumbnail.value);
  savedInfo(formTitle.value, formPrice.value, formThumbnail.value);
  formTitle.innerHTML = "";
  formPrice.innerHTML = "";
  formThumbnail.innerHTML = "";
});

const savedInfo = (title, price, thumbnail) => {
  const newProduct = {title: title, price: price, thumbnail: thumbnail};
  socket.emit("newProduct", newProduct);
};

socket.on("sentProduct", (data) => {
  const { id, title, price, thumbnail } = data.newProd;
  showProduct(data);
});

function showProduct(data) {
    const tableContainer = document.getElementById('tableContainer')
  if (data.productos.length > 1) {
    console.log("hay productos");
  } else {
    console.log("no hay productos");
  }
}
