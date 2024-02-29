const API_URL = 'https://jsonplaceholder.typicode.com/users';
const refreshBtn = document.getElementById('refresh-button');
const userList = document.getElementById('users-list');
const sortSelect = document.getElementById('sort-select');
const filterInput = document.getElementById('filter-input');

refreshBtn.addEventListener('click', () => {
    getUsers();
});

sortSelect.addEventListener('change', () => {
    getUsers();
});

filterInput.addEventListener('input', () => {
    getUsers();
});

getUsers();

function getUsers() {
    fetch(API_URL)
        .then(res => res.json())
        .then(users => {
            users = sortUsers(users, sortSelect.value);
            users = filterUsers(users, filterInput.value);
            displayUsers(users);
        })
        .catch(error => handleError(error));
}

function displayUsers(users) {
    userList.innerHTML = '';

    users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('user-card');

        card.innerHTML = `
            <h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>${user.name}</h2>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg>Email: ${user.email}</p>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M17.707 12.293a.999.999 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 0 0 0-1.414l-4-4a.999.999 0 0 0-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 0 0 0-1.414l-4-4.001zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414 9.586 7 8.293 8.293a1 1 0 0 0-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.991.991 0 0 0 .912-.271L17 14.414 19.586 17l-2.006 2.005z"></path></svg>Phone: ${user.phone}</p>
        `;

        userList.appendChild(card)
    })
}

function sortUsers(users, sortBy) {
    switch (sortBy) {
        case 'name':
            return users.sort((a, b) => a.name.localeCompare(b.name));
        case 'email':
            return users.sort((a, b) => a.email.localeCompare(b.email));
        default:
            return users;
    }
}

function filterUsers(users, filterBy) {
    return users.filter(user => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(filterBy.toLowerCase()) || email.includes(filterBy.toLowerCase());
    });
}

function handleError(error) {
    userList.innerHTML = `
        <p>Error fetching data!</p>
    `
    console.error(error);
}