// Import books array and genre and authors objects
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

/**
 * Current page number.
 * @type {number}
 */
let page = 1;

/**
 * Array of book matches based on search filters.
 * @type {Array}
 */
let matches = books;

/**
 * Base class for creating HTML elements.
 */
class Element {
  constructor(tagName, className) {
    this.element = document.createElement(tagName);
    this.element.classList = className;
  }

  setAttribute(attribute, value) {
    this.element.setAttribute(attribute, value);
  }

  appendChild(child) {
    this.element.appendChild(child);
  }

  set innerHTML(html) {
    this.element.innerHTML = html;
  }

  get element() {
    return this._element;
  }

  set element(element) {
    this._element = element;
  }

  getHTMLElement() {
    return this.element;
  }
}

/**
 * Creates a preview element for a book.
 */
class PreviewElement extends Element {
  constructor({ author, id, image, title }) {
    super('button', 'preview');
    this.setAttribute('data-preview', id);

    this.innerHTML = `
      <img
          class="preview__image"
          src="${image}"
      />
      
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>
    `;
  }

  getHTMLElement() {
    return super.getHTMLElement();
  }
}

/**
 * Closes the preview.
 */
function closePreview() {
  document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false;
  });
}
closePreview();

/**
 * Populates a document fragment with preview elements for a range of books.
 *
 * @param {number} startIndex - The starting index of the range.
 * @param {number} endIndex - The ending index of the range.
 * @returns {DocumentFragment} - The populated document fragment.
 */
const populatePreviewItems = (startIndex, endIndex) => {
  const fragment = document.createDocumentFragment();

  for (const book of matches.slice(startIndex, endIndex)) {
    const element = new PreviewElement(book);
    fragment.appendChild(element.getHTMLElement());
  }

  return fragment;
};

// Rest of the code...

  
  /**
   * Populates a document fragment with genre options for search filtering.
   *
   * @returns {DocumentFragment} - The populated document fragment.
   */
  //single responsibility function
  const populateGenres = () => {
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
  };
  
  /**
   * Populates a document fragment with author options for search filtering.
   * single responsibility function
   * @returns {DocumentFragment} - The populated document fragment.
   */
  const populateAuthors = () => {
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
  };
  
  /**
   * Sets the theme of the application based on the given theme value.
   * single responsibility function
   * @param {string} theme - The theme value ('day' or 'night').
   */
  const setTheme = (theme) => {
    const isDarkMode = theme === 'night';
    document.querySelector('[data-settings-theme]').value = theme;
    document.documentElement.style.setProperty('--color-dark', isDarkMode ? '255, 255, 255' : '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', isDarkMode ? '10, 10, 20' : '255, 255, 255');
  };
  
  /**
   * single responsibility function
   * Sets the event listener for the search cancel button to close the search overlay.
   */
  const setSearchCancelButton = () => {
    document.querySelector('[data-search-cancel]').addEventListener('click', () => {
      document.querySelector('[data-search-overlay]').open = false;
    });
  };
  
  /**
   * single responsibility function
   * Sets the event listener for the settings cancel button to close the settings overlay.
   */
  const setSettingsCancelButton = () => {
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
      document.querySelector('[data-settings-overlay]').open = false;
    });
  };
  
  /**
   * single responsibility function
   * Sets the event listener for the search button to open the search overlay and focus on the search title input.
   */
  const setSearchButton = () => {
    document.querySelector('[data-header-search]').addEventListener('click', () => {
      document.querySelector('[data-search-overlay]').open = true;
      document.querySelector('[data-search-title]').focus();
    });
  };
  
  /**
   * single responsibility function
   * Sets the event listener for the settings button to open the settings overlay.
   */
  const setSettingsButton = () => {
    document.querySelector('[data-header-settings]').addEventListener('click', () => {
      document.querySelector('[data-settings-overlay]').open = true;
    });
  };
  
  /**
   * single responsibility function
   * Sets the event listener for the settings form submit event to update the theme based on the form data and close the settings overlay.
   */
  const setSettingsForm = () => {
    document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { theme } = Object.fromEntries(formData);
      setTheme(theme);
      document.querySelector('[data-settings-overlay]').open = false;
    });
  };
  
  /**
   * single responsibility function
   * Sets the event listener for the search form submit event to perform the search based on the form data.
   */
  const setSearchForm = () => {
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
  };
  
  /**
   * single responsibility function
   * Sets the event listener for the list button to load more items and append them to the list.
   */
  const setListButton = () => {
    document.querySelector('[data-list-button]').addEventListener('click', () => {
      const startIndex = page * BOOKS_PER_PAGE;
      const endIndex = (page + 1) * BOOKS_PER_PAGE;
      const fragment = populatePreviewItems(startIndex, endIndex);
      document.querySelector('[data-list-items]').appendChild(fragment);
      page += 1;
    });
  };
  
  /**
   * single responsibility function
   * Updates the remaining count in the list button based on the number of matches and the current page.
   */
  const updateListButtonRemaining = () => {
    const remaining = Math.max(matches.length - (page * BOOKS_PER_PAGE), 0);
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `;
  };
  
  /**
   * single responsibility function
   * Sets the event listener for the list items click event to show the active book's details.
   */
  const setListItemsClick = () => {
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
  };
  
  /**
   * single responsibility function
   * Initializes the application by populating the initial items, genres, authors, and setting up event listeners.
   */
  const initializeApp = () => {
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
    setSearchCancelButton();
    setSettingsCancelButton();
    setSearchButton();
    setSettingsButton();
    setSettingsForm();
    setSearchForm();
    setListItemsClick();
  };
  
  initializeApp();
  