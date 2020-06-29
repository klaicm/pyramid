import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player.model';
import { ModifyPlayerComponent } from './modify-player.component';
import { MatDialog } from '@angular/material';
import { SnackMessageService } from 'src/app/shared/services/snackbar-message.service';

@Component({
    selector: 'app-all-players',
    templateUrl: './all-players.component.html',
    styleUrls: ['./all-players.component.css', '../../app.component.css']
})
export class AllPlayersComponent implements OnInit {

    allPlayers: Array<Player>;
    currentPlayer: Player;
    spinnerOn = true;

    constructor(private playerService: PlayerService, public dialog: MatDialog, private snackMessageService: SnackMessageService) { }

    ngOnInit() {
        this.playerService.getAllPlayers().subscribe(response => {
            this.spinnerOn = false;
            this.allPlayers = response;
            this.allPlayers.sort((a, b) => a.lastName.localeCompare(b.lastName));
        });
    }

    modifyPlayerDialog(player): void {
        const dialogRef = this.dialog.open(ModifyPlayerComponent, {
            data: player,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
        });
    }

    isPlayerActive(active: boolean): Object {
        if (active) {
            return { 'color': '#b2ff59' };
        }
        return { 'color': '#ff3d00' };
    }
}
