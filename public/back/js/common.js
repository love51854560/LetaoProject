/**
 * Created by 朱青亮 on 2017/10/29.
 */
$(function () {
    if(location.href.indexOf('login.html') < 0){
        $.ajax({
            url:'/employee/checkRootLogin',
            type:'get',
            success:function (data) {
                if(data.error == 400){
                    location.href = 'login.html';
                }
            }
        })
    }

    $('.child').prev().on('click',function () {
        $(this).next().slideToggle()
    });


    $(document).ajaxStart(function () {
        NProgress.start();
    });

    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        },500);
    });
    
    $('.lt_head .menu').on('click',function () {

        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now1');
    });

    $('.exit').on('click',function () {
        $('#loginOut').modal("show");
    });

    $('.btn-loginOut').on('click',function () {
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success:function (data) {
                if(data.success){
                    window.location.href = "login.html";
                }
            }
        })
    });

});

