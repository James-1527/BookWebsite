const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

// No local user management needed


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

signUpForm.addEventListener('submit', async (event) => {
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

    try {
        const response = await fetch('/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message, 'success');
            container.classList.remove('active');
            signUpForm.reset();
        } else {
            showMessage(data.error || 'Registration failed', 'error');
        }
    } catch (err) {
        console.error('Register error', err);
        showMessage('An error occurred. Please try again.', 'error');
    }
});

signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signInEmail').value.trim().toLowerCase();
    const password = document.getElementById('signInPassword').value.trim();

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            setCurrentUser(data.user);
            showMessage(`Welcome back, ${data.user.name}! Redirecting...`, 'success');
            signInForm.reset();
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = '/';
            }, 300);
        } else {
            showMessage(data.error || 'Login failed', 'error');
        }
    } catch (err) {
        console.error('Login error', err);
        showMessage('An error occurred. Please try again.', 'error');
    }
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