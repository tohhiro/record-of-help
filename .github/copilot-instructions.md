# Copilot Instructions

## プロジェクト概要

- Next.js 14 (App Router) + TypeScript + Supabase のアプリケーション
- 状態管理: Zustand (`app/store`)
- データフェッチ: SWR
- テスト: Jest + React Testing Library (単体), Playwright (E2E)
- Storybook でコンポーネントカタログ管理

## コーディング規約

### 全般

- 言語: TypeScript を厳格に使用。`as any` は避け、型安全なコードを書く
- `as unknown as SomeType` より、型準拠のヘルパー関数やファクトリを使う
- ESLint (`next lint`) と Prettier (`npm run format`) に準拠
- 未使用変数はプレフィックス `_` を付ける（ESLint `no-unused-vars` 対応）

### テスト

- `jest.mock` と `jest.spyOn` の併用は避け、`spyOn` のみで統一する（将来方針。既存テストは段階的に移行中）
  - ESM エクスポートで `spyOn` だけでは書き換えできない場合のみ `jest.mock` を使用（例: Zustand の `useStore`）
- テストのクリーンアップ: `afterEach` で `jest.clearAllMocks()`
  - `spyOn` を使うテストでは `jest.restoreAllMocks()` も追加する
  - `describe` スコープで `const` 宣言した spy を再利用する場合は `restoreAllMocks` を `afterAll` に配置
- モックデータは `as any` や `as jest.Mock` ではなく、型準拠のヘルパー関数を作成する
- async コールバックのテストでは `await act(async () => { ... })` で Promise 完了を待機し、`waitFor` でアサーションを待つ
- Supabase のモックには `@supabase/supabase-js` や `@supabase/auth-js` の型（`Session`, `Subscription` 等）を使用する

### Supabase

- クライアントは `app/libs/supabase.ts` で一元管理
- fetcher 関数では `try/catch` で例外をラップし `throw new Error(String(error))` で統一
- `suspense: true` の SWR では、SWR 自体がエラーをスローするため、返り値で `swrError` を throw する必要はない

## 品質チェック（PR 前に必ず実行）

```bash
npm run typecheck   # 型チェック
npm run lint        # ESLint
npm run test:unit   # Jest 単体テスト
npm run test:e2e    # Playwright E2Eテスト
npm run build       # ビルド
```

## ブランチ命名規則

- `feat/` - 新機能
- `fix/` - バグ修正
- `refact/` - リファクタリング（※ブランチ名は慣例で `refact/` を使用）

## コミットメッセージ

- Conventional Commits に従う: `feat:`, `fix:`, `refactor:`, `test:`, `chore:`（※コミットプレフィックスは `refactor:` が正式）
- 原則日本語で記載する
- issue を閉じる場合は `Closes #<番号>` をコミットメッセージまたは PR body に記載
- 意味のある塊でコミットする（複数の無関係な変更を1コミットにまとめない）

## Copilot の作業ルール

- レビューを依頼されたら、3回繰り返して行う
- 修正を行った後は、ユーザーに確認を求める（勝手にコミットしない）
- push する前に以下を実行し、結果を報告してから許可を求める:
  1. `npm run typecheck`
  2. `npm run lint`
  3. `npm run test:unit`
  4. `npm run test:e2e`
  5. `npm run build`
  - 問題がある場合は原因を分析し報告する
- GitHub との通信（issue 取得、PR 作成、レビューコメント確認等）は `gh` コマンドを使用する
