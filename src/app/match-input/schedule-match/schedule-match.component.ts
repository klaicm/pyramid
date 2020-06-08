import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Player } from 'src/app/player/player.model';
import { PlayerService } from 'src/app/player/player.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Match } from 'src/app/fixtures/match.model';
import { MatchService } from 'src/app/fixtures/match.service';
import { Round } from 'src/app/fixtures/round.model';
import { SeasonService } from 'src/app/shared/services/season.service';
import { Season } from 'src/app/shared/models/season.model';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
    selector: 'app-schedule-match',
    templateUrl: './schedule-match.component.html',
    styleUrls: ['./schedule-match.component.css', '../../app.component.css']
})
export class ScheduleMatchComponent implements OnInit, AfterViewInit {

    allPlayers: Array<Player>;
    evenRoundPlayers: Array<Player>;
    oddRoundPlayers: Array<Player>;
    evenChallenges = true;
    matchFormGroup: FormGroup;
    roundFormGroup: FormGroup;
    allSeasons: Array<Season>;
    allRounds: Array<Round>;
    challengersPlayers: Array<Player>;
    defendersPlayers: Array<Player>;

    constructor(private playerService: PlayerService, private matchService: MatchService, private seasonService: SeasonService,
        private router: Router) {
        this.matchFormGroup = new FormGroup({
            playerChallengerFormControl: new FormControl('', Validators.required),
            playerDefenderFormControl: new FormControl('', Validators.required),
            roundFormControl: new FormControl('', Validators.required),
            challengerOddityFormControl: new FormControl('', Validators.required)
        });

        this.roundFormGroup = new FormGroup({
            seasonFormControl: new FormControl('', Validators.required),
            roundNumberFormControl: new FormControl('', Validators.required),
            matchDateFromFormControl: new FormControl('', Validators.required),
            matchDateToFormControl: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {

        this.playerService.getAllPlayers().subscribe(response => {
            this.allPlayers = response;
            this.evenRoundPlayers = this.allPlayers.filter((player: Player) => player.playerStats.currentRow % 2 === 0)
                .sort((a: Player, b: Player) => a.playerStats.currentRow > b.playerStats.currentRow ? 1 : -1);
            this.oddRoundPlayers = this.allPlayers.filter((player: Player) => player.playerStats.currentRow % 2 !== 0)
                .sort((a: Player, b: Player) => a.playerStats.currentRow > b.playerStats.currentRow ? 1 : -1);
        });

        this.seasonService.getAllSeasons().subscribe(seasons => {
            this.allSeasons = seasons;
        });

        this.matchService.getAllRounds().subscribe(rounds => {
            this.allRounds = rounds;
            this.allRounds.sort((a: Round, b: Round) => a.round > b.round ? -1 : 1);
        });

    }

    ngAfterViewInit() {
        this.matchFormGroup.get('challengerOddityFormControl').valueChanges.subscribe(value => {
            if (value === 'even') {
                this.challengersPlayers = this.evenRoundPlayers;
                this.defendersPlayers = this.oddRoundPlayers;
            } else {
                this.challengersPlayers = this.oddRoundPlayers;
                this.defendersPlayers = this.evenRoundPlayers;
            }
        });
    }

    addNewRound() {

        const round = new Round();

        round.round = this.roundFormGroup.get('roundNumberFormControl').value;
        round.dateFrom = this.roundFormGroup.get('matchDateFromFormControl').value;
        round.dateTo = this.roundFormGroup.get('matchDateToFormControl').value;
        round.season = this.roundFormGroup.get('seasonFormControl').value;
        round.roundDescription =
            round.round + '. kolo (' + round.dateFrom.toLocaleDateString().substring(0, 5).replace('/', '.') + '. - '
            + round.dateTo.toLocaleDateString().substring(0, 5).replace('/', '.') + '.) - ' + round.season.seasonName;

        this.matchService.addNewRound(round).subscribe(response => {
            setTimeout(() => {
                const listen = response;
                if (response) {
                    console.error('Uspješno spremljeno.');
                } else {
                    console.error('Nije uspješno spremljeno.');
                    console.log(round);
                }
            }, 1000);
        });
    }

    scheduleMatch() {

        const match = new Match();

        match.playerRowAttacker = this.matchFormGroup.get('playerChallengerFormControl').value;
        match.playerRowDefender = this.matchFormGroup.get('playerDefenderFormControl').value;
        match.challengerRow = match.playerRowAttacker.playerStats.currentRow;
        match.defenderRow = match.playerRowDefender.playerStats.currentRow;
        match.round = this.matchFormGroup.get('roundFormControl').value;


        this.matchService.saveMatch(match).subscribe(response => {
            setTimeout(() => {
                const listen = response;
                if (response) {
                    console.error('Uspješno spremljeno.');
                } else {
                    console.error('Nije uspješno spremljeno.');
                    console.log(match);
                }
            }, 3000);
        });
    }

    backToHome() {
        this.router.navigate(['/']);
    }

    radioChange($event: MatRadioChange) {
        console.log($event.source.name, $event.value);

        if ($event.source.name === 'Parni') {
            console.log('Parni');
        } else {
            console.log('Neparni');
        }
    }

}
