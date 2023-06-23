$(document).ready(function () {
    $('.testimonial').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: ' <button class="slick-prev slick-arrow" aria-label="Previous" type="button"><img src="resources/images/arrow-left.svg" /> </button>',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><img src="resources/images/arrow-right.svg" /></button>',
        dots: true,

        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1
            }
        }]
    });


    $('.designSlider').slick({

        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
        prevArrow: ' <button class="slick-prev slick-arrow" aria-label="Previous" type="button"><img src="resources/images/arrow-left-white.svg" /> </button>',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><img src="resources/images/arrow-right-white.svg" /></button>',
        dots: false,

        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2
            }
        }]
    });


    // form validation


    $('#send').click(function (event) {
 
        event.preventDefault();


        if (validateExp()) {
            var resultData = $('#consultForm').serialize();
            console.log("validate")
        }
        else {
            console.log("not validate")

        }
    });


});


    function validateExp() {
 
        var IsValid = true;
        var name = document.getElementById("txtexpName").value;
        if (name.trim() == "" || name.trim() == "Please enter your name") {
            $('#spnName').text('Please enter your name')
            IsValid = false;
        }
        else if (name.trim() != "" && name.trim() != "Please enter your name" && ischar(name.trim()) == false) {
            $('#spnName').text('Please enter valid name');
            IsValid = false;
        }
        else if (!(chkSpecialchar(name.trim()))) {
            $('#spnName').text('Please enter valid name');
            IsValid = false;
        }
        else {
            $('#spnName').text('')
        }

        var email = document.getElementById("txtexpEmail").value;
        if (email.trim() == "" || email.trim() == "Email Address") {
            $('#spnEmail').text('Please enter your email address');
            IsValid = false;
        }
        else if (ValidateEmail(email.trim()) == false) {
            $('#spnEmail').text('Please enter valid email address');
            IsValid = false;
        }
        else {
            $('#spnEmail').text('');
        }


        //Mobile Number
        var phoneNumber = document.getElementById("txtexpPhone").value;
        if (phoneNumber == "" || phoneNumber == "Mobile Number") {
            $('#spnMobileNumber').text('Please enter your mobile number')
            IsValid = true;
        }
        else if (isInteger(phoneNumber) == false) {
            $('#spnMobileNumber').text('Please enter numbers only')
            IsValid = false;
        }

        else if (phoneNumber == "0000000000" || phoneNumber == "6666666666" || phoneNumber == "7777777777" || phoneNumber == "8888888888" || phoneNumber == "9999999999" || phoneNumber == "9876543210" || phoneNumber == "0123456789") {
            $('#spnMobileNumber').text('Please enter valid mobile number');
            IsValid = false;
        }

        else {
            $('#spnMobileNumber').text('');
        }

        var pincode = document.getElementById("txtexpPinCode").value;
        if (pincode.trim() == "" || pincode.trim() == "0") {
            $('#spnPinCode').text('Please enter valid pincode');
            IsValid = false;
        }
        else if (isInteger(pincode) == false) {
            $('#spnPinCode').text('Please enter numbers only')
            IsValid = false;
        }
        else if (pincode.length < 6) {
            $('#spnPinCode').text('Your pin code must contain 6 digits')
            IsValid = false;
        }
        else {
            $('#spnPinCode').text('');
        }


        //Accept Terms and Condition
        var isTermsAccepted = document.getElementById("chkAccept");
        if (!isTermsAccepted.checked) {
            $('#spnAccept').text('Please accept terms and conditions');
            IsValid = false;
        }
        else {
            $('#spnAccept').text('');
        }
        var $form = $('#consultForm');

        if ($form.length === 0) return false;
       
        var source = '';
        var medium = '';
        var campaign = '';
        var term = '';
        var keyword = '';
        var adgroup = '';
        var content = '';

        if ((getUrlVars()["utm_source"] || '') !== '') {
            source = (getUrlVars()["utm_source"] || '');
            medium = (getUrlVars()["utm_medium"] || '');
            campaign = (getUrlVars()["utm_campaign"] || '');
            term = (getUrlVars()["utm_term"] || '');
            keyword = (getUrlVars()["utm_keyword"] || '');
            adgroup = (getUrlVars()["utm_adgroup"] || '');
            content = (getUrlVars()["utm_content"] || '');
        }

        var previousurl = document.referrer;
        var fullname = $('#txtexpName').val();
        var emailid = $('#txtexpEmail').val();
        var location = $('#txtexpPinCode').val();
        var contactno = $('#txtexpPhone').val();
        var postData = {
            Name: fullname,
            EmailId: emailid,
            Telephone: contactno,
            Location: location,
            Source: source,
            Campaign: campaign,
            Medium: medium,
            PreviousUrl: previousurl
        };
        var model = GetFormData($form);
        if (IsValid) {
            $.ajax({
                url: '/Home/InsertData',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify(postData), 
                success: function (data) {
                    //Loader.Hide();
                    //var msg = '';

                    try {
                        if (data.succeeded === true) {
                            $("#ErrorMessage").hide();
                            $("#Div_ThankYou").show();
                            $("#consultForm").hide();
                            $("#Div_ThankYou").focus();
                        } else {
                            $("#ErrorMessage").show();
                            $("#Div_ThankYou").hide();
                            $("#consultForm").show();
                            $("#send").focus();
                        }
                       
                    }
                    catch (err) {
                        console.log(err.message);
                        $("#send").focus();
                        $("#consultForm").show();
                        $("#ErrorMessage").show();
                        $("#ErrorMessage").val(err.message);
                    }
                },
                error: function (xhr, status) {
                    $("#consultForm").show();
                    $("#Div_ThankYou").hide();
                    $("#ErrorMessage").show();
                    $("#send").focus();
                    $("#ErrorMessage").val('Please try again!');
                   // Loader.Hide();
                    //var msg = 'Please try again!';
                },
                complete: function () {
                    $("#consultForm").hide();
                    $("#ErrorMessage").focus();
                    $("#ErrorMessage").hide();
                    $("#Div_ThankYou").focus();
                    $("#Div_ThankYou").show(); 
                  //  Loader.Hide();
                }
            });
            return true;
        }


    }

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

    function GetFormData($form) {

 
        var source = '';
        var medium = '';
        var campaign = '';
        var term = '';
        var keyword = '';
        var adgroup = '';
        var content = '';

        if ((getUrlVars()["utm_source"] || '') !== '') {
            source = (getUrlVars()["utm_source"] || '');
            medium = (getUrlVars()["utm_medium"] || '');
            campaign = (getUrlVars()["utm_campaign"] || '');
            term = (getUrlVars()["utm_term"] || '');
            keyword = (getUrlVars()["utm_keyword"] || '');
            adgroup = (getUrlVars()["utm_adgroup"] || '');
            content = (getUrlVars()["utm_content"] || '');
        }

        var previousurl = document.referrer;
        var fullname = $('#txtexpName').val();
        var emailid = $('#txtexpEmail').val();
        var location = $('#txtexpPinCode').val();
        var contactno = $('#txtexpPhone').val();
         

        var model = {
            Name: fullname,
            Telephone: contactno,
            Email: emailid,
            Location: location, 
            Source: source,
            Medium: medium,
            Campaign: campaign,
            Term: term,
            Keyword: keyword,
            UrlReferrer: previousurl
        };

        return model;

       
    }

    $('#chkAccept').on('change', function () {
        // From the other examples
        console.log("afo")
        if (!this.checked) {
            $('#spnAccept').text('Please accept terms and conditions');
        }
        else {
            $('#spnAccept').text('');
        }
    });







