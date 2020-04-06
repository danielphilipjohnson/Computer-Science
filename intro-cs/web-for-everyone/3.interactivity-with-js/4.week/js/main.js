function billingFunction() {
    /*
        Check whether the checkbox with ID same is checked
        When checked get the values from  shipping name and shipping zip
        and update billing name and billing zip

    */
    var isChecked = document.getElementById("same").checked;

    if(isChecked) {

        shippingName = document.getElementById("shippingName").value;
        shippingZip = document.getElementById("shippingZip").value;

        document.getElementById("billingName").value = shippingName;
        document.getElementById("billingZip").value = shippingZip;
       
    };
       
}
