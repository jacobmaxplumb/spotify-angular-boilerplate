import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { TokenResponse } from './models/token-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getTokenFromApi().subscribe((data: TokenResponse) => {
      this.spotifyService.setToken(data.access_token);
      this.spotifyService.getSearchResults('jlke').subscribe(data => console.log(data), error => console.log(error.message));
    }, (error: Error) => {
      console.log(error.message);
    });
  }
}
