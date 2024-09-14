import { test, expect } from '@playwright/test';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test.describe('ログインのテスト', () => {
  test('ドメイン名でアクセスすると、タイトル、ログインページへの遷移リンクが表示される', async ({
    page,
    baseURL,
  }) => {
    await page.goto(`${baseURL}`);

    await expect(page).toHaveTitle(/Record of Help/);
    await expect(page.getByRole('link', { name: 'Go to Login Page' })).toBeVisible();
  });

  test('ログインページへの遷移するとメールアドレスとパスワードの入力欄が表示される', async ({
    page,
    baseURL,
  }) => {
    await page.goto(`${baseURL}`);
    await page.getByRole('link', { name: 'Go to Login Page' }).click();

    await expect(page.getByRole('textbox', { name: 'メールアドレス' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'パスワード' })).toBeVisible();
  });

  test('ログインするとヘッダーのリンクが表示される', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}login`);

    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
    await page.getByRole('textbox', { name: 'パスワード' }).fill(password);
    await page.getByRole('button', { name: 'ログイン' }).click();

    await expect(page.getByRole('link', { name: 'Form' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}dashboard`);
  });
});
