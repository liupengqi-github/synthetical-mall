window.addEventListener('load',function () {   //牛逼不牛逼！！！
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,    //表示：每张图片切换之间的距离,如果是30，就代表这张图片与下一张有30px的空白距离
        centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左
        autoplay: {
            delay: 2500,   //delay 这个参数，就是我们定时器，设置多少毫秒后切换
            disableOnInteraction: false,   //如果参数是true的话，触碰之后停止切换，如果是false的话，触碰之后不会停止自动切换
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,         //参数如果是true的话，那么我的小圆点就可以点击切换
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})