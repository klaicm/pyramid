import { Player } from 'src/app/player/player.model';
import { Component, OnInit, Inject } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SnackMessageService } from 'src/app/shared/services/snackbar-message.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-modify-player',
    templateUrl: './modify-player.component.html',
    styleUrls: ['./modify-player.component.css', '../../app.component.css']
})
export class ModifyPlayerComponent implements OnInit {

    allPlayers: Array<Player>;
    playerFormGroup: FormGroup;
    spinnerOn = false;

    constructor(private playerService: PlayerService, public dialogRef: MatDialogRef<ModifyPlayerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Player, private snackMessageService: SnackMessageService) {
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

        this.playerFormGroup.get('firstNameFormControl').setValue(this.data.firstName);
        this.playerFormGroup.get('lastNameFormControl').setValue(this.data.lastName);
        this.playerFormGroup.get('userMailFormControl').setValue(this.data.userMail);
        this.playerFormGroup.get('phoneNumberFormControl').setValue(this.data.phoneNumber);
        this.playerFormGroup.get('isActiveFormControl').setValue(this.data.active);
        this.playerFormGroup.get('rowFormControl').setValue(this.data.playerStats.currentRow);
    }

    savePlayer() {

        this.data.firstName = this.playerFormGroup.get('firstNameFormControl').value;
        this.data.lastName = this.playerFormGroup.get('lastNameFormControl').value;
        this.data.userMail = this.playerFormGroup.get('userMailFormControl').value;
        this.data.phoneNumber = this.playerFormGroup.get('phoneNumberFormControl').value;
        this.data.isActive = this.playerFormGroup.get('isActiveFormControl').value;
        this.data.playerStats.currentRow = this.playerFormGroup.get('rowFormControl').value;


        this.playerService.savePlayer(this.data).subscribe(() => {
            this.spinnerOn = false;

            this.snackMessageService.showSuccess('Izmjena uspješna. ' +
                this.data.firstName + ' ' + this.data.lastName);

            this.dialogRef.close();
        },
            err => {
                this.spinnerOn = false;
                this.snackMessageService.showError('Neuspješan unos. ' + err);
            }
        );
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

}
