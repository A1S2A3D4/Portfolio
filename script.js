let typed = new Typed(".auto-input",{
    strings: ["Asadullah","Developer","Student"],
    typeSpeed:100,
    backSpeed:100,
    loop:true
})

let tablinks = document.getElementsByClassName("tab-links")
let tabcontents = document.getElementsByClassName("tab-contents")


function opentab(tabname){
    for (tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");

    } 
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("signupForm");
    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Perform basic form validation
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "Please fill out all fields.";
            formMessage.style.color = "#dc3545"; // Red for error message
            formMessage.style.display = "block";
            return;
        }

        // If all fields are valid, display success message
        formMessage.textContent = "Form submitted successfully!";
        formMessage.style.color = "#28a745"; // Green for success message
        formMessage.style.display = "block";

        // Hide success message after 3 seconds
        setTimeout(() => {
            formMessage.style.display = "none";
        }, 3000); // 3000 milliseconds = 3 seconds

        // Clear form fields after submission
        form.reset();
    });
});
