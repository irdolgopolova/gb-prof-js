const products = [
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

const renderProduct = product => {
    return `<div class="products__list_card">
                <div class="products__list_card__img_block">
                    <img class="products__list_card__img" src="img/product_${product.id}.jpg">
                </div>
            <div class="products__list_card__descriptions">
                <p class="products__list_card__title">${product.title}</p>
                <p class="products__list_card__price">${product.price}</p>
            </div>
            <button class="products__list_card__btn">Купить</button>
        </div>`;
}

const renderPage = list => {
    document
        .querySelector('.products__list')
        .innerHTML = list.map(item => renderProduct(item)).join('');
}

renderPage(products);
