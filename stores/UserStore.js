import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', () => {
    const user = ref();
    const disabled_send_count = ref(0);
    const userCity = ref('');
    const userInfo = ref('');
    const ipInfoCity = ref('');
    const userCountBasketProducts = ref(0);
    const agree_on_cookie = ref(JSON.parse(localStorage.getItem('agree_on_cookie')));

    if (!agree_on_cookie.value) {
        localStorage.setItem('agree_on_cookie', JSON.stringify(false));
    }

    function SetAgreeOnCookie() {
        agree_on_cookie.value = true;
        localStorage.setItem('agree_on_cookie', JSON.stringify(true));
    }

    function getUser() {
        if (localStorage.getItem('user')){
            user.value = JSON.parse(localStorage.getItem('user'));
        }
        return user
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function getUserCity() {
        if (localStorage.getItem('userCity')){
            userCity.value = JSON.parse(localStorage.getItem('userCity'));
        }
        return userCity
    }

    function getUserCountBasketProducts() {
        if (localStorage.getItem('userCountBasketProducts')){
            userCountBasketProducts.value = JSON.parse(localStorage.getItem('userCountBasketProducts'));
        }
        return userCountBasketProducts
    }

    function getDis() {
        if (localStorage.getItem('disabled_send_count')){
            disabled_send_count.value = JSON.parse(localStorage.getItem('disabled_send_count'));
        }
        return disabled_send_count
    }

    function addUser(data) {
        user.value = data;
        localStorage.setItem('user', JSON.stringify(user.value));
    }

    function addUserCountBasketProducts(data) {
        userCountBasketProducts.value = data;
        localStorage.setItem('userCountBasketProducts', JSON.stringify(userCountBasketProducts.value));
    }

    function addUserInfo(data) {
        userInfo.value = data;
    }

    function addUserCity(data) {
        userCity.value = data;

        localStorage.setItem('userCity', JSON.stringify(userCity.value));
    }

    function addDis() {
        disabled_send_count.value++;
        localStorage.setItem('disabled_send_count', JSON.stringify(disabled_send_count.value));
    }

    function removeDis() {
        disabled_send_count.value = 0;
        localStorage.setItem('disabled_send_count', JSON.stringify(disabled_send_count.value));
    }

    function removeUser() {
        user.value = '';
        localStorage.setItem('user', user.value);
    }

    return {
        user,
        disabled_send_count,
        userCity,
        userInfo,
        userCountBasketProducts,
        addUser,
        addUserInfo,
        addDis,
        ipInfoCity,
        removeDis,
        agree_on_cookie,
        SetAgreeOnCookie,
        getCookie,
        addUserCountBasketProducts,
        getDis,
        getUserCountBasketProducts,
        removeUser,
        getUser,
        getUserCity,
        addUserCity,
    }
})
