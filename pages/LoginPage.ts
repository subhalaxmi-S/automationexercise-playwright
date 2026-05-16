import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private loginSection = this.page.locator('[action="/login"]');
    private signupSection = this.page.locator('[action="/signup"]');

    private loginEmailField = this.loginSection.getByPlaceholder('Email Address');
    private loginPasswordField = this.loginSection.getByPlaceholder('Password');
    private loginButton = this.loginSection.getByRole('button', { name: 'Login' });
    private loginPageHeading = this.page.getByText('Login to your account');

    private signupNameField = this.signupSection.getByPlaceholder('Name');
    private signupEmailField = this.signupSection.getByPlaceholder('Email Address');
    private signupButton = this.signupSection.getByRole('button', { name: 'Signup' });
    private duplicateEmailError = this.signupSection.getByText('Email Address already exist!');

    async goTo() {
        await this.navigate('/login');
    }

    async login(email: string, password: string) {
        await this.loginEmailField.fill(email);
        await this.loginPasswordField.fill(password);
        await this.loginButton.click();
    }

    isLoginPageVisible() {
        return this.loginPageHeading;
    }

    async signup(name: string, email: string) {
        await this.signupNameField.fill(name);
        await this.signupEmailField.fill(email);
        await this.signupButton.click();
    }

    isEmailAlreadyExistVisible() {
        return this.duplicateEmailError;
    }

    getLoginErrorMessage() {
        return this.loginSection.getByText('Your email or password is incorrect!');
    }
}