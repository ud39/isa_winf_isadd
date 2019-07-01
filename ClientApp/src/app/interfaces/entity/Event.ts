import {Image} from "./Image";
import {Shop} from "./Shop";

export interface Event {
  id:number;
  startTime:string;
  endTime:string;
  name:string;
  accessFee: number;
  description:string;
  previewImageFileName:string;
  images: Image[];
  coffeeShop: Shop[];
}

