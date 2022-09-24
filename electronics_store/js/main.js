const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        isVisibleCart: false,
        cartProducts: [],
        filteredProducts: [],
        allProducts: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.error(error));
        },

        getProduct(productId) {
            return this.cartProducts.find(product => product.id_product === productId);
        },

        addProduct(element) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.getProduct(element.id_product);

                        if (find) {
                            find.quantity++;
                        } else {
                            const product = Object.assign({quantity: 1}, element);
                            this.cartProducts.push(product);
                        }
                    } else {
                        alert('Error');
                    }
                });
        },

        removeProduct(element) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (element.quantity > 1) {
                            element.quantity--;
                        } else {
                            let find = this.getProduct(element.id_product);
                            this.cartProducts.splice(this.allProducts.indexOf(find), 1);
                        }
                    } else {
                        alert('Error');
                    }
                });
        },

        filterProducts() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filteredProducts = this.allProducts.filter(product => regexp.test(product.product_name));
        },

        getImgLink(productId) {
            return `img/product_${productId}.jpg`;
        },
    },
    mounted() {
        this.getJson(`${API}/getBasket.json`)
            .then(data => {
                for (element of data.contents) {
                    this.cartProducts.push(element);
                }
            });

        this.getJson(`${API}/catalogData.json`)
            .then(data => {
                for (let element of data) {
                    this.allProducts.push(element);
                    this.filteredProducts.push(element);
                }
            });
    }
});

// class List {
//     constructor(container, url, list = list2) {
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this._init();
//     }

//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.error(error));
//     }

//     handleData(data) {
//         this.goods = data;
//         this.render();
//     }

//     calcSum() {
//         return this.allProducts.reduce((totalPrice, product) => totalPrice + product.price, 0);
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new this.list[this.constructor.name](product);

//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
// }

// class Item {
//     constructor(element) {
//         this.id = element.id_product;
//         this.name = element.product_name;
//         this.price = element.price;
//         this.imgLink = `img/product_${this.id}.jpg`;
//     }

//     render() {
//         return `<div class="products__list_card" data-id="${this.id}">
//                 <div class="products__list_card__img_block">
//                     <img class="products__list_card__img" src="${this.imgLink}">
//                 </div>
//                 <div class="products__list_card__descriptions">
//                     <p class="products__list_card__title">${this.name}</p>
//                     <p class="products__list_card__price">${this.price}</p>
//                 </div>
//                 <button class="products__list_card__btn"
//                     data-id="${this.id}"
//                     data-name="${this.name}"
//                     data-price="${this.price}">Купить</button>
//             </div>`;
//     }
// }
// class ProductList extends List {
//     constructor(cart, container = '.products__list', url = "/catalogData.json") {
//         super(container, url);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }

//     _init() {
//         document
//             .querySelector(this.container)
//             .addEventListener('click', event => {
//                 if (event.target.classList.contains('products__list_card__btn')) {
//                     this.cart.addProduct(event.target);
//                 }
//             })
//     }
// }

// class ProductItem extends Item {}

// class ProductСart extends List{
//     constructor(container = '.cart__info_block', url = '/getBasket.json') {
//         super(container, url);

//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents);
//             });
//     }

//     _updateCart(product) {
//         let block = document.querySelector(`.cart__info_block__card[data-id="${product.id}"]`);

//         console.log(block);

//         block
//             .querySelector('.cart__info_block__card__quantity_value')
//             .textContent = product.quantity;

//         block
//             .querySelector('.cart__info_block__card__price')
//             .textContent = product.quantity * product.price;
//     }

//     addProduct(element) {
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id === productId);

//                     if (find) {
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             product_name: element.dataset['name'],
//                             price: +element.dataset['price'],
//                             quantity: 1
//                         };

//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }

//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id === productId);

//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);

//                         document
//                             .querySelector(`.cart__info_block__card[data-id="${productId}"]`)
//                             .remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }

//     _init() {
//         document
//             .querySelector('.header__botton_cart')
//             .addEventListener('click', event => {
//                 document
//                     .querySelector(this.container)
//                     .classList
//                     .toggle('hide_block');
//             });

//         document
//             .querySelector(this.container)
//             .addEventListener('click', event => {
//                 if (event.target.classList.contains('cart__info_block__card__btn')) {
//                     this.removeProduct(event.target);
//                 }
//             });
//     }
// }

// class ProductСartItem extends Item {
//     constructor (element) {
//         super(element);

//         this.quantity = element.quantity;
//     }

//     render() {
//         return `<div class="cart__info_block__card" data-id="${this.id}">
//                 <img class="cart__info_block__card__img" src="img/product_${this.id}.jpg">
//                 <div class="cart__info_block__card__description">
//                     <span class="cart__info_block__card__main_title" >
//                         <span class="cart__info_block__card__title">${this.name}</span>
//                         <span class="cart__info_block__card__price">${this.price * this.quantity}</span>
//                     </span>
//                     <p class="cart__info_block__card__quantity">
//                         Количество:
//                         <span class="cart__info_block__card__quantity_value">${this.quantity}</span>
//                     </p>
//                     <span class="cart__info_block__card__balance">${this.price}</span>
//                 </div>
//                 <button class="cart__info_block__card__btn" data-id="${this.id}" >&#10006;</button>
//             </div>`;
//     }
// }

// const list2 = {
//     ProductList: ProductItem,
//     ProductСart: ProductСartItem
// }

// let cart = new ProductСart();
// let products = new ProductList(cart);

