import {URL} from '../../src/utils/api-request';


describe('burger constructor is working', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  describe('ingredient modal is working', () => {
    it('opens and closes ingredient modal', function() {
      cy.get('[class^=burger-ingredient-item_item_container__]').first().as('ingredient');
      cy.get('#react-modals').as('modalContainer');

      cy.get('@ingredient').click();
      cy.get('@modalContainer')
        .find('[class^=modal_header_with_title__]')
        .should('exist');
      cy.get('@modalContainer').find('[class^=modal_close_icon__]').click();
      cy.get('@modalContainer')
        .find('[class^=modal_header_with_title__]')
        .should('not.exist');
    });
  });
})


  describe('auth is working', () => {
    before(function () {
      cy.visit('http://localhost:3000');
    });
    it('sign in and signout is working', function() {
      cy.visit('http://localhost:3000');
      cy.get('[class^=app-header_appHeader__]').contains('Личный кабинет').click();
      cy.get('[class^=pages_login__]').then((loginForm) => {
        if (loginForm) {
          cy.get('input[type="email"]').type('2@yandex.ru');
          cy.get('input[type="password"]').type('11111111');
          cy.get('button').contains('Войти').click();
        }
      cy.contains('Профиль');
      cy.url().should('contain', '/profile');
      cy.url().should('contain', '/profile');
      cy.get('[class^=profile_profile__selector__]').contains('Выход').click()
      
    });
    });
   
    describe('you shouldn`t be able to send order without ingredients', () => {
      before(function () {
        cy.visit('http://localhost:3000');
      });
    it('you shouldn`t be able to send order without ingredients', function() {
      cy.get('[class^=app-header_appHeader__]').contains('Конструктор').click();

      const stub = cy.stub()  
    cy.on ('window:alert', stub)
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[class^=burger-constructor_make_order__]')
    .find('button')
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('добавьте ингредиенты')      
    })  

    });
  })
})

    describe('it`s possible to add bun to burger constructor', () => {
      before(function () {
        cy.visit('http://localhost:3000');
      });
      it('adding bun to constructor', function() {
        cy.get('[class^=burger-ingredient-item_item_container__]').first().as('menuIngredient');
        cy.get('[class^=burger-constructor_container__]').as('constructor');
  
  
        cy.get('@menuIngredient').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
     
        const stub = cy.stub()  
    cy.on ('window:alert', stub)
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[class^=burger-constructor_make_order__]')
    .find('button')
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('добавьте ингредиенты')      
    })  

      });
    });
  
  describe('it`s possible to add ingredient to burger constructor', () => {
  before(function () {
    cy.visit('http://localhost:3000');
  });
    it('adding ingredient to constructor', function() {

      cy.get('[class^=burger-ingredient-item_item_container__]').first().as('menuIngredient');
      cy.get('[class^=burger-constructor_container__]').as('constructor');

      cy.get('[class^=burger-ingredients_ingredientGroup__]')
        .children()
        .contains('Мясо бессмертных моллюсков Protostomia')
        .trigger('dragstart')
      cy.get('@constructor')
        .first()
        .trigger('drop');

      cy.get('[class^=burger-ingredients_ingredientGroup__]')
        .children()
        .contains('Биокотлета из марсианской Магнолии')
        .trigger('dragstart')
      cy.get('@constructor')
        .first()
        .trigger('drop');
    });
  });

  describe('check if you can order', () => {
  before(function () {
    cy.visit('http://localhost:3000');
  });
    it('order button should work', function() {
      cy.visit('http://localhost:3000');
      cy.get('[class^=app-header_appHeader__]').contains('Личный кабинет').click();
      cy.get('[class^=pages_login__]').then((loginForm) => {
        if (loginForm) {
          cy.get('input[type="email"]').type('2@yandex.ru');
          cy.get('input[type="password"]').type('11111111');
          cy.get('button').contains('Войти').click();
        }
      cy.contains('Профиль');
      cy.url().should('contain', '/profile');
     
      cy.get('[class^=app-header_appHeader__]').contains('Конструктор').click();


      cy.get('[class^=burger-ingredient-item_item_container__]').first().as('menuIngredient');
      cy.get('[class^=burger-constructor_container__]').as('constructor');


      cy.get('@menuIngredient').trigger('dragstart');
      cy.get('@constructor').trigger('drop');

      cy.get('[class^=burger-ingredients_ingredientGroup__]')
        .children()
        .contains('Мясо бессмертных моллюсков Protostomia')
        .trigger('dragstart')
      cy.get('@constructor')
        .first()
        .trigger('drop');

      cy.get('[class^=burger-constructor_make_order__]')
          .contains('Оформить заказ')
          .as('orderButton');

      cy.get('@orderButton').click();

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(16000);

      cy.get('[class^=order-detail_container__]')
        .contains('идентификатор заказа');
    });

    it('orderId modal is closing correctly', function() {
      cy.get('body').type('{esc}');
    });
  });
  })

