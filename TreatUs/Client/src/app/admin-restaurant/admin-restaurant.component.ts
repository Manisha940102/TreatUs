import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderList } from 'app/models/ProviderList';
import { Users } from 'app/models/Users';
import { RestaurantList } from 'app/models/RestaurantList';
import { Restaurants } from 'app/models/Restaurants';
import { AdminRestaurantService } from './admin-restaurant.service';
import { Menu } from 'app/models/Menu';
import { MenuList } from 'app/models/MenuList';
import { AdminRestaurants } from 'app/models/AdminRestaurants';
import { SelectedProviders } from 'app/models/SelectedProviders';
import { Model } from 'app/models/Model';
import { GeneralInfo } from 'app/models/GeneralInfo';
import { Treat } from 'app/models/Treat';
import { Name } from "app/models/Name";
import { RestaurantItem } from 'app/models/RestaurantItem';
import { TreatUsers } from 'app/models/TreatUsers';
import { ProviderEmail } from 'app/models/ProviderEmail';
import { Appsetting } from 'app/models/Appsetting';
import { Data } from 'app/models/Data';

@Component({
  selector: 'app-admin-restaurant',
  templateUrl: './admin-restaurant.component.html',
  styleUrls: ['./admin-restaurant.component.css']
})

export class AdminRestaurantComponent implements OnInit {
  users: Users[];
  names: Array<Name> = [];
  selectedProviders: SelectedProviders[];
  treat: Treat;
  na: Name;
  adminRestaurant: AdminRestaurants;
  restaurants: Restaurants[];
  res: Restaurants[] = [];
  menus: Menu;
  resList: RestaurantList[] = [];
  resItem: RestaurantItem[] = [];
  menuItem: MenuList[] = [];
  myArray: any[] = [];
  restaurantName: string;
  selectedRestaurants: string[] = [];
  selectedMenuType: string = 'All';
  status: Boolean;
  message: string;
  treatInfo:Treat;
  id: string;
  paraType:number;
  paraDateTime:string;
  paraProList:ProviderList[];
  paraCategory:number;
  model: Model;
  pro: any[];
  treatId: string;
  userName: string;
  providersName = [];
  distinctNames: string[] = [];
  distinctResNames: string[] = [];
  allRestaurants: string[];
  isSubmitted = false;
  showWarning:boolean=false;
  showLogingSpinner:boolean=false;

  displayedColumns: string[] = ['Select', 'RestaurantName', 'Category', 'Menu', 'Specification', 'Price'];
  dataSource = new MatTableDataSource<RestaurantList>(this.resList);
  selection = new SelectionModel<RestaurantList>(true, []);
  select: any[];

  @ViewChild('multiSelect') multiSelect;
  public tableform: FormGroup;
  public form: FormGroup;
  public loadContent: boolean = false;
  public name = 'Restaurants';
  public data = [];
  public settings = {};
  public selectedItems = null;

