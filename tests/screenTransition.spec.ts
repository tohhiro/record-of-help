import { test, expect } from '@playwright/test';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test.describe('画面遷移のテスト', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}login`);

    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
    await page.getByRole('textbox', { name: 'パスワード' }).fill(password);
    await page.getByRole('button', { name: 'ログイン' }).click();

    await expect(page.getByRole('link', { name: 'Form' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}dashboard`);
  });
  test('トップページから、Go to Login Pageをクリックするとloginへ遷移する', async ({
    page,
    baseURL,
  }) => {
    await page.goto(`${baseURL}`);
    await page.getByRole('link', { name: 'Go to Login Page' }).click();
    await expect(page).toHaveURL(`${baseURL}login`);
  });

  test('ログイン後、ナビゲーションのFormをクリックするとformへ遷移する', async ({
    page,
    baseURL,
  }) => {
    await page.getByRole('link', { name: 'Form' }).click();
    await expect(page).toHaveURL(`${baseURL}form`);
  });

  test('ログイン後、ナビゲーションのDashboardをクリックするとdashboardへ遷移する', async ({
    page,
    baseURL,
  }) => {
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(`${baseURL}dashboard`);
  });
});
