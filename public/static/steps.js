// ステップ1: 法人/個人の選択
function Step1({ formData, updateFormData }) {
  return React.createElement('div', { className: 'space-y-6' },
    React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
      React.createElement('button', {
        onClick: () => updateFormData('entityType', 'corporate'),
        className: `p-6 border-2 rounded-lg transition ${
          formData.entityType === 'corporate' 
            ? 'border-blue-600 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
        }`
      },
        React.createElement('div', { className: 'text-center' },
          React.createElement('i', { className: 'fas fa-building text-4xl mb-3 text-blue-600' }),
          React.createElement('h3', { className: 'text-xl font-bold mb-2' }, '法人'),
          React.createElement('p', { className: 'text-gray-600 text-sm' }, '法人として登録します')
        )
      ),
      React.createElement('button', {
        onClick: () => updateFormData('entityType', 'individual'),
        className: `p-6 border-2 rounded-lg transition ${
          formData.entityType === 'individual' 
            ? 'border-blue-600 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
        }`
      },
        React.createElement('div', { className: 'text-center' },
          React.createElement('i', { className: 'fas fa-user text-4xl mb-3 text-blue-600' }),
          React.createElement('h3', { className: 'text-xl font-bold mb-2' }, '個人'),
          React.createElement('p', { className: 'text-gray-600 text-sm' }, '個人事業主として登録します')
        )
      )
    )
  );
}

// ステップ2: 基本情報
function Step2({ formData, updateFormData }) {
  return React.createElement('div', { className: 'space-y-6' },
    // 法人名（法人の場合のみ）
    formData.entityType === 'corporate' && React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '法人名 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.corporateName,
        onChange: (e) => updateFormData('corporateName', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: '株式会社〇〇'
      })
    ),

    // 氏名
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '氏名 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.fullName,
        onChange: (e) => updateFormData('fullName', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: '山田 太郎'
      })
    ),

    // フリガナ
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        'フリガナ ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.furigana,
        onChange: (e) => updateFormData('furigana', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: 'ヤマダ タロウ'
      })
    ),

    // 郵便番号
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '郵便番号 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.postalCode,
        onChange: (e) => updateFormData('postalCode', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: '123-4567'
      })
    ),

    // 住所
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '住所 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.address,
        onChange: (e) => updateFormData('address', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: '東京都渋谷区〇〇1-2-3'
      })
    ),

    // メールアドレス
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        'メールアドレス ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'email',
        value: formData.email,
        onChange: (e) => updateFormData('email', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: 'example@example.com'
      })
    ),

    // 電話番号
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '電話番号 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'tel',
        value: formData.phone,
        onChange: (e) => updateFormData('phone', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: '090-1234-5678'
      })
    )
  );
}

// ステップ3: 入金先口座情報
function Step3({ formData, updateFormData }) {
  return React.createElement('div', { className: 'space-y-6' },
    // 銀行名
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '銀行名 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.bankName,
        onChange: (e) => updateFormData('bankName', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: '〇〇銀行'
      })
    ),

    // 支店名
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '支店名 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.branchName,
        onChange: (e) => updateFormData('branchName', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: '〇〇支店'
      })
    ),

    // 口座種別
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '口座種別 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
        React.createElement('button', {
          onClick: () => updateFormData('accountType', 'ordinary'),
          className: `p-4 border-2 rounded-lg transition ${
            formData.accountType === 'ordinary' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400'
          }`
        },
          React.createElement('div', { className: 'text-center font-medium' }, '普通')
        ),
        React.createElement('button', {
          onClick: () => updateFormData('accountType', 'checking'),
          className: `p-4 border-2 rounded-lg transition ${
            formData.accountType === 'checking' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400'
          }`
        },
          React.createElement('div', { className: 'text-center font-medium' }, '当座')
        )
      )
    ),

    // 口座番号
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '口座番号 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.accountNumber,
        onChange: (e) => updateFormData('accountNumber', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: '1234567'
      })
    ),

    // 口座名義
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '口座名義 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'text',
        value: formData.accountHolder,
        onChange: (e) => updateFormData('accountHolder', e.target.value),
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        placeholder: 'ヤマダ タロウ'
      }),
      React.createElement('p', { className: 'mt-1 text-sm text-gray-500' }, '※ カタカナで入力してください')
    )
  );
}

// ステップ4: 本人確認書類アップロード
function Step4({ formData, updateFormData }) {
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ファイルサイズチェック（10MB以下）
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('ファイルサイズは10MB以下にしてください');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'アップロードに失敗しました');
      }

      updateFormData('identificationFileUrl', data.url);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return React.createElement('div', { className: 'space-y-6' },
    React.createElement('div', { className: 'bg-blue-50 border-l-4 border-blue-500 p-4 mb-4' },
      React.createElement('div', { className: 'flex' },
        React.createElement('div', { className: 'flex-shrink-0' },
          React.createElement('i', { className: 'fas fa-info-circle text-blue-500' })
        ),
        React.createElement('div', { className: 'ml-3' },
          React.createElement('h3', { className: 'text-sm font-medium text-blue-800' }, 'アップロード可能な書類'),
          React.createElement('ul', { className: 'mt-2 text-sm text-blue-700 list-disc list-inside' },
            React.createElement('li', null, '運転免許証'),
            React.createElement('li', null, 'パスポート'),
            React.createElement('li', null, 'マイナンバーカード'),
            React.createElement('li', null, '健康保険証')
          )
        )
      )
    ),

    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '本人確認書類 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('input', {
        type: 'file',
        accept: 'image/*,.pdf',
        onChange: handleFileUpload,
        disabled: uploading,
        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      }),
      React.createElement('p', { className: 'mt-1 text-sm text-gray-500' }, 
        'PDF、JPEG、PNG形式（最大10MB）'
      )
    ),

    uploading && React.createElement('div', { className: 'text-center py-4' },
      React.createElement('i', { className: 'fas fa-spinner fa-spin text-2xl text-blue-600' }),
      React.createElement('p', { className: 'mt-2 text-gray-600' }, 'アップロード中...')
    ),

    uploadError && React.createElement('div', { className: 'p-4 bg-red-50 border-l-4 border-red-500 text-red-700' },
      React.createElement('i', { className: 'fas fa-exclamation-circle mr-2' }),
      uploadError
    ),

    formData.identificationFileUrl && React.createElement('div', { className: 'p-4 bg-green-50 border-l-4 border-green-500' },
      React.createElement('div', { className: 'flex items-center' },
        React.createElement('i', { className: 'fas fa-check-circle text-green-500 text-xl mr-3' }),
        React.createElement('div', null,
          React.createElement('p', { className: 'text-green-800 font-medium' }, 'アップロード完了'),
          React.createElement('p', { className: 'text-green-600 text-sm' }, 'ファイルが正常にアップロードされました')
        )
      )
    )
  );
}

// ステップ5: 規約確認と署名（次のファイルに続く）
