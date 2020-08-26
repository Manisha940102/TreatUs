import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsDetailsService } from './restaurants-details.service';
import { Menu } from 'app/models/Menu';
import { Restaurants } from 'app/models/Restaurants';
import { RestaurantList } from 'app/models/RestaurantList';


@Component({
  selector: 'app-restaurants-details',
  templateUrl: './restaurants-details.component.html',
  styleUrls: ['./restaurants-details.component.css']
})
// export class Category{ 
//   id:number;  
//   name: string;   
// }
export class RestaurantsDetailsComponent implements OnInit {
  restaurants: Restaurants[];
  restaurantsList: Restaurants[] = [];
  menu: Menu[];
  restaurantForm: FormGroup;
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;
  titleText: string;
  base64textString: string[] = [];
  menuBase64textString: string[] = [];

  restaurantName: string;
  phone: string;
  address: string;
  category: string;
  subcategory: string;
  showSaveSpinner: boolean = false;
  restaurantToRemove: Restaurants;

  editField: string;
  menuList: Array<Menu> = [];
  allMenu: string[];
  showSpinner: Boolean = true;
  role: string;
  editId: string = null;
  showAlert: boolean = false;
  alertMessage: string;

  public menuName: string;
  public specification: string;
  public price: string;

  public settings = {};
  public loadContent: boolean = false;
  public form: FormGroup;
  public data = [];
  selectedCategories: any[];
  myCategories: any = [];
  isSubmitted = false;
  cat: string;
  cate: string[] = [];
  private newMenus: Menu = new Menu();

  subCategory: any = ['Dessert', 'Drinks', 'Main'];


  removeListItem(id: any) {
    this.menuList.splice(id, 1);
  }

  addMenuItem(menuName, specification, price) {
    debugger;
    this.selectedCategories.forEach(cat => {
      // this.cat =cat.name
      this.cate.push(cat.name);
    });
    console.log(this.cat);
    if (menuName != "" && specification != "" && price != "") {
      //if (menuName != "" && category != "" &&  specification != "" && price != "") {
      let menuListItem = new Menu();
      menuListItem.menuName = menuName;
      menuListItem.category = this.cate.map(t => t).join(",");
      menuListItem.subcategory = this.subcategory;
      menuListItem.specification = specification;
      menuListItem.price = price;
      menuListItem.ratings = 0;

      this.menuList.push(menuListItem);
      console.log(this.menuList);
      this.menuName = null;
      this.cate = [];
      this.specification = null;
      this.price = null;
    }
    else {
      alert("Menu item is missing details!");
    }

  }
  onUploadChange(evt: any) {
    this.base64textString = [];
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  onMenuUploadChange(evt: any) {
    this.menuBase64textString = [];
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.menuHandleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  menuHandleReaderLoaded(e) {
    this.menuBase64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  editRestaurant(id: number) {

    this.editId = this.restaurantsList[id].id;
    this.titleText = "Editing : " + this.restaurantsList[id].restaurantName;
    this.base64textString[0] = this.restaurantsList[id].imageBase64;

    this.menuList = this.restaurantsList[id].menus;
    this.restaurantName = this.restaurantsList[id].restaurantName;
    this.address = this.restaurantsList[id].address;
    this.phone = this.restaurantsList[id].telephoneNo;
    this.gotoTop();

    // this.category = this.restaurantsList[id].category;
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  constructor(private _router: Router, private route: ActivatedRoute, private service: RestaurantsDetailsService, private fb: FormBuilder) {

    this.restaurantForm = this.fb.group({
      menuName: new FormControl(''),
      category: new FormControl(''),
      specification: new FormControl(''),
      price: new FormControl(''),
      restaurantName: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/)
      ]),
    });

    this.categoryForm = this.fb.group({
      categories: new FormControl(''),
    });
    this.subCategoryForm = this.fb.group({
      subCategory: new FormControl(''),
    })
  }
  get restaurantNameValidator() { return this.restaurantForm.get('restaurantName') }
  get phoneValidator() { return this.restaurantForm.get('phone') }

  async ngOnInit() {
    this.role = localStorage.getItem('role');
    console.log(this.role);
    if (this.role != 'admin') {
      this._router.navigate(['unauthorizedUser/']);
    }
    this.restaurantsList = [];
    this.restaurants = await this.service.getRestaurants().toPromise();
    this.showSpinner = false;
    this.titleText = "Add restaurant";

    for (let i = 0; i < Object.keys(this.restaurants).length; i++) {
      this.restaurantsList.push(this.restaurants[i]);
    }

    this.data = [
      { id: 1, name: 'BreakFast' },
      { id: 2, name: 'Lunch' },
      { id: 3, name: 'Dinner' },
      { id: 4, name: 'All' },
    ];

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
  }
  async addClick(restaurantName, address, phone) {
    this.showSaveSpinner = true;
    let restaurant = new Restaurants();
    restaurant.restaurantName = restaurantName;
    restaurant.address = address;
    restaurant.telephoneNo = phone;
    restaurant.menus = this.menuList;
    restaurant.imageBase64 = this.base64textString[0];

    if (this.editId != null) {
      restaurant.id = this.editId;
      var restaurantIndex = this.restaurantsList.findIndex(x => x.id === this.editId);
      this.restaurantsList.splice(restaurantIndex, 1);
      await this.service.updateRestaurant(this.editId, restaurant).toPromise();
      this.editId = null;
    }
    else {
      this.restaurants = await this.service.addRestaurantsDetails(restaurant).toPromise();
    }
    this.restaurantsList.push(restaurant);
    this.showSaveSpinner = false;
    this.restaurantForm.reset();
    this.menuList = [];
    this.base64textString = [];
    this.titleText = "Add Restaurant";
    this.ngOnInit();
    this.restaurantToRemove = null;
    this.alertMessage = '';
  }

  changeSubCategory(e) {
    debugger;
    this.subcategory = this.subCategories.value;
    console.log(this.subcategory);
    this.subCategories.setValue(e.target.value, {
      onlySelf: true
    })
  }
  get subCategories() {
    return this.subCategoryForm.get('subCategory');
  }

  public setForm() {
    this.form = new FormGroup({
      categories: new FormControl(this.data, Validators.required)
    });
    this.loadContent = true;
  }

  setDeleteRestaurant(restaurant: Restaurants) {
    this.restaurantToRemove = restaurant;
    this.alertMessage = ' deleted!!'
  }
  dismissAlert() {
    this.showAlert = false;
  }

  async deleteRestaurant() {
    await this.service.deleteRestaurant(this.restaurantToRemove.restaurantName)
      .toPromise();
    this.ngOnInit();
    this.showAlert = true;
  }
  public processForm(): void {


  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
