Vue.component('products-list', {
    props: ['products'],
    template: `
    <div class="products__list">
        <product-item class="products__list_card" v-for="product of products" :key="product.id_product" :product="product">
        </product-item>
    </div>
    `
});

Vue.component('product-item', {
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
        <button class="products__list_card__btn" @click="$root.addProduct(product)" data-id="product.id_product">Купить</button>
    </div>
    `
})