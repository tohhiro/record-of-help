import { test, expect } from '@playwright/test';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test('フォームを入力し、離脱しようとするとconfirmが表示される', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}login`);

  await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
  await page.getByRole('textbox', { name: 'パスワード' }).fill(password);
  await page.getByRole('button', { name: 'ログイン' }).click();

  await page.getByRole('link', { name: 'Form' }).click();

  await page.getByLabel('eito').check();

  await page.getByRole('link', { name: 'Form' }).click();

  page.on('dialog', (dialog) => {
    expect(dialog.message()).toContain('ページを離れても良いですか？');
  });
});
