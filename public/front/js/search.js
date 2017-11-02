/**
 * Created by 朱青亮 on 2017/11/2.
 */
$(function () {
    function getHistory() {
        var history = localStorage.getItem('lt_history') || '[]';
        var arr = JSON.parse(history);
        return arr;
    }
    
    function render() {
        var arr = getHistory();
        var html = template('tpl',{arr:arr});
        $('.lt_history').html(html);
    }

    render();

    $('.lt_history').on('click','.icon_empty',function () {
        mui.confirm('确认清空吗?','清空记录',['确认','取消'],function (data){
            if(data.index == 0){
                localStorage.removeItem('lt_history');
                render();
                mui.toast('操作成功');
            }
            else{
                mui.toast('操作失败');
            }
        });

    });

    $('.lt_history').on('click','.fa-close',function () {
        var that = $(this);
        mui.confirm('您确认删除此记录吗?','删除记录',['确认','取消'],function (data) {
            if(data.index == 0){
                var index = that.data('index'); 
                var arr = getHistory();
                arr.splice(index,1);
                localStorage.setItem('lt_history',JSON.stringify(arr));
                render();
                mui.toast('操作成功');
            }
            else {
                mui.toast('操作失败');
            }
        })
    });

    $('.search_btn').on('click',function () {

        var value = $('.search_text').val();

        if(value.trim().length === 0){
            mui.toast('亲,您想买什么呢?');
            return;
        }
        var arr = getHistory();
        arr.push(value);
        var index = arr.indexOf(value);

        if(index>-1){
            arr.splice(index,1);
            arr.unshift(value);
        }

        if(arr.length > 10){
            arr.pop();
        }

        localStorage.setItem("lt_history",JSON.stringify(arr));

        render();

        // location.href = "searchList.html?value="+value;

        $('.search_text').val("");
    });
});
