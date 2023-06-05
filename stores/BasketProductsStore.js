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

    function pushProduct(product) {
        if (!checkProduct(product)){
            basketProducts.value.push(product);
            localStorage.setItem('basketProducts', JSON.stringify(basketProducts.value));
        }

    }

    function createTotalBasket(item) {
        totalBasket.value = '';
        totalBasket.value = item;
        localStorage.setItem('totalBasket', JSON.stringify(totalBasket.value));
    }

    function checkProduct(product) {
        for (const productBasket of basketProducts.value) {
            if(productBasket.id === product.id){
                return true;
            }
        }
        return false;
    }

    function removeProduct(product) {
        if (checkProduct(product)){
            for (const productBasket of basketProducts.value) {
                if(productBasket.id === product.id){
                    basketProducts.value.splice(basketProducts.value.indexOf(productBasket), 1);
                }
            }
            localStorage.setItem('basketProducts', JSON.stringify(basketProducts.value));
        }
    }

    return {
        basketProducts,
        pushProduct,
        needUpdate,
        removeProduct,
        getTotalBasket,
        createTotalBasket,
        checkProduct,
        getBasketProducts,
    }

})
