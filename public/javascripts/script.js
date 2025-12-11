// Book Reviews Data
const booksData = [
    {
        id: 1,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        genre: "fiction",
        category: "Historical Fiction",
        publishedYear: 2017,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
        review: "A mesmerizing tale of old Hollywood glamour, ambition, and forbidden love. Taylor Jenkins Reid crafts an unforgettable narrative through the lens of a reclusive Hollywood icon recounting her life story.",
        reviewer: "Jane Smith",
        reviewDate: "March 15, 2024"
    },
    {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "sci-fi",
        category: "Science Fiction",
        publishedYear: 2021,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop",
        review: "A thrilling space adventure that combines science, humor, and humanity. Andy Weir delivers another masterpiece that's both intellectually stimulating and emotionally engaging.",
        reviewer: "Mike Johnson",
        reviewDate: "March 10, 2024"
    },
    {
        id: 3,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        genre: "fiction",
        category: "Literary Fiction",
        publishedYear: 2018,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
        review: "A beautiful coming-of-age story set in the marshes of North Carolina. Delia Owens creates a vivid, atmospheric world with a protagonist you'll root for until the very end.",
        reviewer: "Sarah Williams",
        reviewDate: "March 8, 2024"
    },
    {
        id: 4,
        title: "Educated",
        author: "Tara Westover",
        genre: "non-fiction",
        category: "Memoir",
        publishedYear: 2018,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=450&fit=crop",
        review: "A powerful memoir about education, family, and finding your own path. Tara Westover's journey from isolation to Cambridge University is both inspiring and heartbreaking.",
        reviewer: "David Brown",
        reviewDate: "March 5, 2024"
    },
    {
        id: 5,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "mystery",
        category: "Psychological Thriller",
        publishedYear: 2019,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
        review: "A gripping psychological thriller with an ending that will leave you speechless. Alex Michaelides masterfully weaves together mystery and psychological insight.",
        reviewer: "Emily Davis",
        reviewDate: "March 3, 2024"
    },
    {
        id: 6,
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "fiction",
        category: "Philosophical Fiction",
        publishedYear: 2020,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
        review: "A thought-provoking exploration of life's possibilities and regrets. Matt Haig's novel is both profound and accessible, making you reflect on your own life choices.",
        reviewer: "Chris Martinez",
        reviewDate: "March 1, 2024"
    },
    {
        id: 7,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "self-help",
        category: "Personal Development",
        publishedYear: 2018,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=450&fit=crop",
        review: "A practical guide to building good habits and breaking bad ones. James Clear's framework is actionable and backed by science, making it one of the best self-help books available.",
        reviewer: "Lisa Anderson",
        reviewDate: "February 28, 2024"
    },
    {
        id: 8,
        title: "Becoming",
        author: "Michelle Obama",
        genre: "biography",
        category: "Memoir",
        publishedYear: 2018,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
        review: "An inspiring memoir that offers a candid look into the life of one of the most admired women of our time. Michelle Obama's story is powerful, authentic, and deeply moving.",
        reviewer: "Robert Taylor",
        reviewDate: "February 25, 2024"
    },
    {
        id: 9,
        title: "The Invisible Man",
        author: "Ralph Ellison",
        genre: "fiction",
        category: "Literary Fiction",
        publishedYear: 1952,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
        review: "A groundbreaking novel that explores race, identity, and invisibility in America. Ralph Ellison's masterpiece remains as relevant today as when it was first published.",
        reviewer: "Jennifer Lee",
        reviewDate: "February 22, 2024"
    },
    {
        id: 10,
        title: "Dune",
        author: "Frank Herbert",
        genre: "sci-fi",
        category: "Science Fiction",
        publishedYear: 1965,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop",
        review: "An epic science fiction masterpiece that has influenced generations of writers. Dune combines politics, religion, ecology, and adventure into an unforgettable narrative.",
        reviewer: "Michael Chen",
        reviewDate: "February 20, 2024"
    },
    {
        id: 11,
        title: "The Notebook",
        author: "Nicholas Sparks",
        genre: "romance",
        category: "Romance",
        publishedYear: 1996,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop",
        review: "A timeless love story that will make you believe in the power of true love. Nicholas Sparks crafts a beautiful, emotional tale that has touched millions of readers.",
        reviewer: "Amanda White",
        reviewDate: "February 18, 2024"
    },
    {
        id: 12,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "non-fiction",
        category: "History",
        publishedYear: 2011,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=450&fit=crop",
        review: "A fascinating exploration of human history and how we came to dominate the planet. Yuval Noah Harari presents complex ideas in an accessible and engaging way.",
        reviewer: "Daniel Kim",
        reviewDate: "February 15, 2024"
    }
];

let currentCategory = 'all';
let currentBooks = [...booksData];
const CURRENT_USER_KEY = 'currentUser';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
    renderBooks(currentBooks);
    
    // Add Enter key support for search
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    updateAuthUI();

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
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
                <p class="card-author">by ${book.author}</p>
                <div class="card-rating">
                    <div class="stars">${generateStars(book.rating)}</div>
                    <span class="rating-value">${book.rating.toFixed(1)}</span>
                </div>
                <div class="card-footer">
                    <span class="card-reviewer">Reviewed by ${book.reviewer}</span>
                    <button class="view-review-btn" onclick="viewFullReview(${book.id})">Read More</button>
                </div>
            </div>
        </div>
    `).join('');
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
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter books
    if (category === 'all') {
        currentBooks = [...booksData];
    } else {
        currentBooks = booksData.filter(book => book.genre === category);
    }
    
    renderBooks(currentBooks);
    scrollToReviews();
}

// Search functionality
function handleSearch() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase().trim();
    const searchResult = document.getElementById('search-result');
    
    if (!searchTerm) {
        searchResult.classList.remove('show');
        currentBooks = currentCategory === 'all' ? [...booksData] : booksData.filter(book => book.genre === currentCategory);
        renderBooks(currentBooks);
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
    if (filtered.length > 0) {
        searchResult.innerHTML = filtered.slice(0, 5).map(book => `
            <div class="search-result-item" onclick="selectBook(${book.id})">
                <strong>${book.title}</strong><br>
                <small>by ${book.author}</small>
            </div>
        `).join('');
        searchResult.classList.add('show');
    } else {
        searchResult.innerHTML = '<div class="search-result-item">No results found</div>';
        searchResult.classList.add('show');
    }
    
    // Filter main grid
    if (currentCategory === 'all') {
        currentBooks = filtered;
    } else {
        currentBooks = filtered.filter(book => book.genre === currentCategory);
    }
    
    renderBooks(currentBooks);
}

// Select book from search results
function selectBook(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (book) {
        document.getElementById('search-box').value = book.title;
        document.getElementById('search-result').classList.remove('show');
        filterByCategory('all');
        
        // Scroll to the book card
        setTimeout(() => {
            const card = document.querySelector(`[data-id="${bookId}"]`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.animation = 'pulse 0.5s';
            }
        }, 100);
    }
}

// View full review
function viewFullReview(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    // Create modal or alert with full review
    const fullReview = `
Title: ${book.title}
Author: ${book.author}
Genre: ${book.category}
Published: ${book.publishedYear}
Rating: ${book.rating}/5.0

Review:
${book.review}

Reviewed by: ${book.reviewer}
Date: ${book.reviewDate}
    `;
    
    alert(fullReview);
    // In a real application, you would open a modal or navigate to a detail page
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

function handleLogout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    updateAuthUI();
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


