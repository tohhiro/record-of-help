import { expect, test } from '@playwright/test';
import { fillAndLogin } from './helpers/login';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test.describe('画面遷移のテスト', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}login`);
    await fillAndLogin(page, email, password);

    // ログイン成功後にリダイレクトされることを確認
    await expect(page).not.toHaveURL(/\/login/, { timeout: 30000 });
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
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
    // admin権限がある場合のみFormリンクが表示される
    const formLink = page.getByRole('link', { name: 'Form' });
    if (await formLink.isVisible()) {
      await formLink.click();
      await expect(page).toHaveURL(`${baseURL}form`);
    }
  });

  test('ログイン後、ナビゲーションのDashboardをクリックするとdashboardへ遷移する', async ({
    page,
    baseURL,
  }) => {
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(`${baseURL}dashboard`);
  });
});
