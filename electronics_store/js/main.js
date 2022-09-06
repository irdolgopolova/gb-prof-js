class ProductList {
    constructor(container = '.products__list') {
        this.container = container;
        this.goods = [];
        this._featchProducts();
        this.render();
    }

    _featchProducts() {
        this.goods = [
                {
                    id: 1,
                    title: 'Notebook',
                    price: 20000
                },
                {
                    id: 2,
                    title: 'Mouse',
                    price: 1000
                },
                {
                    id: 3,
                    title: 'Keyboard',
                    price: 2500
                },
                {
                    id: 4,
                    title: 'Phone',
                    price: 15000
                }
            ];
    }

    getTotalPrice() {
        let totalPrice = this.goods
            .reduce((totalPrice, product) => totalPrice + product.price, 0);

        return totalPrice;
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
}

class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.imgLink = `img/product_${product.id}.jpg`;
    }

    render() {
        return `<div class="products__list_card">
                <div class="products__list_card__img_block">
                    <img class="products__list_card__img" src="img/product_${this.id}.jpg">
                </div>
                <div class="products__list_card__descriptions">
                    <p class="products__list_card__title">${this.title}</p>
                    <p class="products__list_card__price">${this.price}</p>
                </div>
                <button class="products__list_card__btn">Купить</button>
            </div>`;
    }
}

class productСart {
    constructor() {}

    /**
     * Добавление товара в корзину
     */
    addProduct() {}

    /**
     * Изменение товара в корзине
     */
    changeProduct() {}

    /**
     * Удаление товара из корзины
     */
    deleteProduct() {}

    /**
     * Удаление всех товаров из корзины
     */
    clear() {}

    render() {}
}

class productСartItem {
    constructor() {}

    render() {}
}


let list = new ProductList();
