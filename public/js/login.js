const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#user-login').nodeValue.trim();
    const password = document.querySelector('#password-login').nodeValue.trim();

    if (email && password) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        };
    };
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').nodeValue.trim();
    const password = document.querySelector('#password-signup').nodeValue.trim();
    const password2 = document.querySelector('#password-signup2').nodeValue.trim();

    if (password !== password2) {
        alert('Passwords must match');
        return;
    };

    if (username && password && password2) {
        const response = await fetch ('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Problem with making a new account')
        }
    }
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);