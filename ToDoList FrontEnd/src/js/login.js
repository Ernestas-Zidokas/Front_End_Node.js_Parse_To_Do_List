document.querySelector('#login').addEventListener('click', event => {
  loginUser();
});

window.addEventListener('load', () => {
  Parse.initialize('myAppId');
  Parse.serverURL = 'http://localhost:1337/parse';
});

function loginUser() {
  let email = document.querySelector('#email').value;
  let pass = document.querySelector('#password').value;

  Parse.User.logIn(email, pass).then(
    user => {
      console.log(user);
      window.location.href = 'list.html';
    },
    e => {
      console.log(e);
    },
  );
}
