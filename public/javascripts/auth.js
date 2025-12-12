const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

function loadUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (error) {
        console.error('Failed to parse users from storage', error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        console.error('Failed to parse current user', error);
        return null;
    }
}

// Toast Notification Logic
function showMessage(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) {
        alert(message); // Fallback
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim().toLowerCase();
    const password = document.getElementById('signUpPassword').value.trim();

    if (!name || !email || !password) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password should be at least 6 characters long.', 'error');
        return;
    }

    const users = loadUsers();
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        showMessage('An account with this email already exists. Please sign in.', 'error');
        container.classList.remove('active');
        return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    showMessage('Account created! Please sign in.', 'success');
    container.classList.remove('active');
    signUpForm.reset();
});

signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signInEmail').value.trim().toLowerCase();
    const password = document.getElementById('signInPassword').value.trim();

    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showMessage('Invalid email or password. Please try again.', 'error');
        return;
    }

    setCurrentUser({ name: user.name, email: user.email });
    showMessage(`Welcome back, ${user.name}! Redirecting to the site...`, 'success');
    signInForm.reset();
    document.body.classList.add('page-exit');
    setTimeout(() => {
        window.location.href = '/';
    }, 300);
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
    const loggedInUser = getCurrentUser();
    if (loggedInUser) {
        setTimeout(() => {
            window.location.href = '/';
        }, 300);
    }
});