  Category: any = ['Lunch', 'Breakfast', 'Dinner', 'TeaParty', 'Drinks', 'Desserts', 'Other']
  constructor(private _router: Router, private route: ActivatedRoute, public fb: FormBuilder, private service: AdminRestaurantService,private myData: Data) {
    debugger;
    console.log(JSON.stringify(this.myData.storage));
      this.treat = this.myData.storage;
      console.log(this.treat);
  
    this.tableform = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  registrationForm = this.fb.group({
    category: ['', [Validators.required]]
  })

  changeCity(e) {
    console.log(e.value)
    this.category.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get category() {
    return this.registrationForm.get('category');
  }

  async ngOnInit() {
    
      // this.treatInfo = this.route.snapshot.params.treatInfo;
      // console.log(this.treatInfo);
    
    // this.treatId = this.route.snapshot.params.id;
    // if (!this.treatId) return;
    // this.treat = await this.service.getTreatDetails(this.treatId).toPromise();
    this.data = [];

    this.settings = {
      selectedItems: this.distinctNames,
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 150,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search All',
      noDataAvailablePlaceholderText: 'No Data Available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.setForm();

    this.restaurants = await this.service.getRestaurantsDetails().toPromise();
    var restaurantLength = this.restaurants.length;

    this.restaurants.forEach(rx => {
      this.distinctNames.push(rx.restaurantName);
      rx.menus.forEach(mx => {
        let restaurantList = new RestaurantList();
        restaurantList.restaurantId = rx.id;
        restaurantList.restaurantName = rx.restaurantName;
        restaurantList.category = mx.category;
        restaurantList.menuId = mx.menuId;
        restaurantList.menuName = mx.menuName;
        restaurantList.specification = mx.specification;
        restaurantList.price = mx.price;
        this.resList.push(restaurantList);
      });
    });

    this.onSelectAll(this.distinctNames);
    this.dataSource = new MatTableDataSource<RestaurantList>(this.resList);
    this.selection = new SelectionModel<RestaurantList>(true, []);

    this.distinctResNames = Array.from(new Set(this.distinctNames));
    this.data = this.distinctNames;
    const allRestaurants = this.distinctResNames;
    this.allRestaurants = allRestaurants;

    this.users = await this.service.getUserDetails().toPromise();
    console.log(this.users);
  }

  public setForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data, Validators.required)
    });
    this.loadContent = true;
  }

  get f() { return this.form.controls; }

  public save() {
    console.log(this.form.value);
  }

  public resetForm() {
    this.setForm();
    this.multiSelect.toggleSelectAll();
  }

  public onFilterChange(item: any) {
    console.log(item);
  }

  public onDropDownClose(item: any) {
  }

  public onItemSelect(item: any) {
    this.showWarning=false;
    debugger;
    this.selectedRestaurants.push(item);
    this.modifyDatasource();
  }

  public onDeSelect(item: any) {
    for (var i = 0; i < this.selectedRestaurants.length; i++) {
      if (this.selectedRestaurants[i] === item) { this.selectedRestaurants.splice(i, 1); }
    }
    this.modifyDatasource();
  }

  public onSelectAll(items: string[]) {
    this.selectedRestaurants = [];
    items.forEach(restaurant => {
      this.selectedRestaurants.push(restaurant);
    });
    this.modifyDatasource();
  }

  public onDeSelectAll(items: any) {
    this.selectedRestaurants = [];
    this.modifyDatasource();
  }

  public filterCategory(e) {
    this.selectedMenuType = e;
    this.modifyDatasource();
  }

  public modifyDatasource() {
    var tempRestaurantList: RestaurantList[] = [];
    this.resList.forEach(listItem => {
      this.selectedRestaurants.forEach(pickedRes => {
        if (pickedRes == listItem.restaurantName) {
          if (listItem.category == this.selectedMenuType || this.selectedMenuType == 'All') {
            tempRestaurantList.push(listItem);
          }
        }
      });
    });
    this.dataSource = new MatTableDataSource<RestaurantList>(tempRestaurantList);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkBoxStatus(status) {
    return status == this.selection.selected;
  }

  categorySelector(category) {
    switch (category) {
      case 0:
        return 'Breakfast';
        break;
      case 1:
        return 'Lunch';
        break;
      case 2:
        return 'Dinner';
        break;
      case 3:
        return 'Tea Party';
        break;
      case 4:
        return 'Drinks';
        break;
      case 5:
        return 'Desserts';
        break;
      default:
        return 'Other';
        break;
    }
  }

  async sendClick() {
    debugger;
    this.showLogingSpinner=true;
    if (this.selection.selected.length > 0){
      let filteredRestaurants: Restaurants[] = [];
    this.restaurants.forEach(restaurant => {
      if (this.selection.selected.find(selectedRestaurant => selectedRestaurant.restaurantId == restaurant.id)) {

        let selectedMenusForCurrentRestaurant = this.selection.selected
          .filter(selectedRestaurant => selectedRestaurant.restaurantId == restaurant.id);
        restaurant.menus.forEach((restaurantMenu, restaurantMenuIndex) => {

          if (selectedMenusForCurrentRestaurant.find(selectedMenu => selectedMenu.menuId == restaurantMenu.menuId)) {
          }
          else {
            restaurant.menus.splice(restaurantMenuIndex, 1);
          }
        });
        filteredRestaurants.push(restaurant);
      }
    });
      // let treat = new Treat();
       this.treat.restaurants = filteredRestaurants;

   // this.treat.restaurants = filteredRestaurants;
    let filteredUsers: TreatUsers[] = [];
    this.users.forEach(user => {
      if (user.isActive == true) {
        let treatUser = new TreatUsers();
        treatUser.name = user.name;
        treatUser.email = user.email;
        treatUser.phoneNumber = user.phoneNumber;
        treatUser.isActive = user.isActive;
        filteredUsers.push(treatUser);
      }
    });
    debugger;
      this.treat.treatUsers = filteredUsers;
    console.log(this.treat);
    this.treat = await this.service.sendAllRestaurantsDetails(this.treat).toPromise();
    console.log(this.treat);
    this.treatId = this.treat.id;
    // localStorage.setItem("treatId",this.treatId);

    let emails = new ProviderEmail();

    var email: string[] = [];
    this.treat.providers.forEach(user => { email.push(user.email); });
    emails.email = email;
    var providerName: string[] = [];
    this.treat.providers.forEach(provider => { providerName.push(provider.name) });
    emails.name = name;

    var providers: string = "";
    this.treat.providers.forEach(provider => {
      providers = providers.concat(provider.name.toString()) + " ";
    });


    var splittedDateTime = this.treat.dateTime.split(" ", 2);
    emails.date = splittedDateTime[0];
    emails.time = splittedDateTime[1];

    emails.treatId = this.treatId;
    emails.subject = "You are invited to give a "+this.categorySelector(this.treat.category)+" with "+ providers + "for your "+ this.typeSelector(this.treat.type)  ;
    emails.providerUrl = Appsetting.Url_providerInvitation + this.treatId;
    console.log(emails);
    debugger;
    this.status = await this.service.sendEmail(emails).toPromise();
    console.log(this.status);
    this.showLogingSpinner=false;
    this.message = "Successfully send to the providers"
    this._router.navigate(['confirmation/' + this.message]);
  }
  else{
    this.showWarning=true;
  } 
}

  backClick() {
    this._router.navigate(['adminInfo']);
  }

  typeSelector(type) {
    switch (type) {
      case 0:
        return 'Birthdays';
        break;
      case 1:
        return 'First Salary';
        break;
      case 2:
        return 'Car';
        break;
      default:
        return this.treat.otherTreatType;
        break;
    }
  }

 
}
