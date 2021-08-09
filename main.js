"use strict";
const $cart = document.querySelector('.cart');
const $cartButton = document.querySelector('.cart-button');
// const $main = document.querySelector('main');
const $main = document.querySelector('.goods-list');
const $popup = document.querySelector('#popup');
const $closePopupBtn = document.querySelector('#closePopupBtn');
const $cartDetails = document.querySelector('#cart-details');
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const cartIdCounter = getIDCounter();
const classIDCounter = getIDCounter();
const cart = []
const _goods = []


function makeGETRequest(url) {
    return new Promise(function (resolve, reject) {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
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
        let good = _goods.find(item => item.id_product === id);
        good = JSON.parse(JSON.stringify(good));
        good['id_product'] = cartIdCounter();
        cart.push(good)
    }

    removeFromCart(id) {
        const goodIndex = cart.findIndex(function (good) {
            return good.id === id;
        });
        cart.splice(goodIndex, 1);
    }

    drawCart() {
        $cart.textContent = '';
        if (cart.length > 0) {
            $cart.insertAdjacentHTML('beforeend', `<p>В корзине ${cart.length} товаров на ${Cart.prototype.getCartPrice()} рублей`);
        } else {
            $cart.insertAdjacentHTML('beforeend', 'Корзина пуста');
        }
        $cartDetails.textContent = '';
        cart.forEach(function (good) {
            Cart.prototype.drawCartItem(good);
        })
    };

    drawCartItem({product_name, price, id_product}) {
        const html = `<div class="cartItem">
        <h2>${product_name}</h2>
        <p class="price">${price}р</p>
        <button data-id="${id_product}">Удалить</button>
    </div>`;

        $cartDetails.insertAdjacentHTML('beforeend', html);
    }

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
        makeGETRequest(`${API_URL}/catalogData.json`)
            .then(
                result => {
                    this.goods = JSON.parse(result)
                    _goods.push(...this.goods)
                    this.render()
                    this.get_total_sum()
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

function showPopup() {
    $popup.style.display = 'flex'
}

function hidePopup() {
    $popup.style.display = 'none'
}

$cartButton.addEventListener('click', showPopup);
$closePopupBtn.addEventListener('click', hidePopup);
$cartDetails.addEventListener('click', function (e) {
    Cart.prototype.removeFromCart(Number(e.target.getAttribute('data-id')));
    Cart.prototype.drawCart();
})

const list = new GoodsList();
list.fetchGoods()







