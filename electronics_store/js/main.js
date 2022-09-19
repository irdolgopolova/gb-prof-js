const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products__list') {
        this.container = container;
        this.goods = [];
        this._featchProducts()
            .then(data => {
                this.goods = data;
                this.render();
            });

        this.filtered = [];
    }

    _featchProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.error(error)
            });
    }

    getTotalPrice() {
        let totalPrice = this.goods
            .reduce((totalPrice, product) => totalPrice + product.price, 0);

        return totalPrice;
    }

    filter(value) {
        const regexp = new RegExp(value, 'i');

        this.filtered = this.goods.filter(product => regexp.test(product.product_name));

        this.goods.forEach(good => {
            const product = document.querySelector(`.products__list_card[data-id="${good.id_product}"]`);

            if (!this.filtered.includes(good)) {
                product.classList.add('hide_block');
            } else {
                console.log(product);

                product.classList.remove('hide_block');
            }
        });
    }

    render() {
        const blockProductsList = document.querySelector(this.container);

        for (let product of this.goods) {
            const productItem = new ProductItem(product);

            blockProductsList
                .insertAdjacentHTML("beforeend", productItem.render());
        }

        const productСart = new ProductСart();

        blockProductsList
            .querySelectorAll('.products__list_card__btn')
            .forEach(btn =>
                btn.addEventListener('click', event =>
                    productСart.addProduct(Number(event.target.dataset.id))
                )
            );

        document
            .querySelector('.header__search_form')
            .addEventListener('submit', event => {
                event.preventDefault();
                console.log('filteresd');
                this.filter(document.querySelector('.header__search_input').value);
            });
    }
}

class ProductItem {
    constructor(product) {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.imgLink = `img/product_${product.id_product}.jpg`;
    }

    render() {
        return `<div class="products__list_card" data-id="${this.id}">
                <div class="products__list_card__img_block">
                    <img class="products__list_card__img" src="${this.imgLink}">
                </div>
                <div class="products__list_card__descriptions">
                    <p class="products__list_card__title">${this.title}</p>
                    <p class="products__list_card__price">${this.price}</p>
                </div>
                <button class="products__list_card__btn" data-id="${this.id}">Купить</button>
            </div>`;
    }
}

class ProductСart {
    constructor(container = '.cart__info_block') {
        this.container = container;

        this.render();
    }

    static _findProduct(productId) {
        const currentProductListOnCart = document.querySelectorAll('.cart__info_block__card');

        return Array
            .from(currentProductListOnCart)
            .find(product => product.dataset.id == productId) ?? null;
    }

    /**
     * Добавление товара в корзину
     */
    addProduct(productId) {
        let product = ProductСart._findProduct(productId);

        if (product === null) {
            product = new ProductСartItem(productId);
        } else {
            this.changeProduct(product);
        }
    }

    /**
     * Изменение товара в корзине
     */
    changeProduct(product) {
        const quantityInpit = product.querySelector('.cart__info_block__card__quantity_inpit');
        const currentQuantity = quantityInpit.value;
        quantityInpit.value = Number(currentQuantity) + 1;
    }

    /**
     * Удаление товара из корзины
     */
    static deleteProduct(productId) {
        let product = this._findProduct(productId);

        product.remove();
    }

    render() {
        let template = `<div class="cart__info_block__card__selected_products"></div>`;

        const block = document.querySelector(this.container);
        block.insertAdjacentHTML("beforeend", template);

        document
            .querySelector('.header__botton_cart')
            .addEventListener('click', event =>
                document
                    .querySelector('.cart__info_block')
                    .classList.toggle('hide_block')
            );
    }
}

class ProductСartItem {
    constructor(productId, container = '.cart__info_block__card__selected_products') {
        this.container = container;
        this.productId = productId;
        this.productTitle = '';
        this.productPrice = '';
        this._setProductParams();
        this.productImgLink = `img/product_${productId}.jpg`;
    }

    _getProductParams() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => console.error(error));
    }

    _setProductParams() {
        this._getProductParams()
            .then(data => {
                let productParams = data.find(product => product.id_product === this.productId);
                this.productTitle = productParams.product_name;
                this.productPrice = productParams.price;

                this.render();
            });
    }

    render() {
        let template = `<div class="cart__info_block__card" data-id="${this.productId}">
                <img class="cart__info_block__card__img" src="${this.productImgLink}">
                <div class="cart__info_block__card__description">
                    <span class="cart__info_block__card__main_title" >
                        <span class="cart__info_block__card__title">${this.productTitle}</span>
                        <span class="cart__info_block__card__price">${this.productPrice}</span>
                    </span>
                    <p class="cart__info_block__card__quantity">
                        Количество:
                        <input class="cart__info_block__card__quantity_inpit" type="number" value="1">
                    </p>
                    <span class="cart__info_block__card__balance">10000 еще</span>
                </div>
                <button class="cart__info_block__card__btn" data-id="${this.productId}" >&#10006;</button>
            </div>`;

        const listSelectedProducts  = document.querySelector(this.container);
        listSelectedProducts.insertAdjacentHTML("beforeend", template);

        listSelectedProducts
            .querySelector(`.cart__info_block__card__btn[data-id="${this.productId}"]`)
            .addEventListener('click', event =>
                ProductСart.deleteProduct(this.productId)
            );
    }
}

let list = new ProductList();
