import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../post/post.page';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public events = [];
  constructor(public modalController: ModalController, public api: ApiService) {}

  async quickAdd() {
    const modal = await this.modalController.create({
      component: PostPage,
    });
    return await modal.present();
  }
  ionViewWillEnter(){
    this.handleLoadEvent();

  }

  handleLoadEvent() {

    this.api.get('event').toPromise().then((res) => {
        this.events = res        
    });
  }


}

