import Realm, {ObjectSchema} from 'realm';

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

export class VpnServer extends Realm.Object implements IVpnServer {
  hostName!: string;
  ipAddress!: string;
  score!: number;
  ping!: number;
  speed!: number;
  country!: string;
  countryCode!: string;
  operator!: string;
  base64EncodedOvpnConfig!: string;

  static generate(properties: IVpnServer): RealmInsertionModel<VpnServer> {
    return {
      ...properties,
    };
  }

  static schema: ObjectSchema = {
    name: 'VpnServer',
    primaryKey: 'ipAddress',
    properties: {
      hostName: 'string',
      ipAddress: 'string',
      score: {
        type: 'int',
        indexed: true,
      },
      ping: 'int',
      country: 'string',
      countryCode: 'string',
      operator: 'string',
      base64EncodedOvpnConfig: 'string',
    },
  };
}
