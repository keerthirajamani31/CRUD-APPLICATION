document.addEventListener('DOMContentLoaded', function() {
    const nameinput = document.getElementById("name_input");
    const emailinput = document.getElementById("email_input");
    const saveinput = document.getElementById("save-btn");
    const table = document.querySelector("tbody");
    let students =  [];
    let currentid = null;
    let isediting = false;
    
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

    const Homesection=document.querySelector['a[href="Home-section"]']?.addEventListener('click',function(e){
        e.preventDefault();
        Homesection.scrollIntoView({behavior:'smooth'})
    })

    
const notificationssection=document.querySelector('a[href="notifcations-section"]')?.addEventListener('click',function(e){
    e.preventDefault();
    notificationssection.scrollIntoView({behavior:'smooth'})
})
   

const aboutsection=document.querySelector('a[href="about-section"]')?.addEventListener('click',function(e){
    e.preventDefault();
    aboutsection.scrollIntoView({behavior:'smooth'})
})
const servicessection=document.querySelector('a[href="services-section"]')?.addEventListener('click',function(e){
    e.preventDefault();
servicessection.scrollIntoView({behavior:'smooth'})
})
const contactsection=document.querySelector(['a[href="contact-section"]'])?.addEventListener('click',function(e){
    e.preventDefault();
    contactsection.scrollIntoView({behavior:'smooth'})
})
    

    saveinput.addEventListener('click', onformsubmit);
});