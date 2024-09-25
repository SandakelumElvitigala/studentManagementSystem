document.addEventListener("DOMContentLoaded", function() {
    viewData();
});

// Function to fetch data from API and display in the table
async function viewData() {
    try {
        // Fetch data from the REST API
        const response = await fetch('http://localhost:8080/all');
        const data = await response.json();

        // Get the table body where data will be inserted
        let tbl = document.querySelector('#datatbl tbody');

        // Iterate over each student in the response data
        data.forEach(student => {
            // Create a new row for each student
            const row = document.createElement('tr');
            row.style.cursor='pointer';

            // Create cells for each property and append to the row
            const idCell = document.createElement('td');
            idCell.textContent = student.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = student.name;
            row.appendChild(nameCell);

            const contactCell = document.createElement('td');
            contactCell.textContent = student.contact;
            row.appendChild(contactCell);

            const dobCell = document.createElement('td');
            dobCell.textContent = student.dob;
            row.appendChild(dobCell);

            /*const guardianNameCell = document.createElement('td');
            guardianNameCell.textContent = student.guardianname;
            row.appendChild(guardianNameCell);

            const addressCell = document.createElement('td');
            addressCell.textContent = student.address;
            row.appendChild(addressCell);

            const guardianContactCell = document.createElement('td');
            guardianContactCell.textContent = student.guardiancontact;
            row.appendChild(guardianContactCell);*/

            /*const imageCell = document.createElement('td');
            imageCell.textContent = student.image; // Adjust if necessary to display an image
            row.appendChild(imageCell);*/

            // Append the row to the table body
            tbl.appendChild(row);

            // Add click event to each row to open the modal with student data
            row.addEventListener('click', function() {
                openModal(student);
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function openModal(student) {
    const modalElement = document.getElementById('staticBackdrop');
    
    if (student.image) {
        document.getElementById('imagePreview2').src = student.image;
    } else {
        document.getElementById('imagePreview2').src = 'assests/profile-removebg-preview.png'; // Fallback image
    }
    // Set modal data
    document.getElementById('studentId').textContent = student.id;
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('studentContact').textContent = student.contact;
    document.getElementById('studentDob').textContent = student.dob;
    document.getElementById('guardianNameCell').textContent = student.guardianname;
    document.getElementById('guardianContactCell').textContent = student.guardiancontact;
    document.getElementById('addressCell').textContent = student.address;

    // Initialize and show the Bootstrap modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}


document.querySelector('.close').addEventListener('click', function() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
});
