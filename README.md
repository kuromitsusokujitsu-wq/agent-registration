# 紹介代理店登録システム

## プロジェクト概要
- **名前**: 紹介代理店登録システム
- **目的**: ペイメントシステムの紹介代理店登録を自動化
- **主な機能**: 
  - 多段階フォーム（6ステップ）
  - 本人確認書類のアップロード（Cloudflare R2）
  - Google Sheetsへの自動登録
  - 申請ID自動採番
  - 電子署名機能

## URL
- **開発環境**: https://3000-iuvpa3q2bilmjzbfkbw19-0e616f0a.sandbox.novita.ai
- **本番環境**: （デプロイ後に更新）
- **GitHub**: （リポジトリ作成後に更新）

## 完了した機能
- ✅ ステップ1: 法人/個人の選択
- ✅ ステップ2: 基本情報入力（法人名、氏名、住所、メールアドレスなど）
- ✅ ステップ3: 入金先口座情報入力
- ✅ ステップ4: 本人確認書類アップロード（PDF/画像対応）
- ✅ ステップ5: 代理店規約表示と電子署名
- ✅ ステップ6: 登録完了画面
- ✅ Google Sheets自動書き込み
- ✅ 申請ID自動生成（AGT + 8桁）

## 未実装の機能
- ⏳ Cloudflare R2バケットの本番環境設定
- ⏳ ファイルアップロード機能の完全動作確認（R2連携）
- ⏳ 登録完了メールの自動送信
- ⏳ 本番環境へのデプロイ

## 推奨される次のステップ
1. **Cloudflare APIトークンの設定**
   - Deploy タブで Cloudflare API Token を設定
   
2. **R2バケットの作成**
   ```bash
   npx wrangler r2 bucket create agent-registration-uploads
   ```

3. **本番環境へのデプロイ**
   ```bash
   npm run deploy:prod
   ```

4. **環境変数の設定**
   ```bash
   npx wrangler pages secret put GOOGLE_CREDENTIALS --project-name agent-registration
   npx wrangler pages secret put SPREADSHEET_ID --project-name agent-registration
   npx wrangler pages secret put SHEET_NAME --project-name agent-registration
   ```

5. **メール通知機能の追加**
   - SendGrid / Mailgun / Resendなどのサービスを統合

## データ構造
### Google Sheetsの保存項目
- 申請ID
- 登録日時
- 法人/個人
- 法人名（法人の場合）
- 氏名
- フリガナ
- 郵便番号
- 住所
- メールアドレス
- 電話番号
- 銀行名
- 支店名
- 口座種別
- 口座番号
- 口座名義
- 本人確認書類URL
- 署名データ
- 規約同意日時

### ストレージサービス
- **Google Sheets**: フォームデータの保存
  - スプレッドシートID: `1LHZSZH1P83XNJBolqj1-g9YXIuiJNY6z8Rc1ugaNchc`
  - シート名: `紹介代理店登録`
- **Cloudflare R2**: 本人確認書類の保存（本番環境で有効化）

## 使い方
1. **フォームへアクセス**: ブラウザで開発URLにアクセス
2. **法人/個人を選択**: 事業形態を選択
3. **基本情報を入力**: 必要事項を全て入力
4. **口座情報を入力**: 報酬の振込先口座を入力
5. **本人確認書類をアップロード**: PDF/画像ファイル（最大10MB）
6. **規約を確認して署名**: 代理店規約に同意し、マウスで署名
7. **登録完了**: 申請IDが発行され、Google Sheetsに自動登録

## 技術スタック
- **フレームワーク**: Hono (Edge Runtime)
- **フロントエンド**: React 18 (CDN) + Tailwind CSS
- **バックエンド**: Cloudflare Workers
- **データベース**: Google Sheets API
- **ファイルストレージ**: Cloudflare R2
- **デプロイ先**: Cloudflare Pages

## ローカル開発
```bash
# 依存関係のインストール
npm install

# ビルド
npm run build

# 開発サーバーの起動（PM2）
pm2 start ecosystem.config.cjs

# サーバーのログ確認
pm2 logs agent-registration --nostream

# サーバーの停止
pm2 delete agent-registration
```

## デプロイ情報
- **プラットフォーム**: Cloudflare Pages
- **ステータス**: ⏳ 未デプロイ
- **最終更新日**: 2025-12-11

## セキュリティ
- Google認証情報は環境変数で管理（`.dev.vars`はGitに含まれません）
- 本人確認書類はCloudflare R2に安全に保存
- CORS設定済み
- フォームバリデーション実装済み

## サポート
質問や問題がある場合は、GitHubのIssuesをご利用ください。
