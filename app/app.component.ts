import { Component, AfterViewInit } from "@angular/core";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import {  isEnabled,
          enableLocationRequest,
          getCurrentLocation,
          watchLocation,
          distance,
          clearWatch } from "nativescript-geolocation";
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="My App"></ActionBar>
    <!-- Your UI components go here -->
    <StackLayout>
      <Button class="btn btn-primary btn-active" id="button" text="Tap me!" (tap)="onTap($event)"></Button>
      <Label class="h3 p-15" [text]="location['latitude']" textWrap="true"></Label>

    </StackLayout>
  `
})
export class AppComponent implements AfterViewInit{
  // Your TypeScript logic goes here


  location:any;
  subscription;

  constructor(){
    this.subscription = Observable.fromPromise(getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}));

  }

  ngAfterViewInit(){
  }
  onTap(args: EventData) {
    let button = <Button>args.object;
    this.enableLocationTap();


    this.buttonGetLocationTap();


  }
  enableLocationTap() {
    if (!isEnabled()) {
        enableLocationRequest();
    }
  }

  buttonGetLocationTap() {
    let that = this;
    let location = getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
    then(function(loc) {
        if (loc) {
          that.location = loc;
            console.log("Current location is: " + loc['latitude']);
          }
    }, function(e){
        console.log("Error: " + e.message);
    });

    this.subscription.subscribe(data => this.location = data);


  }

  alertScreen(loc){
    alert("Tapped " + loc + " times!");

  }
}
