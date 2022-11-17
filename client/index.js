const PORT = 5000;

document.addEventListener("DOMContentLoaded", () => {
  fetch(`http://localhost:${PORT}/getAll`)
    .then((res) => res.json())
    .then((data) => loadHTMLTable(data["data"]));

  loadHTMLTable([]);
});

document.querySelector("table tbody").addEventListener("click", (event) => {
  console.log("dasda");
  if (event.target.className === "delete-row-btn") {
    deleteRowById(event.target.dataset.id);
  } else if (event.target.className === "edit-row-btn") {
    const id = event.target.dataset.id;

    const section = document.querySelector("#update-row");
    section.removeAttribute("hidden");

    const updateBtn = document.querySelector("#update-row-btn");
    updateBtn.addEventListener("click", (event) => {
      updateRowById(id);
      section.setAttribute("hidden", "");
    });
  }
});

const deleteRowById = (id) => {
  fetch(`http://localhost:${PORT}/delete/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
};

const searchByName = () => {
  const searchNameInput = document.querySelector("#search-input");
  let searchValue = searchNameInput.value;
 
  searchNameInput.value = "";
  
  fetch(`http://localhost:${PORT}/search/${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      loadHTMLTable(data["data"]);
    });

};

const searchBtn = document
  .querySelector("#search-btn")
  .addEventListener("click", () => searchByName());

const updateRowById = (id) => {
  const updateNameInput = document.querySelector("#update-name-input");
  const name = updateNameInput.value;
  updateNameInput.value = "";
  console.log(id);
  fetch(`http://localhost:${PORT}/update`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({ id: id, name: name }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
};

const addBtn = document.querySelector("#add-name-btn");

addBtn.onclick = () => {
  const nameInput = document.querySelector("#name-input");
  const name = nameInput.value;
  nameInput.value = "";

  fetch(`http://localhost:${PORT}/insert`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: name }),
  })
    .then((res) => res.json())
    .then((data) => insertRownIntoTable(data["data"]));
};

const insertRownIntoTable = (data) => {
  const table = document.querySelector("table tbody");
  const isTableData = table.querySelector(".no-data");

  let tableHtml = "<tr>";

  let array = [data];

  array.forEach(({ id, name, dateadded }) => {
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(dateadded).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
  });

  tableHtml += "</tr>";

  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
};

function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }

  let tableHtml = "";

  data.forEach(({ id, name, date_added }) => {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;

    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}
