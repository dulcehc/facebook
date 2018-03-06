var btnInitSesion = document.getElementById('logIn');
var btnCloseSession = document.getElementById('logOut');
var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var ref = 'usuarios';
var usuario = {};

btnInitSesion.addEventListener('click', function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    //provider.addScope('user_birthday');
    //provider.addScope('public_profile');

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        console.log(token);
        // The signed-in user info.
        user = result.user;
        //console.log(user);
        //console.log(result);
        //console.log(provider);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('error');
      });
  });

btnCloseSession.addEventListener('click', function() {
  firebase.auth().signOut();
  console.log('cerrar sesión');
});

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        btnInitSesion.style.display = 'none';
        btnCloseSession.style.display = 'inline-block';
        console.log('usuario');
        console.log(user);
        usuario = {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
        };
        console.log(usuario);
        console.log(user.password)
        userName.innerHTML =  usuario.nombre;
        userEmail.innerHTML = usuario.email;
        pushUser(usuario);

      } else {
        btnInitSesion.style.display = 'inline-block';
        btnCloseSession.style.display = 'none';
        userName.innerHTML =  '';
        userEmail.innerHTML = '';
      }
    });
  }
  function pushUser(usuario) {
    console.log('push usuario')
    firebase.database().ref(ref + "/" + usuario.uid).set(usuario)
      .catch(error => {
        console.log('error')
        console.log(error)
      })
  }
window.onload = function() {
    initApp();
};