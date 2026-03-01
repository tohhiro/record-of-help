import { expect, test } from '@playwright/test';
import { fillAndLogin } from './helpers/login';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test('ログアウトするとヘッダーのリンクが非表示になる', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}login`);
  await fillAndLogin(page, email, password);

  // ログイン完了を待つ（URLが/loginから変わるまで）
  await expect(page).not.toHaveURL(/\/login/, { timeout: 30000 });

  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

  const emailOnHeader = page.getByText(email);
  await expect(emailOnHeader).toBeVisible();

  await emailOnHeader.click();
  await expect(page.getByRole('link', { name: 'Dashboard' })).not.toBeVisible();
  await expect(emailOnHeader).not.toBeVisible();
});
