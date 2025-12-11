// Cloudflare Workers Bindings

export interface Bindings {
  R2: R2Bucket;
  GOOGLE_CREDENTIALS: string;  // Google Sheets認証情報（JSON文字列）
  SPREADSHEET_ID: string;      // スプレッドシートID
  SHEET_NAME: string;          // シート名
}
