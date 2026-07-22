export interface Meter {

  id?: number;

  meterNumber: string;

  manufacturer: string;

  model: string;

  installationYear: number;

  status: string;

  currentReading: number;

  consumerId: number;

  consumerName?: string;

  active?: boolean;

}