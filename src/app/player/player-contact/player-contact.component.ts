import { Input, Component } from '@angular/core';
import {  } from '@angular/core';
import { Player } from 'src/app/player/player.model';

@Component({
    selector: 'app-player-contact',
    templateUrl: './player-contact.component.html',
    styleUrls: ['./player-contact.component.css']
  })
  export class PlayerContactComponent {

    @Input() player: Player;

  }
