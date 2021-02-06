import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { clear } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router
) {}
  logOut() {
         this.router.navigate(['/login']);
         clear();
  }

}
