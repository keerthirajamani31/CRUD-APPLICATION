document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-main ul');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-main a').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && hamburger && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Your existing CRUD functionality
    const nameinput = document.getElementById("name_input");
    const emailinput = document.getElementById("email_input");
    const saveinput = document.getElementById("save-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const table = document.querySelector("tbody");
    let students = [];
    let currentid = null;
    let isediting = false;
    
    // Initialize cancel button if it exists
    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetForm);
    }
    
    updateTable();

    function onformsubmit(e) {
        e.preventDefault();
        const name = nameinput.value.trim();
        const email = emailinput.value.trim();
        
        if (!name || !email) {
            alert("Please fill the details");
            return;
        }
        
        if (!validateEmail(email)) {
            alert("Please enter a valid Email ID");
            return;
        }

        if (isediting) {
            updatestudent(currentid, name, email);
        } else {
            addstudent(name, email);
        }
        
        resetForm();
    }

    function addstudent(name, email) {
        const newstudent = {
            id: Date.now(),
            name,
            email
        };
        students.push(newstudent);
        
        updateTable();
    }

    function updatestudent(id, name, email) {
        students = students.map(student => 
            student.id === id ? { ...student, name, email } : student
        );
        
        updateTable();
    }

    function deleteStudent(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            students = students.filter(student => student.id !== id);
            
            updateTable();
            
            if (currentid === id) {
                resetForm();
            }
        }
    }

    function editStudent(id) {
        const student = students.find(s => s.id === id);
        if (student) {
            nameinput.value = student.name;
            emailinput.value = student.email;
            currentid = id;
            isediting = true;
            saveinput.textContent = 'Update';
        }
    }

    function updateTable() {
        table.innerHTML = '';
        
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td class="actions">
                    <button class="edit-btn" data-id="${student.id}">Edit</button>
                    <button class="delete-btn" data-id="${student.id}">Delete</button>
                </td>
            `;
            table.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                editStudent(id);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                deleteStudent(id);
            });
        });
    }

    function resetForm() {
        nameinput.value = '';
        emailinput.value = '';
        currentid = null;
        isediting = false;
        saveinput.textContent = 'Save';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Fixed smooth scrolling functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission
    saveinput.addEventListener('click', onformsubmit);

    // Add Enter key support for form submission
    if (nameinput && emailinput) {
        nameinput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                onformsubmit(e);
            }
        });
        
        emailinput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                onformsubmit(e);
            }
        });
    }
});