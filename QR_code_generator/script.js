let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let errorMsg = document.getElementById("errorMsg");

function generateQR() {
    if(qrText.value.trim().length > 0) {
        qrText.classList.remove("error");
        errorMsg.style.display = "none";
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
        imgBox.classList.add("show-img");
    } else {
        errorMsg.style.display = "block";
        if (!qrText.classList.contains("error")) {
            qrText.classList.add("error");
            setTimeout(() => {
                qrText.classList.remove("error");
            }, 300);
        }
    }
}
