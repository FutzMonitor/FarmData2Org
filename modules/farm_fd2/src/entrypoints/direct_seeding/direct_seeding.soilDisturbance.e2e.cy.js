describe('Direct Seeding: Soil Disturbance Component', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();

    cy.login('admin', 'admin');
    cy.visit('fd2/direct_seeding/');
    cy.waitForPage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  it('Soil disturbance accordion exists, is visible, is collapsed', () => {
    cy.get('[data-cy="direct-seeding-soil-disturbance-accordion"]').should(
      'be.visible'
    );
    cy.get('[data-cy="direct-seeding-soil-disturbance-accordion-title"]')
      .should('be.visible')
      .should('contain.text', 'Equipment & Soil Disturbance');
    cy.get('[data-cy="direct-seeding-soil-disturbance-accordion-item"]').should(
      'not.be.visible'
    );
  });

  it('Soil disturbance accordion expands to show equipment selector', () => {
    cy.get(
      '[data-cy="direct-seeding-soil-disturbance-accordion-title"]'
    ).click();

    cy.get(
      '[data-cy="direct-seeding-soil-disturbance-accordion-title"]'
    ).click();
    cy.get('[data-cy="direct-seeding-soil-disturbance-accordion-item"]').should(
      'be.visible'
    );
    cy.get('[data-cy="direct-seeding-soil-disturbance"]').should('be.visible');
  });

  it('Validity styling not shown in soil disturbance component', () => {
    cy.get(
      '[data-cy="direct-seeding-soil-disturbance-accordion-title"]'
    ).click();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="equipment-selector-1"]')
      .find('[data-cy="selector-input"]')
      .should('not.have.class', 'is-valid')
      .should('not.have.class', 'is-invalid');
  });

  it('Proper numeric fields appear when equipment is selected', () => {
    cy.get(
      '[data-cy="direct-seeding-soil-disturbance-accordion-title"]'
    ).click();
    cy.get('[data-cy="equipment-selector-1"]')
      .find('[data-cy="selector-input"]')
      .select('Tractor');

    cy.get('[data-cy="soil-disturbance-depth"]').should('be.visible');
    cy.get('[data-cy="soil-disturbance-speed"]').should('be.visible');
    cy.get('[data-cy="soil-disturbance-area"]').should('be.visible');
    cy.get('[data-cy="soil-disturbance-passes"]').should('not.exist');
  });

  it('Check area computation with no beds', () => {
    cy.get(
      '[data-cy="direct-seeding-soil-disturbance-accordion-title"]'
    ).click();
    cy.get('[data-cy="equipment-selector-1"]')
      .find('[data-cy="selector-input"]')
      .select('Tractor');

    cy.get('[data-cy="soil-disturbance-area"]')
      .find('[data-cy="numeric-input"]')
      .should('have.value', '');

    cy.get('[data-cy="location-selector"]')
      .find('[data-cy="selector-input"]')
      .select('A');

    cy.get('[data-cy="soil-disturbance-area"]')
      .find('[data-cy="numeric-input"]')
      .should('have.value', '');
  });

  it('Check area computation with beds', () => {
    cy.get(
      '[data-cy="direct-seeding-soil-disturbance-accordion-title"]'
    ).click();
    cy.get('[data-cy="equipment-selector-1"]')
      .find('[data-cy="selector-input"]')
      .select('Tractor');

    cy.get('[data-cy="soil-disturbance-area"]')
      .find('[data-cy="numeric-input"]')
      .should('have.value', '');

    cy.get('[data-cy="location-selector"]')
      .find('[data-cy="selector-input"]')
      .select('CHUAU');

    // Pick CHUAU-1
    cy.get('[data-cy="picker-options"]').find('input').eq(0).check();

    cy.get('[data-cy="soil-disturbance-area"]')
      .find('[data-cy="numeric-input"]')
      .should('have.value', '20');

    cy.get('[data-cy="location-selector"]')
      .find('[data-cy="selector-input"]')
      .select('A');

    cy.get('[data-cy="soil-disturbance-area"]')
      .find('[data-cy="numeric-input"]')
      .should('have.value', '');
  });
});
