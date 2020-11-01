import { expect } from 'detox';

describe('List Repositories', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should go to the repositories screen', async () => {
    await expect(element(by.id('username-input'))).toBeVisible();
    await element(by.id('username-input')).typeText('Rafatcb');
    await element(by.id('look-for-repositories-button')).tap();
    await expect(element(by.id('username-input'))).toBeNotVisible();
  });

  it('should list repositories', async () => {
    await expect(element(by.id('username-input'))).toBeVisible();
    await element(by.id('username-input')).typeText('Rafatcb');
    await element(by.id('look-for-repositories-button')).tap();

    await expect(element(by.id('repository-list'))).toBeVisible();
    await expect(element(by.id('repository-0-icon'))).toBeVisible();
    await expect(element(by.id('repository-0-name'))).toHaveText(
      'android-material-components',
    );
    await expect(element(by.id('repository-0-created-at'))).toHaveText(
      'Created at 01/29/20',
    );
    await expect(element(by.id('repository-0-description'))).toHaveText(
      '\nCodelabs tutorial about Android: Material Components (MDC)',
    );
  });
});
