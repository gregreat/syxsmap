(function () {
    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('mainMap', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        console.log('complete !');
        var str=['定位成功User'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        if(data.accuracy){
            str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        document.getElementById('tip').innerHTML = str.join('<br>');
        var oDate = new Date(),
            Y = oDate.getFullYear(),
            M = (oDate.getMonth()+1 < 10 ? '0'+(oDate.getMonth()+1) : oDate.getMonth()+1),
            D = oDate.getDate(),
            h = oDate.getHours(),
            m = oDate.getMinutes(),
            s = oDate.getSeconds();
        var oTime = Y+''+M+''+D+''+h+''+m+''+s;
        var locationData = {t: oTime, lng:data.position.getLng(), lat:data.position.getLat()};
        setInterval(function(){
            //console.log(locationData);
            $.ajax({
                url : 'DB.php',
                type : 'POST',
                data : locationData,
                success : function () {
                    console.log('post success');
                },
                error : function () {
                    console.log('error');
                }
            });
        }, 5000);

    }
    //解析定位错误信息
    function onError(data) {
        document.getElementById('tip').innerHTML = '定位失败';
    }
})();
