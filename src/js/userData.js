initializeFirebase();
document.getElementById('sign-out').addEventListener('click', event => {
  event.preventDefault();
  signOut();
});