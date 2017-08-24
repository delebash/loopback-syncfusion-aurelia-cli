import {inject} from 'aurelia-framework';
import {AuthenticationService} from '../services/auth-service'
import {LoopBackAdaptor} from '../services/syncfusion-loopback-adaptor';
import {Endpoint} from 'aurelia-api';

@inject(AuthenticationService,LoopBackAdaptor,Endpoint.of('api'))
export class GridRemote {

  constructor(authservice,adaptor,api) {
    this.adaptor = adaptor
    this.api = api;
    this.authservice = authservice;
    let adaptorOptions = {requestType: "json"}; //defaults to "get" if not specified or not passed in
        //requestType = "get" -- request uses query string params via get, "json" -- request uses post to send an object
     this.gridData = ej.DataManager({
      url:"http://localhost:3000/api/customers/",
       adaptor: new this.adaptor.loopbackAdaptor(adaptorOptions),
    });


  }

 async attached() {
    if (this.authservice.authenticated === false) {
      alert('please login')
    } else {
   this.getdata();
    }
  }
  getdata() {
   // let data = await
    let data = this.api.find('customers');
    console.log(data)
  }

  // getdata() {
  //
  //   $("#Grid").ejGrid({
  //     dataSource: gridData,
  //     columns: [
  //       {field: "id", isPrimaryKey: true, isIdentity: true, width: 10},
  //       {field: "lastName", headerText: "Last Name", width: 110},
  //       {field: "company", headerText: "Company", width: 110}
  //     ]
  //   });
  // }


}

