import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// ローカル環境では.env.localファイルから読み込む
if (process.env.NODE_ENV !== 'production') {
  const envPath = path.resolve(__dirname, '../.env.local');
  dotenv.config({ path: envPath });
}

const url = process.env.URL as string;
const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test('ログアウトするとヘッダーのリンクが非表示になる', async ({ page }) => {
  await page.goto(`${url}login`);

  await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
  await page.getByRole('textbox', { name: 'パスワード' }).fill(password);
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page.getByRole('link', { name: 'Form' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

  const emailOnHeader = page.getByText(email);
  await expect(emailOnHeader).toBeVisible();

  await emailOnHeader.click();
  await expect(page.getByRole('link', { name: 'Form' })).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Dashboard' })).not.toBeVisible();
  await expect(emailOnHeader).not.toBeVisible();
});
