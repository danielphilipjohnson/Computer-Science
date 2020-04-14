function billingFunction() {
    /*
        Check whether the checkbox with ID same is checked
        When checked get the values from  shipping name and shipping zip
        and update billing name and billing zip

    */
    var isChecked = document.getElementById("same").checked;
    var billingName = document.getElementById("billingName");
    var billingZip = document.getElementById("billingZip");
    
    if(isChecked) {

        shippingName = document.getElementById("shippingName").value;
        shippingZip = document.getElementById("shippingZip").value;

        billingName.value = shippingName;
        billingZip.value = shippingZip;
       
    }
    else {
        billingName.value = "";
        billingZip.value = "";

    }
       
}
