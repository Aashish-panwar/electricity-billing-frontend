export interface Tariff {

  id?: number;

  tariffName: string;

  ratePerUnit: number;

  fixedCharge: number;

  electricityDuty: number;

  fuelSurcharge: number;

  effectiveFrom: string;

  effectiveTo?: string;

  description?: string;

  active?: boolean;

}