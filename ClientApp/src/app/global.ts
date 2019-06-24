import { Injectable } from '@angular/core';

@Injectable()
export class Global{
  urlName : Map<string, string> = new Map<string, string>([
    ['home', '/'],
    ['shop', '/shops'],
    ['admin', '/admin'],
    ['wiki', '/wiki'],
    ["wikiEquipment", '/wiki/equipment'],
    ['wikiCoffee', '/wiki/coffee'],
  ]);
}
