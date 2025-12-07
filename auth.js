// Authentication System
// Handles login, register, and user session management

(function() {
    'use strict';

    // DOM Elements
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const userGreeting = document.getElementById('userGreeting');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');

    // Close buttons
    const closeButtons = document.querySelectorAll('.close');

    // Initialize
    checkAuthStatus();
    setupEventListeners();

    // Check if user is logged in
    function checkAuthStatus() {
        const currentUser = getCurrentUser();
        if (currentUser) {
            showLoggedInState(currentUser);
        } else {
            showLoggedOutState();
        }
    }

    // Get current user from localStorage
    function getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    // Get all users from localStorage
    function getUsers() {
        const usersStr = localStorage.getItem('users');
        return usersStr ? JSON.parse(usersStr) : [];
    }

    // Save users to localStorage
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Show logged in state
    function showLoggedInState(user) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        userGreeting.style.display = 'inline-block';
        userGreeting.textContent = `Welcome, ${user.name}!`;
    }

    // Show logged out state
    function showLoggedOutState() {
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        userGreeting.style.display = 'none';
    }

    // Setup event listeners
    function setupEventListeners() {
        // Open login modal
        loginButton.addEventListener('click', () => {
            loginModal.style.display = 'block';
            loginError.textContent = '';
            loginForm.reset();
        });

        // Open register modal
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
            registerError.textContent = '';
            registerForm.reset();
        });

        // Switch to login from register
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
            loginError.textContent = '';
            loginForm.reset();
        });

        // Close modals
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                loginModal.style.display = 'none';
                registerModal.style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (e.target === registerModal) {
                registerModal.style.display = 'none';
            }
        });

        // Handle login form submission
        loginForm.addEventListener('submit', handleLogin);

        // Handle register form submission
        registerForm.addEventListener('submit', handleRegister);

        // Handle logout
        logoutButton.addEventListener('click', handleLogout);
    }

    // Handle login
    function handleLogin(e) {
        e.preventDefault();
        loginError.textContent = '';

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Validation
        if (!email || !password) {
            loginError.textContent = 'Please fill in all fields.';
            return;
        }

        // Get users
        const users = getUsers();
        const user = users.find(u => u.email === email);

        // Check if user exists and password matches
        if (!user) {
            loginError.textContent = 'Invalid email or password.';
            return;
        }

        if (user.password !== password) {
            loginError.textContent = 'Invalid email or password.';
            return;
        }

        // Login successful
        localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email
        }));

        // Close modal and update UI
        loginModal.style.display = 'none';
        loginForm.reset();
        checkAuthStatus();

        // Show success message
        showNotification('Login successful! Welcome back.');
    }

    // Handle register
    function handleRegister(e) {
        e.preventDefault();
        registerError.textContent = '';

        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            registerError.textContent = 'Please fill in all fields.';
            return;
        }

        if (password.length < 6) {
            registerError.textContent = 'Password must be at least 6 characters long.';
            return;
        }

        if (password !== confirmPassword) {
            registerError.textContent = 'Passwords do not match.';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            registerError.textContent = 'Please enter a valid email address.';
            return;
        }

        // Get users
        const users = getUsers();

        // Check if email already exists
        if (users.find(u => u.email === email)) {
            registerError.textContent = 'An account with this email already exists.';
            return;
        }

        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        // Auto-login after registration
        localStorage.setItem('currentUser', JSON.stringify({
            name: newUser.name,
            email: newUser.email
        }));

        // Close modal and update UI
        registerModal.style.display = 'none';
        registerForm.reset();
        checkAuthStatus();

        // Show success message
        showNotification('Registration successful! Welcome to Book Website.');
    }

    // Handle logout
    function handleLogout() {
        localStorage.removeItem('currentUser');
        checkAuthStatus();
        showNotification('You have been logged out successfully.');
    }

    // Show notification (simple alert for now, can be enhanced)
    function showNotification(message) {
        // Create a simple notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
})();

