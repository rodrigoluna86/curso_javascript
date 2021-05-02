
const arrayDeBotonesDeCompra = document.querySelectorAll('.botonComprar');
arrayDeBotonesDeCompra.forEach((botonDeCompra) => {
  botonDeCompra.addEventListener('click', sumarAlCarritoClickeado);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const containerItemsCarrito = document.querySelector(
  '.containerItemsCarrito'
);

function sumarAlCarritoClickeado(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-titulo').textContent;
  const itemPrice = item.querySelector('.item-precio').textContent;
  const itemImage = item.querySelector('.item-imagen').src;

  sumarItemAlCarrito(itemTitle, itemPrice, itemImage);
}

function sumarItemAlCarrito(itemTitle, itemPrice, itemImage) {
  const tituloDelElemento = containerItemsCarrito.getElementsByClassName(
    'tituloItemCarrito'
  );
  for (let i = 0; i < tituloDelElemento.length; i++) {
    if (tituloDelElemento[i].innerText === itemTitle) {
      let cantidadElemento = tituloDelElemento[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidadDeItemsCarrito'
      );
      cantidadElemento.value++;
      $('.toast').toast('show');
      actualizarTotalCarrito();
      return;
    }
  }

  const filaCarrito = document.createElement('div');
  const contenidoCarrito = `
  <div class="row itemCarrito">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title tituloItemCarrito text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-precio mb-0 precioItemCarrito">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cantidadDeItemsCarrito" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    filaCarrito.innerHTML = contenidoCarrito;
  containerItemsCarrito.append(filaCarrito);

  filaCarrito
    .querySelector('.buttonDelete')
    .addEventListener('click', quitarItemCarrito);

  filaCarrito
    .querySelector('.cantidadDeItemsCarrito')
    .addEventListener('change', cantidadModificada);

    actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
  let total = 0;
  const totalCarritoDeCompras = document.querySelector('.totalCarritoDeCompras');
  const itemsCarrito = document.querySelectorAll('.itemCarrito');

  itemsCarrito.forEach((itemCarrito) => {
    const elementoPrecioCarrito = itemCarrito.querySelector(
      '.precioItemCarrito'
    );
    const precioItemCarrito = Number(
      elementoPrecioCarrito.textContent.replace('$', '')
    );
    const elementoCantidadItemCarrito = itemCarrito.querySelector(
      '.cantidadDeItemsCarrito'
    );
    const shoppingCartItemQuantity = Number(
      elementoCantidadItemCarrito.value
    );
    total = total + precioItemCarrito * shoppingCartItemQuantity;
  });
  totalCarritoDeCompras.innerHTML = `$ ${total.toFixed(2)}`;
}

function quitarItemCarrito(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.itemCarrito').remove();
  actualizarTotalCarrito();
}

function cantidadModificada(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizarTotalCarrito();
}

function comprarButtonClicked() {
  containerItemsCarrito.innerHTML = '';
  actualizarTotalCarrito();
}



