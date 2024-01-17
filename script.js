document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage();
    document.getElementById("editButton").addEventListener("click", function () {
        displayForm();
    });
});

function displayForm() {
    var formHtml = `
        <div class="col-md-6">
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input type="tel" class="form-control" id="phone" name="phone" required>
                </div>
                <button type="submit" class="btn btn-primary">Generate QR Code</button>
            </form>
        </div>`;
    document.getElementById("contactFormContainer").innerHTML = formHtml;
    document.getElementById("qrCodeContainer").innerHTML = '';
    document.getElementById("noDataContainer").innerHTML = '';

    // Prepopulate form if data exists
    if (localStorage.getItem("name")) {
        document.getElementById("name").value = localStorage.getItem("name");
        document.getElementById("email").value = localStorage.getItem("email");
        document.getElementById("phone").value = localStorage.getItem("phone");
    }

    // Handle form submission
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();
        saveDataAndGenerateQRCode();
    });
}

function saveDataAndGenerateQRCode() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    // Store data in local storage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);

    // Generate QR Code
    var qrData = `MECARD:N:${name};EMAIL:${email};TEL:${phone};;`;
    QRCode.toDataURL(qrData, function (err, url) {
        if (err) throw err;
        document.getElementById('qrCodeContainer').innerHTML = '<img src="' + url + '"/>';
        document.getElementById("contactFormContainer").innerHTML = '';
        document.getElementById("noDataContainer").innerHTML = '';
    });
}

function displayQRCode() {
    var name = localStorage.getItem("name");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");

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
        displayQRCode();
    } else {
        document.getElementById("noDataContainer").innerHTML = '<p>Please update your contact information by clicking the edit button.</p>';
        document.getElementById("contactFormContainer").innerHTML = '';
        document.getElementById("qrCodeContainer").innerHTML = '';
    }
}
