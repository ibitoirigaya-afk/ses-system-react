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

## 主な機能

* ログイン画面
* 新規登録画面
* ロール別TOP画面
* 案件管理
* 要員管理
* スキル管理
* マッチング
* 提案履歴管理
* 稼働実績管理
* 論理削除・復元
* Laravel API連携

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
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 3. 開発サーバー起動

```bash
npm run dev
```

起動URL：

```txt
http://127.0.0.1:5173
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

### ビルド

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
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

API側は以下のリポジトリで管理しています。

```txt
ses-system-api
```

## 実装済み画面

* LoginPage
* RegisterPage
* Dashboard
* ProjectListPage
* ProjectCreatePage
* ProjectEditPage
* ProjectDetailPage
* EngineerListPage
* EngineerCreatePage
* EngineerEditPage
* EngineerDetailPage
* SkillListPage
* ProposalHistoryListPage
* ProposalHistoryCreatePage
* ProposalHistoryEditPage
* WorkRecordListPage
* WorkRecordCreatePage
* WorkRecordEditPage

## 補足

このアプリは、SES/BP営業で使う以下の業務を想定しています。

* 案件情報の管理
* 要員情報の管理
* 案件と要員のスキルマッチング
* 提案履歴の管理
* 稼働実績・売上・粗利の管理
