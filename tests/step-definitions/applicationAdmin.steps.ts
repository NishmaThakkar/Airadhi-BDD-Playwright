import { Given, When, Then} from '@cucumber/cucumber';
import { CustomWorld  } from '../../tests/fixtures/world';


Given('Application admin should be selected', async function (this: CustomWorld) {
   await this.expect(this.page.locator("//*[contains(@id,'mat-select')]").getByText('Application Admin')).toBeVisible();
});

Then('User should see Configure, Users, Reassign in Side Panel', async function (this: CustomWorld) {
    await this.expect(this.page.locator("//*[contains(@class,'indvPlaces')]").getByText('Configure')).toBeVisible();
    await this.expect(this.page.locator("//*[contains(@class,'indvPlaces')]").getByText('Users')).toBeVisible();
    await this.expect(this.page.locator("//*[contains(@class,'indvPlaces')]").getByText('Reassign')).toBeVisible();
});

Then('User should see Field Configuration, Data Configuration, Mapping Structure, Folder Location in Tabs', async function (this: CustomWorld) {
    await this.expect(this.page.locator("//*[contains(@class,'indvTab')]").getByText('Field Configuration')).toBeVisible();
    await this.expect(this.page.locator("//*[contains(@class,'indvTab')]").getByText('Data Configuration')).toBeVisible();
    await this.expect(this.page.locator("//*[contains(@class,'indvTab')]").getByText('Mapping Structure')).toBeVisible();
    await this.expect(this.page.locator("//*[contains(@class,'indvTab')]").getByText('Folder Location')).toBeVisible();
});