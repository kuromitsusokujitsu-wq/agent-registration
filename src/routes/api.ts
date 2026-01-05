import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings } from '../types/bindings';
import { appendToSheet, generateApplicationId, type SheetRow } from '../lib/sheets';

const api = new Hono<{ Bindings: Bindings }>();

// CORS設定
api.use('/*', cors());

/**
 * ファイルアップロード API
 * POST /api/upload
 */
api.post('/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return c.json({ error: 'ファイルが見つかりません' }, 400);
    }

    // ファイル名を生成（タイムスタンプ + オリジナルファイル名）
    const timestamp = Date.now();
    const originalName = file.name;
    const key = `uploads/${timestamp}-${originalName}`;

    // R2にアップロード
    await c.env.R2.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // 公開URLを生成（自分のドメインのAPIエンドポイント経由）
    const fileUrl = `/api/files/${key}`;

    return c.json({
      success: true,
      url: fileUrl,
      key,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'ファイルのアップロードに失敗しました' }, 500);
  }
});

/**
 * フォーム送信 API
 * POST /api/submit
 */
api.post('/submit', async (c) => {
  try {
    // 環境変数のチェック
    if (!c.env.GOOGLE_CREDENTIALS) {
      console.error('GOOGLE_CREDENTIALS is not set');
      return c.json({ error: '環境変数が設定されていません (GOOGLE_CREDENTIALS)' }, 500);
    }
    if (!c.env.SPREADSHEET_ID) {
      console.error('SPREADSHEET_ID is not set');
      return c.json({ error: '環境変数が設定されていません (SPREADSHEET_ID)' }, 500);
    }
    if (!c.env.SHEET_NAME) {
      console.error('SHEET_NAME is not set');
      return c.json({ error: '環境変数が設定されていません (SHEET_NAME)' }, 500);
    }

    const formData = await c.req.json();

    // 申請IDを生成
    const applicationId = generateApplicationId();
    const submittedAt = new Date().toISOString();

    // Google Sheetsに書き込むデータを準備
    const sheetRow: SheetRow = {
      applicationId,
      submittedAt,
      entityType: formData.entityType,
      corporateName: formData.corporateName || '',
      fullName: formData.fullName,
      furigana: formData.furigana,
      postalCode: formData.postalCode,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      bankName: formData.bankName,
      branchName: formData.branchName,
      accountType: formData.accountType,
      accountNumber: formData.accountNumber,
      accountHolder: formData.accountHolder,
      identificationFileUrl: formData.identificationFileUrl || '',
      signature: formData.signature || '',
      agreedAt: new Date().toISOString(),
    };

    // Google Sheetsに追記
    await appendToSheet(
      c.env.GOOGLE_CREDENTIALS,
      c.env.SPREADSHEET_ID,
      c.env.SHEET_NAME,
      sheetRow
    );

    return c.json({
      success: true,
      applicationId,
      message: '登録が完了しました',
    });
  } catch (error) {
    console.error('Submit error:', error);
    const errorMessage = error instanceof Error ? error.message : '不明なエラー';
    return c.json({ 
      error: '登録に失敗しました。もう一度お試しください。',
      detail: errorMessage 
    }, 500);
  }
});

/**
 * ファイル取得 API
 * GET /api/files/:key
 */
api.get('/files/*', async (c) => {
  try {
    // URLからキーを取得（/api/files/ を除去）
    const key = c.req.path.replace('/api/files/', '');

    if (!key) {
      return c.json({ error: 'ファイルキーが指定されていません' }, 400);
    }

    // R2からファイルを取得
    const object = await c.env.R2.get(key);

    if (!object) {
      return c.json({ error: 'ファイルが見つかりません' }, 404);
    }

    // ファイルをレスポンスとして返す
    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000',
        'Content-Disposition': `inline`,
      },
    });
  } catch (error) {
    console.error('File retrieval error:', error);
    return c.json({ error: 'ファイルの取得に失敗しました' }, 500);
  }
});

/**
 * ヘルスチェック API
 */
api.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default api;
