import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { TreatSumService } from "./treat-sum.service";
import { FormBuilder } from "@angular/forms";
import { data } from "jquery";
import { TreatSummary } from "app/models/TreatSummary";
import { Treat } from "app/models/Treat";
import { Menu } from "app/models/Menu";
import { TreatUser } from "app/models/TreatUser";
import { SelectedRestaurant } from "app/models/SelectedRestaurant";
import { AdminRestaurants } from "app/models/AdminRestaurants";
import { UserSummary } from '../models/UserSummary';
import { from } from "rxjs";
import { pickedIteams } from "app/models/PickedItems";
import { TreatUsers } from "../models/TreatUsers";
import { RestaurantOrder } from "app/models/RestaurantOrder";
import { TreatUserSummary } from "./treat-user-summary";
import { TreatInvoiceSummary } from "./treat-invoice-summary";
import { debug } from "console";
import { RestaurantTableItem } from "app/models/RestaurantTableItem";
import { RestaurantItem } from "app/models/RestaurantItem";

@Component({
  selector: "app-treats-summary",
  templateUrl: "./treats-summary.component.html",
  styleUrls: ["./treats-summary.component.css"],
})
export class TreatsSummaryComponent implements OnInit {

  totalAmount: number = 0;
  treatSummary: any;
  treatId: string;
  treat: Treat;
  resturantName: string;
  menus: Menu[];
  PickedItems: any;
  userList: any;
  userName: string;
  treatUsers: TreatUser[];
  userSummries: UserSummary;
  newUser: TreatUsers[];
  qUser: TreatUsers;
  role: string;

  treatSummaryList: TreatSummary[] = [];
  restaurantNamesUnique: string[] = [];
  /* restaurantOrdersList : RestaurantOrder[]=[]; */
  restaurantNames: string[] = [];
  restaurantOrderList: RestaurantOrder[] = [];
  restaurantTables: RestaurantTableItem[] = [];


  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private service: TreatSumService,
    private treatSumService: TreatSumService
  ) { }

  async ngOnInit() {
    this.role = localStorage.getItem('role');
    console.log(this.role);
    if (this.role == 'admin' || this.role == 'provider') {
      
      this._router.navigate(['treatSummary']);
    } else {
      this._router.navigate(['unauthorizedUser/']);
    }
    this.treatId = this.route.snapshot.params.treatId;
    if (!this.treatId) return;
    this.treat = await this.service.getTreatSummary(this.treatId).toPromise();
    debugger;
    this.treat.treatUsers.forEach(user => {
      let treatSummary = new TreatSummary();
      if (user.pickedItem != null) {
        this.restaurantNames.push(user.pickedItem[0].restaurantName);
        treatSummary.pick = user.pickedItem[0].specification + " " + user.pickedItem[0].menuName;
        treatSummary.restaurantName = user.pickedItem[0].restaurantName;
        treatSummary.price = user.pickedItem[0].price;
        treatSummary.userName = user.name;
        this.treatSummaryList.push(treatSummary);
      }
    });

    this.restaurantNamesUnique = Array.from(new Set(this.restaurantNames));

    this.restaurantNamesUnique.forEach(restaurant => {
      var currentRestaurant = this.treat.restaurants.find(item => item.restaurantName === restaurant);
      var restaurantTableItem = new RestaurantTableItem();
      restaurantTableItem.phone = currentRestaurant.telephoneNo;
      restaurantTableItem.restaurantName = restaurant;
      var subTotal: number = 0;
      this.treatSummaryList.forEach(itemList => {
        ;
        if (itemList.restaurantName == restaurant) {
          let obj = this.restaurantOrderList.find((item, i) => {
            if (item.menuName == itemList.pick) {
              debugger;
              this.restaurantOrderList[i] = {
                resturantName: itemList.restaurantName, menuName: itemList.pick,
                quantity: 1 + this.restaurantOrderList[i].quantity, price: itemList.price,
                total: this.restaurantOrderList[i].total + Number(itemList.price)
              };
              subTotal += Number(this.restaurantOrderList[i].price);
              return true;
            }
          });

          if (obj == null) {
            var restaurantOrder = new RestaurantOrder();
            restaurantOrder.menuName = itemList.pick;
            restaurantOrder.price = itemList.price;
            restaurantOrder.resturantName = restaurant;
            restaurantOrder.quantity = 1;
            restaurantOrder.total = Number(itemList.price);
            this.restaurantOrderList.push(restaurantOrder);
            subTotal += Number(itemList.price);
          }
          debugger;


        }

        debugger;

      });
      restaurantTableItem.subTotal = subTotal;
      restaurantTableItem.restaurantOrders = this.restaurantOrderList;
      this.restaurantTables.push(restaurantTableItem);
      this.restaurantOrderList = [];
    });

  }

}
