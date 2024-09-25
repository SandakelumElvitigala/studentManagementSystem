const main = document.getElementById('main');
const reg = document.getElementById('add');
const view = document.getElementById('view');
const info = document.getElementById('info');

function showRegForm(){
    hideAllSections();
    reg.style.display = 'block';
    reg.classList.add('fade-in');
}

function showHome(){
    hideAllSections();
    main.style.display = 'block';
    main.classList.add('fade-in');
}

function showViewForm(){
    hideAllSections();
    view.style.display = 'block';
    view.classList.add('fade-in');
}

function showInfoForm(){
    hideAllSections();
    info.style.display = 'block';
    info.classList.add('fade-in');
}

function hideAllSections() {
    // Remove the fade-in class before hiding to reset the animation
    main.style.display = 'none';
    main.classList.remove('fade-in');
    reg.style.display = 'none';
    reg.classList.remove('fade-in');
    view.style.display = 'none';
    view.classList.remove('fade-in');
    info.style.display = 'none';
    info.classList.remove('fade-in');
}



// Handle the click event on the trigger text
document.getElementById('trigger-text').addEventListener('click', function() {
    document.getElementById('image-input').click(); // Trigger hidden file input
});

// Handle file selection and convert the image to Base64
document.getElementById('image-input').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get selected file
    if (file) {
        const reader = new FileReader(); // Initialize FileReader
        reader.onload = function(e) {
            const base64String = e.target.result; // Get Base64 string

            // Display Base64 in the textarea
            document.getElementById('base64-output').value = base64String;

            // Display the image in the img element
            const imagePreview = document.getElementById('imagePreview');
            const imagePreview1 = document.getElementById('imagePreview1');
            imagePreview.src = base64String; // Set the src to the Base64 string
            imagePreview1.style.display = 'none';
            imagePreview.style.display = 'block'; // Show the image
        };
        reader.readAsDataURL(file); // Read file as Data URL (Base64)
    }
});

