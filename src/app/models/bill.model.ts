export interface Bill {

    id?: number;

    billNumber?: string;

    consumerId?: number;

    consumerName?: string;

    meterId?: number;

    meterNumber?: string;

    meterReadingId?: number;

    energyCharge?: number;

    fixedCharge?: number;

    fuelSurcharge?: number;

    electricityDuty?: number;

    lateFee?: number;

    totalAmount?: number;

    billDate?: string;

    dueDate?: string;

    status?: string;

    active?: boolean;

}