function ischar(s) {
    var i;
    for (i = 0; i < s.length; i++) {

        var c = s.charAt(i);
        if (!((c < "0") || (c > "9"))) {
            return false;
        }
    }
    return true;
}

function chkSpecialchar(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c == "!" || c == "#" || c == "'" || c == "^" || c == ":" || c == "\"" || c == "*" || c == ":" || c == "(" || c == ")" || c == "+" || c == "=" || c == "|" || c == "<" || c == ">" || c == "%" || c == "?" || c == "/" || c == "@") {
            return false;
        }
    }
    return true;
}

function ValidateEmail(email) {
    var isValid = false;
    var regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    isValid = regex.test(email);
    return isValid;
}



function isInteger(e) {
    var t;
    for (t = 0; t < e.length; t++) {
        var r = e.charAt(t);
        if (r < "0" || r > "9") return !1
    }
    return !0
}



function isNumberKey(evt, txt) {
    evt = evt || window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    //alert(charCode);
    //17 , 86
    //var pastedData = e.originalEvent.clipboardData.getData('txtexpPhone');
    //alert(pastedData);
    //
    if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode >= 96 && charCode <= 105) && (charCode != 17 && charCode != 86)) {
        if (txt == 'number') {
            $('#spnMobileNumber').text('Alphabets/Special characters not allowed');
        }
        return false;
    }
    $('#spnMobileNumber').text('');
    return true;
}

