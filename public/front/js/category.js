/**
 * Created by 朱青亮 on 2017/11/1.
 */
$(function () {
    var sc = mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators:false
    });

    $.ajax({
        url:"/category/queryTopCategory",
        type:'get',
        success:function (data) {
            var html = template('tpl',data);
            $('.first-cate').html(html);
            render(data.rows[0].id);
            $('.first-cate li').eq(0).addClass('now1');
        }
    });

    function render(id){
        $.ajax({
            url:'/category/querySecondCategory',
            data:{id:id},
            type:'get',
            success:function (data) {
                var html = template('tpl2',data);
                $('.second-cate').html(html);
            }
        })
    }

    $('.first-cate').on('click','li',function (){
        var id = $(this).data('id');
        render(id);
        $(this).addClass('now1').siblings().removeClass('now1');
        sc.scrollTo(0,0,500);
    });
});