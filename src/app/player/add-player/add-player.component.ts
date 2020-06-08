import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-player',
    templateUrl: './add-player.component.html',
    styleUrls: ['./add-player.component.css', '../../app.component.css']
})
export class AddPlayerComponent implements OnInit {

    playerFormGroup: FormGroup;

    constructor(private router: Router) {
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

    backToHome() {
        this.router.navigate(['/']);
    }

}
