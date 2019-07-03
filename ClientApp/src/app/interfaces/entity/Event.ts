import {Image} from "./Image";
import {Shop} from "./Shop";
import {Address} from "../complex/Address";

export interface Event extends Address{
  id:number;
  startTime:string;
  endTime:string;
  name:string;
  accessFee: number;
  description:string;
  previewImageFileName:string;
  images: Image[];
  coffeeShops: Shop[];
}

