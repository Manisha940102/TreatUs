import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, AbstractControl, FormArray, Validators, FormGroup, FormControl, Validator } from "@angular/forms";
import { TreatUser } from 'app/models/TreatUser';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTreatService } from './my-treat.service';
import { Treat } from 'app/models/Treat';
import { AdminRestaurants } from 'app/models/AdminRestaurants';
import { Restaurants } from 'app/models/Restaurants';
import { SelectedRestaurant } from 'app/models/SelectedRestaurant';
import { Menu } from 'app/models/Menu';
import { MatSort } from '@angular/material/sort';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MenuListItem } from 'app/models/MenuListItem';
import { pickedIteams } from 'app/models/PickedItems';
import { PickedItem } from 'app/models/PickedItem';
import { TreatUsers } from 'app/models/TreatUsers';
import { NewUser } from 'app/models/NewUser';
import { textChangeRangeIsUnchanged } from 'typescript';
import { debug } from 'console';
//import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-my-treat',
  templateUrl: './my-treat.component.html',
  styleUrls: ['./my-treat.component.css']
})
export class MyTreatComponent implements OnInit {
  treat: Treat;
  tUser: TreatUsers;
  users: TreatUsers[] = [];
  adminRestaurants: AdminRestaurants;
  treatId: string;
  restaurants: Restaurants;
  res: Restaurants[];
  treatUserList: TreatUser[] = [];
  menuList: MenuListItem[] = [];
  list: MenuListItem;

  newUser: NewUser[];
  selectMenu: AdminRestaurants;
  rest: AdminRestaurants[];
  menus: Menu[];
  menu: any[];
  selMenu: Menu;
  select: MenuListItem;
  resList: Array<AdminRestaurants> = [];
  mealList: Array<SelectedRestaurant> = [];
  restaurantName: string = "null";
  menuName: string = "null";
  specification: string = "null";
  myArray: MenuListItem[] = []
  distinctNames: string[] = [];
  distinctUsers: TreatUsers[] = [];
  myArray1: TreatUsers[] = [];
  distinctResNames: string[] = [];
  distinctTreatUsers: TreatUsers[] = [];
  message: string;
  length: number;
  pickedItem: MenuListItem[] = [];
  treatUser = new TreatUsers();
  isValidInput;
  alertMessage: string;
  role: string;

  displayedColumns: string[] = ['Select', 'RestaurantName', 'Menu', 'Specification'];
  dataSource = new MatTableDataSource<MenuListItem>(this.menuList);
  selection = new SelectionModel<MenuListItem>(false);

  /*  Restaurants: any = ['All', 'KFC', ' BurgerKing'] */

  @ViewChild('multiSelect') multiSelect;

  constructor(private _router: Router, private route: ActivatedRoute, public fb: FormBuilder, private service: MyTreatService) { }

  async ngOnInit() {
    debugger;
    if (localStorage.getItem('role') == null) {
      debugger;
      this._router.navigate(['login/']); 
      this.treatId = this.route.snapshot.params.treatId;
      localStorage.setItem('treatId',this.treatId);
    }
         
    this.treatId = this.route.snapshot.params.treatId; 
    if (!this.treatId) return;
    this.treat = await this.service.getTreatDetails(this.treatId).toPromise();
    console.log(this.treat);
    // localStorage.setItem('treatId',null);


    this.treat.restaurants.forEach(adminRes => {
      this.distinctResNames.push(adminRes.restaurantName);
      adminRes.menus.forEach(menu => {
        let menuListItem = new MenuListItem();
        menuListItem.restaurantName = adminRes.restaurantName;
        menuListItem.id = adminRes.id
        menuListItem.menuId = menu.menuId;
        menuListItem.menuName = menu.menuName;
        menuListItem.specification = menu.specification;
        menuListItem.price = menu.price;
        this.menuList.push(menuListItem)
      });
    });
    console.log(this.menuList);

    this.distinctNames = Array.from(new Set(this.distinctResNames));

    this.dataSource = new MatTableDataSource<MenuListItem>(this.menuList);
    this.selection = new SelectionModel<MenuListItem>(false);
    console.log(this.dataSource, this.selection);
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
      this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  registrationForm = this.fb.group({
    restaurants: ['', [Validators.required]]
  })

  // Choose Restaurant using select dropdown
  changeRestaurant(e) {
    this.restaurantName = this.restaurantsType.value;
    this.restaurantsType.setValue(e.target.value, {
      onlySelf: true
    })

    var filteredMenu = this.menuList.filter(list => list.restaurantName === this.restaurantName);
    if (this.restaurantName === "all") {
      filteredMenu = this.menuList;
    }
    this.dataSource = new MatTableDataSource<MenuListItem>(filteredMenu);
    this.selection = new SelectionModel<MenuListItem>(false);

  }

  // Getter method to access formcontrols
  get restaurantsType() {
    return this.registrationForm.get('restaurants');
  }
  getTreatTypeText() {
    let treatTypeText = '';
    switch (this.treat.type) {
      case 0:
        treatTypeText = 'Birthday';
        break;
      case 1:
        treatTypeText = 'First Salary';
        break;
      case 2:
        treatTypeText = 'Car';
        break;
      default:
        treatTypeText = this.treat.otherTreatType;
        break;
    }
    return treatTypeText;
  }

  getProvidersString() {
    return this.treat.providers.map(t => t.name).join(",");
  }

 /* getRestaurantDetails() {
     this.menuList = this.selection.selected;
     this.myArray.push(this.menuList[0]);  
     console.log(this.myArray);    
    return this.specification + " " + this.menuName + " " + "from  " + this.restaurantName;

  }*/
    test(e, selection) {
      debugger;
      this.alertMessage=null;
      this.message = "You picked " + e.specification + " " + e.menuName + " from " + e.restaurantName;
      this.select = e;
      this.pickedItem.push(this.select);
      this.treatUser.pickedItem = this.selection.selected;
    }

  async sendClick() {
    var name = localStorage.getItem('name');
    var email = localStorage.getItem('email');
    debugger;
    this.alertMessage = null;
    this.treat.treatUsers.forEach(async treatUser => {
      console.log(treatUser);
      if (treatUser.name.toUpperCase() == name.toUpperCase() && treatUser.email.toUpperCase() == email.toUpperCase()) {
        if (this.selection.selected.length > 0) {
          if (treatUser.pickedItem != null && treatUser.pickedItem.length > 0) {
            this.message = "Sorry! You have already picked " + treatUser.pickedItem[0]
              .specification + " " + treatUser.pickedItem[0].menuName + " from " + treatUser
                .pickedItem[0].restaurantName;

            this._router.navigate(['confirmation/' + this.message]);
          }
          else {
            treatUser.pickedItem = this.selection.selected;
            this.treat = await this.service.addUserDetails(this.treat).toPromise();
            this.message = "Your pick has been recorded!"
            this._router.navigate(['confirmation/' + this.message]);
          }
        }
        else {
          this.alertMessage = "Not selected";
        }
        return;
      }
    });
  }
}
