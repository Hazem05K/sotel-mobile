import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  devApiUrl = 'https://localhost:5001/api';
  prodApiUrl = 'https://localhost:5001/api';
  siteApiUrl = 'https://localhost:5001/';

  token = 'VitMUXlab2ZxOS9OR2RUU2p2N21nUT09==';
  page: any;
  env = 'dev';
  constructor(public http: HttpClient) {

  }
  url() {
    return this.siteApiUrl;
  }
  checkEnv() {
    switch (this.env) {
      case 'dev': return this.devApiUrl;
      case 'prod': return this.prodApiUrl;
      default: return '';
    }
  }
   headersConfig() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'applications/json');
    headers.append('Content-Type', 'application/json');
    return { headers };
  }


  get(endpoint: string) {
    return this.http.get(this.checkEnv() + '/' + endpoint, this.headersConfig());
  }

  post(endpoint: string, body: any) {
    return this.http.post(this.checkEnv() + '/' + endpoint, body, this.headersConfig());
  }

}
