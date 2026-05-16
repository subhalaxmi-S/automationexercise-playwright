import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private signupLoginButton = this.page.getByRole('link', { name: 'Signup / Login' });
    private homePageBanner = this.page.getByText('Full-Fledged practice website for Automation Engineers').first();
    private logoutButton = this.page.getByRole('link', {name: 'Logout'});
    private loggedInUser = this.page.locator('a:has-text("Logged in as")');
    private deleteAccountButton = this.page.getByRole('link', {name: 'Delete Account'});
    private accountDeletedMessage = this.page.getByText('Account Deleted!');

    async goTo() {
        await this.navigate('/');
    }

    async clickSignupLogin() {
        await this.signupLoginButton.click();
    }

    isHomePageVisible() {
        return this.homePageBanner;
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async clickDeleteAccount() {
        await this.deleteAccountButton.click();
    }

    isLoggedInUserVisible() {
        return this.loggedInUser;
    }

    isAccountDeletedVisible() {
        return this.accountDeletedMessage;
    }
}