import { expect, test } from '@playwright/test';
import { fillAndLogin } from './helpers/login';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test.describe('離脱する場合のテスト', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}login`);
    await fillAndLogin(page, email, password);
    // ログイン完了を待ち、/formへのリダイレクトを確認
    await expect(page).toHaveURL(/\/form/, { timeout: 30000 });
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });
  test('フォームを入力し、離脱しようとするとconfirmが表示される', async ({ page }) => {
    await page.getByLabel('eito').check();
    await page.getByRole('link', { name: 'Dashboard' }).click();

    page.on('dialog', (dialog) => {
      expect(dialog.message()).toContain('ページを離れても良いですか？');
    });
  });

  test('フォームを入力せず、離脱しようとするとconfirmは表示されない', async ({ page }) => {
    await page.getByRole('link', { name: 'Dashboard' }).click();

    page.on('dialog', (dialog) => {
      expect(dialog.message()).not.toContain('ページを離れても良いですか？');
    });
  });
});
