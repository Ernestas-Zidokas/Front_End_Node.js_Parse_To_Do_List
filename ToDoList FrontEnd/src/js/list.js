let token = null;

window.addEventListener('load', () => {
  Parse.initialize('myAppId');
  Parse.serverURL = 'http://localhost:1337/parse';
  if (!Parse.User.current()) {
    window.location.href = 'login.html';
  } else {
    getAllItems();
  }
});

document.querySelector('#createItemButton').addEventListener('click', () => {
  createItem();
});

function createItem() {
  let title = document.querySelector('#createItem').value;
  const ToDoList = Parse.Object.extend('ToDoList');
  const toDoList = new ToDoList();
  toDoList.set('title', title);
  toDoList.set('checked', false);
  toDoList.setACL(new Parse.ACL(Parse.User.current()));
  toDoList.save().then(
    item => {
      console.log(item);
      getAllItems();
    },
    error => {
      alert('Failed to create new object, with error code: ' + error.message);
    },
  );
}

async function getAllItems() {
  const ToDoList = Parse.Object.extend('ToDoList');
  const query = new Parse.Query(ToDoList);

  const results = await query.find();
  createCard(results);
}

async function createCard(data) {
  document.querySelector('#list').innerHTML = '';

  let ul = document.createElement('ul');
  data.forEach(item => {
    let li = document.createElement('li');
    let para = document.createElement('p');

    para.addEventListener('click', () => {
      const ToDoList = Parse.Object.extend('ToDoList');
      const query = new Parse.Query(ToDoList);
      query.get(item.id).then(item => {
        item.set('checked', !item.attributes.checked);
        item.save().then(savedItem => {
          console.log(savedItem);
          getAllItems();
        });
      });
    });

    para.textContent = item.attributes.title;
    para.className = 'item1';
    if (item.attributes.checked) {
      para.className = 'checkedItem';
    }
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'X';

    deleteButton.addEventListener('click', async () => {
      const ToDoList = Parse.Object.extend('ToDoList');
      const query = new Parse.Query(ToDoList);
      query.equalTo('objectId', item.id);
      let result = await query.first();
      result.destroy().then(
        item => {
          console.log(item);
          getAllItems();
        },
        error => {
          console.log(error);
        },
      );
    });
    li.appendChild(para);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
  document.querySelector('#list').appendChild(ul);
}
