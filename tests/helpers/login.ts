import { type Page, expect } from '@playwright/test';

/**
 * 入力フィールドに値を fill し、hydration で消えた場合はポーリングで再入力する。
 * 固定 sleep ではなく条件ベースの待機を使用する。
 */
async function fillWithRetry(
  locator: ReturnType<Page['getByRole']>,
  value: string,
) {
  await locator.fill(value);
  // hydration による値消失をポーリングで検出・再入力
  const maxRetries = 3;
  for (let i = 0; i < maxRetries; i++) {
    const currentValue = await locator.inputValue();
    if (currentValue === value) {
      return;
    }
    // 最終リトライで一致しなければ、値そのものは出力せずにエラーを投げる
    if (i === maxRetries - 1) {
      const maskedExpected = '*'.repeat(Math.min(value.length, 8));
      throw new Error(
        `fillWithRetry: input value did not stabilize after ${maxRetries} retries ` +
          `(expected length=${value.length}, actual length=${currentValue.length}, ` +
          `masked expected="${maskedExpected}")`,
      );
    }
    await locator.fill(value);
  }
}

/**
 * ログインページでメール・パスワードを入力し、ログインボタンをクリックする。
 *
 * webkit では React hydration がフォーム入力値を上書きすることがあるため、
 * fill() 後に inputValue() で値を検証し、消えていた場合は条件ベースの
 * ポーリングで再入力する。
 */
export async function fillAndLogin(
  page: Page,
  email: string,
  password: string,
) {
  const emailInput = page.getByRole('textbox', { name: 'メールアドレス' });
  const passwordInput = page.getByRole('textbox', { name: 'パスワード' });

  await fillWithRetry(emailInput, email);
  await fillWithRetry(passwordInput, password);

  // 入力値が反映されていることを確認してからクリック
  await expect(emailInput).toHaveValue(email);
  // パスワードは失敗出力への漏洩を防ぐため、長さのみ検証
  const currentPasswordValue = await passwordInput.inputValue();
  expect(currentPasswordValue.length).toBe(password.length);

  await page.getByRole('button', { name: 'ログイン' }).click();
}
