// Book Reviews Data
let booksData = [];
let currentCategory = 'all';
let currentBooks = [];
const CURRENT_USER_KEY = 'currentUser';

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('fade-in');

    // Fetch books from API
    fetch('/api/books')
        .then(response => response.json())
        .then(data => {
            booksData = data;

            // Check for category in URL
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get('category');

            if (categoryParam) {
                // If we have a category, finding it might require mapping 'History' to 'non-fiction' if names don't match ids
                // But simplified: assuming categoryParam matches 'genre' property
                filterByCategory(categoryParam);
                // Scroll to reviews
                setTimeout(scrollToReviews, 100);
            } else {
                currentCategory = 'all';
                currentBooks = [...booksData];
                renderBooks(currentBooks);
            }
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            const grid = document.getElementById('reviews-grid');
            if (grid) grid.innerHTML = '<p>Error loading books.</p>';
        });

    // Add Enter key support for search
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
        searchBox.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Live search
        searchBox.addEventListener('input', function () {
            const searchTerm = this.value.trim();
            if (searchTerm.length === 0) {
                document.getElementById('search-result').classList.remove('show');
            } else {
                handleSearch();
            }
        });
    }

    updateAuthUI();

    // Close search results when clicking outside
    document.addEventListener('click', function (e) {
        const searchContainer = document.querySelector('.search-container');
        const searchResult = document.getElementById('search-result');
        if (searchContainer && searchResult && !searchContainer.contains(e.target)) {
            searchResult.classList.remove('show');
        }
    });
});

