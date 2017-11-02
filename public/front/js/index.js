/**
 * Created by 朱青亮 on 2017/11/1.
 */
$(function () {
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:500
    });

    mui('.mui-scroll-wrapper').scroll({
        scrollY: true,
        scrollX: false,
        indicators: false
    });
});
