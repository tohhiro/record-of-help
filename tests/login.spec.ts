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

test('ドメイン名でアクセスすると、タイトル、ログインページへの遷移リンクが表示される', async ({
  page,
}) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Record of Help/);
  await expect(page.getByRole('link', { name: 'Go to Login Page' })).toBeVisible();
});

test('ログインページへの遷移するとメールアドレスとパスワードの入力欄が表示される', async ({
  page,
}) => {
  await page.goto(url);
  await page.getByRole('link', { name: 'Go to Login Page' }).click();

  await expect(page.getByRole('textbox', { name: 'メールアドレス' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'パスワード' })).toBeVisible();
});

test('ログインするとヘッダーのリンクが表示される', async ({ page }) => {
  await page.goto(`${url}login`);

  await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
  await page.getByRole('textbox', { name: 'パスワード' }).fill(password);
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page.getByRole('link', { name: 'Form' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByText(email)).toBeVisible();
  await expect(page).toHaveURL(`${url}dashboard`);
});
