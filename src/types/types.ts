export interface EventDataType {
  readonly CODENAME: string;
  readonly TITLE: string;
  readonly DATE: string;
  readonly MAIN_IMG: string;
}

export interface EventDetailType extends EventDataType{
  readonly RGSTDATE: string;
  GUNAME: string;
  PLACE: string;
  USE_TRGT: string;
  USE_FEE: boolean;
  ORG_LINK : string;
  PROGRAM : string;
  PLAYER : string;
}