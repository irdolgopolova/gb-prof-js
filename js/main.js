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
                    price: 150000
                }
            ];
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

let list = new ProductList();
