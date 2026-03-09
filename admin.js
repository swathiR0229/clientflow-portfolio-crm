const loadButton = document.getElementById("loadLeads");
const tokenInput = document.getElementById("adminToken");
const statusNode = document.getElementById("adminStatus");
const tableBody = document.getElementById("leadsTableBody");

function setAdminStatus(message, type) {
  statusNode.textContent = message;
  statusNode.classList.remove("success", "error");
  if (type) {
    statusNode.classList.add(type);
  }
}

function renderRows(rows) {
  tableBody.innerHTML = "";

  if (!rows.length) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = "<td colspan='5'>No leads yet.</td>";
    tableBody.appendChild(emptyRow);
    return;
  }

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.email}</td>
      <td>${row.message}</td>
      <td>${new Date(row.created_at).toLocaleString()}</td>
    `;
    tableBody.appendChild(tr);
  });
}

async function loadLeads() {
  loadButton.disabled = true;
  loadButton.textContent = "Loading...";
  setAdminStatus("", "");

  const headers = {};
  if (tokenInput.value.trim()) {
    headers["x-admin-token"] = tokenInput.value.trim();
  }

  try {
    const response = await fetch("/api/messages", { headers });
    const data = await response.json();

    if (!response.ok) {
      setAdminStatus(data.error || "Failed to load leads.", "error");
      return;
    }

    renderRows(data.data || []);
    setAdminStatus(`Loaded ${data.data.length} leads.`, "success");
  } catch (error) {
    console.error(error);
    setAdminStatus("Unable to connect to server.", "error");
  } finally {
    loadButton.disabled = false;
    loadButton.textContent = "Load Leads";
  }
}

loadButton.addEventListener("click", loadLeads);
loadLeads();
