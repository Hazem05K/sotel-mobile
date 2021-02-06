import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-params',
  templateUrl: './params.page.html',
  styleUrls: ['./params.page.scss'],
})
export class ParamsPage implements OnInit {

index: number = 0;
  @ViewChild('slides', {static: false}) private slider: IonSlides;

  constructor() { }

  ngOnInit() {
  }

  goTo(index){
    this.index = index;
    this.slider.slideTo(index, 1000)
  }
 
    protected async slideChange(e): Promise<void> {
      this.index = await this.slider.getActiveIndex();
      return Promise.resolve();
    }
    
  

}
