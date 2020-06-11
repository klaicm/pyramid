import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Player } from 'src/app/player/player.model';
import { PlayerService } from 'src/app/player/player.service';
import { SnackMessageService } from 'src/app/shared/services/snackbar-message.service';
import { PlayerStats } from 'src/app/player/player-stats/player-stats.model';

@Component({
    selector: 'app-add-player',
    templateUrl: './add-player.component.html',
    styleUrls: ['./add-player.component.css', '../../app.component.css']
})
export class AddPlayerComponent implements OnInit {

    playerFormGroup: FormGroup;

    constructor(private router: Router, private playerService: PlayerService, private snackMessageService: SnackMessageService) {
        this.playerFormGroup = new FormGroup({
            firstNameFormControl: new FormControl('', Validators.required),
            lastNameFormControl: new FormControl('', Validators.required),
            emailFormControl: new FormControl('', Validators.required),
            phoneNumberFormControl: new FormControl('', Validators.required),
            isActiveFormControl: new FormControl('', Validators.required),
            rowFormControl: new FormControl('', Validators.required)
        });
    }

    ngOnInit() { }


    addNewPlayer() {
        const newPlayer = new Player();
        const playerStats = new PlayerStats();

        newPlayer.firstName = this.playerFormGroup.get('firstNameFormControl').value;
        newPlayer.lastName = this.playerFormGroup.get('lastNameFormControl').value;
        newPlayer.userMail = this.playerFormGroup.get('emailFormControl').value;
        newPlayer.isActive = JSON.parse(this.playerFormGroup.get('isActiveFormControl').value);
        newPlayer.phoneNumber = this.playerFormGroup.get('phoneNumberFormControl').value;

        playerStats.currentRow = this.playerFormGroup.get('rowFormControl').value;

        newPlayer.playerStats = playerStats;

        this.playerService.addNewPlayer(newPlayer).subscribe(response => {
            setTimeout(() => {
                const listen = response;
                if (response) {
                } else {
                    console.error('Nije uspješno spremljeno.');
                }
            }, 1000);
            this.snackMessageService.showSuccess('Igrač dodan. ' + newPlayer.firstName + ' ' + newPlayer.lastName);
        });

    }

    backToHome() {
        this.router.navigate(['/']);
    }

}
