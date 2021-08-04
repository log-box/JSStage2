"use strict";
const $cart = document.querySelector('.cart');
const $main = document.querySelector('main');

function getIDCounter(params) {
    let lastID = 1;
    return function () {
        return lastID++
    }
}

const goodidCounter = getIDCounter();
const cartIdCounter = getIDCounter();
const classIDCounter = getIDCounter();
const cart = []
let goods = []

class Card {
    constructor() {
    }

    addToCart(id) {
        const good = goods.find(function (good) {
            return good.id === id;
        });
        good['id'] = cartIdCounter();
        cart.push(good)
    }

    drawCart() {
        $cart.textContent = '';
        if (cart.length > 0) {
            $cart.insertAdjacentHTML('beforeend', `<p>В корзине ${cart.length} товаров на ${Card.prototype.getCartPrice()} рублей`);
        } else {
            $cart.insertAdjacentHTML('beforeend', 'Корзина пуста');
        }
    };

    getCartPrice() {
        return cart.reduce(function (accumulator, good) {
            return accumulator + good.price;
        }, 0)
    };
}


class Good {
    constructor(title, price, img, desc) {
        this.id = goodidCounter();
        this.title = title;
        this.price = price;
        this.img = img;
        this.desc = desc;
    }
}

class GoodsList {
    constructor(num = classIDCounter()) {
        this.num = num;
    }

    fetchGoods() {
        goods = [
            new Good('Телевизор', 1000, 'img/big/0-1.png', 'Описание товара "Телевизор"'),
            new Good('Игра Doom', 1200, 'img/big/1-2.png', 'Описание товара "Игра Doom"'),
            new Good('Кабель', 1100, 'img/big/2-3.png', 'Описание товара "Кабель usb"'),
            new Good('Монитор', 1800, 'img/big/3-1.png', 'Описание товара "монитор"'),
            new Good('Внешний диск', 1500, 'img/big/4-2.png', 'Описание товара "Диск hdd"'),
            new Good('Телевизор', 10000),
            new Good('Игра Doom', 12000, 'img/big/1-2.png', 'Описание товара "Игра Doom"'),
            new Good('Кабель', 11000, 'img/big/2-3.png', 'Описание товара "Кабель usb"'),
            new Good('Монитор', 18000, 'img/big/3-1.png', 'Описание товара "монитор"'),
            new Good('Внешний диск', 15000, 'img/big/4-2.png', 'Описание товара "Диск hdd"'),
        ]
    };

    render() {
        goods.map(({img, desc, price, title, id}) => new GoodsItem({
            title,
            img,
            desc,
            price,
            id
        }).render()).forEach(function (items) {
            $main.insertAdjacentHTML('beforeend', items);
        })
    };

    get_total_sum() {
        let total_sum = 0;
        goods.forEach(function (item) {
            total_sum += item.price
        })
        console.log(total_sum);
        $main.insertAdjacentHTML('afterend', `Сумма всех товаров: ${total_sum} руб.`);
        return total_sum;
    }
}


class GoodsItem {
    constructor({title = 'Заголовок', img = 'img/default.jpg', desc = 'Нет описания', price = 0, id}) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.desc = desc;
        this.price = price;
    }

    render() {
        return `<div class="card">
                    <img class="card-img-top"  src="${this.img}">
                        <div class="card-body h-100"> 
                            <h4 class="card-title">${this.title}</h4>
                            <p class="card-text">${this.desc}</p>
                            <p class="card-text">${this.price}руб.</p>
                            <button data-id="${this.id}" class="btn btn-primary">В корзину</button>
                        </div>
                </div>`;
    };
}

$main.addEventListener('click', function (e) {
    Card.prototype.addToCart(Number(e.target.getAttribute('data-id')));
    Card.prototype.drawCart();
})


const list = new GoodsList();
list.fetchGoods();
list.get_total_sum();
list.render();



// ***********************************************************************************************

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
        this.price = 0;
        this.callories = 0;
        if (this.size === 'small'){
            this.price += 50;
            this.callories += 20;
        }
        else if (this.size === 'big'){
            this.price += 100;
            this.callories += 40;
        }
        else {
            alert('допускаются два размера "big" и "small"');
            console.log('допускаются два размера "big" и "small"');
        }
        if (stuffing === 'cheese') {
            this.price += 10;
            this.callories += 20;
        }
        else if (stuffing === 'salad') {
            this.price += 20;
            this.callories += 5;
        }
        else if (stuffing === 'potatoes') {
            this.price += 15;
            this.callories += 10;
        }
        else {
            alert('допускаются следующие начинки "cheese", "salad" и "potatoes"');
            console.log('допускаются следующие начинки "cheese", "salad" и "potatoes"');
        }

    };

    addTopping(topping) {
        if (topping === 'seasoning' ){
            this.topping.push(topping);
            this.price += 15;
        }
        else if (topping === 'mayonnaise'){
            this.topping.push(topping);
            this.price += 20;
            this.callories += 5;
        }
        else {
            alert('допускаются две добавки "seasoning" и "mayonnaise"');
            console.log('допускаются две добавки "seasoning" и "mayonnaise"');
        }

    };

    removeTopping(topping) {
        let topppingIndex = this.topping.indexOf(topping);
        if (topppingIndex >= 0){
            if (topping === 'seasoning'){
                this.topping.splice(topppingIndex,1);
                this.price -= 15;
            }
            else if (topping === 'mayonnaise'){
                this.topping.splice(topppingIndex,1);
                this.price -= 20;
                this.callories -=5;
            }
            else{
                alert('допускаются две добавки "seasoning" и "mayonnaise"');
                console.log('допускаются две добавки "seasoning" и "mayonnaise"');
            }
        }
        else{
            alert('Вы пытаетесь удалить отсутствующие добавки');
            console.log('Вы пытаетесь удалить отсутствующие добавки');
        }
    };

    getToppings() {
        this.topping.forEach((item, index, array) => {
            console.log(`Добавка ${item}`)
            return item
        })

    };

    getSize() {
        console.log(`Размер бургера: ${this.size}`)
        return this.size
    };

    getStuffing() {
        console.log(`Начинка бургера: ${this.stuffing}`)
        return this.stuffing
    };

    calculatePrice() {
        console.log(`Цена бургера: ${this.price}руб.`)
        return this.price
    };

    calculateCalories() {
        console.log(`Каллорийность бургера: ${this.callories}калл`)
        return this.callories
    };
}

// ***********************************************************************************************