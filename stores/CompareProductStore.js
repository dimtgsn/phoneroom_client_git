import {defineStore} from "pinia";

export const useCompareProductStore = defineStore('compareProductStore', () => {
    const compareProducts = ref([]);
    const needUpdate = ref(false);

    function getCompareProducts() {
        if (localStorage.getItem('compareProducts')){
            compareProducts.value = JSON.parse(localStorage.getItem('compareProducts'));
        }
        return compareProducts;
    }

    function pushProduct(product) {
        if (!checkProduct(product.id)){
            compareProducts.value.push(product.id);
            localStorage.setItem('compareProducts', JSON.stringify(compareProducts.value));
        }
    }

    function checkProduct(product) {
        for (const productCompare of compareProducts.value) {
            if(parseInt(productCompare) === parseInt(product)){
                return product;
            }
        }
        return false;
    }

    function removeProduct(product) {
        if(checkProduct(product.id)){
            compareProducts.value.splice(compareProducts.value.indexOf(product.id, 1));
            localStorage.setItem('compareProducts', JSON.stringify(compareProducts.value));
        }
    }

    return {
        compareProducts,
        pushProduct,
        needUpdate,
        removeProduct,
        checkProduct,
        getCompareProducts,
    }
});
