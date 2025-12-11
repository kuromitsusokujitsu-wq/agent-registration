import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import api from './routes/api';
import type { Bindings } from './types/bindings';

const app = new Hono<{ Bindings: Bindings }>();

// 静的ファイルの配信
app.use('/static/*', serveStatic({ root: './public' }));

// APIルート
app.route('/api', api);

// トップページ
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>紹介代理店登録 - ペイメントシステム</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
          }
        </style>
    </head>
    <body>
        <div id="root"></div>
        
        <!-- React CDN -->
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        
        <!-- アプリケーションスクリプト -->
        <script src="/static/steps.js"></script>
        <script src="/static/step5-6.js"></script>
        <script src="/static/app.js"></script>
        
        <!-- アプリケーションのマウント -->
        <script>
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(React.createElement(App));
        </script>
    </body>
    </html>
  `);
});

export default app;
