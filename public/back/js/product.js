/**
 * Created by 朱青亮 on 2017/10/31.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 3;

    function render() {
        $.ajax({
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            type:'get',
            success:function (data) {
                // console.log(data);
                var html = template('tpl',data);
                $('tbody').html(html);

                $('#paginator').bootstrapPaginator({
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
        $('#addCate3').modal('show');

        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:1,
                pageSize:1000
            },
            success:function (data) {
                // console.log(data);
                var html = template('tpl2',data);
                $('.dropdown-menu').html(html);
            }
        })
    });
    
    $('.dropdown-menu').on('click','li a',function () {
        $('.dropdown-text').text($(this).text());
        $('#brandId').val($(this).data('id'));
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    });

    $('#fileupload').fileupload({
        dataType:'json',
        done:function (e,data) {
            $('.imgBox').append('<img src="'+data.result.picAddr+'" width="100" height="100"/>')
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
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入一个大于0的库存'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺寸"
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确的尺码（30-50）"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的折扣价"
                    }
                }
            }
        }
    })
});
