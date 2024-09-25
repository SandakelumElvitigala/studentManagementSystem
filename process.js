document.getElementById('regBtn').addEventListener("click", btnRegister);
document.getElementById('clrBtn').addEventListener("click", btnClr);

function isFutureDate(dateString) {
    const today = new Date();
    const inputDate = new Date(dateString);
    return inputDate > today; // Returns true if the date is in the future
}

function isNumeric(value) {
    return /^\d+$/.test(value); // Returns true if the value contains only digits
}

// Resize the image before converting to Base64
function resizeImage(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            // Calculate new dimensions if the image is larger than the max width/height
            if (width > maxWidth) {
                height = height * (maxWidth / width);
                width = maxWidth;
            }
            if (height > maxHeight) {
                width = width * (maxHeight / height);
                height = maxHeight;
            }

            // Set canvas dimensions and draw the resized image
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Convert the resized image to Base64
            callback(canvas.toDataURL('image/jpeg', 0.5)); // 50% image quality


        }
    }
}

async function btnRegister() {
    let studentName = document.getElementById('txt-name').value.trim();
    let studentContact = document.getElementById('txt-contact').value.trim();
    let dob = document.getElementById('dob').value.trim();
    let parenttName = document.getElementById('txt-gname').value.trim();
    let parentContact = document.getElementById('txt-gcontact').value.trim();
    let address = document.getElementById('txt-address').value.trim();

    // Get the image file input
    let imageFile = document.getElementById('image-input').files[0];

    // Ensure all required fields are provided
    if (studentName !== '' && studentContact !== '' && dob !== '' && parenttName !== '' && parentContact !== '' && imageFile !== undefined) {

        if (isFutureDate(dob)) {
            console.error("Date of Birth is in the future");
            errorNotification();
            return;
        }

        if (!isNumeric(studentContact) || !isNumeric(parentContact)) {
            console.error("Invalid contact numbers");
            errorNotification();
            return;
        }

        // Resize the image before sending it to the server
        resizeImage(imageFile, 800, 600, async function (resizedImageBase64) {
            // Remove image prefix (if present)
            let image = resizedImageBase64.split(",")[1]; // Remove "data:image/png;base64,"

            let requestBody = {
                "id": null,
                "name": studentName,
                "contact": studentContact,
                "dob": dob,
                "guardianname": parenttName,
                "address": address,
                "guardiancontact": parentContact,
                "image": "" // Send resized Base64 image
            };

            console.log("Request Body:", JSON.stringify(requestBody));

            try {
                const response = await fetch("http://localhost:8080/save-student", {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Response Data:", data);
                successNotification();
            } catch (error) {
                console.error('Error:', error);
                errorNotification();
            }
        });
    } else {
        emptyNotification();
        btnClr();
    }
}

function successNotification() {
    const toastLiveExample = document.getElementById('liveToast')
    const head = document.getElementById('topic');
    const msg = document.getElementById('msg');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    head.innerText = "Hoorreyyy...!";
    msg.innerText = "Student was successfully registered...!";
    toastLiveExample.style.backgroundColor = 'green';
    toastBootstrap.show();
}

function emptyNotification() {
    const toastLiveExample = document.getElementById('liveToast')
    const head = document.getElementById('topic');
    const msg = document.getElementById('msg');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    head.innerText = "Ooops...!";
    msg.innerText = "Please give us all the required details...!";
    toastLiveExample.style.backgroundColor = 'red';
    toastBootstrap.show();
}

function errorNotification() {
    const toastLiveExample = document.getElementById('liveToast')
    const head = document.getElementById('topic');
    const msg = document.getElementById('msg');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    head.innerText = "Oooops...!";
    msg.innerText = "Something went wrong...!";
    toastLiveExample.style.backgroundColor = 'red';
    toastBootstrap.show();
}

function btnClr() {
    document.getElementById('txt-name').value = "";
    document.getElementById('txt-contact').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('txt-gname').value = "";
    document.getElementById('txt-gcontact').value = "";
    document.getElementById('txt-address').value = "";
    document.getElementById('image-input').value = ""; // Clear file input
    document.getElementById('base64-output').value = ""; // Clear base64 output
}
