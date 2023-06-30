import {defineStore} from "pinia";

export const useBasketProductsStore = defineStore('basketProductsStore', () => {
    const basketProducts = ref([]);
    const totalBasket = ref('');
    const needUpdate = ref(false);

    function getBasketProducts() {
        if (localStorage.getItem('basketProducts')){
            basketProducts.value = JSON.parse(localStorage.getItem('basketProducts'));
        }
        return basketProducts;
    }

    function getTotalBasket() {
        if (localStorage.getItem('totalBasket')){
            totalBasket.value = JSON.parse(localStorage.getItem('totalBasket'));
        }
        return totalBasket;
    }

    function pushProduct(product, quantity=1) {
        if (!checkProduct(product.id)){
            basketProducts.value.push([product.id, quantity]);
            localStorage.setItem('basketProducts', JSON.stringify(basketProducts.value));
        }

    }

    function destroyBasketProducts() {
        basketProducts.value = [];
        localStorage.setItem('basketProducts', '[]');
    }

    function destroyTotalBasket() {
        totalBasket.value = [];
        localStorage.setItem('totalBasket', '');
    }

    function createTotalBasket(item) {
        totalBasket.value = '';
        totalBasket.value = item;
        localStorage.setItem('totalBasket', JSON.stringify(totalBasket.value));
    }

    function checkProduct(product) {
        for (const productBasket of basketProducts.value) {
            if(parseInt(productBasket[0]) === parseInt(product)){
                return productBasket;
            }
        }
        return false;
    }

    function removeProduct(product) {
        if (checkProduct(product.id)){
            basketProducts.value.splice(basketProducts.value.indexOf(checkProduct(product.id)), 1);
            localStorage.setItem('basketProducts', JSON.stringify(basketProducts.value));
        }
    }

    return {
        basketProducts,
        pushProduct,
        needUpdate,
        removeProduct,
        getTotalBasket,
        destroyBasketProducts,
        destroyTotalBasket,
        createTotalBasket,
        checkProduct,
        getBasketProducts,
    }

})
