// Authentication functions
async function registerUser(event) {
  event.preventDefault();
  
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, confirmPassword })
    });

    const data = await response.json();

    if (response.ok) {
      showAlert('Registration successful! Please login.', 'success');
      setTimeout(() => window.location.href = '/login.html', 2000);
    } else {
      showAlert(data.message || 'Registration failed', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showAlert('An error occurred during registration', 'error');
  }
}

async function loginUser(event) {
  event.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      showAlert('Login successful!', 'success');
      setTimeout(() => window.location.href = '/dashboard', 2000);
    } else {
      showAlert(data.message || 'Login failed', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showAlert('An error occurred during login', 'error');
  }
}

// Employee management functions
async function loadEmployees() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('/api/employees', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }

    const employees = await response.json();
    displayEmployees(employees);
  } catch (error) {
    console.error('Error loading employees:', error);
    showAlert('Error loading employees', 'error');
  }
}

function displayEmployees(employees) {
  const tbody = document.getElementById('employees-tbody');
  
  if (!tbody) return;
  
  tbody.innerHTML = '';

  employees.forEach(employee => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.position}</td>
      <td>${employee.department}</td>
      <td>
        <button class="btn" onclick="editEmployee(${employee.id})">Edit</button>
        <button class="btn btn-secondary" onclick="deleteEmployee(${employee.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function createEmployee(event) {
  event.preventDefault();
  
  const name = document.getElementById('employee-name').value;
  const email = document.getElementById('employee-email').value;
  const position = document.getElementById('employee-position').value;
  const department = document.getElementById('employee-department').value;
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, position, department })
    });

    const data = await response.json();

    if (response.ok) {
      showAlert('Employee created successfully!', 'success');
      document.getElementById('employee-form').reset();
      loadEmployees();
    } else {
      showAlert(data.message || 'Error creating employee', 'error');
    }
  } catch (error) {
    console.error('Error creating employee:', error);
    showAlert('An error occurred', 'error');
  }
}

async function deleteEmployee(id) {
  if (!confirm('Are you sure you want to delete this employee?')) {
    return;
  }

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`/api/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      showAlert('Employee deleted successfully!', 'success');
      loadEmployees();
    } else {
      showAlert(data.message || 'Error deleting employee', 'error');
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    showAlert('An error occurred', 'error');
  }
}

function editEmployee(id) {
  window.location.href = `/employee-edit.html?id=${id}`;
}

async function logout() {
  try {
    await fetch('/auth/logout', { method: 'POST' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Utility functions
function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => alertDiv.remove(), 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  
  if (path === '/dashboard') {
    loadEmployees();
  }
});
