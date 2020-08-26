import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AdminRestaurantComponent } from 'app/admin-restaurant/admin-restaurant.component';
import { AdminInfoService } from './admin-info.service';
import { Users } from 'app/models/Users';
import { GeneralInfo } from 'app/models/GeneralInfo';
import { TreatType } from 'app/models/TreatType';
import { Categories } from 'app/models/Categories';
import { ProviderList } from 'app/models/ProviderList';
import { Treat } from 'app/models/Treat';
import { Data } from 'app/models/Data';
import { Menu } from "app/models/Menu";

import { RestaurantList } from 'app/models/RestaurantList';
import { MatTableDataSource } from '@angular/material';
import { Restaurants } from 'app/models/Restaurants';
import { MenuList } from 'app/models/MenuList';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminInfoComponent implements OnInit {
  treat: Treat;
  treatInfo: Treat;
  generalInfo: GeneralInfo;
  treatType: TreatType;
  category: Categories;
  users: Users[];
  user: Users[];
  proList: ProviderList[] = [];
  inputCustomType: string;
  selectedProviders = [];

  @ViewChild('multiSelect') multiSelect;
  public form: FormGroup;
  public loadContent: boolean = false;
  public name = 'Providers';
  public data = [];
  public data1 = [];
  public settings = {};
  public selectedItems = [];

  public dateTime: Date;
  model: NgbDateStruct;
  time = { hour: 13, minute: 30 };
  id: string;
  providers: any;
  proId: string;
  ids: string[];
  tType: string;
  cat: string;
  item_id: string;
  item_text: string;
  role: string;
  dateWithTime: string;
  otherTreatType: string;
  restaurants: Restaurants[];
  registrationForm: FormGroup;
  categoryForm: FormGroup;
  providersForm: FormGroup;
  showCustomTypeBox: boolean = false;

  minDate: any;
  currentDate = new Date();

  selectedMenuType: string = 'All';
  resList: RestaurantList[] = [];
  selectedRestaurants: string[] = [];
  dataSource = new MatTableDataSource<RestaurantList>(this.resList);


  isSubmitted = false;

  TreatsType: any = ['Birthday', 'First Salary', 'Car', 'Other'];
  Categories: any = ['Breakfast', 'Lunch', 'Dinner', 'Tea Party', 'Drinks', 'Desserts', 'Other']
  myCategories: any = [];

  constructor(public fb: FormBuilder, private _router: Router, private route: ActivatedRoute, private service: AdminInfoService, private myData: Data) {

    this.minDate = {
      "year": this.currentDate.getFullYear(),
      "month": this.currentDate.getMonth() + 1,
      "day": this.currentDate.getDate()
    };

    this.categoryForm = fb.group({
      category: ['', [Validators.required]]
    });

    this.registrationForm = fb.group({
      treatsType: ['', [Validators.required]],
      datePicker: ['', [Validators.required]],
      customType: ['',]
    });
    this.providersForm = fb.group({
      providers: ['', [Validators.required]]
    });

  }

  get datePicker() { return this.registrationForm.get('datePicker') }
  get customType() { return this.registrationForm.get('customType') }

  async ngOnInit() {

    this.role = localStorage.getItem('role');
    console.log(this.role);
    if (this.role != 'admin') {
      this._router.navigate(['unauthorizedUser/']);
    }
    this.users = await this.service.getUserDetails().toPromise();
    this.users = this.users.filter(activeUsers => activeUsers.isActive == true);

    this.settings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
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
    debugger;
    /* this.restaurants = await this.service.getRestaurantsdetails().toPromise();
    console.log(this.restaurants);
    this.restaurants.forEach(restaurants=>{
      restaurants.menus.forEach(mx =>{
        let menus = new Menu();
       // menus.category = mx.category;
        this.myCategories.push(mx.category);
      });
    });
    console.log(this.myCategories); */
  }

  public setForm() {
    this.form = new FormGroup({
      providers: new FormControl(this.data, Validators.required)
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
  }
  public onDropDownClose(item: any) {
  }
  public onItemSelect(item: any) {
    this.providers = item;
  }
  public onDeSelect(item: any) {
  }
  public onSelectAll(items: any) {
  }
  public onDeSelectAll(items: any) {
  }

  getTreatTypeText() { }


  changeCategory(e) {
    debugger;
    this.cat = this.categories.value;
    console.log(this.cat);
    this.categories.setValue(e.target.value, {
      onlySelf: true
    })
  }
  get categories() {
    return this.categoryForm.get('category');
  }

  changeTtype(e) {
    this.tType = this.treatsType.value;
    this.treatsType.setValue(e.target.value, {
      onlySelf: true
    })
    if (this.tType == 'Other') {
      this.showCustomTypeBox = true;
      this.registrationForm.get('customType').setValidators(Validators.required)
      
    }
    else {
      this.showCustomTypeBox = false;
      this.registrationForm.get('customType').clearValidators();
      
    }
    this.registrationForm.updateValueAndValidity();
    var x = this.registrationForm.valid
    debugger;

  }

  get treatsType() { return this.registrationForm.get('treatsType'); }



  async nextClick() {
    debugger;
    this.otherTreatType = this.registrationForm.get('customType').value;
    switch (this.tType) {
      case this.TreatsType[0]:
        TreatType.Birthday;
        this.treatType = TreatType.Birthday;
        break;
      case this.TreatsType[1]:
        TreatType.FirstSalary;
        this.treatType = TreatType.FirstSalary;
        break;
      case this.TreatsType[2]:
        TreatType.Car;
        this.treatType = TreatType.Car;
        break;
      default:
        TreatType.Other;
        this.treatType = TreatType.Other;
        break;
    }

    switch (this.cat) {
      case this.Categories[0]:
        Categories.Breakfast;
        this.category = Categories.Breakfast;
        break;
      case this.Categories[1]:
        Categories.Lunch;
        this.category = Categories.Lunch;
        break;
      case this.Categories[2]:
        Categories.Dinner;
        this.category = Categories.Dinner;
        break;
      case this.Categories[3]:
        Categories.TeaParty;
        this.category = Categories.TeaParty;
        break;
      case this.Categories[4]:
        Categories.Drinks;
        this.category = Categories.Drinks;
        break;
      case this.Categories[5]:
        Categories.Desserts;
        this.category = Categories.Desserts;
        break;
      default:
        Categories.Other;
        this.category = Categories.Other;
        break;
    }
    this.providers = this.selectedProviders;

    this.users.forEach(user => {
      this.selectedProviders.forEach(selPro => {
        if (selPro.id == user.id) {
          let providerList = new ProviderList();
          providerList.id = user.id;
          providerList.name = user.name;
          providerList.email = user.email;
          providerList.phoneNumber = user.phoneNumber;
          this.proList.push(providerList)
        }
      });
    });
    this.dateWithTime = this.model.day + "/" + this.model.month + "/" + this.model.year + " " + this.time.hour + ":" + this.time.minute;
    console.log(this.dateWithTime);
    let treatInfo = new Treat();
    treatInfo.dateTime = this.dateWithTime;
    treatInfo.type = this.treatType;
    treatInfo.category = this.category;
    treatInfo.providers = this.proList;
    console.log(treatInfo);
    this.treatInfo = treatInfo;

    this.myData.storage = {
      "datetime": this.model.day + "/" + this.model.month + "/" + this.model.year + " " + this.time.hour + ":" + this.time.minute,
      "type": this.treatType,
      "otherTreatType": this.inputCustomType,
      "category": this.category,
      "providers": this.proList
    }

    // this.treat = await this.service.addAdminInformations(this.model, this.time.hour, this.time.minute, this.treatType, this.category, this.proList).toPromise();
    // this.id = this.treat.id;
    // await this.nextService.addAdminInformations(this.model, this.time.hour, this.time.minute, this.treatType, this.category, this.proList);
    this._router.navigate(['adminRestaurant']);
  }

  /*  public filterCategory(e) {
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
   }*/

  /* registrationForm = this.fb.group({
    category: ['', [Validators.required]]
  }) */

  /*changeCity(e) {
    console.log(e.value)
    this.categorys.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get categorys() {
    return this.registrationForm.get('category');
  } */

}
