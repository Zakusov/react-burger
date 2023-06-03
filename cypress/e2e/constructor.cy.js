import {BASE_URL} from "../../src/utils/constants";

describe('Burger constructor page', function () {
    const host = 'http://localhost:3000';
    const modal = '[data-id="modal"]';
    const bun = '[data-id="643d69a5c3f7b9001cfa093c"]';
    const main = '[data-id="643d69a5c3f7b9001cfa0941"]';
    const price = '[data-id="price"]';
    const orderButton = '[data-id="order-button"]';
    const constructor = '[data-id="burger-constructor"]';

    beforeEach(() => {
        window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
        cy.setCookie('accessToken', 'test-accessToken')
        cy.intercept('GET', `${BASE_URL}/auth/user`, {fixture: "user.json"});
        cy.intercept('GET', `${BASE_URL}/ingredients`, {fixture: "ingredients.json"});
        cy.viewport(1400, 1000)
        cy.visit(host);
        cy.contains('Соберите бургер');
    })

    it('should open and close ingredient popup', () => {
        cy.get(bun).click();
        cy.url().should('equal', `${host}/ingredients/643d69a5c3f7b9001cfa093c`);
        cy.get(modal).contains('p', 'Краторная булка N-200i')
        cy.get(modal).should('exist');
        cy.get(modal).find('svg').first().click();
        cy.get(modal).should('not.exist');
        cy.url().should('equal', `${host}/`);
    })

    it('should work drag-n-drop', () => {
        cy.get(price).should('contain.text', 0);
        cy.get(orderButton).should('be.disabled');

        const dnd = new DataTransfer();
        cy.get(bun).trigger('dragstart', {dnd});
        cy.get(constructor).trigger('drop', {dnd});
        cy.get(price).should('contain.text', 2510);
        cy.get(orderButton).should('be.enabled');

        cy.get(main).trigger('dragstart', {dnd});
        cy.get(constructor).trigger('drop', {dnd});
        cy.get(price).should('contain.text', 2934);
        cy.get(orderButton).should('be.enabled');
    })

    it('should create new order', () => {
        cy.intercept('POST', `${BASE_URL}/orders`, {fixture: "order.json"});

        const dnd = new DataTransfer();
        cy.get(bun).trigger('dragstart', {dnd});
        cy.get(constructor).trigger('drop', {dnd});
        cy.get(main).trigger('dragstart', {dnd});
        cy.get(constructor).trigger('drop', {dnd});
        cy.get(orderButton).should('be.enabled').click();
        cy.get(modal).should('exist');
        cy.get(modal).contains('Ваш заказ начали готовить');
    })
})
