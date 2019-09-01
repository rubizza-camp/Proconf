import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: '/api/v1/user_token',
      data: {
        auth: {
          email: email,
          password: password
        }
      }
    };

    return axios(options)
             .then(response => {
               const user = {
                 token: response.data.jwt
               }
               localStorage.setItem('currentUser', JSON.stringify(user))
               currentUserSubject.next(user)
               return user
             })
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
