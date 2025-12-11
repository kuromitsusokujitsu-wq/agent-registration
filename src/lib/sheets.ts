export interface SheetRow {
  applicationId: string;
  submittedAt: string;
  entityType: string;
  corporateName: string;
  fullName: string;
  furigana: string;
  postalCode: string;
  address: string;
  email: string;
  phone: string;
  bankName: string;
  branchName: string;
  accountType: string;
  accountNumber: string;
  accountHolder: string;
  identificationFileUrl: string;
  signature: string;
  agreedAt: string;
}

/**
 * Google Sheetsにデータを追加（Fetch API版）
 */
export async function appendToSheet(
  credentials: string,
  spreadsheetId: string,
  sheetName: string,
  data: SheetRow
): Promise<void> {
  try {
    const creds = JSON.parse(credentials);
    
    // JWT作成
    const accessToken = await getAccessToken(creds);

    // データを配列形式に変換
    const values = [
      [
        data.applicationId,
        data.submittedAt,
        data.entityType === 'corporate' ? '法人' : '個人',
        data.corporateName || '',
        data.fullName,
        data.furigana,
        data.postalCode,
        data.address,
        data.email,
        data.phone,
        data.bankName,
        data.branchName,
        data.accountType === 'ordinary' ? '普通' : '当座',
        data.accountNumber,
        data.accountHolder,
        data.identificationFileUrl,
        data.signature,
        data.agreedAt,
      ],
    ];

    // Google Sheets APIに送信
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A:R:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google Sheets API error: ${error}`);
    }

    console.log('✅ Google Sheetsへの書き込み成功');
  } catch (error) {
    console.error('❌ Google Sheetsへの書き込み失敗:', error);
    throw new Error('スプレッドシートへの書き込みに失敗しました');
  }
}

/**
 * アクセストークンを取得
 */
async function getAccessToken(credentials: any): Promise<string> {
  const jwtHeader = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const jwtClaimSet = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const jwtHeaderBase64 = btoa(JSON.stringify(jwtHeader)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const jwtClaimSetBase64 = btoa(JSON.stringify(jwtClaimSet)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const jwtUnsigned = `${jwtHeaderBase64}.${jwtClaimSetBase64}`;

  // RS256署名を作成
  const privateKey = await importPrivateKey(credentials.private_key);
  const encoder = new TextEncoder();
  const data = encoder.encode(jwtUnsigned);
  const signature = await crypto.subtle.sign(
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    privateKey,
    data
  );

  const signatureBase64 = arrayBufferToBase64(signature).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const jwt = `${jwtUnsigned}.${signatureBase64}`;

  // アクセストークンを取得
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Token request failed: ${error}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

/**
 * PEM形式の秘密鍵をインポート
 */
async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const pemContents = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');
  
  const binaryString = atob(pemContents);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return await crypto.subtle.importKey(
    'pkcs8',
    bytes.buffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );
}

/**
 * ArrayBufferをBase64に変換
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * 申請IDを生成（AGT + 8桁の数字）
 */
export function generateApplicationId(): string {
  const timestamp = Date.now().toString().slice(-8);
  return `AGT${timestamp}`;
}
