document.querySelector('#register').addEventListener('click', event => {
  registerUser();
});

window.addEventListener('load', () => {
  Parse.initialize('myAppId');
  Parse.serverURL = 'http://localhost:1337/parse';
});

async function registerUser() {
  let email = document.querySelector('#email').value;
  let pass = document.querySelector('#password').value;
  let passAgain = document.querySelector('#passwordRepeat').value;

  if (pass !== passAgain) {
    console.log('passwords dont match');
    return;
  }

  var user = new Parse.User();
  user.set('username', email);
  user.set('password', pass);
  user.set('email', email);

  // other fields can be set just like with Parse.Object
  try {
    await user.signUp();
    window.location.href = 'login.html';

    // Hooray! Let them use the app now.
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    alert('Error: ' + error.code + ' ' + error.message);
  }
}
