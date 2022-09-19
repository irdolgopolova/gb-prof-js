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
