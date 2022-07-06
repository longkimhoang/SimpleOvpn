export interface IVpnServer {
  hostName: string;
  ipAddress: string;
  score: number;
  ping: number;
  speed: number;
  country: string;
  countryCode: string;
  operator: string;
  base64EncodedOvpnConfig: string;
}
