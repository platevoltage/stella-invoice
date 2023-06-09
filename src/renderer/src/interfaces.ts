export interface Tag {
  jobId: number;
  billingReference: string;
  orderPlacer: string;
  // accountName?: string;
  clientName: string;
  clientId: number;
  courier: string;
  courierId: number;
  originName: string;
  originStreet: string;
  originPostalCode: string;
  destinationName: string;
  destinationStreet: string;
  destinationFloorStreetApt: string;
  destinationCity: string;
  destinationPostalCode: string;
  destinationZone: string;
  deliveryStatus: string;
  creationTime: string;
  readyTime: string;
  dueTime: string;
  service: string;
  rate: string;
  paymentMethod: string;
  deliveryFee: string;
  extras: string;
  deliveryNotes: string;
  pod: string;
  specialInstructions: string;
  // excludeCanceled: string;

}

export interface Columns {
  jobId: boolean;
  billingReference: boolean;
  orderPlacer: boolean;
  // accountName: boolean;
  clientName: boolean;
  clientId: boolean;
  courier: boolean;
  courierId: boolean;
  originName: boolean;
  originStreet: boolean;
  originPostalCode: boolean;
  destinationName: boolean;
  destinationStreet: boolean;
  destinationFloorStreetApt: boolean;
  destinationCity: boolean;
  destinationPostalCode: boolean;
  destinationZone: boolean;
  deliveryStatus: boolean;
  creationTime: boolean;
  readyTime: boolean;
  dueTime: boolean;
  service: boolean;
  rate: boolean;
  paymentMethod: boolean;
  deliveryFee: boolean;
  extras: boolean;
  deliveryNotes: boolean;
  pod: boolean;
  specialInstructions: boolean;
  // excludeCanceled: boolean;
}

export interface Client {
    id: number;
    name: string;
}

export const columnDef = {
    jobId: "job id",
    billingReference: "billing reference",
    orderPlacer: "order placer",
    accountName: "account name",
    clientName: "client name",
    clientId: "client id",
    courier: "courier",
    courierId: "courier number",
    originName: "origin name",
    originStreet: "origin street",
    originPostalCode: "origin postal code",
    destinationName: "destination name",
    destinationStreet: "destination street",
    destinationFloorStreetApt: "destination floor/suite/apt.",
    destinationCity: "destination city",
    destinationPostalCode: "destination postal code",
    destinationZone: "destination zone",
    deliveryStatus: "delivery status",
    creationTime: "creation time",
    readyTime: "ready time",
    dueTime: "due time",
    service: "service",
    rate: "rate",
    paymentMethod: "payment method as string",
    deliveryFee: "delivery fee",
    extras: "extras",
    deliveryNotes: "delivery notes",
    pod: "pod",
    specialInstructions: "special instructions",
    excludeCanceled: "exclude canceled",
}

// export const reversedColumnDef = {
//   "job id": "jobId",
//   "billing reference": "billingReference",
//   "order placer": "orderPlacer",
//   "account name": "accountName",
//   "client name": "clientName",
//   "client id": "clientId",
//   "courier": "courier",
//   "courier number": "courierId",
//   "origin name": "originName",
//   "origin street": "originStreet",
//   "origin postal code": "originPostalCode",
//   "destination name": "destinationName",
//   "destination street": "destinationStreet",
//   "destination floor/suite/apt.": "destinationFloorStreetApt",
//   "destination postal code": "destinationPostalCode",
//   "destination zone": "destinationZone",
//   "delivery status": "deliveryStatus",
//   "creation time": "creationTime",
//   "ready time": "readyTime",
//   "due time": "dueTime",
//   "service": "service",
//   "rate": "rate",
//   "payment method as string": "paymentMethod",
//   "delivery fee": "deliveryFee",
//   "extras": "extras",
//   "delivery notes": "deliveryNotes",
//   "pod": "pod",
//   "special instructions": "specialInstructions",
//   "exclude canceled": "excludeCanceled",
// };

export const invoiceItemsDefaults = {
    jobId: true,
    billingReference: true,
    orderPlacer: true,
    // accountName: true,
    clientName: true,
    clientId: true,
    courier: true,
    courierId: true,
    originName: true,
    originStreet: true,
    originPostalCode: true,
    destinationName: true,
    destinationStreet: true,
    destinationFloorStreetApt: true,
    destinationPostalCode: true,
    destinationCity: true,
    destinationZone: true,
    deliveryStatus: true,
    creationTime: true,
    readyTime: true,
    dueTime: true,
    service: true,
    rate: true,
    paymentMethod: true,
    deliveryFee: true,
    extras: true,
    deliveryNotes: true,
    pod: true,
    specialInstructions: true,
    // excludeCanceled: true,
  }