import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  constructor(public modlCtrl: ModalController, private actionSheet: ActionSheetController) { }

  ngOnInit() {
  }
  async addContact() {
  }

  async showAction(){
    const actionSheet = await this.actionSheet.create({
      // header: 'Albums',
      buttons: [{
        text: 'Appler',
        role: 'destructive',
        icon: 'call-outline',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Envoyer mail',
        icon:  'mail-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
