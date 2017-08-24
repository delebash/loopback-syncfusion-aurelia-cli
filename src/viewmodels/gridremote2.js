import {inject} from 'aurelia-framework';
import {AuthenticationService} from '../services/auth-service'
import {DreamFactoryAdaptor} from '../services/syncfusion-dreamfactory-adaptor';
import {Endpoint} from 'aurelia-api';

@inject(AuthenticationService,DreamFactoryAdaptor)
export class GridQuery {
  constructor(authservice,adaptor) {
    this.authservice = authservice
    this.adaptor = adaptor
  }

  attached() {
    if (this.authservice.authenticated === false) {
      alert('please login')
    } else {
      this.getdata();
    }
  }

  getdata() {
    //requestType = "get" -- request uses query string params via get, "json" -- request uses post to send an object
    let adaptorOptions = {requestType: "json"}; //defaults to "get" if not specified or not passed in

    let dataManager = ej.DataManager({
      url: "http://localhost:3000/api/customers",
      adaptor: new this.adaptor.syncfusionDreamFactoryAdaptor(adaptorOptions),
    });

    $("#Grid").ejGrid({
      dataSource: dataManager,
      toolbarSettings: {
        showToolbar: true,
        toolbarItems: ["add", "edit", "delete"]
      },
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        editMode: "dialog"
      },
      allowPaging: true,
      allowSorting: true,
      allowFiltering: true,
      filterSettings: {showPredicate: true, filterType: "menu", enableCaseSensitivity: true},
      searchSettings: {ignoreCase: false},
      isResponsive: true,
      columns: [
        {field: "lastName", headerText: "Last Name", width: 110},
        {field: "company", headerText: "Company", width: 110}
      ]
    });
  }
}

