const sizeParams = {
    'big': {
        'price': 100,
        'calories': 40
    },
    'small': {
        'price': 50,
        'calories': 20
    }
};

const stuffingParams = {
    'cheese': {
        'price': 10,
        'calories': 20
    },
    'salad': {
        'price': 20,
        'calories': 5
    },
    'potato': {
        'price': 15,
        'calories': 10
    }
};

const toppingParams = {
    'seasoning': {
        'price': 15,
        'calories': 0
    },
    'mayonnaise': {
        'price': 20,
        'calories': 5
    }
}

class HamburgerIngredients {
    constructor(classname, type='radio') {
        this.list = this._getList(classname, type);
        this.listChecked = this._getListIngredients();
    }

    _getList(classname, type) {
        return document
            .querySelector(`.${classname}`)
            .querySelectorAll(`input[type="${type}"]`);
    }

    _getListIngredients() {
        let listIgredients = [];

        for (let item of this.list) {
            if (item.checked) {
                listIgredients.push(item.dataset.value);
            }
        }

        return listIgredients;
    }

    _calcParams(array, param) {
        return this.listChecked.reduce(
            (total, keyIngredient) => total + array[keyIngredient][param],
            0);
    }
}

class StuffingIngredients extends HamburgerIngredients {
    validate() {
        return this.listChecked.length;
    }

    getPrice() {
        return this._calcParams(stuffingParams, 'price');
    }

    getCalories() {
        return this._calcParams(stuffingParams, 'calories');
    }
}

class ToppingIngredients extends HamburgerIngredients {

    getPrice() {
        return this._calcParams(toppingParams, 'price');
    }

    getCalories() {
        return this._calcParams(toppingParams, 'calories');
    }
}

class Hamburger {
    constructor() {
        this.size = this.getSize();
        this.stuffing = new StuffingIngredients('burger_stuffing__list', 'checkbox');
        this.topping = new ToppingIngredients('burger_topping__list', 'checkbox');
        this.totalPrice = 0;
        this.totalCalories = 0;
    }

    _hideErrorBlock() {
        const errorBlock = document.querySelector('#required-error');
        if (errorBlock) {
            errorBlock.remove();
        }
    }

    _hideResultBlock() {
        document
            .querySelector('.burger_stuffing__list')
            .insertAdjacentHTML("beforeend", '<p id="required-error">Данный блок обязателен для заполнения </p>');

        document
            .querySelector('.burger_constructor__results')
            .style.display = 'none';
    }

    getSize() {
        const listOfSize = document
            .querySelector('.burger_size__list')
            .querySelectorAll('input[type="radio"]');

        for (let itemSize of listOfSize) {
            if (itemSize.checked) {
                return itemSize.dataset.value;
            }
        }
    }

    getSizePrice() {
        return sizeParams[this.size]['price'];
    }

    getSizeCalories() {
        return sizeParams[this.size]['calories'];
    }

    getStuffingPrice() {
        if (this.stuffing.validate()) {
            this._hideErrorBlock();

            return this.stuffing.getPrice();
        }

        this._hideResultBlock();
    }

    getStuffingCalories() {
        return this.stuffing.getCalories();
    }

    getToppingPrice() {
        return this.topping.getPrice();
    }

    getToppingCalories() {
        return this.topping.getCalories();
    }

    calculatePrice() {
        return this.getSizePrice()
            + this.getStuffingPrice()
            + this.getToppingPrice();
    }

    calculateCalories() {
        return this.getSizeCalories()
            + this.getStuffingCalories()
            + this.getToppingCalories();
    }
}

const calcBtn = document.querySelector('.burger_constructor__calc__btn');

calcBtn.addEventListener('click', function (event) {
    let orderHamburger = new Hamburger();

    document.querySelector('.burger_constructor__results').style.display = 'block';

    document.querySelector('.price').innerHTML = orderHamburger.calculatePrice();
    document.querySelector('.calories').innerHTML = orderHamburger.calculateCalories();
})