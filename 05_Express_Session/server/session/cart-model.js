
class Cart {

  constructor(cart) {
    this.items = cart.items || [];
    this.unidades = cart.unidades || 0;
    this.total = cart.total || 0;
  }

  add(data) {

    let index = this.items.findIndex(item => item.productId.toString() === data.productId.toString());
    let newitems = [...this.items];

    if (index === -1) {
      newitems.push(data)
    } else {
      newitems[index].cantidad++;
      newitems[index].total = newitems[index].cantidad * data.total;

    }
    this.items = newitems;
    this.unidades = this.items.reduce((unidades, item) => unidades += item.cantidad, 0);
    this.total = this.items.reduce((total, item) => total += item.total, 0);

  }

  remove(data) {

    let index = this.items.findIndex(item => item.productId.toString() === data.productId.toString());

    let _cantidad = this.items[index].cantidad;
    let newitems = [...this.items];
    if (_cantidad > 1) {
      _cantidad = this.items[index].cantidad - 1;
      newitems[index].cantidad = _cantidad;
      newitems[index].total = data.total * _cantidad;
    } else {
      delete newitems[index];
    }

    this.items = newitems;
    this.unidades = this.items.reduce((unidades, item) => unidades += item.cantidad, 0);
    this.total = this.items.reduce((total, item) => total += item.total, 0);
  }


}

module.exports = { Cart }