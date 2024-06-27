class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async openLogin() {
      await this.page.goto('/');
    }
  
    async login(email, password) {
      await this.page.waitForSelector('#signinEmail', { state: 'visible' });
      await this.page.fill('#signinEmail', email);
      await this.page.waitForSelector('#password', { state: 'visible' });
      await this.page.fill('#password', password);
      await this.page.waitForSelector('#login-button', { state: 'visible' });
      await this.page.click('#login-button');
    }
  }
  
  module.exports = { LoginPage };
  