let allCountries = [];
let filteredCountries = [];
let currentPage = 1;
const itemsPerPage = 16;
const searchInput = document.getElementById('search-input');

async function fetchData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        allCountries = await response.json();
        filteredCountries = [...allCountries];
        displayPage(currentPage);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.querySelector('.card').innerHTML = 
            `<p class="error">Failed to load countries. Please try again later.</p>`;
    }
}

let debounceTimer;
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const query = e.target.value.trim().toLowerCase();
        filterCountries(query);
    }, 300);
});

function filterCountries(query) {
    if (query === '') {
        filteredCountries = [...allCountries];
    } else {
        filteredCountries = allCountries.filter(country => 
            country.name.common.toLowerCase().includes(query)
        );
    }
    currentPage = 1;
    displayPage(currentPage);
}

function displayPage(page) {
    const container = document.querySelector('.card');
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedItems = filteredCountries.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedItems.length === 0) {
        container.innerHTML = `<p class="no-results">No countries found matching your search.</p>`;
        renderPagination(0);
        return;
    }

    container.innerHTML = paginatedItems.map(country => `
        <div class="country-card" role="article" aria-label="${country.name.common}">
            <div class="img-box">
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}"
                    loading="lazy" ">
            </div>
            <h3>${country.name.common}</h3>
        </div>
    `).join("");

    renderPagination(page);
}

function renderPagination(page) {
    const navContainer = document.getElementById('pagination-nav');
    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    
    if (totalPages <= 1 || filteredCountries.length === 0) {
        navContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';
    
    paginationHTML += `
        <button onclick="changePage(${page - 1})" ${page === 1 ? 'disabled aria-disabled="true"' : ''} 
        aria-label="Previous page">&laquo;</button>`;

    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<button class="${i === page ? 'active' : ''}" 
        onclick="changePage(${i})" aria-label="Page ${i}" ${i === page ? 'aria-current="page"' : ''}> ${i}
        </button>`;
    }

    paginationHTML += `
        <button onclick="changePage(${page + 1})" ${page === totalPages ? 'disabled aria-disabled="true"' : ''} 
            aria-label="Next page"> &raquo;
        </button>`;

    navContainer.innerHTML = paginationHTML;
}

function changePage(newPage) {
    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    if (newPage < 1 || newPage > totalPages) return;
    
    currentPage = newPage;
    displayPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        document.querySelector('.country-card')?.focus();
    }, 300);
}
fetchData();