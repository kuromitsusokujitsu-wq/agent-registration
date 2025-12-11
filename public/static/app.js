// 多段階フォームアプリケーション

const { useState, useEffect } = React;

// ステップ定義
const STEPS = [
  { id: 1, title: '法人/個人の選択', description: '事業形態を選択してください' },
  { id: 2, title: '基本情報', description: 'お客様の基本情報を入力してください' },
  { id: 3, title: '入金先口座情報', description: '報酬の振込先口座を入力してください' },
  { id: 4, title: '本人確認書類', description: '本人確認書類をアップロードしてください' },
  { id: 5, title: '規約確認', description: '代理店規約をご確認ください' },
  { id: 6, title: '完了', description: '登録が完了しました' }
];

// メインアプリケーション
function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    entityType: '',
    corporateName: '',
    fullName: '',
    furigana: '',
    postalCode: '',
    address: '',
    email: '',
    phone: '',
    bankName: '',
    branchName: '',
    accountType: '',
    accountNumber: '',
    accountHolder: '',
    identificationFileUrl: '',
    agreedToTerms: false,
    signature: '',
    applicationId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.entityType) {
          setError('法人/個人を選択してください');
          return false;
        }
        break;
      case 2:
        if (formData.entityType === 'corporate' && !formData.corporateName) {
          setError('法人名を入力してください');
          return false;
        }
        if (!formData.fullName || !formData.furigana || !formData.postalCode || 
            !formData.address || !formData.email || !formData.phone) {
          setError('すべての項目を入力してください');
          return false;
        }
        // メールアドレスの簡易バリデーション
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setError('正しいメールアドレスを入力してください');
          return false;
        }
        break;
      case 3:
        if (!formData.bankName || !formData.branchName || !formData.accountType || 
            !formData.accountNumber || !formData.accountHolder) {
          setError('すべての項目を入力してください');
          return false;
        }
        break;
      case 4:
        if (!formData.identificationFileUrl) {
          setError('本人確認書類をアップロードしてください');
          return false;
        }
        break;
      case 5:
        if (!formData.agreedToTerms) {
          setError('規約に同意してください');
          return false;
        }
        if (!formData.signature) {
          setError('署名を入力してください');
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '登録に失敗しました');
      }

      updateFormData('applicationId', data.applicationId);
      setCurrentStep(6);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4' },
    React.createElement('div', { className: 'max-w-4xl mx-auto' },
      // ヘッダー
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('h1', { className: 'text-4xl font-bold text-gray-800 mb-2' },
          React.createElement('i', { className: 'fas fa-handshake mr-3' }),
          '紹介代理店登録'
        ),
        React.createElement('p', { className: 'text-gray-600' }, '必要事項をご入力ください')
      ),

      // プログレスバー
      React.createElement(ProgressBar, { currentStep, totalSteps: STEPS.length }),

      // フォームカード
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-8 mb-6' },
        // ステップタイトル
        currentStep < 6 && React.createElement('div', { className: 'mb-6' },
          React.createElement('h2', { className: 'text-2xl font-bold text-gray-800 mb-2' },
            `ステップ ${currentStep}: ${STEPS[currentStep - 1].title}`
          ),
          React.createElement('p', { className: 'text-gray-600' }, STEPS[currentStep - 1].description)
        ),

        // エラーメッセージ
        error && React.createElement('div', { className: 'mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700' },
          React.createElement('i', { className: 'fas fa-exclamation-circle mr-2' }),
          error
        ),

        // ステップコンテンツ
        currentStep === 1 && React.createElement(Step1, { formData, updateFormData }),
        currentStep === 2 && React.createElement(Step2, { formData, updateFormData }),
        currentStep === 3 && React.createElement(Step3, { formData, updateFormData }),
        currentStep === 4 && React.createElement(Step4, { formData, updateFormData }),
        currentStep === 5 && React.createElement(Step5, { formData, updateFormData }),
        currentStep === 6 && React.createElement(Step6, { formData }),

        // ナビゲーションボタン
        currentStep < 6 && React.createElement('div', { className: 'flex justify-between mt-8' },
          React.createElement('button', {
            onClick: prevStep,
            disabled: currentStep === 1,
            className: 'px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition'
          },
            React.createElement('i', { className: 'fas fa-arrow-left mr-2' }),
            '前へ'
          ),
          React.createElement('button', {
            onClick: currentStep === 5 ? handleSubmit : nextStep,
            disabled: loading,
            className: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition'
          },
            loading && React.createElement('i', { className: 'fas fa-spinner fa-spin mr-2' }),
            currentStep === 5 ? '登録を完了' : '次へ',
            !loading && currentStep < 5 && React.createElement('i', { className: 'fas fa-arrow-right ml-2' })
          )
        )
      )
    )
  );
}

// プログレスバーコンポーネント
function ProgressBar({ currentStep, totalSteps }) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return React.createElement('div', { className: 'mb-8' },
    React.createElement('div', { className: 'relative' },
      React.createElement('div', { className: 'overflow-hidden h-2 text-xs flex rounded-full bg-gray-200' },
        React.createElement('div', {
          style: { width: `${progress}%` },
          className: 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500'
        })
      ),
      React.createElement('div', { className: 'flex justify-between mt-2 text-xs text-gray-600' },
        React.createElement('span', null, `ステップ ${currentStep} / ${totalSteps - 1}`),
        React.createElement('span', null, `${Math.round(progress)}%`)
      )
    )
  );
}

// 各ステップのコンポーネントは次のメッセージで続きます...
