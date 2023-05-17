export interface Tag {
  jobId: number;
  billingReference: string;
  orderPlacer: string;
  clientName: string;
  clientId: number;
  courier: string;
  courierId: number;
  originName: string;
  originStreet: string;
  originPostalCode: string;
  destinationStreet: string;
  destinationFloorStreetApt: string;
  destinationPostalCode: string;
  destinationZone: string;
  // deliveryStatus: string;
  // creationTime: string;
  // readyTime: string;
  // dueTime: string;
  // service: string;
  // rate: string;
  // paymentMethod: string;
  // deliveryFee: string;
  // extras: string;
  // deliveryNotes: string;
  // pod: string;
  // specialInstructions: string;

}

export interface Columns {
  jobId: boolean;
  billingReference: boolean;
  orderPlacer: boolean;
  clientName: boolean;
  clientId: boolean;
  courier: boolean;
  courierId: boolean;
  originName: boolean;
  originStreet: boolean;
  originPostalCode: boolean;
  destinationStreet: boolean;
  destinationFloorStreetApt: boolean;
  destinationPostalCode: boolean;
  destinationZone: boolean;
  // deliveryStatus: boolean;
  // creationTime: boolean;
  // readyTime: boolean;
  // dueTime: boolean;
  // service: boolean;
  // rate: boolean;
  // paymentMethod: boolean;
  // deliveryFee: boolean;
  // extras: boolean;
  // deliveryNotes: boolean;
  // pod: boolean;
  // specialInstructions: boolean;
}

export interface Client {
    id: number;
    name: string;
}

export const columnDef = {
    jobId: "job id",
    billingReference: "billing reference",
    orderPlacer: "order placer",
    clientName: "client name",
    clientId: "client id",
    courier: "courier",
    courierId: "courier number",
    originName: "origin name",
    originStreet: "origin street",
    originPostalCode: "origin postal code",
    destinationStreet: "destination street",
    destinationFloorStreetApt: "destination floor/suite/apt.",
    destinationPostalCode: "destination postal code",
    destinationZone: "destination zone",
    // deliveryStatus: "delivery status",
    // creationTime: "creation time",
    // readyTime: "ready time",
    // dueTime: "due time",
    // service: "service",
    // rate: "rate",
    // paymentMethod: "payment method as string",
    // deliveryFee: "delivery fee",
    // extras: "extras",
    // deliveryNotes: "delivery notes",
    // pod: "pod",
    // specialInstructions: "special instructions",
}

export const invoiceItemsDefaults = {
    jobId: true,
    billingReference: true,
    orderPlacer: true,
    clientName: true,
    clientId: true,
    courier: true,
    courierId: true,
    originName: true,
    originStreet: true,
    originPostalCode: true,
    destinationStreet: true,
    destinationFloorStreetApt: true,
    destinationPostalCode: true,
    destinationZone: true,
    // deliveryStatus: true,
    // creationTime: true,
    // readyTime: true,
    // dueTime: true,
    // service: true,
    // rate: true,
    // paymentMethod: true,
    // deliveryFee: true,
    // extras: true,
    // deliveryNotes: true,
    // pod: true,
    // specialInstructions: true,
  }