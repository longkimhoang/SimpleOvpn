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
  _id!: Realm.BSON.ObjectId;
  hostName!: string;
  ipAddress!: string;
  score!: number;
  ping!: number;
  speed!: number;
  country!: string;
  countryCode!: string;
  operator!: string;
  base64EncodedOvpnConfig!: string;

  static generate(
    properties: IVpnServer,
  ): RealmInsertionModel<VpnServer> {
    return {
      ...properties,
      _id: new Realm.BSON.ObjectId(),
    };
  }

  static schema: ObjectSchema = {
    name: 'VpnServer',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
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
