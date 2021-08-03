"use strict";

const $main = document.querySelector("main")


class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {title: 'Телевизор', price: 1000, img: 'img/big/0-1.png', desc: 'Описание товара "Телевизор"'},
            {title: 'Игра Doom', price: 1200, img: 'img/big/1-2.png', desc: 'Описание товара "Игра Doom"'},
            {title: 'Кабель', price: 1100, img: 'img/big/2-3.png', desc: 'Описание товара "Кабель usb"'},
            {title: 'Монитор', price: 1800, img: 'img/big/3-1.png', desc: 'Описание товара "монитор"'},
            {title: 'Внешний диск', price: 1500, img: 'img/big/4-2.png', desc: 'Описание товара "Диск hdd"'},
            {title: 'Телевизор', price: 10000,},
            {title: 'Игра Doom', price: 12000, img: 'img/big/1-2.png', desc: 'Описание товара "Игра Doom"'},
            {title: 'Кабель', price: 11000, img: 'img/big/2-3.png', desc: 'Описание товара "Кабель usb"'},
            {title: 'Монитор', price: 18000, img: 'img/big/3-1.png', desc: 'Описание товара "монитор"'},
            {title: 'Внешний диск', price: 15000, img: 'img/big/4-2.png', desc: 'Описание товара "Диск hdd"'},
        ]
    };

    render() {
        this.goods.map(({img, desc, price, title}) => new GoodsItem({title, img, desc, price}).render()).
        forEach(function (items){
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
    constructor({title = 'Заголовок', img = 'img/default.jpg', desc = 'Нет описания', price = 0}) {
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
                            <button data-id="" class="btn btn-primary">В корзину</button>
                        </div>
                </div>`;
    };
}

const list = new GoodsList();
list.fetchGoods();
list.get_total_sum();
list.render();