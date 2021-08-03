﻿"use strict";

const $main = document.querySelector("main")

const goods = [
    {title: 'Телевизор', price: 1000, img: 'img/big/0-1.png', desc: 'Описание товара "Телевизор"'},
    {title: 'Игра Doom', price: 1200, img: 'img/big/1-2.png', desc: 'Описание товара "Игра Doom"'},
    {title: 'Кабель', price: 1100, img: 'img/big/2-3.png', desc: 'Описание товара "Кабель usb"'},
    {title: 'Монитор', price: 1800, img: 'img/big/3-1.png', desc: 'Описание товара "монитор"'},
    {title: 'Внешний диск', price: 1500, img: 'img/big/4-2.png', desc: 'Описание товара "Диск hdd"'},
    {title: 'Телевизор', price: 10000, },
    {title: 'Игра Doom', price: 12000, img: 'img/big/1-2.png', desc: 'Описание товара "Игра Doom"'},
    {title: 'Кабель', price: 11000, img: 'img/big/2-3.png', desc: 'Описание товара "Кабель usb"'},
    {title: 'Монитор', price: 18000, img: 'img/big/3-1.png', desc: 'Описание товара "монитор"'},
    {title: 'Внешний диск', price: 15000, img: 'img/big/4-2.png', desc: 'Описание товара "Диск hdd"'},
];

const renderGoodsItem = (title, img='img/default.jpg', desc='Нет описания', price) => {
    return `<div class="card">
        <img class="card-img-top"  src="${img}">
            <div class="card-body h-100"> 
                <h4 class="card-title">${title}</h4>
                <p class="card-text">${desc}</p>
                <p class="card-text">${price}руб.</p>
                <button data-id="" class="btn btn-primary">В корзину</button>
            </div>
        </div>`;
}

const renderGoodsList = (list) => {
    let goodsList = list.map(el => renderGoodsItem(el.title, el.img, el.desc, el.price));
    goodsList.forEach(function (item) {
        $main.insertAdjacentHTML('beforeend', item);
    })
}

renderGoodsList(goods);