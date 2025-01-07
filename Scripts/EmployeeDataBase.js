document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('employeeId').value = "";
    document.getElementById('employeeName').value = "";
    document.getElementById('employeeEmail').value = "";
    document.getElementById('employeeAddress').value = "";
    updateTable();
});


function updateTable() {
    let tbody = document.getElementById("tbody");
    let body = "";
    fetch("http://localhost:8080/employee")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                body += `<tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.address}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editEmployee(${element.id}, '${element.name}', '${element.email}', '${element.address}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${element.id})">Delete</button>
                </td>
            </tr>`;
            });
            tbody.innerHTML = body;
        });
}
function deleteEmployee(id) {
    const raw = "";

    const requestOptions = {
      method: "DELETE",
      body: raw,
      redirect: "follow"
    };
    
   
    fetch(`http://localhost:8080/employee/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        updateTable();
    })
      .catch((error) => console.error(error));
}


function editEmployee(id, name, email, address) {
    
    document.getElementById('employeeId').value = id;
    document.getElementById('employeeName').value = name;
    document.getElementById('employeeEmail').value = email;
    document.getElementById('employeeAddress').value = address;
}
function editDataBaseFunction() {
    const id = document.getElementById('employeeId').value;
    const name = document.getElementById('employeeName').value;
    const email = document.getElementById('employeeEmail').value;
    const address = document.getElementById('employeeAddress').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id":id,
        "name": name,
        "email": email,
        "address": address
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/employee2", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            updateTable();
        })
        .catch((error) => console.error(error));

    alert(`Employee ${id} updated with Name: ${name}, Email: ${email}, and Address: ${address}`);
  

}



