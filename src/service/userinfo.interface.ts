import { ResourceDefinition } from '../resources/resource-definition.interface';
import { SampleItemData } from '../items/sample-item-data.interface';

export interface UserInfo {
    id?: string;
    user_name: string;
    email: string;
    user_items?: SampleItemData[];
    sample_item_data?: SampleItemData[];
    wallet: {
        id?: string;
        martiaEarnt: {
            id?: string;
            user_wallet_id?: string;
            earnt: number;
        };
        resources: ResourceDefinition[];
        name: string;
    };
}
