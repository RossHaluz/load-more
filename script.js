const list = document.querySelector('.list');
const load = document.querySelector(".load-more");

load.addEventListener('click', onLoad)
let page = 1;

function featchApi(page = 1) {
    const BASE_URL = "https://the-one-api.dev/v2/character"
    const options= {
        headers: {
            Authorization: "Bearer B51grCrf4UbyvJ2OGlBh "
        }
    }
    return fetch(`${BASE_URL}?limit=300&page=${page}`, options).then(res => {
        if (!res.ok) {
            throw new Error()
        }
        return res.json()
    })
}

featchApi().then(data => {
    list.insertAdjacentHTML('beforeend', renderMarkup(data.docs))
}).catch(err => console.log(err))

function renderMarkup(arr) {
    return arr.map(({ name, race }) => `
    <li>
      <h2>${name}</h2>
      <p>${race}</p>
    </li>
    `).join('')
}

function onLoad() {
    page += 1
    featchApi(page).then(data => {
        list.insertAdjacentHTML('beforeend', renderMarkup(data.docs))
        if (data.page === data.pages) {
            load.setAttribute("hidden", true)
        }
    }).catch(err => console.log(err))
}