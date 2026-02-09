'use strict';

{
  const input = document.querySelector('#zipcode'); // 郵便番号入力欄
  let data; // APIから取得したデータ格納用

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
      const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${input.value}`;
      const response = await fetch(url);   // API呼び出し
      data = await response.json();        // JSON取得
      console.log(data);                   // 取得データ確認

      if (!data.results) {                 // 結果がない場合
        alert('該当する住所が見つかりません');
        return;
      }
    } catch (error) {
      console.error(error);                // エラー表示
      alert('通信エラーが発生しました');
      return;
    }

    const tbody = document.querySelector('#result'); // 結果表示テーブル
    tbody.innerHTML = '';                             // 前回結果クリア

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