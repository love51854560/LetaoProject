/**
 * Created by 朱青亮 on 2017/10/31.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 2;

    function render() {
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                // console.log(data);
                var html = template('tpl',data);
                $('tbody').html(html);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    size:'small',
                    onPageClicked:function (event,originalEvent,type,page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render();
    
    $('.btn_add').on('click',function () {
        $('#addCate2').modal('show');

        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            type:'get',
            success:function (data) {
                // console.log(data);
                var html = template('tpl2',data);
                $('.dropdown-menu').html(html);
            }
        })
    });

    $('.dropdown-menu').on('click','li a',function () {
        $('.dropdown-text').text($(this).text());

        $('#categoryId').val($(this).data('id'));
        
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
    });

    $('#fileupload').fileupload({
        dataType:'json',
        done:function (e,data) {
            // console.log(data);
            $('.imgBox img').attr('src',data.result.picAddr);
            $('.imgBox input').val(data.result.picAddr);
            $('#form').data('bootstrapValidator').updateStatus("brandLogo", "VALID")
        }
    });

    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入二级分类的名称'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传图片'
                    }
                }
            }
        }
    });
    
    $('#form').on('success.form.bv',function (e) {
        e.preventDefault();
        
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            success:function (data) {
                // console.log(data);
                $('#addCate2').modal('hide');
                currentPage = 1;
                render();
                $("#form").data('bootstrapValidator').resetForm();
                $('#form')[0].reset();
                $('.dropdown-text').text('请选择一级分类');
                $('.imgBox img').attr('src','images/none.png');
            }
        })
    })
});
