// All locators/selectors in one place (requirement 6)
//
// Selector priority (best to worst):
//   1. data-testid / id         — app does not have these attributes (demo project)
//   2. formcontrolname          — Angular equivalent of data-testid for form fields
//   3. href / type attributes   — stable, do not change due to styling
//   4. ARIA role + text         — semantic, used in page objects via getByRole
//   5. CSS class                — only when no better option is available

export const SELECTORS = {
  NAV: {
    // href attributes are stable identifiers — they do not change due to styling
    HOME: "a.navbar-brand",
    SIGN_IN: "a[href='/login']",
    SIGN_UP: "a[href='/register']",
    NEW_ARTICLE: "a[href='/editor']",
    SETTINGS: "a[href='/settings']",
  },
  AUTH: {
    // formcontrolname is Angular's equivalent of data-testid for form fields
    USERNAME: "input[formcontrolname='username']",
    EMAIL: "input[formcontrolname='email']",
    PASSWORD: "input[formcontrolname='password']",
    // type='submit' is unique within each form
    SUBMIT_BTN: "button[type='submit']",
    ERROR_MESSAGES: ".error-messages li",
  },
  EDITOR: {
    // formcontrolname uniquely identifies each field in the editor
    TITLE: "input[formcontrolname='title']",
    DESCRIPTION: "input[formcontrolname='description']",
    BODY: "textarea[formcontrolname='body']",
    // placeholder is used here only because the field has no formcontrolname
    TAGS: "input[placeholder='Enter tags']",
    PUBLISH_BTN: "button.btn-primary",
  },
  ARTICLE: {
    TITLE: ".article-page h1",
    // btn-outline-danger is unique on the article page (only the delete button)
    DELETE_BTN: "button.btn-outline-danger",
    COMMENT_INPUT: "textarea[placeholder='Write a comment...']",
    COMMENT_SUBMIT: ".card-footer button.btn-primary",
    COMMENT_TEXT: ".card-block .card-text",
  },
  HOME: {
    // app-article-preview is an Angular component selector — stable as a custom element
    ARTICLE_PREVIEW: "app-article-preview",
    FIRST_FAV_BTN: "app-article-preview:first-of-type button",
  },
};
