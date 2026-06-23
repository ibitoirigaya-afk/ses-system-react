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
* ブラウザ戻る対応
* Laravel API連携
* BP企業管理
* BP企業と要員の紐付け
* BP企業詳細で所属要員一覧表示
* 案件詳細で候補要員一覧表示
* 共通スキル数・スキル一致率による候補要員表示

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

認証復元中は「読み込み中...」を表示し、ページ更新時にログイン画面が一瞬表示されないようにしています。

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

useBpCompanies.ts
→ /bp-companies
→ /bp-companies/{id}
→ /bp-companies/{id}/restore
```

## mock / localStorage の扱い

現在、以下のmockデータは撤去済みです。

```txt
mockUsers
mockProjects
mockEngineers
mockSkills
```

案件・要員・スキル・提案履歴・稼働実績の保存は localStorage ではなく Laravel API を使用しています。

残っている localStorage は、ログイン状態維持用の `currentUserId` のみです。

## ブラウザ戻る対応

ブラウザの戻るボタンで、以下のような画面内遷移も1つ前に戻れるように対応しています。

* 案件一覧 → 新規作成 / 詳細 / 編集 / マッチング
* マッチング → 提案作成
* 要員一覧 → 新規作成 / 詳細 / 編集
* スキル一覧 → 新規作成 / 編集
* 提案履歴一覧 → 新規作成 / 詳細 / 編集
* 稼働実績一覧 → 新規作成 / 編集

ログアウト時は履歴をリセットし、ブラウザ戻るで管理画面へ戻らないようにしています。

## セットアップ

React側を起動する前に、API側 `ses-system-api` も起動しておく必要があります。

API側起動URL：

```txt
http://localhost:8000
```

### 1. 環境変数ファイルを作成

```bash
cp .env.example .env
```

`.env` の内容：

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 2. Dockerで起動

```bash
make build
```

または：

```bash
docker compose up -d --build
```

### 3. 起動確認

```txt
http://localhost:5173
```

### 4. コンテナ状態確認

```bash
make ps
```

## Dockerで起動・停止

### 起動

```bash
make up
```

または：

```bash
docker compose up -d
```

### ビルドして起動

```bash
make build
```

または：

```bash
docker compose up -d --build
```

### 停止

```bash
make down
```

または：

```bash
docker compose down
```

## Makefile コマンド

### Docker起動

```bash
make up
```

### Docker停止

```bash
make down
```

### Dockerビルド起動

```bash
make build
```

### Docker再起動

```bash
make restart
```

### ログ確認

```bash
make logs
```

### コンテナ状態確認

```bash
make ps
```

### Reactコンテナに入る

```bash
make shell
```

### パッケージインストール

```bash
make install
```

### テスト実行

```bash
make test
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

## テスト

Vitest + React Testing Library を使用しています。

```bash
make test
```

テスト対象：

* StatusBadge
* LoginPage
* RegisterPage
* ProjectForm
* EngineerForm
* SkillForm
* WorkRecordForm

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
ブラウザ戻る対応
ログアウト時の履歴リセット
認証復元中のローディング表示
format / lint / test 通過
Docker起動確認
BP企業管理機能追加
要員とBP企業の紐付け
BP企業詳細で所属要員一覧表示
案件詳細で候補要員一覧表示
共通スキル数・スキル一致率によるマッチング表示
```

## 今後の改善候補

* Laravel Sanctum などを使った本格認証
* APIエラー表示の改善
* ローディング表示の追加
* E2Eテスト追加
* APIレスポンス形式の統一
* roleごとの認可強化
* READMEの継続更新
