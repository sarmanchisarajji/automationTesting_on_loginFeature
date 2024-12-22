/// <reference types="cypress"/>

describe("Login Feature", () => { 
    beforeEach(() => {
        // Mengakses halaman login sebelum setiap test case
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login')
    });

    it("TC_001: User login with valid credentials", () => {
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text', 'Dashboard')
    });

    it("TC_002: User login with valid username and incorrect password", () => {
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('admin1234')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-alert oxd-alert--error"]').should('contain', 'Invalid credentials')
    })

    it("TC_003: User login with incorrect username and valid password", () => {
        cy.get('[name="username"]').type('admin1')
        cy.get('[name="password"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-alert oxd-alert--error"]').should('contain', 'Invalid credentials')
    })

    it("TC_004: User login with invalid credentials", () => {
        cy.get('[name="username"]').type('admin1')
        cy.get('[name="password"]').type('admin1234')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-alert oxd-alert--error"]').should('contain', 'Invalid credentials')
    })

    it("TC_005: User login with empty username and password", () => {
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('contain', 'Required').and('be.visible')
    })

    it("TC_006: User login with empty username and valid password", () => {
        cy.get('[name="password"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('contain', 'Required').and('be.visible')
    })

    it("TC_007: User login with valid username and empty password", () => {
        cy.get('[name="username"]').type('admin')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('contain', 'Required').and('be.visible')
    })

    it("TC_008: User login with empty username and incorrect password", () => {
        cy.get('[name="password"]').type('admin1234')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('contain', 'Required').and('be.visible')
    })

    it("TC_009: User login with incorrect username and empty password", () => {
        cy.get('[name="username"]').type('admin1')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('contain', 'Required').and('be.visible')
    })

    it("TC_010: User navigates to Forgot Password page", () => {
        cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click()
        cy.url().should('include', '/requestPasswordResetCode')
        cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text', 'Reset Password')
    })

    it('TC_011: Reset password link sent successfully', () => {
        cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click()
        cy.url().should('include', '/requestPasswordResetCode')
        cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text', 'Reset Password')
        cy.get('[name="username"]').type('admin')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text','Reset Password link sent successfully')
    })

    it('TC_012: Reset password with empty username', () => {
        cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click()
        cy.url().should('include', '/requestPasswordResetCode')
        cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('have.text', 'Reset Password')
        cy.get('[type="submit"]').click()
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required').and('be.visible')
    })

    it('TC_013: Cancel reset password', () => {
        cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click()
        cy.url().should('include', '/requestPasswordResetCode')
        cy.get('[type="button"]').click()
        cy.url().should('include', '/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login')
    })

})
