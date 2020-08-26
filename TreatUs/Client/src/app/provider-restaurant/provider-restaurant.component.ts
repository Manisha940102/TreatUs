import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { SelectedRestaurant } from 'app/models/SelectedRestaurant';
import { Restaurants } from 'app/models/Restaurants';
import { ProviderRestaurantService } from './provider-restaurant.service';
import { Menu } from 'app/models/Menu';
import { AdminRestaurants } from 'app/models/AdminRestaurants';
import { SelectedProviders } from 'app/models/SelectedProviders';
import { Model } from 'app/models/Model';
import { GeneralInfo } from 'app/models/GeneralInfo';
import { Treat } from 'app/models/Treat';
import { Name } from "app/models/Name";
import { RestaurantList } from 'app/models/RestaurantList';

@Component({
  selector: 'app-provider-restaurant',
  templateUrl: './provider-restaurant.component.html',
  styleUrls: ['./provider-restaurant.component.css']
})
export class ProviderRestaurantComponent implements OnInit {
  names: Array<Name> = [];
  selectedProviders: SelectedProviders[];
  treat: Treat;
  generalInfo: GeneralInfo;
  na: Name;
  message: string;
  adminRestaurant: AdminRestaurants;
  restaurants: Restaurants;
  res: SelectedRestaurant[];
  menus: Menu[];
  resList: RestaurantList[] = [];

  id: string;
  model: Model;
  pro: any[];
  treatId: string;
  userName: string;
  status: number;
  providersName = [];
  selectedRestaurants: string[] = [];
  selectedMenuType: string = 'All';

  isSubmitted = false;

  displayedColumns: string[] = ['Select', 'RestaurantName', 'Category', 'Menu', 'Specification', 'Price'];
  dataSource = new MatTableDataSource<RestaurantList>(this.resList);
  selection = new SelectionModel<RestaurantList>(true, []);
  select: any[];

  distinctNames: string[] = [];
  distinctResNames: string[] = [];

  @ViewChild('multiSelect') multiSelect;
  public tableform: FormGroup;
  public form: FormGroup;
  public loadContent: boolean = false;
  public name = 'Restaurants';
  public data = [];
  public settings = {};
  public selectedItems = [];

  Category: any = ['Lunch', 'Breakfast', 'Dinner']
  constructor(private _router: Router, private route: ActivatedRoute, public fb: FormBuilder, private service: ProviderRestaurantService, public snackBar: MatSnackBar) {
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

    this.data = [];

    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search All',
      noDataAvailablePlaceholderText: 'No Data Available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.setForm();

    this.treatId = this.route.snapshot.params.treatId;
    this.userName = this.route.snapshot.params.userName;

    if (!this.treatId) return;
    this.treat = await this.service.getTreatDetails(this.userName, this.treatId).toPromise();

    this.treat.restaurants.forEach(restaurant => {
      this.distinctNames.push(restaurant.restaurantName);
      restaurant.menus.forEach(menus => {
        let restaurantList = new RestaurantList();
        restaurantList.restaurantId = restaurant.id;
        restaurantList.restaurantName = restaurant.restaurantName;
        restaurantList.category = menus.category;
        restaurantList.menuId = menus.menuId;
        restaurantList.menuName = menus.menuName;
        restaurantList.specification = menus.specification;
        restaurantList.price = menus.price;
        this.resList.push(restaurantList);
      })
    })

    this.onSelectAll(this.distinctNames);
    this.dataSource = new MatTableDataSource<RestaurantList>(this.resList);
    this.selection = new SelectionModel<RestaurantList>(true, []);

    this.distinctResNames = Array.from(new Set(this.distinctNames));
    this.data = this.distinctNames;
    this.selectedItems=this.data;

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
    console.log(item);
  }

  public onItemSelect(item: any) {
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
    debugger;
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
      })
    })
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

  async sendClick() {
    this.select = this.selection.selected;
    let filteredRestaurants: Restaurants[] = [];
    this.treat.restaurants.forEach(restaurant => {
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
    this.treat.restaurants = filteredRestaurants;
    this.treat = await this.service.updateTreat(this.treat).toPromise();
    console.log(this.treat);
    this.treatId = this.treat.id;
    this.message = "Successfully send to the admin"
    this._router.navigate(['confirmation/' + this.message]);
  }

  skipClick() {
    if (confirm("Are you sure want to skipped the restaurant selection? ")) { 
      this.message = "Successfully send to the admin"
      this._router.navigate(['confirmation/' + this.message]);   
    }
  }

  backClick() {
    this._router.navigate(['basicInfo/' + this.userName + '/' + this.treatId]);
  }
}
