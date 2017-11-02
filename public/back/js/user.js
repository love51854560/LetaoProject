$(function () {
    var currentPage = 1;
    var pageSize = 3;

    function render() {
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                // console.log(data);
                var html = template('tpl',data);
                $('tbody').html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    size:"small",
                    onPageClicked:function(event, originalEvent, type,page){
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }
    render();
    $('tbody').on('click','.btn',function () {
        $('#stateChange').modal('show');
        var id = $(this).parent().data("id");
        var isDelete = $(this).parent().data("isDelete");

        $('.btn-stateChange').off().on('click',function () {
            isDelete = isDelete === 1 ? 0 : 1;
            $.ajax({
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                type:'post',
                success:function (data) {
                    if(data.success){
                        $('#stateChange').modal('hide');
                        render();
                    }
                }
            });
        })
    })
});