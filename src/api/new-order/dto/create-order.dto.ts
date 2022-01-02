export interface OrderTime {
  pickup: Date;
  delivery: Date;
}

export interface OrderInformation {
  time: OrderTime;
  address_01: string;
  address_02: string;
  location: string;
}

export interface OrderMissionItemImage {
  imageId: string;
  imageUrl: string;
}

export interface OrderMissionItem {
  name: string;
  userMessage: string;
  tagList: string[];
  representativeItemImage: string;
  imageList: OrderMissionItemImage[];
}

export interface OrderMission {
  itemList: OrderMissionItem[];
}

export interface CreateOrderDto {
  taskId: number;
  information: OrderInformation;
  mission: OrderMission;
}
