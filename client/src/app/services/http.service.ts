import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ReturnObject } from '../models/return.object.model';


@Injectable({
    providedIn: 'root'
})

export class HttpService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {

    }

    // post method
    post(typeUrl, body): Observable<any>{
        return this.http.post<ReturnObject>(this.apiUrl + typeUrl, body);
    }

}