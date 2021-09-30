import {Component} from '@angular/core';
import { ProductService} from './productservice';
import { AddressList,language } from './product';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent { 
    addressList: AddressList[];
    selectedList :AddressList[];

    constructor(public translateService: TranslateService,private productService: ProductService , private messageService: MessageService, private confirmationService: ConfirmationService) { 
      translateService.addLangs(['en', 'ch']);
      translateService.setDefaultLang('en');
    }
    translateSite(langauge: string) {
      this.translateService.use(langauge);
    }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.addressList = data);
    }
    newRow() {
      return { id: '', name: '', location: '', phone: 0 , createdDate:'' };
    }
    deleteSelectedList() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected lists?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.addressList = this.addressList.filter(val => !this.selectedList.includes(val));
              this.selectedList = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Lists Deleted', life: 3000});
          }
      });
  }
  updateList() {
    let updatedList = this.addressList.filter(val => this.selectedList.includes(val));
    let listOfIds ="";
    if(updatedList.length > 0 ){
    for (let i = 0; i < updatedList.length; i++) {
      listOfIds += updatedList[i].id + ",";
  }
    this.confirmationService.confirm({
        message: 'Are you sure you want to update selected ID ' + listOfIds + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle'
    });
  }
}
}
