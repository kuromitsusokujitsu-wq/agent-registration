// ステップ5: 規約確認と署名
function Step5({ formData, updateFormData }) {
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      updateFormData('signature', canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateFormData('signature', '');
  };

  return React.createElement('div', { className: 'space-y-6' },
    // 規約表示
    React.createElement('div', { className: 'border border-gray-300 rounded-lg p-6 bg-gray-50 max-h-96 overflow-y-auto' },
      React.createElement('h3', { className: 'text-xl font-bold mb-4' }, '代理店規約'),
      React.createElement('div', { className: 'space-y-4 text-sm text-gray-700' },
        React.createElement('p', null, '第1条（目的）'),
        React.createElement('p', null, '本規約は、当社のペイメントシステムの紹介代理店として活動する際の条件を定めるものです。'),
        
        React.createElement('p', { className: 'mt-4' }, '第2条（代理店の義務）'),
        React.createElement('ol', { className: 'list-decimal list-inside space-y-2 ml-4' },
          React.createElement('li', null, '代理店は、当社の商品・サービスを正確に紹介すること'),
          React.createElement('li', null, '代理店は、虚偽の情報を提供しないこと'),
          React.createElement('li', null, '代理店は、顧客情報を適切に管理すること')
        ),
        
        React.createElement('p', { className: 'mt-4' }, '第3条（報酬）'),
        React.createElement('p', null, '代理店は、成約した案件に応じて規定の報酬を受け取ることができます。報酬の支払いは月末締め、翌月末払いとします。'),
        
        React.createElement('p', { className: 'mt-4' }, '第4条（契約期間）'),
        React.createElement('p', null, '本契約の有効期間は、契約締結日から1年間とします。期間満了の1ヶ月前までに双方から異議がない場合、自動的に1年間更新されます。'),
        
        React.createElement('p', { className: 'mt-4' }, '第5条（契約解除）'),
        React.createElement('p', null, '本規約に違反した場合、当社は事前通知なく契約を解除できるものとします。'),
        
        React.createElement('p', { className: 'mt-4' }, '第6条（機密保持）'),
        React.createElement('p', null, '代理店は、業務上知り得た機密情報を第三者に開示してはなりません。'),
        
        React.createElement('p', { className: 'mt-4' }, '第7条（禁止事項）'),
        React.createElement('ol', { className: 'list-decimal list-inside space-y-2 ml-4' },
          React.createElement('li', null, '当社の名誉を毀損する行為'),
          React.createElement('li', null, '競合他社への情報提供'),
          React.createElement('li', null, '不正な手段による顧客獲得')
        ),
        
        React.createElement('p', { className: 'mt-4' }, '第8条（個人情報の取り扱い）'),
        React.createElement('p', null, '代理店は、個人情報保護法に基づき、適切に個人情報を取り扱うものとします。')
      )
    ),

    // 規約同意チェックボックス
    React.createElement('div', { className: 'flex items-start' },
      React.createElement('input', {
        type: 'checkbox',
        id: 'agreedToTerms',
        checked: formData.agreedToTerms,
        onChange: (e) => updateFormData('agreedToTerms', e.target.checked),
        className: 'mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
      }),
      React.createElement('label', { htmlFor: 'agreedToTerms', className: 'ml-3 text-sm' },
        React.createElement('span', { className: 'font-bold text-gray-900' }, '上記の代理店規約に同意します'),
        React.createElement('span', { className: 'text-red-500 ml-1' }, '*')
      )
    ),

    // 署名エリア
    React.createElement('div', null,
      React.createElement('label', { className: 'block text-sm font-bold text-gray-700 mb-2' },
        '署名 ',
        React.createElement('span', { className: 'text-red-500' }, '*')
      ),
      React.createElement('div', { className: 'border-2 border-gray-300 rounded-lg bg-white' },
        React.createElement('canvas', {
          ref: canvasRef,
          width: 600,
          height: 200,
          className: 'w-full cursor-crosshair',
          onMouseDown: startDrawing,
          onMouseMove: draw,
          onMouseUp: stopDrawing,
          onMouseLeave: stopDrawing
        })
      ),
      React.createElement('div', { className: 'mt-2 flex justify-between items-center' },
        React.createElement('p', { className: 'text-sm text-gray-500' }, 'マウスで署名を描いてください'),
        React.createElement('button', {
          type: 'button',
          onClick: clearSignature,
          className: 'px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition'
        },
          React.createElement('i', { className: 'fas fa-eraser mr-2' }),
          'クリア'
        )
      )
    )
  );
}

// ステップ6: 完了画面
function Step6({ formData }) {
  return React.createElement('div', { className: 'text-center py-8' },
    React.createElement('div', { className: 'mb-6' },
      React.createElement('div', { className: 'inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4' },
        React.createElement('i', { className: 'fas fa-check text-4xl text-green-600' })
      ),
      React.createElement('h2', { className: 'text-3xl font-bold text-gray-800 mb-2' }, '登録完了！'),
      React.createElement('p', { className: 'text-gray-600' }, 'ご登録ありがとうございます')
    ),

    React.createElement('div', { className: 'bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto mb-6' },
      React.createElement('div', { className: 'text-left space-y-3' },
        React.createElement('div', { className: 'flex justify-between' },
          React.createElement('span', { className: 'font-medium text-gray-700' }, '申請ID:'),
          React.createElement('span', { className: 'font-bold text-blue-600' }, formData.applicationId)
        ),
        React.createElement('div', { className: 'flex justify-between' },
          React.createElement('span', { className: 'font-medium text-gray-700' }, '氏名:'),
          React.createElement('span', { className: 'text-gray-900' }, formData.fullName)
        ),
        React.createElement('div', { className: 'flex justify-between' },
          React.createElement('span', { className: 'font-medium text-gray-700' }, 'メールアドレス:'),
          React.createElement('span', { className: 'text-gray-900' }, formData.email)
        )
      )
    ),

    React.createElement('div', { className: 'space-y-4' },
      React.createElement('p', { className: 'text-gray-600' }, 
        '審査完了後、担当者よりご連絡させていただきます。'
      ),
      React.createElement('button', {
        onClick: () => window.location.reload(),
        className: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
      },
        React.createElement('i', { className: 'fas fa-home mr-2' }),
        'トップページへ'
      )
    )
  );
}
