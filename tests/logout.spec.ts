import { expect, test } from '@playwright/test';

const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test('ログアウトするとヘッダーのリンクが非表示になる', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}login`);

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