function isNumberKeyy(evt, txt) {
    evt = evt || window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    //alert(charCode);
    //17 , 86
    //var pastedData = e.originalEvent.clipboardData.getData('txtexpPhone');
    //alert(pastedData);
    //
    if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode >= 96 && charCode <= 105) && (charCode != 17 && charCode != 86)) {
        if (txt == 'number') {
            $('#spnPinCode').text('Alphabets/Special characters not allowed');
        }
        return false;
    }
    $('#spnPinCode').text('');
    return true;
}


function getValidationMessagePhone() {
    var phoneNumber = document.getElementById("txtexpPhone").value;
    if (phoneNumber == "" || phoneNumber == "Mobile Number") {
        $('#spnMobileNumber').text('Please enter your mobile number')
    }
    else if (isInteger(phoneNumber) == false) {
        $('#spnMobileNumber').text('Please enter numbers only')
    }
    else if (phoneNumber.length != 10) {
        $('#spnMobileNumber').text('Your mobile number must contain 10 digits')
    }
    else if (phoneNumber == "0000000000" || phoneNumber == "6666666666" || phoneNumber == "7777777777" || phoneNumber == "8888888888" || phoneNumber == "9999999999" || phoneNumber == "9876543210" || phoneNumber == "0123456789") {
        $('#spnMobileNumber').text('Please enter valid mobile number');
    }
    else if (/^[6-9][0-9]{9}$/.test(phoneNumber) == false) {
        $('#spnMobileNumber').text('Please enter valid mobile number');
    }
    else {
        $('#spnMobileNumber').text('');
    }
}


function getValidationMessagePinCode() {
    var pincode = document.getElementById("txtexpPinCode").value;
    if (pincode.trim() == "" || pincode.trim() == "0") {
        $('#spnPinCode').text('Please enter valid pincode.');
        IsValid = false;
    }
    else if (isInteger(pincode) == false) {
        $('#spnPinCode').text('Please enter numbers only')
        IsValid = false;
    }
    else if (pincode.length < 6) {
        $('#spnPinCode').text('Your pin code must contain 6 digits')
        IsValid = false;
    }
    else {
        $('#spnPinCode').text('');
    }

}


function getValidationMessageEmail() {
    var email = document.getElementById("txtexpEmail").value;
    if (email.trim() == "" || email.trim() == "Email Address") {
        $('#spnEmail').text('Please enter your email address');
    }
    else if (ValidateEmail(email.trim()) == false) {
        $('#spnEmail').text('Please enter valid email address');
    }
    else {
        $('#spnEmail').text('');
    }
}

function getValidationMessagePinCode() {
    var pincode = document.getElementById("txtexpPinCode").value;
    if (pincode.trim() == "" || pincode.trim() == "0") {
        $('#spnPinCode').text('Please enter valid pincode.');
        IsValid = false;
    }
    else if (isInteger(pincode) == false) {
        $('#spnPinCode').text('Please enter numbers only')
        IsValid = false;
    }
    else if (pincode.length < 6) {
        $('#spnPinCode').text('Your pin code must contain 6 digits')
        IsValid = false;
    }
    else {
        $('#spnPinCode').text('');
    }

}


function getValidationMessageName() {
    var name = document.getElementById("txtexpName").value;
    if (name.trim() == "" || name.trim() == "Please enter your name") {
        $('#spnName').text('Please enter your name')
    }
    else if (name.trim() != "" && name.trim() != "Please enter your name" && ischar(name.trim()) == false) {
        $('#spnName').text('Please enter valid name');
    }
    else if (!(chkSpecialchar(name.trim()))) {
        $('#spnName').text('Please enter valid name');
    }
    else {
        $('#spnName').text('')
    }
}



function isAlphabetKey(evt, txt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (!(charCode >= 65 && charCode <= 122) && (charCode != 32 && charCode != 0) && charCode > 31 || (charCode >= 91 && charCode <= 96)) {
        if (txt == 'name') {
            $('#spnName').text('Special characters/numbers not allowed');
        }
        if (txt == 'city') {
            $('#spnCity').text('Special characters/numbers not allowed');
        }
        return false;
    }
    $('#spnName').text('');

    return true;
}