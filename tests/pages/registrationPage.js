import { expect } from '@playwright/test';

export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.reEnterPasswordInput = page.getByLabel('Re-enter password');
    this.nameError = page.locator('#signupName + .invalid-feedback');
    this.lastNameError = page.locator('#signupLastName + .invalid-feedback');
    this.emailError = page.locator('#signupEmail + .invalid-feedback');
    this.passwordError = page.locator('#signupPassword + .invalid-feedback');
    this.reEnterPasswordError = page.locator('#signupReEnterPassword + .invalid-feedback');
  }

  async openSignUp() {
    await this.page.goto('/');
    await this.signUpButton.click();
  }

  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillReEnterPassword(reEnterPassword) {
    await this.reEnterPasswordInput.fill(reEnterPassword);
  }

  async submitForm() {
    await this.registerButton.click();
  }

  async verifyNameError(expectedText) {
    await expect(this.nameError).toHaveText(expectedText);
  }

  async verifyLastNameError(expectedText) {
    await expect(this.lastNameError).toHaveText(expectedText);
  }

  async verifyEmailError(expectedText) {
    await expect(this.emailError).toHaveText(expectedText);
  }

  async verifyPasswordError(expectedText) {
    await expect(this.passwordError).toHaveText(expectedText);
  }

  async verifyReEnterPasswordError(expectedText) {
    await expect(this.reEnterPasswordError).toHaveText(expectedText);
  }

  async verifyRegisterButtonDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }

  async verifyElementCSS(selector, property, value) {
    await expect(selector).toHaveCSS(property, value);
  }
}
