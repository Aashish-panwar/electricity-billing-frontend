export interface MeterReading {

  id?: number;

  meterId:number;

  meterNumber?:string;

  consumerName?:string;

  previousReading?:number;

  currentReading:number;

  unitsConsumed?:number;

  billingMonth:number;

  billingYear:number;

  readingDate:string;

  status?:string;

  remarks?:string;

  active?:boolean;

}