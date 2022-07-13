import { SampleItemData } from '../items/sample-item-data.interface';
import { UserInfo } from '../service/userinfo.interface';

export interface SampleDataSetInputDTO {
    sample_item_data: SampleItemData[];
    users?: UserInfo[];
    total_martia_available?: number;
    hourly_martia_payout?: number;
}
