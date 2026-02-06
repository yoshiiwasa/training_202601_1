'use strict';
{

  let input = document.querySelector('#zipcode');
  let data;
  document.querySelector('button.search').addEventListener('click', async () => {
    console.log('検索 Clicked');
    console.log('input.value');
    try {
      const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${input.value}`;
      const response = await fetch(url);
       data = await response.json();
console.log(data);
    } catch (error) {
    }
    const tbody = document.querySelector('#result');
    const tr = document.createElement('tr');
    // const td = document.createElement('td');
    // innerHTML.forEach((tbody, tr, td) => {
    //   (`${tbody} ${tr} ${td}`);
    // });

    const columns = ['zipcode', 'address1', 'address2', 'address3', 'kana1', 'kana2', 'kana3', 'prefcode'];
    columns.forEach(col => {
      const td = document.createElement('td');
      td.innerHTML = data.results[0][col];
      tr.appendChild(td);
    });


    // tr.appendChild(td);
    tbody.appendChild(tr);


  });

  document.querySelector('button.cancel').addEventListener('click', () => {
    console.log('キャンセル Clicked');
    input.value = '';
  });
}