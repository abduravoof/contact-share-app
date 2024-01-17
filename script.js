document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage();
    document.getElementById("editButton").addEventListener("click", function () {
        displayForm();
    });
});

function displayForm() {
    var formHtml = `
        <ons-list>
            <ons-list-item>
                <div class="center">
                    <ons-input id="name" modifier="underbar" placeholder="Name" float></ons-input>
                </div>
            </ons-list-item>
            <ons-list-item>
                <div class="center">
                    <ons-input id="email" type="email" modifier="underbar" placeholder="Email" float></ons-input>
                </div>
            </ons-list-item>
            <ons-list-item>
                <div class="center">
                    <ons-input id="phone" type="tel" modifier="underbar" placeholder="Phone" float></ons-input>
                </div>
            </ons-list-item>
        </ons-list>
        <ons-button modifier="large--cta" onclick="saveDataAndGenerateQRCode()">Generate QR Code</ons-button>
    `;
    document.getElementById("contactFormContainer").innerHTML = formHtml;
    document.getElementById("qrCodeContainer").innerHTML = '';
    document.getElementById("noDataContainer").innerHTML = '';

    // Prepopulate form if data exists
    if (localStorage.getItem("name")) {
        document.getElementById("name").value = localStorage.getItem("name");
        document.getElementById("email").value = localStorage.getItem("email");
        document.getElementById("phone").value = localStorage.getItem("phone");
    }
}

function saveDataAndGenerateQRCode() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);

    generateQRCode(name, email, phone);
}

function generateQRCode(name, email, phone) {
    var qrData = `MECARD:N:${name};EMAIL:${email};TEL:${phone};;`;
    QRCode.toDataURL(qrData, function (err, url) {
        if (err) throw err;
        document.getElementById('qrCodeContainer').innerHTML = '<img src="' + url + '"/>';
        document.getElementById("contactFormContainer").innerHTML = '';
        document.getElementById("noDataContainer").innerHTML = '';
    });
}

function checkLocalStorage() {
    if (localStorage.getItem("name") && localStorage.getItem("email") && localStorage.getItem("phone")) {
        var name = localStorage.getItem("name");
        var email = localStorage.getItem("email");
        var phone = localStorage.getItem("phone");
        generateQRCode(name, email, phone);
    } else {
        document.getElementById("noDataContainer").innerHTML = '<p>Please update your contact information by clicking the edit button.</p>';
        document.getElementById("contactFormContainer").innerHTML = '';
        document.getElementById("qrCodeContainer").innerHTML = '';
    }
}

