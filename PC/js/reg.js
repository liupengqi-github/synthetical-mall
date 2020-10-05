window.onload = function () {
    //手机号码的正则表达式
    var regtel = /^1[3|4|5|7|8]\d{9}$/;   //手机号：13、14、15、17、18、...等等,后面九位就随意了
    var regqq = /^[1-9]\d{4,10}$/     //10000       第一个必须是1-9，剩下的只要小于等于10位，大于等于4位就可以了
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/
    var regcode = /^\d{6}$/
    var regLogin = /^[a-zA-Z0-9_-]{6,16}$/
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq')
    var nc = document.querySelector('#nc')
    var code = document.querySelector('#code')
    var Login = document.querySelector('#Login')
    var enter = document.querySelector('#enter')
    regexp(tel,regtel)   //验证手机号码
    regexp(qq,regqq)     //qq
    regexp(nc,regnc)     //昵称
    regexp(code,regcode)  //短信验证码
    regexp(Login,regLogin)   //密码
    //表单验证的函数
    function regexp(ele,reg) {   //代码都是一样的，何不封装一个函数呢
        ele.onblur = function () {
            if (reg.test(this.value)) {
                // console.log('正确')
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您，输入正确';
            }else {
                // console.log('错误')
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请从新输入';
            }
        }
        enter.onblur = function () {
            if (this.value  == Login.value) {
                this.nextElementSibling.className = 'success'
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您，输入正确'
            } else {
                this.nextElementSibling.className = 'error'
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次密码输入不一致'
            }
        }
    }
};