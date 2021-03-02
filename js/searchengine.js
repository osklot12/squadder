let list = document.querySelector('#list');
let users;
let people = [];
let photos = [];
async function getUsers() {
    users = await db.collection('users').get();
    addObjects(users.docs);
}
getUsers();


function addObjects(array) {
    for (let user of array) {
        let name = user.data().name.toLowerCase();
        people.push({ name: name });
        photos.push({ photo: user.data().photo });
    }
};


function setList(group) {
    clearList();
    for (let user of group) {
        user.name = user.name.toLowerCase();
        list.innerHTML += `
            <li>
                <img src="" alt="">
                ${user.name}
            </li>
        `;
    }
    if (group.length === 0) {
        setNoResults();
    }
};

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
};

function setNoResults() {
    let item = document.createElement('li');
    item.classList.add('list-group-item');
    let text = document.createTextNode('No results found');
    item.appendChild(text);
    list.appendChild(item);
};

function getRelevancy(value, searchTerm) {
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;
    } else {
        return 0;
    }
};

let searchInput = document.querySelector('#friendSearch');
searchInput.addEventListener('input', () => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(people.filter(user => {
            return user.name.includes(value);
        }).sort((userA, userB) => {
            return getRelevancy(userB.name, value) - getRelevancy(userA.name, value);
        }));
    } else {
        clearList();
    }
});

function setList2(group) {
    clearList();
    for (let user of group) {
        user.name = user.name.toLowerCase();
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        let text = document.createTextNode(user.name);
        item.appendChild(text);
        list.appendChild(item);
    }
    if (group.length === 0) {
        setNoResults();
    }
};

function clearList2() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
};

function setNoResults2() {
    let item = document.createElement('li');
    item.classList.add('list-group-item');
    let text = document.createTextNode('No results found');
    item.appendChild(text);
    list.appendChild(item);
};