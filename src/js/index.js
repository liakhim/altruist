let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        showMenu: false,
        activeTab: 'orders',
        activeColor: 0,
        activeSize: 'xs', // ['xs', 's', 'm', 'l', 'xl']
        showNotification: false,
        showAuthBlock: false,
        headerCartCounter: 1,
        products: [
            {
                id: 0,
                quantity: 1
            },
            {
                id: 1,
                quantity: 3
            }
        ],
        loginEmail: '',
        loginEmailError: '',
        loginPassword: '',
        loginPasswordError: '',
        signUpEmail: '',
        signUpEmailError: '',
        signUpName: '',
        signUpNameError: '',
        signUpLastName: '',
        signUpLastNameError: '',
        loginFormSend: false,
        signInFormSend: false,
        mailCheckbox: false,
        termsCheckbox: false,
        orderCreated: false,
        cartName: '',
        cartLastName: '',
        cartPhone: '',
        cartEmail: '',
        cartComment: '',
        cartSend: false
    },
    methods: {
        incrementQuantity (item) {
            let ind = this.products.indexOf(this.products.find(v => v.id === item))
            this.products[ind].quantity++
        },
        decrementQuantity (item) {
            let ind = this.products.indexOf(this.products.find(v => v.id === item))
            if (this.products[ind].quantity > 1) {
                this.products[ind].quantity--
            }
        },
        scrollToTop() {
            window.scrollTo(0,0);
        },
        addToCart() {
            this.headerCartCounter++
            this.scrollToTop()
            this.showNotification = true
        },
        createOrder () {
            if (!this.termsCheckbox || !this.mailCheckbox) {

            }
            this.orderCreated = true
        }
    },
    watch: {
        mailCheckbox () {
            this.orderCreated = false
        },
        termsCheckbox() {
            this.orderCreated = false
        }
    }
})

let swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
});
let swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});
let swiper3 = new Swiper(".product-sub-slider", {
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
});
let swiper4 = new Swiper(".product-main-slider", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper3,
    },
});