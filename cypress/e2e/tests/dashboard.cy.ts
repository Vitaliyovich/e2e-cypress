describe('example to-do app', () => {
  const S = {
    title: '[data-cy="title"]',
    menuLink: 'p-menuitem-link',
    homeLink: '[data-automationid="home-page"]',
    todoLink: '[data-automationid="todo-page"]',
    postsLink: '[data-automationid="posts-page"]',
    galleryLink: '[data-automationid="gallery-page"]',
    aboutLink: '[data-automationid="about-page"]',
    inputTodo: '[data-cy="todo-text"]',
    addButton: '[data-cy="add-btn"]',
    deleteButton: '[data-cy="delete-btn"]',
    editButton: '[data-cy="edit-btn"]',
    editText: '[data-cy="edit-text"]',
    saveButton: '[data-cy="save-btn"]',
    todoLabel: '[data-cy="label"]',
  };

  it('Test welcome page', () => {
    cy.visit('/');
    cy.get(S.title).should('have.text', 'welcome!');
  });

  it('Test Home page', () => {
    cy.visit('/');
    cy.get(S.homeLink).click();
    cy.url().should('include', '/home');
  });

  it('Test Todo list page', () => {
    cy.visit('http://localhost:4200');
    cy.get(S.todoLink).click();
    cy.url().should('include', '/todo');
    cy.get(S.title).should('have.text', 'Todo list');
  });

  it('Test Posts page', () => {
    cy.visit('http://localhost:4200');
    cy.get(S.postsLink).click();
    cy.url().should('include', '/posts');
    cy.get(S.title).should('have.text', 'Posts');
  });

  it('Test Gallery page', () => {
    cy.visit('http://localhost:4200');
    cy.get(S.galleryLink).click();
    cy.url().should('include', '/gallery');
    cy.get(S.title).should('have.text', 'Gallery');
  });

  it('Test About page', () => {
    cy.visit('/');
    cy.get(S.aboutLink).click();
    cy.url().should('include', '/about');
    cy.get(S.title).should('have.text', 'About');
  });

  it('Test input text in todo list', () => {
    cy.visit('/');
    cy.get(S.todoLink).click();
    cy.get(S.inputTodo).type('Hello World');
    cy.get(S.addButton).click();
    cy.get('[data-cy="todo-item"]:nth-child(1) [data-cy="label"]').should('have.text', 'Hello World');
  });

  it('Test input text in todo list, checkbox, edit and delete item', () => {
    cy.visit('/');
    cy.get(S.todoLink).click();

    const items = ['Я', 'ТЕСТУЮ', 'ТУДУ ЛІСТ', 'ДОБАВЛЯЄ?', 'ЗАРАЗ БУДЕ ВІДМІЧАТИ', 'А ПОТІМ СТИРАТИ'];

    items.forEach((text) => {
      cy.get(S.inputTodo).type(text);
      cy.get(S.addButton).click();
    });

    items.forEach((text, index) => {
      cy.get(`[data-cy="todo-item"]:nth-child(${index + 1}) [type="checkbox"]`).check({force: true});
    });
    cy.get('[data-cy="todo-item"]').should('have.length', items.length);

    items.forEach((text, index) => {
      cy.get(`[data-cy="todo-item"]:nth-child(${index + 1}) [type="checkbox"]`).should('have.attr', 'aria-checked', 'true')
    });

    cy.get(S.deleteButton).first().click()
    cy.get('[data-cy="todo-item"]').should('have.length', items.length-1);

    cy.get('[data-cy="todo-item"]:nth-child(1) [type="checkbox"]').uncheck({force: true});
    cy.get(S.editButton).first().click()
    cy.get(S.editText).clear().type('Змінюємо текст')
    cy.get(S.saveButton).click()
    cy.get(S.todoLabel).first().should('have.text', 'Змінюємо текст')
  });
});
