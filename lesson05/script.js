'use strict';

// 1. Создать функцию, генерирующую шахматную доску.
//  При этом можно использовать любые html-теги по своему желанию.
//  Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
//  Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
// 2*. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К – король, Ф – ферзь и т.п.,

function generateDesk() {
    const col = '87654321';
    const row = 'ABCDEFGH';
    const fig = {
        1:['Л','К','С','Ф','Кр','С','К','Л'],
        2:['П','П','П','П','П','П','П','П'],
        3:['','','','','','','',''],
        4:['','','','','','','',''],
        5:['','','','','','','',''],
        6:['','','','','','','',''],
        7:['П','П','П','П','П','П','П','П'],
        8:['Л','К','С','Ф','Кр','С','К','Л'],
    };
    let deskDiv = document.querySelector('.desk');
    let black = new Boolean();

    function addDiv(text,black, out) {
        const square = document.createElement('div');
        square.classList.add('square');
        deskDiv.appendChild(square);
        square.textContent = text;
        if (black) {square.classList.add('square-black', 'text-white')};
        if (out) {square.classList.add('square-out', 'text-black')};
    }
    
    addDiv('',false,true);
    
    for (let i = 0; i < row.length; i++) {addDiv(row[i],false,true)};

    for (let i = 1; i <= col.length; i++) {
        if (i % 2 == 0) {black = true}
        else {black = false};
        for (let j = 0; j <= row.length; j++) {
            if (j == 0) {addDiv(col[i - 1],false,true)}
            else if (black == false) {addDiv(fig[i][j-1],false,false); black = !black}
            else {addDiv(fig[i][j-1],true,false); black = !black};
        };
    };
};

generateDesk();

// 3. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. 
// Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// 3.1. Пустая корзина должна выводить строку «Корзина пуста»;
// 3.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

const cart = {
    items: [
        {
            product_id: 1,
            product_name: 'товар1',
            product_price: 1000,
            quantity: 1,
        },
        {
            product_id: 2,
            product_name: 'товар2',
            product_price: 500,
            quantity: 5,
        },
    ],
    countCartPrice() {
        return this.items.reduce((totalPrice, cartItem) => totalPrice + cartItem.product_price * cartItem.quantity, 0);
    },
};

function generateCart(cart) {
    const cartDiv = document.querySelector('.cart');
    let HTMLString = `<div class='cart-title'>Корзина:</div>`;
    if (cart.items.length == 0) {
        HTMLString += `Корзина пуста`;
    } else {
        for (let i = 0; i < cart.items.length; i++) {
            HTMLString += `
                <div class='cart-item'>
                    <div class='cart-item-name'>Наименование: ${cart.items[i].product_name}</div>
                    <div class='cart-item-price'>Цена: ${cart.items[i].product_price}</div>
                    <div class='cart-item-balance'>Количество: ${cart.items[i].quantity}</div>
                </div>
                `
        };
        HTMLString += `<div class='cart-sum'>Товаров в корзине: ${cart.items.length} на сумму ${cart.countCartPrice()} рублей</div>`;
    };
    cartDiv.innerHTML = HTMLString;
};

generateCart(cart);

// 4*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
// 4.1. Создать массив товаров (сущность Product);
// 4.2. При загрузке страницы на базе данного массива генерировать вывод из него. 
// HTML-код должен содержать только div id=”catalog” без вложенного кода. 
// Весь вид каталога генерируется JS.

const catalog = {
    products: [
        {
            id: 1,
            name: 'товар1',
            price: 1000,
            balance: 3,
        },
        {
            id: 2,
            name: 'товар2',
            price: 500,
            balance: 30,
        },
        {
            id: 3,
            name: 'товар3',
            price: 4500,
            balance: 1,
        },
        {
            id: 4,
            name: 'товар4',
            price: 100,
            balance: 44,
        },
        {
            id: 5,
            name: 'товар5',
            price: 799,
            balance: 0,
        },
    ],

    findProductById(id) {
        return this.products.find((productItem) => productItem.id === id);
    },

    findGoodsByName(title) {
        return this.products.filter((productItem) => productItem.name === title);
    },

    addProduct(name, price, quantity) {
        let id = this.products.lastIndexOf[id];
        this.products.push(id,name,price,quantity);
    },
};

function generateCatalog(catalog) {
    const catalogDiv = document.querySelector('.catalog');
    let HTMLString = `<div class='catalog-title'>Каталог:</div>`;

    for (let i = 0; i < catalog.products.length; i++) {
        HTMLString +=`
            <div class='catalog-item'>
                <div class='catalog-item-name'>Наименование: ${catalog.products[i].name}</div>
                <div class='catalog-item-price'>Цена: ${catalog.products[i].price}</div>
                <div class='catalog-item-balance'>Остаток: ${catalog.products[i].balance}</div>
            </div>
            `
    };
    catalogDiv.innerHTML = HTMLString;
};

generateCatalog(catalog);