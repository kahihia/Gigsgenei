import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
// export class StorageItem {
//   key: string;
//   value: any;
//
//   constructor(data: IStorageItem) {
//     this.key = data.key;
//     this.value = data.value;
//   }
// }
// export interface IStorageItem {
//   key: string;
//   value: any;
// }

export class LocalStorageService {
  localStorageSupported: boolean;
  constructor() {this.localStorageSupported = typeof window['localStorage'] !== 'undefined' && window['localStorage'] != null;
  }
  obj: any = [];
  key = '';
  value = '';
  // add value to storage
  add(key: string, item: string) {
    if (this.localStorageSupported) {
      localStorage.setItem(key, item);
    }
  }

  // get all values from storage (all items)
  getAllItems() {
    this.obj.key = localStorage.key(0);
    this.obj.value = localStorage.getItem(this.obj.key);
    return this.obj;
  }
  // get one item by key from storage
  get(key: string): string {
    if (this.localStorageSupported) {
      this.value = localStorage.getItem(key);
      return this.value;
    } else {
      return null;
    }
  }

  // remove value from storage
  remove(key: string) {
    if (this.localStorageSupported) {
      localStorage.removeItem(key);
    }
  }

  // clear storage (remove all items from it)
  clear() {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }

}
