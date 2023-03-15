describe('react to-do app', () => {
  const url = 'https://todomvc.com/examples/react/#/';
  const S = {
    title: '[data-reactid=".0.0.0"]',
    todo_input_field: '[data-reactid=".0.0.1"]',
    items_count: '[data-reactid=".0.2.0.0"]',
    check_all_todo: '[data-reactid=".0.1.1"]',
    active_bottom: '[data-reactid=".0.2.1.2.0"]',
    completed_bottom: '[data-reactid=".0.2.1.4.0"]',
    clear_completed: '[data-reactid=".0.2.2"]',
    all_bottom: '[data-reactid=".0.2.1.0"]',
  };
  beforeEach(() => {
    // This code will run before each test case
    cy.visit(url);
  });

  it('Test welcome page', () => {
    cy.get(S.title).should('have.text', 'todos');
  });
  it('Test input 4 todos', () => {
    cy.get(S.todo_input_field).click();
    cy.get(S.todo_input_field).type('first task{enter}');
    cy.get(S.todo_input_field).type('second task{enter}');
    cy.get(S.todo_input_field).type('third task{enter}');
    cy.get(S.todo_input_field).type('fourth task{enter}');

    cy.get(S.items_count).should('have.text', '4');
    cy.get('.todo-list li').should('have.length', 4);
  });
  it('check all', () => {
    cy.get(S.todo_input_field).type('first task{enter}');
    cy.get(S.todo_input_field).type('second task{enter}');
    cy.get(S.check_all_todo).click();
    cy.get(S.items_count).should('have.text', '0');
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.completed').should('have.length', 2);
    cy.get(S.check_all_todo).click();
    cy.get(S.items_count).should('have.text', '2');
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.completed').should('have.length', 0);
  });
  it('delete bottom', () => {
    cy.get(S.todo_input_field).type('first task{enter}');
    cy.get(S.todo_input_field).type('second task{enter}');
    cy.get(S.todo_input_field).type('third task{enter}');
    cy.get(S.todo_input_field).type('fourth task{enter}');
    cy.get('.todo-list li').should('have.length', 4);
    cy.get('.todo-list li .destroy').first().click({ force: true });
    cy.get('.todo-list li .destroy').eq(1).click({ force: true });
    cy.get('.todo-list li:last .destroy').click({ force: true });
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list label').first().should('have.text', 'second task');
  });
  it('all active completed', () => {
    cy.get(S.todo_input_field).type('first task{enter}');
    cy.get(S.todo_input_field).type('second task{enter}');
    cy.get(S.todo_input_field).type('third task{enter}');
    cy.get(S.todo_input_field).type('fourth task{enter}');
    cy.get('.todo-list li .toggle').eq(0).click({ force: true });
    cy.get('.todo-list li .toggle').eq(2).click({ force: true });
    cy.get(S.items_count).should('have.text', '2');
    cy.get('.todo-list li').should('have.length', 4);
    cy.get(S.active_bottom).click();
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.todo-list label').eq(0).should('have.text', 'second task');
    cy.get('.todo-list label').eq(1).should('have.text', 'fourth task');
    cy.get(S.completed_bottom).click();
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.todo-list label').eq(0).should('have.text', 'first task');
    cy.get('.todo-list label').eq(1).should('have.text', 'third task');
  });
  it('clear complated', () => {
    cy.get(S.todo_input_field).type('first task{enter}');
    cy.get(S.todo_input_field).type('second task{enter}');
    cy.get(S.todo_input_field).type('third task{enter}');
    cy.get(S.todo_input_field).type('fourth task{enter}');
    cy.get('.todo-list li .toggle').eq(0).click({ force: true });
    cy.get('.todo-list li .toggle').eq(1).click({ force: true });
    cy.get('.todo-list li .toggle').eq(2).click({ force: true });
    cy.get('.todo-list li').should('have.length', 4);
    cy.get('.completed').should('have.length', 3);
    cy.get('.todo-list li').eq(3).should('not.have.class', 'completed');
    cy.get(S.clear_completed).click();
    cy.get(S.completed_bottom).click();
    cy.get('.todo-list li').should('have.length', 0);
    cy.get(S.all_bottom).click();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li').should('have.text', 'fourth task');
  });
  it('edit task', () => {
    cy.get(S.todo_input_field).type('first task{enter}');
    cy.get(S.todo_input_field).type('second task{enter}');
    cy.get('.todo-list label').eq(0).dblclick({ force: true });
    cy.get('.todo-list li .edit').eq(0).clear({ force: true }).type('New task #1{enter}');
    cy.get('.todo-list label').eq(1).dblclick({ force: true });
    cy.get('.todo-list li .edit').eq(1).clear({ force: true }).type('New task #2{enter}');
    cy.get('.todo-list li').eq(0).should('have.text', 'New task #1');
    cy.get('.todo-list li').eq(1).should('have.text', 'New task #2');
  });
});
