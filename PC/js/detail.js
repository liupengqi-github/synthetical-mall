//等我们html、css加载完毕再运行我们的js
//①鼠标经过小图片盒子，黄色的遮挡层和大图片盒子显示，离开隐藏2个盒子功能
//②黄色的遮挡层跟随鼠标功能
//③移动黄色遮挡层，大图片跟随移动功能
window.addEventListener('load',function () {
    //鼠标一经过图片盒子就让mask 和 big盒子显示出来
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    //①当我们鼠标经过 preview_img 就显示mask遮挡层 和 big大盒子
    preview_img.addEventListener('mouseover',function () {   //鼠标经过触发 mouseover
        mask.style.display = 'block';
        big.style.display = 'block'
    });
    //②鼠标离开就隐藏mask遮挡层 和 big大盒子
    preview_img.addEventListener('mouseout',function () {   //鼠标离开触发 mouseout
        mask.style.display = 'none';
        big.style.display = 'none'
    });
    //③鼠标移动到小图片盒子上，把我鼠标在小盒子内的坐标给mask遮挡层，（鼠标在盒子内坐标就是页面的坐标 - 盒子距离页面的坐标）
    preview_img.addEventListener('mousemove',function (e) {   //鼠标移动就触发：mousemove
        //使用offset要注意我们的父亲、爷爷等有没有定位，如果没有定位就是盒子到页面的距离
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        //④我们的mask小盒子有点疯狂，移动的时候竟然都能移出父盒子，所以我们就要加判断条件给它限定住，因为我们的定位是在父盒子的，所以值不能小于0，不然就超出父盒子了，也不能大于遮挡层在小图片盒子能移动的距离
        //让我们的鼠标在盒子中居中(我们不能把高度的一半和宽度的一半写死，万一它会变呢，我们让offset来获取宽高再除以2就可以实现鼠标与盒子垂直居中了)
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //遮挡层的最大移动距离 300
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;   //反正这个盒子是个正方形，x 和 y 最大移动距离是一样的
        if (maskX <= 0) {         //这个限定就是我们的left 和 top值不能小于0 超过 100，不然会移出父盒子
            maskX = 0
        } else if (maskX >= maskMax) {
            maskX = maskMax   //因为小盒子图片是400px mask是300px，我的mask在里面能移动的距离只有100px
        }
        if (maskY <= 0) {
            maskY = 0
        } else if (maskY >= maskMax) {
            maskY = maskMax
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px'
        //⑤最后，移动我们的黄色遮挡层，我们的大图片也跟着移动（只要我们的大图片和我们的遮挡层比例相同就可以实现同步移动）
        //比例公式：遮挡层移动距离 / 遮挡层最大的移动距离 = 大图片移动距离 / 大图片最大移动距离  （其他的都是已知，我们就大图片就可以了）
        //所以就是 大图片移动的距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大的移动距离
        //大图片最大移动的距离（我的大图片 - 大盒子就是我最大能移动多少距离，所以最大不能超过这个距离可以自由移动）
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        //大图片最大移动的距离的 x 和 y 最后赋值给大图片的left 和 top，别忘记加定位
        bigX = maskX * bigMax / maskMax;
        bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';  //因为我们大图片移动的位置和我们的遮挡层移动的位置是相反的，最后改成负数就可以了
        bigImg.style.top = -bigY  + 'px'
    })
});