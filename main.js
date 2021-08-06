"use strict";
const $cart = document.querySelector('.cart');
const $main = document.querySelector('main');
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const cartIdCounter = getIDCounter();
const classIDCounter = getIDCounter();
const cart = []
let ggoods = []

function makeGETRequest(url, callback) {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

function getIDCounter() {
    let lastID = 1;
    return function () {
        return lastID++
    }
}


class Cart {
    constructor() {
    }

    addToCart(id) {
        let good = ggoods.find(item => item.id_product === id);
        good['id_product'] = cartIdCounter();
        cart.push(good)
    }

    drawCart() {
        $cart.textContent = '';
        if (cart.length > 0) {
            $cart.insertAdjacentHTML('beforeend', `<p>В корзине ${cart.length} товаров на ${Cart.prototype.getCartPrice()} рублей`);
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


class GoodsList {
    constructor(num = classIDCounter()) {
        this.num = num;
        this.goods = [];

    }

    fetchGoods() {
        return new Promise(resolve => {
            makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                this.goods = JSON.parse(goods);
                ggoods.push(...this.goods);
                console.log(ggoods);
                resolve();
            })
        })
    }


    render() {
        this.goods.map(({id_product, product_name, price, img}) => new GoodsItem({
            id_product,
            product_name,
            price,
            img,
        }).render()).forEach(function (items) {
            $main.insertAdjacentHTML('beforeend', items);
        })
    };

    get_total_sum() {
        let total_sum = 0;
        this.goods.forEach(function (item) {
            total_sum += item.price
        })
        console.log(total_sum);
        $main.insertAdjacentHTML('afterend', `Сумма всех товаров: ${total_sum} руб.`);
        return total_sum;
    }
}


class GoodsItem {
    constructor({product_name = 'Заголовок', img = 'img/default.jpg', price = 0, id_product}) {
        this.id = id_product;
        this.title = product_name;
        this.img = img;
        this.desc = 'описания в API нет';
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
    Cart.prototype.addToCart(Number(e.target.getAttribute('data-id')));
    Cart.prototype.drawCart();
})


const list = new GoodsList();

list.fetchGoods()
    .then(() => list.render())
    .then(() => list.get_total_sum())





