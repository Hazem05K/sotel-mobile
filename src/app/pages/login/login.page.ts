import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { set } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = { username: '', password: '' };
  loading: any;

  constructor(private router: Router, public loadingCtrl: LoadingController, public api: ApiService, public navCtrl: NavController,  
  private toastController: ToastController, public http: HttpClient) {}
  ngOnInit() {
  }

  async doLogin() {
    if (!this.loginForm.username || !this.loginForm.password) {
      const toast = await this.toastController.create({
        message: 'Merci de vérifier les données saisies.',
        duration: 2000,
        position: 'top',
        color: 'warning',
        buttons: [
          {
            icon: 'close',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      toast.present();
      return false;
    }
    this.loading = await this.loadingCtrl.create({
      message: 'Chargement',
    });
    await this.loading.present();
    this.api.post('Authenticate/login', this.loginForm).toPromise().then(async (res) => {

      if (res['status'] === 403) {
        this.loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Vous êtes banni par l\'administrateur.',
          duration: 3000,
          position: 'top',
          color: 'danger',
          buttons: [
            {
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        toast.present();



      } else if (res['status'] === 401) {
        this.loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Merci de valider votre inscription via mail. Pensez à vérifier vos spams.',
          duration: 3000,
          position: 'top',
          color: 'warning',
          buttons: [
            {
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        toast.present();

      } else if (res['status'] == 200) {
        const toast = await this.toastController.create({
          header: 'Bienvenue !',
          duration: 1500,
          position: 'top',
          color: 'primary',
          buttons: [
            {
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        toast.present();
        this.loading.dismiss();
        set('token', res['token']);
        set('id', res['id']);
        this.router.navigate(['/tabs/tab1']);


      } else {
        this.loading.dismiss();
        const toast = await this.toastController.create({
          header: 'Vos Données sont incorrectes !',
          duration: 3000,
          position: 'top',
          color: 'warning',
          buttons: [
            {
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        toast.present();

      }
    }, async (err) => {
      this.loading.dismiss();
      const toast = await this.toastController.create({
        header: 'Connexion échouée',
        duration: 3000,
        position: 'top',
        color: 'danger',
        buttons: [
          {
            icon: 'close',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      toast.present();


    }).catch(async error => {
      const toast = await this.toastController.create({
        header: 'Problème de connexion.',
        duration: 3000,
        position: 'top',
        color: 'danger',
        buttons: [
          {
            icon: 'close',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      toast.present();

      this.loading.dismiss();
    });
  }


}
