import { type Page, expect } from '@playwright/test';

/**
 * ログインページでメール・パスワードを入力し、ログインボタンをクリックする。
 *
 * webkit では React hydration がフォーム入力値を上書きすることがあるため、
 * fill() 後に inputValue() で値を検証し、消えていた場合は hydration 完了を
 * 待ってから再入力する。
 */
export async function fillAndLogin(
  page: Page,
  email: string,
  password: string,
) {
  const emailInput = page.getByRole('textbox', { name: 'メールアドレス' });
  const passwordInput = page.getByRole('textbox', { name: 'パスワード' });

  // メールアドレス入力 — hydration で値が消えた場合は再入力
  await emailInput.fill(email);
  if ((await emailInput.inputValue()) !== email) {
    await page.waitForTimeout(500);
    await emailInput.fill(email);
  }

  // パスワード入力
  await passwordInput.fill(password);
  if ((await passwordInput.inputValue()) !== password) {
    await page.waitForTimeout(500);
    await passwordInput.fill(password);
  }

  // 入力値が反映されていることを確認してからクリック
  await expect(emailInput).toHaveValue(email);
  await expect(passwordInput).toHaveValue(password);

  await page.getByRole('button', { name: 'ログイン' }).click();
}
