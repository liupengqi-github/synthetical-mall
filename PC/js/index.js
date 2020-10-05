window.addEventListener('load', function() {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i);
        // 把小li插入到ol 里面
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle
            circle = index;
            // num = circle = index;
            console.log(focusWidth);
            console.log(index);

            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';
    // 6. 克隆第一张图片(li)放到ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7. 点击右侧按钮， 图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; // 打开节流阀
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });

    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);

    $(function () {
        // 当我们点击了小li，此时不需要执行页面滚动事件里面的li的背景选择，也就是说不需要添加current的这个类
        //可以用节流阀 也叫 互斥锁来控制
        var flag = true
        //第一步，当我们滚动到今日推荐模块，就让电梯导航显示出来
        var recommendTop = $(".recommend").offset().top   //获取今日推荐模块距离页面顶部的距离
        toggleTool();   //因为我们写的程序有bug，页面一刷新就没有电梯导航了，是因为只有滚动它才会滑动出来，所以我们页面已加载就要先调用一次这个函数
        function toggleTool(){
            if ($(document).scrollTop() >= recommendTop) {
                $(".fixedtool").fadeIn()
            } else {
                $(".fixedtool").fadeOut()
            }
        }
        $(window).scroll(function () {   //当我们页面滚动才显示，所以记得在页面一加载再调用一下函数
            toggleTool();
            //当我们页面滚动到内容区域某个模块，左侧电梯导航，相对应的小li模块，也会添加current类，兄弟移除current类
            //3.需要用到each，遍历内容区域大模块。each里面能拿到内容区域每一个模块元素和索引号
            if (flag) {   //首先默认会执行一次页面滚动事件，剩下的就要判断如果我点击了小li就停止页面滚动添加类名，但是我们的点击事件做完，就让我们的页面滚动事件添加类名开启
                $(".floor .w").each(function (i,ele) {   //触发的事件是页面滚动 因此这个功能要写到页面滚动事件里面
                    if ($(document).scrollTop() >= $(ele).offset().top) {    //判断：被卷去的头部 大于等于 内容区域里面每个模块的offset().top
                        console.log(i)
                        $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                    }
                })
            }
        })
        //第二步，点击电梯导航页面可以滚动到相应内容区域
        //核心算法：因为电梯导航模块和内容区模块一一对应的
        //所以 当我们点击电梯导航某个小模块，就可以拿到小模块的索引号
        //就可以把animate要移动的距离求出来：当前索引号内容区域模块它的offset().top
        //然后执行动画即可
        $(".fixedtool li").click(function () {
            //因为我们一点击模块就会触发滚动事件，也会添加类名，所以我们一点击小li就关闭节流阀
            flag = false;
            //我们给四个小li绑定单击事件，然后获取当前点击的索引号：index()
            //console.log($(this).index())
            //当我们每次点击小li，就需要计算出页面要去往的位置
            //我们把当前点击的索引号给下面的大盒子，通过eq(索引号)的方法来实现联动，因为我们下面大盒子获取也是一起获取的，也是根据小盒子点击的哪个就获取哪个大盒子的offset().top值
            //选出对应索引号的内容区的盒子 计算它的offset().top
            var current = $(".floor .w").eq($(this).index()).offset().top
            //console.log(current)
            //页面动画滚动效果
            $("body,html").stop().animate({   //别忘了让我们的动画停止排队 stop()
                //记住：我们的scrollTop是可以返回页面头部的位置的
                scrollTop: current
            },function () {
                //只有我们的动画做完了，才打开你的节流阀，让我们的页面滚动事件运行
                flag = true
            })
            //排他思想，让当前的小li添加current类名（点击之后，让当前的小li添加current类名，姐妹移除类名）
            $(this).addClass("current").siblings().removeClass()  //因为兄弟和类名都只有小li和current，可以默认不用写（链式编程）
        })
    })
})