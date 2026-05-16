import { Page } from '@playwright/test';

export class BasePage {
    constructor(public page : Page) {}

    async navigate (path: string) {
        await this.page.goto(path);
    }

    async getPageTitle() {
        return await this.page.title();
    }
}