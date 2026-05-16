import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export interface UserData {
    title: string;
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

export class SignupPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private titleMr = this.page.locator('#id_gender1');
    private titleMrs = this.page.locator('#id_gender2');
    private signupPassword = this.page.locator('#password');
    private daysDropdown = this.page.locator('#days');
    private monthsDropdown = this.page.locator('#months');
    private yearsDropdown = this.page.locator('#years');
    private firstNameField = this.page.locator('#first_name');
    private lastNameField = this.page.locator('#last_name');
    private companyField = this.page.locator('#company');
    private addressField = this.page.locator('#address1');
    private countryDropdown = this.page.locator('#country');
    private stateField = this.page.locator('#state');
    private cityField = this.page.locator('#city');
    private zipcodeField = this.page.locator('#zipcode');
    private mobileNumberField = this.page.locator('#mobile_number');
    private createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
    private accountCreatedMessage = this.page.getByText('Account Created!');
    private continueButton = this.page.getByText('Continue');

    async fillAccountInfo(userData: UserData) {
        if (userData.title === 'Mr') {
            await this.titleMr.click();
        } else {
            await this.titleMrs.click();
        }
        await this.signupPassword.fill(userData.password);
        await this.daysDropdown.selectOption({ label: userData.day });
        await this.monthsDropdown.selectOption({ label: userData.month });
        await this.yearsDropdown.selectOption({ label: userData.year });
        await this.countryDropdown.selectOption({ label: userData.country });
        await this.firstNameField.fill(userData.firstName);
        await this.lastNameField.fill(userData.lastName);
        await this.companyField.fill(userData.company);
        await this.addressField.fill(userData.address);
        await this.countryDropdown.selectOption(userData.country);
        await this.stateField.fill(userData.state);
        await this.cityField.fill(userData.city);
        await this.zipcodeField.fill(userData.zipcode);
        await this.mobileNumberField.fill(userData.mobileNumber);
    }

    async clickCreateAccount() {
        await this.createAccountButton.click();
    }

    isAccountCreatedVisible() {
        return this.accountCreatedMessage;
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}