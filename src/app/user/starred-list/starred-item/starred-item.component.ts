import { Component, Input } from "@angular/core";

import { Drink } from "../../../shared/drink.model";
import { UserService } from "../../user.service";

@Component({
  selector: "app-starred-item",
  templateUrl: "./starred-item.component.html",
  styleUrls: [
    "./starred-item.component.scss",
    "../../../shared/drink-card.scss"
  ]
})
export class StarredItemComponent {
  @Input() starredDrink: Drink;
  @Input() starreds: any[];
  @Input() index: number;

  viewStarred = false;
  star = "☆";
  isDisabled = false;

  constructor(private userService: UserService) {}

  //TOGGLE STARRED PREVIEW
  onViewStarred() {
    this.viewStarred = !this.viewStarred;
  }

  onDeleteStarred() {
    //PLUG IN STARRED ARR & DRINK ID FOR COMPARISON IN DELETE SERVICE
    this.userService
      .deleteStarred(this.starreds, this.starredDrink.id)
      .subscribe(() => {
        this.star = "★";
        this.isDisabled = true;
      });
  }
}
