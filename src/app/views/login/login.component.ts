import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  userModel = new User()
  mensagem = "";

  receberDados() {
    console.log("Modelo:", this.userModel)

    const listaPalavras: string[] = ["select ", "from ", "drop ", "or ", "having ", "group ", "by ", "insert ", "exec", "\"", "\'", "--", "#", "*", ";"]

    listaPalavras.forEach(palavra => {
      if(this.loginService.email.toLoweCase().includes(palavra)){
        this.mensagem = "Dados inválidos"

        return;
      }
    });

    this.loginService.login(this.userModel).subscribe( (response) => {
      console.log("response:", response)
      console.log("O Status Code é:", response.status)
      console.log("O token de permissão é:", response.body.accessToken)

      this.mensagem = "Bem vindo" + response.body.user.nome
      console.log(this.mensagem)
    }, (responseErro) => {
      console.log("responseErro", responseErro)
      this.mensagem = responseErro.error
      
      
    })
  }

}
