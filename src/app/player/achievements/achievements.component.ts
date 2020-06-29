import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/player/player.model';
import { Achievement } from 'src/app/shared/models/achievement.model';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  @Input() player: Player;
  achievements: Array<any>;

  firstRow: String = '../../../assets/images/firstRow.png';
  secondRow: String = '../../../assets/images/secondRow.png';
  thirdRow: String = '../../../assets/images/thirdRow.png';
  tenWins: String = '../../../assets/images/tenWins.png';
  twentyWins: String = '../../../assets/images/twentyWins.png';
  fiftyWins: String = '../../../assets/images/fiftyWins.png';
  masters: String = '../../../assets/images/masters.png';
  fiveStreak: String = '../../../assets/images/fiveStreak.png';

  constructor() { }

  ngOnInit() {
    this.achievements = this.player.playerAchievements;
  }


  isAchieved(trophyName: string) {
    if (this.achievements.find((achievement: any) => achievement.achievement.trophyName === trophyName)) {
      return { 'opacity': '100%' };
    }
    return { 'opacity': '20%' };
  }

}
