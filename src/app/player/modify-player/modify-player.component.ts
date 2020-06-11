import { Player } from 'src/app/player/player.model';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SnackMessageService } from 'src/app/shared/services/snackbar-message.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modify-player',
    templateUrl: './modify-player.component.html',
    styleUrls: ['./modify-player.component.css', '../../app.component.css']
})
export class ModifyPlayerComponent implements OnInit {

    allPlayers: Array<Player>;
    playerFormGroup: FormGroup;
    currentPlayer: Player;

    constructor(private playerService: PlayerService, private snackMessageService: SnackMessageService, private router: Router) {
        this.playerFormGroup = new FormGroup({
            firstNameFormControl: new FormControl('', Validators.required),
            lastNameFormControl: new FormControl('', Validators.required),
            userMailFormControl: new FormControl('', Validators.required),
            phoneNumberFormControl: new FormControl('', Validators.required),
            isActiveFormControl: new FormControl('', Validators.required),
            rowFormControl: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.playerService.getAllPlayers().subscribe(response => {
            this.allPlayers = response;
        });
    }

    getPlayer(player: Player) {
        this.playerService.getPlayer(player.id).subscribe(response => {
            this.currentPlayer = response;

            this.playerFormGroup.get('firstNameFormControl').setValue(this.currentPlayer.firstName);
            this.playerFormGroup.get('lastNameFormControl').setValue(this.currentPlayer.lastName);
            this.playerFormGroup.get('userMailFormControl').setValue(this.currentPlayer.userMail);
            this.playerFormGroup.get('phoneNumberFormControl').setValue(this.currentPlayer.phoneNumber);
            this.playerFormGroup.get('isActiveFormControl').setValue(this.currentPlayer.isActive);
            this.playerFormGroup.get('rowFormControl').setValue(this.currentPlayer.playerStats.currentRow);
        });
    }

    savePlayer() {

        this.currentPlayer.firstName = this.playerFormGroup.get('firstNameFormControl').value;
        this.currentPlayer.lastName = this.playerFormGroup.get('lastNameFormControl').value;
        this.currentPlayer.userMail = this.playerFormGroup.get('userMailFormControl').value;
        this.currentPlayer.phoneNumber = this.playerFormGroup.get('phoneNumberFormControl').value;
        this.currentPlayer.isActive = this.playerFormGroup.get('isActiveFormControl').value;
        this.currentPlayer.playerStats.currentRow = this.playerFormGroup.get('rowFormControl').value;


        this.playerService.savePlayer(this.currentPlayer).subscribe(response => {
            setTimeout(() => {
                const listen = response;
                if (response) {
                } else {
                    console.error('Nije uspješno spremljeno.');
                }

                this.snackMessageService.showSuccess('Izmjena uspješna. ' +
                    this.currentPlayer.firstName + ' ' + this.currentPlayer.lastName);
            }, 1000);
        });
    }

    backToHome() {
        this.router.navigate(['/']);
    }

}