// Render books in the grid
function renderBooks(books) {
    const reviewsGrid = document.getElementById('reviews-grid');
    if (!reviewsGrid) return;

    if (books.length === 0) {
        reviewsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--muted);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 16px; opacity: 1;"></i>
                <p style="font-size: 1.2rem;">No books found. Try a different search or category.</p>
            </div>
        `;
        return;
    }

    reviewsGrid.innerHTML = books.map(book => `
        <div class="review-card" data-id="${book.id}">
            <img src="${book.image}" alt="${book.title}" class="card-book-cover" onerror="this.src='https://via.placeholder.com/300x450/2c3e50/ffffff?text=${encodeURIComponent(book.title)}'">
            <div class="card-body">
                <h4 class="card-title">${book.title}</h4>
                <div class="card-meta-info">
                    <span class="meta-tag"><i class="fas fa-tag"></i> ${book.category || book.genre || 'Uncategorized'}</span>
                    <span class="meta-year"><i class="fas fa-calendar-alt"></i> ${book.publishedYear || 'N/A'}</span>
                </div>
                <p class="card-author">by ${book.author || 'Unknown Author'}</p>
                <div class="card-rating">
                    <div class="stars">${generateStars(book.rating || 0)}</div>
                    <span class="rating-value">${(book.rating || 0).toFixed(1)}</span>
                </div>
                <p class="card-excerpt">${truncate(book.review, 140)}</p>
                <div class="card-footer">
                    <div class="footer-meta">
                        <span class="card-reviewer">Reviewed by ${book.reviewer || 'Anonymous'}</span>
                        <span class="card-date">${book.reviewDate || ''}</span>
                    </div>
                    <button class="view-review-btn" onclick="viewFullReview('${book.id}')">Read More</button>
                </div>
            </div>
        </div>
    `).join('');

    // Attach click handlers to open modal with book details
    setTimeout(() => {
        document.querySelectorAll('.review-card').forEach(card => {
            card.addEventListener('click', function (e) {
                // Prevent opening modal when clicking on the 'Read More' button (which navigates to book page)
                if (e.target.closest('.view-review-btn')) return;
                if (e.target.closest('.view-review-btn')) return;
                const id = this.getAttribute('data-id');
                openBookModal(id);
            });
        });
    }, 0);
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Filter books by category
function filterByCategory(category) {
    currentCategory = category;

    // Update active button
    document.querySelectorAll('.category-tag').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Filter books
    if (category === 'all') {
        currentBooks = [...booksData];
    } else {
        currentBooks = booksData.filter(book => book.genre === category);
    }

    renderBooks(currentBooks);
}

// Search functionality
function handleSearch() {
    const searchBox = document.getElementById('search-box');
    if (!searchBox) return;

    const searchTerm = searchBox.value.toLowerCase().trim();
    const searchResult = document.getElementById('search-result');

    if (!searchTerm) {
        if (searchResult) searchResult.classList.remove('show');
        // Reset to current category if search is cleared
        filterByCategory(currentCategory);
        return;
    }

    // Filter books by search term
    const filtered = booksData.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
    );

    // Show search results dropdown
    if (searchResult) {
        if (filtered.length > 0) {
            searchResult.innerHTML = filtered.slice(0, 5).map(book => `
                <div class="search-result-item" onclick="selectBook('${book.id}')">
                    <strong>${book.title}</strong><br>
                    <small>by ${book.author}</small>
                </div>
            `).join('');
            searchResult.classList.add('show');
        } else {
            searchResult.innerHTML = '<div class="search-result-item">No results found</div>';
            searchResult.classList.add('show');
        }
    }

    // Filter main grid
    renderBooks(filtered);
}

// Select book from search results
function selectBook(bookId) {
    // Navigate directly to the book page
    window.location.href = `/books/${bookId}`;
}

// View full review
function viewFullReview(bookId) {
    // Navigate directly to the book page
    window.location.href = `/books/${bookId}`;
}

// Truncate text to length
function truncate(text, maxLength = 120) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

// Modal handling
function openBookModal(bookId) {
    const modal = document.getElementById('book-modal');
    const modalBody = document.getElementById('modal-body');
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    if (!modal || !modalBody) return;

    const book = booksData.find(b => b.id === bookId);
    if (!book) return;

    modalBody.innerHTML = `
        <div class="modal-left">
            <img class="modal-cover" src="${book.image}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/300x450/2c3e50/ffffff?text=${encodeURIComponent(book.title)}'" />
        </div>
        <div class="modal-info">
            <h3 id="modal-title">${book.title}</h3>
            <div class="modal-meta">
                <span><i class="fas fa-user"></i> ${book.author}</span>
                <span><i class="fas fa-tag"></i> ${book.category || book.genre}</span>
                <span><i class="fas fa-calendar"></i> ${book.publishedYear || ''}</span>
            </div>
            <div class="rating">
                <div class="stars">${generateStars(book.rating)}</div>
                <span class="rating-text">${book.rating.toFixed(1)} / 5.0</span>
            </div>
            <div class="modal-review">${book.review}</div>
            <div class="reviewer" style="margin-top: 18px;">
                <div class="reviewer-avatar">${(book.reviewer || 'R').split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                <div class="reviewer-info">
                    <div class="reviewer-name">${book.reviewer}</div>
                    <div class="review-date">${book.reviewDate || ''}</div>
                </div>
            </div>
            <div style="margin-top:18px;">
                <button class="read-more-btn" onclick="viewFullReview('${book.id}')">Read Full Review</button>
            </div>
        </div>
    `;

    modal.classList.add('open');
    document.querySelector('.modal-content')?.classList.add('opening');

    function onClose() {
        modal.classList.remove('open');
        document.querySelector('.modal-content')?.classList.remove('opening');
        overlay.removeEventListener('click', onClose);
        closeBtn.removeEventListener('click', onClose);
        document.removeEventListener('keydown', onEsc);
    }

    function onEsc(e) {
        if (e.key === 'Escape') onClose();
    }

    overlay.addEventListener('click', onClose);
    closeBtn.addEventListener('click', onClose);
    document.addEventListener('keydown', onEsc);
}

// Scroll to reviews section
function scrollToReviews() {
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        console.error('Failed to parse current user', error);
        return null;
    }
}

function updateAuthUI() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const userGreeting = document.getElementById('userGreeting');
    if (!loginButton || !logoutButton || !userGreeting) return;

    const user = getCurrentUser();
    if (user) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        userGreeting.style.display = 'inline-block';
        userGreeting.textContent = `Hello, ${user.name}!`;
    } else {
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        userGreeting.style.display = 'none';
        userGreeting.textContent = '';
    }
}

function handleLogin() {
    document.body.classList.add('page-exit');
    setTimeout(() => {
        window.location.href = './login';
    }, 300);
}

async function handleLogout() {
    try {
        await fetch('/users/logout', { method: 'POST' });
        localStorage.removeItem(CURRENT_USER_KEY);
        updateAuthUI();
        window.location.reload(); // Reload to clear server-side state in views
    } catch (error) {
        console.error("Logout failed", error);
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
