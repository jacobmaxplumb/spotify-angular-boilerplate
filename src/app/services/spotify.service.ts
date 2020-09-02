import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly spotifyUrl: string = 'https://api.spotify.com/v1';
  private token: string;

  constructor(private http: HttpClient) { }

  public getTokenFromApi(): Observable<TokenResponse> {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    return <Observable<TokenResponse>>this.http.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // tslint:disable-next-line: object-literal-key-quotes
          'Authorization': 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret)
        }
      }
    );
  }

  public setToken(token: string): void {
    this.token = `Bearer ${token}`;
  }

  public getSearchResults(searchString: string): Observable<any> {
    return this.http.get(
      `${this.spotifyUrl}/search`,
      {
        params: {q: 'ba', type: 'album'},
        headers: {Authorization: this.token}
      }
    );
  }
}
