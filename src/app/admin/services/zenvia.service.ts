import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ZenviaService {

  private apiUrl = 'https://api.zenvia.com/v2/channels/whatsapp/messages';
  private apiToken = 'o6uJTadfk-t-33Oj4pDBhuvVJ0cQi2ZyBHFs'; //'kqEJpW2K5O5M9D5BmmgW5OkBtbcj4dyjIRnE';

  constructor(private http: HttpClient) { }

  sendMessage(from: string, to: string, templateId: string, fields: any): Observable<any> {
    const headers = new HttpHeaders({
      'X-API-TOKEN': this.apiToken,
      'Content-Type': 'application/json'
    });

    const body = {
      from: from,
      to: to,
      contents: [
        {
          type: 'template',
          templateId: templateId,
          //fields: fields
        }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
  sendMessageByplantillaID(from: string, to: string, templateId: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-API-TOKEN': this.apiToken,
      'Content-Type': 'application/json'
    });

    const body = {
      from: from,
      to: to,
      contents: [
        {
          type: 'template',
          templateId: templateId,
          //fields: fields
        }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
  getAllpantillas(): Observable<any> {
    const headers = new HttpHeaders({
      'X-API-TOKEN': this.apiToken,
      'Content-Type': 'application/json'
    });

    return this.http.get("https://api.zenvia.com/v2/templates?channel=WHATSAPP", { headers: headers });
  }
}