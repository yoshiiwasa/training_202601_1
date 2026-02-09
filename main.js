'use strict';

{
  const input = document.querySelector('#zipcode'); // 郵便番号入力欄
  let data; // APIから取得したデータ格納用

  // 郵便番号入力欄でキーが押されたときの処理
  input.addEventListener('keydown', (event) => {
    // 押されたキーが Enter の場合
    if (event.key === 'Enter') {
      event.preventDefault(); // フォーム送信（リロード）を防ぐ
      document.querySelector('button.search').click(); // 検索ボタンを押したのと同じ処理を実行
    }
  });

  /**
   * 検索ボタンクリック時の処理
   * 郵便番号から住所を取得してテーブルに表示する
   * @async
   * @event click
   * @returns {Promise<void>}
   */
  document.querySelector('button.search').addEventListener('click', async () => {
    console.log('検索 Clicked');       // ボタンクリック確認
    console.log(input.value);          // 入力値表示

    try {
      /** API URLを作成 */
      if (!input.value.trim()) {
        alert('郵便番号を入力してください');
        return;
      }

      const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${input.value}`;
      const response = await fetch(url);   // API呼び出し
      data = await response.json();        // JSON取得
      if (!data.results) {                 // 結果がない場合
        alert('該当する住所が見つかりません');
        return;
      }
      console.log(data);                   // 取得データ確認
    } catch (error) {
      console.error(error);                // エラー表示
      alert('通信エラーが発生しました');
      return;
    }

    const tbody = document.querySelector('#result'); // 結果表示テーブル
    tbody.textContent = '';                             // 前回結果クリア

    const columns = ['zipcode', 'address1', 'address2', 'address3', 'kana1', 'kana2', 'kana3', 'prefcode']; // 表示列

    // データを表に追加
    data.results.forEach(result => {
      const tr = document.createElement('tr');
      columns.forEach(col => {
        const td = document.createElement('td');
        td.textContent = result[col];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  });

  /**
   * キャンセルボタンクリック時の処理
   * 入力欄と結果テーブルをクリアする
   * @event click
   */
  document.querySelector('button.cancel').addEventListener('click', () => {
    console.log('キャンセル Clicked');
    input.value = '';
    document.querySelector('#result').innerHTML = '';
  });
}