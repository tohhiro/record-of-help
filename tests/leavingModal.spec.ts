import { test, expect } from '@playwright/test';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test.describe('離脱する場合のテスト', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}login`);
    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
    await page.getByRole('textbox', { name: 'パスワード' }).fill(password);
    await page.getByRole('button', { name: 'ログイン' }).click();
    await page.getByRole('link', { name: 'Form' }).click();
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
