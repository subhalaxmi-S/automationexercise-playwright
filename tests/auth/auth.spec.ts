import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignUpPage';
import users from '../../test-data/users.json';

let homePage: HomePage;
let loginPage: LoginPage;
let signupPage: SignupPage;

test.describe('Auth tests', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignupPage(page);
        await homePage.goTo();
        await expect(homePage.isHomePageVisible()).toBeVisible();
    });

    test('TC1 - should register a new user successfully', async () => {
        const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
        await homePage.clickSignupLogin();
        await loginPage.signup(users.validUser.name, uniqueEmail);
        await signupPage.fillAccountInfo(users.validUser);
        await signupPage.clickCreateAccount();
        await expect(signupPage.isAccountCreatedVisible()).toBeVisible();
        await signupPage.clickContinue();
        await expect(homePage.isLoggedInUserVisible()).toContainText('Logged in as');
        await homePage.clickDeleteAccount();
        await expect(homePage.isAccountDeletedVisible()).toBeVisible();
        await signupPage.clickContinue();
    });

    test('TC2 - should login with valid credentials', async ({ page, request }) => {
        const uniqueEmail = `testuser_${Date.now()}@gmail.com`;

        // Register a new user via API
        const response = await request.post('https://automationexercise.com/api/createAccount', {
            form: {
                name: users.validUser.name,
                email: uniqueEmail,
                password: users.validUser.password,
                title: users.validUser.title,
                birth_date: users.validUser.day,
                birth_month: users.validUser.month,
                birth_year: users.validUser.year,
                firstname: users.validUser.firstName,
                lastname: users.validUser.lastName,
                company: users.validUser.company,
                address1: users.validUser.address,
                country: users.validUser.country,
                state: users.validUser.state,
                city: users.validUser.city,
                zipcode: users.validUser.zipcode,
                mobile_number: users.validUser.mobileNumber
            }
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.message).toBe('User created!');

        // Login with the registered user
        await homePage.clickSignupLogin();
        await loginPage.login(uniqueEmail, users.validUser.password);
        await expect(homePage.isLoggedInUserVisible()).toContainText('Logged in as');

        // Cleanup - delete the created user account
        await request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                email: uniqueEmail,
                password: users.validUser.password
            }
        });
    });

    test('TC3 - should not login with invalid credentials', async () => {
        await homePage.clickSignupLogin();
        await loginPage.login(users.invalidUser.email, users.invalidUser.password);
        await expect(loginPage.getLoginErrorMessage()).toBeVisible();
    });

    test('TC4 - should logout successfully', async ({ page, request }) => {
        const uniqueEmail = `testuser_${Date.now()}@gmail.com`;

        // Register a new user via API
        const response = await request.post('https://automationexercise.com/api/createAccount', {
            form: {
                name: users.validUser.name,
                email: uniqueEmail,
                password: users.validUser.password,
                title: users.validUser.title,
                birth_date: users.validUser.day,
                birth_month: users.validUser.month,
                birth_year: users.validUser.year,
                firstname: users.validUser.firstName,
                lastname: users.validUser.lastName,
                company: users.validUser.company,
                address1: users.validUser.address,
                country: users.validUser.country,
                state: users.validUser.state,
                city: users.validUser.city,
                zipcode: users.validUser.zipcode,
                mobile_number: users.validUser.mobileNumber
            }
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.message).toBe('User created!');

        await homePage.clickSignupLogin();
        await loginPage.login(uniqueEmail, users.validUser.password);
        await expect(homePage.isLoggedInUserVisible()).toContainText('Logged in as');
        await homePage.clickLogout();
        await expect(loginPage.isLoginPageVisible()).toBeVisible();

        // Cleanup - delete the created user account
        await request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                email: uniqueEmail,
                password: users.validUser.password
            }
        });
    });

    test('TC5 - should not signup with existing email', async ({ page, request }) => {
        const uniqueEmail = `testuser_${Date.now()}@gmail.com`;

        // Setup - create account via API
        const createResponse = await request.post('https://automationexercise.com/api/createAccount', {
            form: {
                name: users.validUser.name,
                email: uniqueEmail,
                password: users.validUser.password,
                title: users.validUser.title,
                birth_date: users.validUser.day,
                birth_month: users.validUser.month,
                birth_year: users.validUser.year,
                firstname: users.validUser.firstName,
                lastname: users.validUser.lastName,
                company: users.validUser.company,
                address1: users.validUser.address,
                country: users.validUser.country,
                state: users.validUser.state,
                city: users.validUser.city,
                zipcode: users.validUser.zipcode,
                mobile_number: users.validUser.mobileNumber
            }
        });
        const createBody = await createResponse.json();
        expect(createBody.responseCode).toBe(201);
        expect(createBody.message).toBe('User created!');

        // Try to signup via UI with same email
        await homePage.clickSignupLogin();
        await loginPage.signup(users.validUser.name, uniqueEmail);
        await expect(loginPage.isEmailAlreadyExistVisible()).toBeVisible();

        // Cleanup - delete account via API
        await request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                email: uniqueEmail,
                password: users.validUser.password
            }
        });
    });

});