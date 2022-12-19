import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { LoginDTO, RegisterDTO, User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
 
  constructor(private router: Router, private http: HttpClient) {}


  login(loginData: LoginDTO) {
    // TODO Chiamare il servizio per l'autenticazione e salvare l'utente corrente nel localStorage
    const response: User = { // Da fare diversamente
      name: "mario",
      surname: "mai",
      username: loginData.username
    };

    localStorage.setItem("user", JSON.stringify(response));

    //return of('login ok');
    return this.http.get(`http://localhost:8080/users/login/${loginData.username}/${loginData.password}`);
  }

  register(registerData: RegisterDTO) {
    this.router.navigateByUrl("/login");
    return this.http.post(`http://localhost:8080/users/`, registerData); // passato da nico
  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }

  getCurrentUsername(){

    const user = JSON.parse(localStorage.getItem("user") || '') as User; //restituisce correttamente user

    return this.http.get(`http://localhost:8080/users/IDusername/${user.username}`); //restituisce correttamente un intero

  }
}
