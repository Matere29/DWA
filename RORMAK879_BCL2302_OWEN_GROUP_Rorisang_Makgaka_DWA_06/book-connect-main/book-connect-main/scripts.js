import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books;

function createPreviewElement({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    return element;
}

function populatePreviewItems(startIndex, endIndex) {
    const fragment = document.createDocumentFragment();

    for (const book of matches.slice(startIndex, endIndex)) {
        const element = createPreviewElement(book);
        fragment.appendChild(element);
    }

    return fragment;
}

function populateGenres() {
    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreHtml.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        genreHtml.appendChild(element);
    }

    return genreHtml;
}

function populateAuthors() {
    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorsHtml.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        authorsHtml.appendChild(element);
    }

    return authorsHtml;
}

function setTheme(theme) {
    const isDarkMode = theme === 'night';
    document.querySelector('[data-settings-theme]').value = theme;
    document.documentElement.style.setProperty('--color-dark', isDarkMode ? '255, 255, 255' : '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', isDarkMode ? '10, 10, 20' : '255, 255, 255');
}

function setSearchCancelButton() {
    document.querySelector('[data-search-cancel]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = false;
    });
}

function setSettingsCancelButton() {
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = false;
    });
}

function setSearchButton() {
    document.querySelector('[data-header-search]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = true;
        document.querySelector('[data-search-title]').focus();
    });
}

function setSettingsButton() {
    document.querySelector('[data-header-settings]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = true;
    });
}

function setSettingsForm() {
    document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { theme } = Object.fromEntries(formData);
        setTheme(theme);
        document.querySelector('[data-settings-overlay]').open = false;
    });
}

function setSearchForm() {
    document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filters = Object.fromEntries(formData);
        const result = [];

        for (const book of books) {
            let genreMatch = filters.genre === 'any';

            for (const singleGenre of book.genres) {
                if (genreMatch) break;
                if (singleGenre === filters.genre) {
                    genreMatch = true;
                }
            }

            if (
                (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
                (filters.author === 'any' || book.author === filters.author) &&
                genreMatch
            ) {
                result.push(book);
            }
        }

        page = 1;
        matches = result;

        if (result.length < 1) {
            document.querySelector('[data-list-message]').classList.add('list__message_show');
        } else {
            document.querySelector('[data-list-message]').classList.remove('list__message_show');
        }

        document.querySelector('[data-list-items]').innerHTML = '';
        const newItems = populatePreviewItems(0, BOOKS_PER_PAGE);
        document.querySelector('[data-list-items]').appendChild(newItems);
        document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;
        updateListButtonRemaining();

        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector('[data-search-overlay]').open = false;
    });
}

function setListButton() {
    document.querySelector('[data-list-button]').addEventListener('click', () => {
        const startIndex = page * BOOKS_PER_PAGE;
        const endIndex = (page + 1) * BOOKS_PER_PAGE;
        const fragment = populatePreviewItems(startIndex, endIndex);
        document.querySelector('[data-list-items]').appendChild(fragment);
        page += 1;
    });
}

function updateListButtonRemaining() {
    const remaining = Math.max(matches.length - (page * BOOKS_PER_PAGE), 0);
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `;
}

function setListItemsClick() {
    document.querySelector('[data-list-items]').addEventListener('click', (event) => {
        const pathArray = Array.from(event.path || event.composedPath());
        let active = null;

        for (const node of pathArray) {
            if (active) break;

            if (node?.dataset?.preview) {
                let result = null;

                for (const singleBook of books) {
                    if (result) break;
                    if (singleBook.id === node?.dataset?.preview) result = singleBook;
                }

                active = result;
            }
        }

        if (active) {
            document.querySelector('[data-list-active]').open = true;
            document.querySelector('[data-list-blur]').src = active.image;
            document.querySelector('[data-list-image]').src = active.image;
            document.querySelector('[data-list-title]').innerText = active.title;
            document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
            document.querySelector('[data-list-description]').innerText = active.description;
        }
    });
}

// Entry point
function initializeApp() {
    const startingItems = populatePreviewItems(0, BOOKS_PER_PAGE);
    const genreHtml = populateGenres();
    const authorsHtml = populateAuthors();

    document.querySelector('[data-list-items]').appendChild(startingItems);
    document.querySelector('[data-search-genres]').appendChild(genreHtml);
    document.querySelector('[data-search-authors]').appendChild(authorsHtml);

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('night');
    } else {
        setTheme('day');
    }

    setListButton();
    setCancelButton('[data-search-cancel]', '[data-search-overlay]');
    setCancelButton('[data-settings-cancel]', '[data-settings-overlay]');
    setHeaderSearch();
    setHeaderSettings();
    setSettingsForm();
    setSearchForm();
    setListItemsClick();
}

initializeApp();

