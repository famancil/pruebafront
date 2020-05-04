import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as bcrypt from 'bcryptjs';
import 'datatables.net';
import { User } from '../../../../models/User';
import { UserService } from '../../../../providers/services/usuario/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  salt;
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  modalReference: any;
  user: User;
  status: number;
  emailError = false;
  serverError = false;

  userNewForm = new FormGroup({
    username: new FormControl('',[
      Validators.required]),
    email: new FormControl('',[
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      Validators.required])
  });  

  userEditForm = new FormGroup({
    username: new FormControl('',[
      Validators.required]),
    email: new FormControl('',[
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
  });

  constructor(private userService : UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers(){
    let result = await this.userService.getUsers();
    this.users = result['data'];
    console.log(this.users);

    const salt = bcrypt.genSaltSync(10);

    this.users.map(item => item.password = bcrypt.hashSync(item.password, salt).substring(0, 20)+'...');
    
    $(function(){
      $('#table_users').DataTable({
        responsive: true,
        language: {
          processing: "Procesando...",
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ registros",
          info: "Mostrando desde _START_ al _END_ de _TOTAL_ registros",
          infoEmpty: "Mostrando ningún registros.",
          infoFiltered: "(filtrado _MAX_ registros total)",
          infoPostFix: "",
          loadingRecords: "Cargando registros...",
          zeroRecords: "No se encontraron registros",
          emptyTable: "No hay datos disponibles en la tabla",
          paginate: {
            first: "Primero",
            previous: "Anterior",
            next: "Siguiente",
            last: "Último"
          },
        }
      });
    });
  }

  open(content,id) {
    if(id>0) this.user = this.users.find(element => element.id === id);
    this.modalReference = this.modalService.open(content);
  }

  close(){
    this.emailError = false;
    this.serverError = false;
    this.modalReference.close();
  }

  get getNewUsername(){
    return this.userNewForm.get('username')
  }
  
  get getNewEmail(){
    return this.userNewForm.get('email')
  }

  get getEditUsername(){
    return this.userEditForm.get('username')
  }
  
  get getEditEmail(){
    return this.userEditForm.get('email')
  }

  async save(userData){
    try {
      await this.userService.saveUser(userData);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
        this.emailError = true;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }

  /*async update(alumnoData,id){
    try {
      await this.userService.update(alumnoData,id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 422 || status === 400)
        this.emailError = true;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }*/

  /*async deleteAlumno(id){
    try {
      await this.userService.deleteAlumno(id);
      window.location.reload();
    } catch (error) {
      let status = error.status;
      if(status === 500)
        this.serverError = true;
      console.log(error);
    }    
  }*/

}
