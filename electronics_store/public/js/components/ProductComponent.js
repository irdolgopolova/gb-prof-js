const product_item = {
    props: ['product'],
    template: `
    <div>
        <div class="products__list_card__img_block">
            <img class="products__list_card__img" :src="$root.getImgLink(product.id_product)">
        </div>
        <div class="products__list_card__descriptions">
            <p class="products__list_card__title">{{product.product_name}}</p>
            <p class="products__list_card__price">{{product.price}}</p>
        </div>
        <button class="products__list_card__btn" @click="$root.$refs.cart.addProduct(product)" data-id="product.id_product">Купить</button>
    </div>
    `
};

const products_list = {
    components: {product_item},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            filteredProducts: [],
            allProducts: []
        };
    },
    mounted () {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let element of data) {
                    this.allProducts.push(element);
                    this.filteredProducts.push(element);
                }
            });
    },
    methods: {
        filterProducts(userSearch) {
            const regexp = new RegExp(userSearch, 'i');
            this.filteredProducts = this.allProducts.filter(product => regexp.test(product.product_name));
        },
    },
    template: `
    <div class="products__list">
        <product_item class="products__list_card" v-for="product of filteredProducts" :key="product.id_product" :product="product">
        </product_item>
    </div>
    `
};