/**
 * Created by 朱青亮 on 2017/10/31.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 2;

    function render() {
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                // console.log(data);
                var html = template('tpl',data);
                $('table tbody').html(html);

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

    $('.btn_add').on('click',function () {
        $('#addCate').modal('show');
    });

    $('#form').bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'分类不能为空'
                    }
                }
            }
        }
    });

    $('#form').on('success.form.bv',function (e) {
        e.preventDefault();

        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:$('#form').serialize(),
            success:function (data) {
                if(data.success){
                    $('#addCate').modal('hide');
                    currentPage = 1;
                    render();
                    $('#form').data('bootstrapValidator').resetForm();
                    $('#form')[0].reset();
                }
            }
        })
    })
});
