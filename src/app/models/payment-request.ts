export interface PaymentRequest {

    billId: number;

    amount: number;

    paymentMethod: string;

    remarks?: string;

}