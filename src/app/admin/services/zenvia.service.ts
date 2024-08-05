import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ZenviaService {

  private apiUrl = 'https://api.zenvia.com/v2/channels/whatsapp/messages';
  private apiToken = 'kqEJpW2K5O5M9D5BmmgW5OkBtbcj4dyjIRnE';

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
}