document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("employeeForm");
    
    // Create container for success message right after h1
    const container = document.querySelector('.container');
    const messageContainer = document.createElement('div');
    messageContainer.id = 'message-container';
    container.insertBefore(messageContainer, document.querySelector('.card'));
  
    // Set default date
    document.getElementById("hireDate").value = "yyyy-mm-dd";
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const salary = document.getElementById("salary").value;
      const hireDate = document.getElementById("hireDate").value;
  
      // Format salary
      const formattedSalary = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salary);
  
      // Format date
      const formattedDate = new Date(hireDate).toISOString().split("T")[0];
  
      // Create success message HTML
      const successHTML = `
        <div class="alert alert-success alert-dismissible fade col-5 mx-auto" role="alert" id="successMessage">
          <h4>Form Submitted!</h4>
          <div id="submittedData">
            <p><strong>Name: </strong><span id="submitted-name">${name}</span></p>
            <p><strong>Email: </strong><span id="submitted-email">${email}</span></p>
            <p><strong>Salary: </strong><span id="submitted-salary">${formattedSalary}</span></p>
            <p><strong>Hire Date: </strong><span id="submitted-date">${formattedDate}</span></p>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
  
      // Insert the success message
      messageContainer.innerHTML = successHTML;
  
      // Show the message
      const successMessage = document.getElementById("successMessage");
      setTimeout(() => {
        successMessage.classList.add("show");
      }, 10);
    });
  
    // Handle reset button
    form.addEventListener("reset", function () {
      messageContainer.innerHTML = ''; // Remove success message
      setTimeout(() => {
        document.getElementById("hireDate").value = "yyyy-mm-dd";
      }, 0);
    });
  
    // Handle close button clicks using event delegation
    messageContainer.addEventListener('click', function(e) {
      if (e.target.classList.contains('btn-close')) {
        const alert = e.target.closest('.alert');
        if (alert) {
          alert.classList.remove('show');
          setTimeout(() => {
            messageContainer.innerHTML = '';
          }, 150); // Wait for fade animation
        }
      }
    });
  });