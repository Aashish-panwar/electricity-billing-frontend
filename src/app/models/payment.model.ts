export interface Payment {

    id?: number;

    paymentNumber?: string;

    billId: number;

    billNumber?: string;

    consumerName?: string;

    amount: number;

    paymentDate?: string;

    paymentMethod: string;

    transactionId?: string;

    remarks?: string;

    status?: string;

}