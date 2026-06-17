# SES System React

SES/BP営業管理システムのフロントエンドです。  
React + TypeScript + Vite で構成し、Laravel API と接続しています。

## 使用技術

* React
* TypeScript
* Vite
* Tailwind CSS
* Vitest
* React Testing Library
* Biome
* Docker / Docker Compose
* Makefile

## 構成

このシステムは、React側とAPI側を別リポジトリで管理しています。

### React側

```txt
ses-system-react
```

役割：

* 画面表示
* 入力フォーム
* 一覧・詳細・編集画面
* Laravel API との通信

起動URL：

```txt
http://localhost:5173
```

### API側

```txt
ses-system-api
```

役割：

* Laravel API
* PostgreSQL接続
* 認証API
* 案件・要員・スキル・提案履歴・稼働実績のCRUD API

起動URL：

```txt
http://localhost:8000
```

API例：

```txt
http://localhost:8000/api/skills
```

## 主な機能

* ログイン
* 新規登録
* ログアウト
* ログイン中ユーザー復元
* ロール別TOP画面
* 案件管理
* 要員管理
* スキル管理
* マッチング
* 提案履歴管理
* 稼働実績管理
* 論理削除
* 復元
* Laravel API連携

## 認証機能

認証は Laravel API と接続しています。

使用API：

```txt
POST /api/login
POST /api/register
GET  /api/me
POST /api/logout
```

現在は学習・開発用の簡易認証です。

ログイン状態の維持には、React側で `currentUserId` のみ localStorage に保存しています。  
ページ更新時は `/api/me?user_id=...` を呼び出してログイン中ユーザーを復元します。

本格運用する場合は、Laravel Sanctum やトークン認証への変更を想定しています。

## 初期ログインユーザー

API側DBに以下のユーザーを作成して使用します。

```txt
管理者：admin@example.com / password
要員担当：user@example.com / password
企業担当：company@example.com / password
```

新規登録画面から作成できるロールは以下のみです。

```txt
user
company
```

`admin` は新規登録画面から作成できない方針です。

## ロール

### admin

管理者ユーザーです。

* 案件管理
* 要員管理
* スキル管理
* 提案履歴管理
* 稼働実績管理
* ダッシュボード表示

### user

要員担当ユーザーです。

* 案件一覧確認
* 自分の要員管理
* 提案履歴確認

### company

企業ユーザーです。

* 自社案件管理
* 案件マッチング
* 提案履歴確認

## API接続済み機能

React側の主要機能は Laravel API と接続済みです。

```txt
useAuthUsers.ts
→ /login
→ /register
→ /me
→ /logout

useSkills.ts
→ /skills

useProjects.ts
→ /projects
→ /projects/{id}
→ /projects/{id}/restore

useEngineers.ts
→ /engineers
→ /engineers/{id}
→ /engineers/{id}/restore

useProposalHistories.ts
→ /proposal-histories
→ /proposal-histories/{id}
→ /proposal-histories/{id}/restore

useWorkRecords.ts
→ /work-records
→ /work-records/{id}
→ /work-records/{id}/restore
```

## mock / localStorage の扱い

現在、以下のmockデータは撤去済みです。

```txt
mockUsers
mockProjects
mockEngineers
mockSkills
```

また、案件・要員・スキル・提案履歴・稼働実績の保存は localStorage ではなく Laravel API を使用しています。

残っている localStorage は、ログイン状態維持用の `currentUserId` のみです。

## セットアップ

### 1. パッケージをインストール

```bash
npm install
```

### 2. 環境変数ファイルを作成

```bash
cp .env.example .env
```

`.env` の内容：

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

または：

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 3. 開発サーバー起動

```bash
npm run dev
```

起動URL：

```txt
http://localhost:5173
```

## Dockerで起動

```bash
docker compose up --build
```

バックグラウンドで起動する場合：

```bash
docker compose up -d
```

停止：

```bash
docker compose down
```

## Makefile コマンド

### パッケージインストール

```bash
make install
```

### 開発サーバー起動

```bash
make dev
```

### ビルド / Docker再ビルド起動

```bash
make build
```

### Biomeチェック

```bash
make lint
```

### Biome自動整形

```bash
make format
```

### Biomeチェック + 自動修正

```bash
make check
```

### テスト実行

```bash
make test
```

### プレビュー起動

```bash
make preview
```

### Docker起動

```bash
make docker-up
```

### Docker停止

```bash
make docker-down
```

### Dockerビルド起動

```bash
make docker-build
```

## テスト

Vitest + React Testing Library を使用しています。

```bash
make test
```

または：

```bash
npm run test
```

テスト対象：

* StatusBadge
* ProjectForm
* EngineerForm

確認内容：

* ステータス表示
* フォーム表示
* 入力後の送信処理
* キャンセル処理

## Biome

コード整形・Lintに Biome を使用しています。

チェック：

```bash
make lint
```

自動整形：

```bash
make format
```

自動修正込みチェック：

```bash
make check
```

## Laravel APIとの接続

APIの接続先は `.env` で管理しています。

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

各 hooks では、`.env` が読み込めない場合のfallbackとして以下を使用します。

```txt
http://localhost:8000/api
```

API側は以下のリポジトリで管理しています。

```txt
ses-system-api
```

## 開発時の確認コマンド

作業後は以下を実行します。

```bash
make format
make lint
make test
git status
```

## 現在の状態

現在は以下まで完了しています。

```txt
ログインAPI化
新規登録API化
主要CRUDのAPI化
mockデータ撤去
localStorage保存の整理
ブラウザバック対応
format / lint / test 通過
Docker起動確認
```

## 今後の改善候補

* Laravel Sanctum などを使った本格認証
* APIエラー表示の改善
* ローディング表示の追加
* 画面内詳細遷移のブラウザバック対応
* E2Eテスト追加
* READMEのAPI側リンク追記
