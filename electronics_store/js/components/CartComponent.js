Vue.component('cart', {
    props: ['cartProducts', 'isVisibleCart'],
    template: `
    <div class="cart__info_block" v-show="isVisibleCart">
        <p class="cart__info_block__empty" v-if="!cartProducts.length">В корзину ничего еще не добавлено!</p>
        <cart-item class="cart__info_block__card" v-for="product of cartProducts" :key="product.id_product" :cart-product="product">
        </cart-item>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['cartProduct'],
    template: `
    <div>
        <img class="cart__info_block__card__img" :src="$root.getImgLink(cartProduct.id_product)">
        <div class="cart__info_block__card__description">
            <span class="cart__info_block__card__main_title" >
                <span class="cart__info_block__card__title">{{cartProduct.product_name}}</span>
                <span class="cart__info_block__card__price">{{cartProduct.price * cartProduct.quantity}}</span>
            </span>
            <p class="cart__info_block__card__quantity">
                Количество:
                <span class="cart__info_block__card__quantity_value">{{cartProduct.quantity}}</span>
            </p>
            <span class="cart__info_block__card__balance">{{cartProduct.price}}</span>
        </div>
        <button class="cart__info_block__card__btn" @click="$root.removeProduct(cartProduct)" >&#10006;</button>
    </div>
    `
});