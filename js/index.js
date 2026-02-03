async function fetchData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const datas = await response.json();
    console.log(datas);

    const displaycards = datas.map(data => `
      <div class="country-card">
        <div class="img-box">
          <img src="${data.flags.png}" alt="${data.name.common}">
        </div>
        <h3>${data.name.common}</h3>
      </div>
    `).join("");

    document.querySelector('.card').innerHTML = displaycards;

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();

