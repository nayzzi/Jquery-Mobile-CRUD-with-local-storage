window.onload = function() {
    var logviewData = [];
    var latitude = "";
    var longitude = "";
    let category = "";

    $(document).ready(function() {
        $('a').on('click tap', function(e) {
            location.replace("#page2");
            category = $(this).data("value");
            document.getElementById("category1").innerHTML = category;
        });
    });

    document.getElementById("homebtn1").onclick = function() {
        location.replace("#page");
        resetFields();
    };

    document.getElementById("homebtn2").onclick = function() {
        location.replace("#page");
    };

    document.getElementById("nxtbtn").onclick = function() {
        var $crntcategory = category;
        var $nxtcategory = "";
        switch ($crntcategory) {
            case "Quiltex":
                $nxtcategory = "Kleenox";
                break;
            case "Kleenox":
                $nxtcategory = "InHouseBrand";
                break;
            case "InHouseBrand":
                $nxtcategory = "AbSorbent";
                break;
            case "AbSorbent":
                $nxtcategory = "SoftLife";
                break
            case "SoftLife":
                $nxtcategory = "Quiltex";
                break;

        }
        category = $nxtcategory;
        document.getElementById("category1").innerHTML = category;
        resetFields();

    }

    document.getElementById("prebtn").onclick = function() {
        var $crntcategory = category;
        var $nxtcategory = "";
        switch ($crntcategory) {
            case "Quiltex":
                $nxtcategory = "SoftLife";
                break;
            case "Kleenox":
                $nxtcategory = "Quiltex";
                break;
            case "InHouseBrand":
                $nxtcategory = "Kleenox";
                break;
            case "AbSorbent":
                $nxtcategory = "InHouseBrand";
                break
            case "SoftLife":
                $nxtcategory = "AbSorbent";
                break;

        }

        category = $nxtcategory;
        document.getElementById("category1").innerHTML = category;
        resetFields();

    }
    document.getElementById("shwLogbtn").onclick = function() {

        location.replace("#page3");
        document.getElementById("category2").innerHTML = category;

        if (localStorage.length > 0) {
            let logviewData = JSON.parse(localStorage.getItem("myobj"));
            var text = "";
            $.each(logviewData, function(index, value) {
                if (value.category == category) {
                    text += value.date + " , " + value.latitude + " , " + value.longitude + " , " + value.ProductCode + " , " +value.NoOfRolls + " , "+ value.width + " , " + value.length + " , " + value.softness + " , " + value.category + "<br>";
                }
            });
            document.getElementById("result").innerHTML = text;
        }
        resetFields();

    }
    document.getElementById("submit").onclick = function() {
        var isValid = true;
        $('#productCode,#NoOfRolls,#width,#length').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
            } else {
                $(this).css({
                    "border": "",
                    "background": ""
                });

            }
        });
        if (isValid == true) {
            if (validate()) {
                submit();
                resetFields();
            }
        }

    }

    function validate() {
        var productCode = document.getElementById('productCode').value;
        var productCodeRGEX = /^[A-Za-z0-9]{4,4}$/;
        var productCodeRes = productCodeRGEX.test(productCode);
        var NoOfRolls = document.getElementById("NoOfRolls").value;
        var NoOfRollsRGEX = /^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|1000)$/;
        var NoOfRollsRes = NoOfRollsRGEX.test(NoOfRolls);
        var width = document.getElementById("width").value;
        var widthRGEX = /^([1-9]|1[0-5])$/;
        var widthRes = widthRGEX.test(width);
        var length = document.getElementById("length").value;
        var lengthRGEX = /^([1-9]|1[0-5])$/;
        var lengthRes = lengthRGEX.test(length);


        if (productCodeRes == false) {
            $('#productCode').css({
                "border": "1px solid red",
                "background": "#FFCECE"
            });
            alert('Please enter a valid Product Code');
            return false;
        }

        if (NoOfRollsRes == false) {
            $('#NoOfRolls').css({
                "border": "1px solid red",
                "background": "#FFCECE"
            });
            alert('Please enter a valid Number Of Rolls Stacked');
            return false;
        }

        if (widthRes == false) {
            $('#width').css({
                "border": "1px solid red",
                "background": "#FFCECE"
            });
            alert('Please enter a valid Width');
            return false;
        }

        if (lengthRes == false) {
            $('#length').css({
                "border": "1px solid red",
                "background": "#FFCECE"
            });
            alert('Please enter a valid Length');
            return false;
        }

        return true;
    }

    document.getElementById("resetBtn").onclick = function() {

        resetFields();
    }

    function resetFields() {
        $('input[type="text"]').val('');
        //$('select').children('option').removeAttr('selected').filter(':nth-child(1)').attr('selected', true);
        //$('#softness').prop('selectedIndex',0);
        $('#productCode,#NoOfRolls,#width,#length').each(function() {
            $(this).css({
                "border": "",
                "background": ""
            });
        });

    }

    function submit() {

        loaderOn();
        var $productCode = document.getElementById("productCode").value;
        var $NoOfRolls = document.getElementById("NoOfRolls").value;
        var $width = document.getElementById("width").value;
        var $length = document.getElementById("length").value;
        var $softness = document.getElementById("softness").value;


        if (localStorage.length > 0) {
            logviewData = JSON.parse(localStorage.getItem("myobj"));
        }
        var currentdate = new Date();
        var datetime = +currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear() + " " +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds();

        if ("geolocation" in navigator) { //check geolocation available
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function(position) {
                $("#result").html(datetime + " , " + position.coords.latitude + " , " + position.coords.longitude);
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                let mynewobj = {
                    date: datetime,
                    latitude: latitude,
                    longitude: longitude,
                    ProductCode: $productCode,
                    NoOfRolls: $NoOfRolls,
                    width: $width,
                    length: $length,
                    softness: $softness,
                    category: category
                }

                logviewData.push(mynewobj);
                let myobjSerialized = JSON.stringify(logviewData);
                localStorage.setItem("myobj", myobjSerialized);
                loaderOff();
                alert("Log Saved");
            });
        } else {
            console.log("Browser doesn't support geolocation!");
        }
    }

    document.getElementById("send").onclick = function() {

        var r = confirm("Send Logs?\nDo you want to send all logs, this has effect of deleting all logs ?");
        if (r == true) {
            logviewData = [];
            localStorage.clear();
            var text = "";
            document.getElementById("result").innerHTML = text;
            alert("Logs Sent !");

            if (localStorage.length > 0) {
                logviewData = JSON.parse(localStorage.getItem("myobj"));
            }
        }
    };

    function loaderOn() {

        var $this = $(this),
            theme = $this.jqmData("theme") || $.mobile.loader.prototype.options.theme,
            msgText = $this.jqmData("msgtext") || $.mobile.loader.prototype.options.text,
            textVisible = $this.jqmData("textvisible") || $.mobile.loader.prototype.options.textVisible,
            textonly = !!$this.jqmData("textonly");
        html = $this.jqmData("html") || "";
        $.mobile.loading("show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
        })
    }

    function loaderOff() {
        $.mobile.loading("hide");
    }
}