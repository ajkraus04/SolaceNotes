
describe('Solace E2E', () => {
  beforeEach(()=> {
    cy.task('resetDB');
  })

  it('successfully loads page', () => {
    cy.visit('/');
  })
  
  it('add note',()=>{
    cy.visit('/');
    cy.get('#add-card textarea').type(`My name is Jeff. I'm a serious cop.`);
    cy.get('#add-card button').click();
    cy.contains(`My name is Jeff. I'm a serious cop.`);
  })


  it('add and edit',()=>{
    cy.visit('/');
    cy.get('#add-card textarea').type(`My name is Jeff. I'm a serious cop.`);
    cy.get('#add-card button').click();
    cy.contains(`My name is Jeff. I'm a serious cop.`);
    cy.get('#note-card button').contains('Edit').click();
    cy.get('#edit-card textarea').clear().type('My name is not Jeff. It is Monte Python.');
    cy.get('#edit-card button').contains('Save').click();
    cy.contains(`My name is not Jeff. It is Monte Python.`);
  })

  it('add and delete',()=>{
    cy.visit('/');
    cy.get('#add-card textarea').type(`My name is Jef-WAIT! NO! DON'T DELETE MEEEEE!!!`);
    cy.get('#add-card button').click();
    cy.contains(`My name is Jef-WAIT! NO! DON'T DELETE MEEEEE!!!`);
    cy.get('#note-card button').contains('Delete').click();
    cy.contains(`My name is Jef-WAIT! NO! DON'T DELETE MEEEEE!!!`).should('not.exist')
  })

  it('Full Runthrough',()=>{
    cy.visit('/');
    cy.get('#add-card textarea').type(`My name is Jeff. I'm a serious cop.`);
    cy.get('#add-card button').click();
    cy.contains(`My name is Jeff. I'm a serious cop.`);

    cy.get('#add-card textarea').type(`My name is Andrew. I'm a serious Developer.`);
    cy.get('#add-card button').click();
    cy.contains(`My name is Andrew. I'm a serious Developer.`)
    cy.get('#note-card button').contains('Edit').click();
    cy.get('#edit-card textarea').clear().type('My name is not Andrew. It is Andy.');
    cy.get('#edit-card button').contains('Save').click();
    cy.contains(`My name is not Andrew`)

    cy.get('#add-card textarea').type(`My name is Jef-WAIT! NO! DON'T DELETE MEEEEE!!!`);
    cy.get('#add-card button').click();
    cy.contains(`My name is Jef-WAIT! NO! DON'T DELETE MEEEEE!!!`);
    cy.get('#note-card button').contains('Delete').click();
    cy.contains(`My name is Jef-WAIT! NO! DON'T DELETE MEEEEE!!!`).should('not.exist');

    cy.get("#search-bar input").type('Andrew');
    cy.get('#note-card').contains(`My name is not Andrew. It is Andy`);

    cy.get("#note-card").should('have.length', 1);
  })

})
