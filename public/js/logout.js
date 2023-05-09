// logout function
const logout = async () => {
    // Execute POST method at specified path
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    // when a response is successfully retrieved the user will be logged out
    // returned to the Home page
    if (response.ok) {
        document.location.replace('/');
    } else {
        // if an error (logout unsuccessful) occurs, 
        // user is displayed an alert
        alert('Failed to log out.');
    }
 };
  
//Listens for the user's click on the logout button, then executes the logout function 
document.querySelector('#logout').addEventListener('click', logout);  