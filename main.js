"use strict";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

Vue.component('goods-list', {
    // props: ['goods'],
    template: `
    <div class="goods-list">
      <goods-item v-for="good in filteredGoods" :good="good"></goods-item>
    </div>
    `,
    data: () => ({
        goods: [],
        filteredGoods: [],
    }),
    methods: {
        makeGETRequest(url) {
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
        },
        filterGoods(text) {
            const regexp = new RegExp(text, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },

    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`)
            .then(
                result => {
                    this.goods = JSON.parse(result)
                    this.filteredGoods = JSON.parse(result);
                })
    }
});

Vue.component('goods-item', {
    data: () => ({}),
    props: ['good'],
    template: `
    <div class="goods-item" >
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
      <button type="button" class="cart-button" data-bs-toggle="button"  @click="addToCart(good) ">
        В корзину
      </button>
    </div>
  `,
    methods: {
        addToCart(good) {
            if (good) {
                good = JSON.parse(JSON.stringify(good));
                this.$emit('addGoodCart', good);
            }
        }
    },
});

Vue.component('cart', {
    // props: ['good'],
    data: () => ({
        is_visible_cart: false,
        cartEmpty: true,
        cart: [],
        good: {},

    }),
    template: `
        <div @addGoodCart="pushGood">
            <button type="button" class="cart-button btn btn-primary" data-bs-toggle="button" autocomplete="off"
                    @click="showPopup">Корзина
            </button>
            <div id="popup" v-if="is_visible_cart">
                <button id="closePopupBtn" @click="hidePopup">&#x2715;</button>
                <h2>Корзина</h2>
                <div id="cart-details">
                    <div id="cart-item" v-if="cart" v-for="good in cart">
                        <h3>Наименование: {{ good.product_name }}</h3>
                        <p>Цена: {{ good.price }}</p>
                        <p>Количество: {{ good.quantity }}</p>
                    </div>
                <div v-if="cartEmpty"> Корзина пуста </div>
                
                </div>
            </div>
        </div>
  `,
    methods: {
        showPopup() {
            this.is_visible_cart = true;
        },
        hidePopup() {
            this.is_visible_cart = false;
        },
        pushGood(good) {
            let product = this.cart.find(item => item.id_product === good.id_product);
            if (product) {
                if (product.quantity) {
                    product.quantity++
                }
            } else {
                good.quantity = 1;
                this.cart.push(good);
                this.cartEmpty = false;
            }
        },

    }
})


Vue.component('search', {
    data: () => ({
        searchLine: '',
    }),
    template: `
        <div >               
                <input type="text" class="goods-search" v-model="searchLine "/>
                <button class="search-button btn btn-primary" type="button" @click="searchGood(searchLine)" >Искать</button>
        </div>
    `,
    methods: {
        searchGood(value) {
            this.$emit('filterGoods', value)
        },
    }
})
const app = new Vue({
    el: '#app',
    data: {},
})