describe('Todo Приложение', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('должен отображать заголовок приложения', () => {
    cy.get('h1').should('contain', 'Todo App')
  })

  it('должен иметь поле ввода и кнопку добавления', () => {
    cy.get('input[type="text"]').should('be.visible')
    cy.get('button').contains('Add task').should('be.visible')
  })

  it('должен добавлять новую задачу', () => {
    const todoText = 'Изучить тестирование Cypress'
    
    cy.get('input[type="text"]').type(todoText)
    cy.get('button').contains('Add task').click()
    
    cy.get('.todo-item').should('have.length', 1)
    cy.get('.todo-item span').should('contain', todoText)
  })

  it('должен отмечать задачу как выполненную', () => {
    cy.get('input[type="text"]').type('Тестовая задача')
    cy.get('button').contains('Add task').click()
    
    cy.get('.custom-checkbox').first().click()
    
    cy.get('.todo-item.completed').should('exist')
    cy.get('.todo-item.completed span').should('have.css', 'text-decoration-line', 'line-through')
  })

  it('должен удалять задачу', () => {
    cy.get('input[type="text"]').type('Задача для удаления')
    cy.get('button').contains('Add task').click()
    
    cy.get('.delete-btn').click()
    
    cy.get('.todo-item').should('not.exist')
    cy.contains('No tasks').should('be.visible')
  })

  it('должен фильтровать задачи по вкладкам', () => {
    cy.get('input[type="text"]').type('Активная задача 1')
    cy.get('button').contains('Add task').click()
    
    cy.get('input[type="text"]').type('Активная задача 2')
    cy.get('button').contains('Add task').click()
    
    cy.get('.custom-checkbox').first().click()
    
    cy.contains('button', 'Active').click()
    cy.get('.todo-item').should('have.length', 1)
    cy.get('.todo-item span').should('contain', 'Активная задача 2')
    
    cy.contains('button', 'Completed').click()
    cy.get('.todo-item').should('have.length', 1)
    cy.get('.todo-item span').should('contain', 'Активная задача 1')
    
    cy.contains('button', 'All').click()
    cy.get('.todo-item').should('have.length', 2)
  })

  it('должен обновлять счетчик оставшихся задач', () => {
    cy.get('input[type="text"]').type('Задача 1')
    cy.get('button').contains('Add task').click()
    
    cy.get('input[type="text"]').type('Задача 2')
    cy.get('button').contains('Add task').click()
    
    cy.get('.remaining-count').should('contain', '2 items left')
    
    cy.get('.custom-checkbox').first().click()
    cy.get('.remaining-count').should('contain', '1 items left')
  })

  it('должен очищать выполненные задачи', () => {
    cy.get('input[type="text"]').type('Выполненная задача')
    cy.get('button').contains('Add task').click()
    
    cy.get('input[type="text"]').type('Активная задача')
    cy.get('button').contains('Add task').click()
    
    cy.get('.custom-checkbox').first().click()
    
    cy.get('.clear-btn').not('.disabled').click()
    
    cy.get('.todo-item').should('have.length', 1)
    cy.get('.todo-item span').should('contain', 'Активная задача')
  })

  it('не должен добавлять пустые задачи', () => {
    cy.get('button').contains('Add task').click()
    cy.get('.todo-item').should('not.exist')
  })

  it('должен обрабатывать добавление нескольких задач', () => {
    const tasks = ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4', 'Задача 5']
    
    tasks.forEach(task => {
      cy.get('input[type="text"]').type(task)
      cy.get('button').contains('Add task').click()
    })
    
    cy.get('.todo-item').should('have.length', 5)
    
    // Проверяем что все задачи отображаются
    tasks.forEach(task => {
      cy.contains('.todo-item span', task).should('be.visible')
    })
  })
})