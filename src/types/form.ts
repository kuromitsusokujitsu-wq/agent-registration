// フォームの型定義

export interface FormData {
  // Step 1: 法人/個人の選択
  entityType: 'corporate' | 'individual' | '';
  
  // Step 2: 基本情報
  corporateName?: string;  // 法人名（法人の場合のみ）
  fullName: string;        // 氏名
  furigana: string;        // フリガナ
  postalCode: string;      // 郵便番号
  address: string;         // 住所
  email: string;           // メールアドレス
  phone: string;           // 電話番号
  
  // Step 3: 入金先口座情報
  bankName: string;        // 銀行名
  branchName: string;      // 支店名
  accountType: 'ordinary' | 'checking' | '';  // 口座種別（普通/当座）
  accountNumber: string;   // 口座番号
  accountHolder: string;   // 口座名義
  
  // Step 4: ファイルアップロード
  identificationFile?: File;  // 本人確認書類
  identificationFileUrl?: string;  // アップロード後のURL
  
  // Step 5: 規約同意と署名
  agreedToTerms: boolean;  // 規約同意
  signature: string;       // 署名データ（Canvas描画データ）
  
  // システム生成項目
  applicationId?: string;  // 申請ID
  submittedAt?: string;    // 提出日時
}

export interface StepConfig {
  id: number;
  title: string;
  description: string;
}

export const STEPS: StepConfig[] = [
  { id: 1, title: '法人/個人の選択', description: '事業形態を選択してください' },
  { id: 2, title: '基本情報', description: 'お客様の基本情報を入力してください' },
  { id: 3, title: '入金先口座情報', description: '報酬の振込先口座を入力してください' },
  { id: 4, title: '本人確認書類', description: '本人確認書類をアップロードしてください' },
  { id: 5, title: '規約確認', description: '代理店規約をご確認ください' },
  { id: 6, title: '完了', description: '登録が完了しました' }
];
