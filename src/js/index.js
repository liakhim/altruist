let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        showMenu: false,
        activeTab: 'orders',
        activeSize: 'xs', // ['xs', 's', 'm', 'l', 'xl']
        products: [
            {
                id: 0,
                quantity: 1
            },
            {
                id: 1,
                quantity: 3
            }
        ]
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