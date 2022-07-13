/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CalculationSummary } from './calculation-summary.interface';
import { ITEM_RESOURCE_INPUTS} from '../resources/item-resource-inputs.const';
import { ITEM_RESOURCE_OUTPUTS} from '../resources/item-resource-outputs.const';
import { RESOURCES_LIST } from '../resources/resources.const';
import { DEFAULT_SAMPLE_DATA_SET } from '../resources/default-sample-data-set.const';
import { SampleDataSetInputDTO } from '../dto/sample_data_set.dto';
import { TOTAL_MARTIA_AVAILABLE, HOURLY_MARTIA_PAYOUT, PRECISION } from "../resources/execution-defaults.const";

@Injectable()
export class ResourcesService {

  // default values unless overriden
  PRECISION = PRECISION;
  TOTAL_MARTIA_AVAILABLE = TOTAL_MARTIA_AVAILABLE;
  HOURLY_MARTIA_PAYOUT = HOURLY_MARTIA_PAYOUT;

  generate_user_asset_items_resources(sample_data_set: SampleDataSetInputDTO = null): any {
    const resources = RESOURCES_LIST;
    let users;
    let userWallets;
    let sample_user_item_info = sample_data_set?.sample_item_data
      ? sample_data_set.sample_item_data
      : DEFAULT_SAMPLE_DATA_SET;

    // ToDo: Make these configurable to pass in data as well
    if(!sample_data_set?.users) {
      users = this.generate_users();
      userWallets = this.generate_user_wallets();
      // Add the wallets to the users
      for (const [index] of users.entries()) {
        users[index].wallet = userWallets[index];
        users[index].user_items = this.generate_sample_user_items(userWallets, sample_user_item_info);
      }

    } else {
      users = sample_data_set.users
      for (const user of users) {
        // If the user item provided sample items, then use those over anything else
        sample_user_item_info = user.sample_item_data ? user.sample_item_data : sample_user_item_info
        user.user_items = this.generate_sample_user_items([user.wallet], sample_user_item_info)
      }
    }

    return {
      total_martia_available: sample_data_set?.total_martia_available ? sample_data_set.total_martia_available : this.TOTAL_MARTIA_AVAILABLE,
      hourly_martia_payout: sample_data_set?.hourly_martia_payout ? sample_data_set.hourly_martia_payout : this.HOURLY_MARTIA_PAYOUT,
      users: users,
      resources: resources,
    };
  }

  generate_calc_details_base(user: any, resources: any) {
    const calculation_details = [
      {
        name: 'martia',
        token_name: 'MARTIA',
        open: 0.000,
        cost: 0.0000,
        gain: 0.0000,
        close: 0.0000,
      },
    ];
    for (const resource of resources) {
      const resource_to_calc = {
        name: resource.name,
        token_name: resource.token_name,
        open: 0.000,
        cost: 0.0000,
        gain: 0.0000,
        close: 0.0000,
      };
      calculation_details.push(resource_to_calc);
    }

    return calculation_details;
  }

  generate_item_inputs(item_id: number) {
    return ITEM_RESOURCE_INPUTS.filter((x) => x.item_id === item_id) ?? [];
  }

  generate_item_outputs(item_id: number) {
    const outputs = Object.assign([], ITEM_RESOURCE_OUTPUTS);
    // every item needs a martia resource assigned as output... there is no amount_per_ep because it just needs
    // to exist here so it can be tracked through the calculations. Martia is calculated differently
    outputs.push({id: uuidv4(), item_id: item_id, name: 'martia', token_name: 'MARTIA', amount_per_ep: 0})
    return outputs.filter((x) => x.item_id === item_id) ?? [];
  }

  generate_users(){
    return [
      {
        id: uuidv4(),
        user_name: '1234user.wax',
        email: 'test_user@test.com',
        wallet: null,
      },
    ];
  }

  generate_user_wallets(){
    const userWalletId = uuidv4();
    return [
      {
        id: uuidv4(),
        martiaEarnt: {
          id: uuidv4(),
          user_wallet_id: userWalletId,
          earnt: 0,
        },
        resources: [
          { id: uuidv4(), name: 'Power', token_name: 'POWER', amount: 1.0000 },
          { id: uuidv4(), name: 'Water', token_name: 'WATER', amount: 3.0000 },
          { id: uuidv4(), name: 'Wellbeing', token_name: 'WELLBNG', amount: 6.0000 },
          { id: uuidv4(), name: 'Food', token_name: 'FOOD', amount: 5.0000 },
          { id: uuidv4(), name: 'Oxygen', token_name: 'OXYGEN', amount: 1.0000 },
          { id: uuidv4(), name: 'Engineering Lab', token_name: 'ENGLAB', amount: 1.0000 },
          { id: uuidv4(), name: 'Science Labor', token_name: 'SCILAB', amount: 1.0000 },
          { id: uuidv4(), name: 'Social Labor', token_name: 'SOCLAB', amount: 1.0000 },
          { id: uuidv4(), name: 'Logistics Labor', token_name: 'LOGLAB', amount: 1.0000 },
          { id: uuidv4(), name: 'Ore', token_name: 'ORE', amount: 1.0000 },
        ],
        name: 'test-wallet',
      },
      ]
  }

  generate_sample_user_items(user_wallets: any[], sample_items: any[]) {

    const items = [];
    for (const _sample_item of sample_items) {
      items.push(
        {
          id: uuidv4(),
          asset_id: uuidv4(),
          sample_item: _sample_item,
          inputs: this.generate_item_inputs(_sample_item.id),
          outputs: this.generate_item_outputs(_sample_item.id),
          user_wallet: user_wallets[0]
        }
      )
    }
    return items;
  }

  async calculate_item_details(sample_data_set: SampleDataSetInputDTO = null) {

    const setup_detail = this.generate_user_asset_items_resources(sample_data_set);
    const users = setup_detail.users;
    const resources = setup_detail.resources;


    const total_martia_available = setup_detail.total_martia_available;
    const hourly_martia_payout = setup_detail.hourly_martia_payout;

    const calc_summary: CalculationSummary = {
      total_user_martia_earned: 0.0000,
      total_owner_martia_earned: 0.0000,
      total_actual_martia_payout: 0.0000,
      total_adjusted_martia_ep: 0.0000,
      items_skipped: [],
    };

    const output_response = {
      executions: []
    };

    let execution_indexer = 0;
    for (const user of users) {
      output_response.executions.push({user: null, item_details: []})
      console.log('execution index', execution_indexer);

      // output object for viewing
      output_response.executions[execution_indexer].user = user;

      // Assumes assetItems has been sorted by the order of execution
      // defined in resources spreadsheet - each item should have a number attached
      // to it in the data model
      let item_indexer = 0;
      for (const item of user.user_items) {

        let actual_martia_earned: number;
        let adjusted_martia_ep: number;
        let owner_martia_cut: number;
        let user_martia_cut: number;
        let can_earn_resources_for_item = true;

        // Get a new instance of the default calculation details object for this item
        const calculation_details = this.generate_calc_details_base(user, resources);

        // Populate the opening balance from the user wallet, then subsequent calls from the previous calculation values
        for (const x of calculation_details) {

          switch (x.token_name) {
            case 'MARTIA':
              if ( item_indexer == 0) {
                x.open = user.wallet.martiaEarnt.earnt
              } else {
                const resource_calc_item = output_response.executions[execution_indexer]?.item_details[item_indexer - 1]?.calculation_details.find((i) => i.token_name === x.token_name);
                x.open = ((resource_calc_item.open + resource_calc_item.gain) - resource_calc_item.cost) > resource_calc_item.close ? resource_calc_item.open : resource_calc_item.close;
              }
              break;
            default:
              if ( item_indexer == 0) {
                x.open = (user.wallet.resources.find((token) => token.token_name === x.token_name,)?.amount ?? 0.000)
              } else {
                const resource_calc_item = output_response.executions[execution_indexer]?.item_details[item_indexer - 1]?.calculation_details.find((i) => i.token_name === x.token_name);
                x.open = ((resource_calc_item.open + resource_calc_item.gain) - resource_calc_item.cost) > resource_calc_item.close ? resource_calc_item.open : resource_calc_item.close;
              }
          }
        }

        // For Debugging and output
        const item_detail = {
          item: item.sample_item.name,
          owner_health: item.sample_item.owner_health,
          earning_power: item.sample_item.earning_power,
          available_user_martia: calculation_details.find((x) => x.token_name === 'MARTIA').open,
        };

        for (const user_resource of user.wallet.resources) {
          item_detail[`Starting ${user_resource.token_name} Balance`] = calculation_details.find((x) => x.token_name === user_resource.token_name).open;
        }
        // output object for viewing
        output_response.executions[execution_indexer].item_details[item_indexer] = item_detail;
        // END : Debugging and output

        // 1. Determine the earning power of the items as a whole
        const item_earning_power = item.sample_item.earning_power;

        // INPUTS: Loop over inputs to see how much of each resource is needed, if there are any inputs
        if (item.inputs && item.inputs.length > 0) {

          for await (const input of item.inputs) {
            const input_resource = calculation_details.find(
              (i) => i.token_name === input.token_name,
            );

            // Formula: Active EP * Input Per 1 EP * Item Health (pct)
            if (input_resource) {
              input_resource.cost = item_earning_power * input.amount_per_ep * (item.sample_item.owner_health/100);
              // Does the player have enough input resources? Yes - Continue, No - Martia only at 25%
              if (input_resource.cost > input_resource.open) {
                can_earn_resources_for_item = false;
              }
            } else {
              can_earn_resources_for_item = false;
            }
          }
        }

        // OUTPUTS: If there are enough resources to perform the calculation AND there are outputs:
        if (item?.outputs?.length > 0 && can_earn_resources_for_item) {
          // Loop over outputs to see how much of each resource should be produced
          for (const output of item.outputs) {

            const output_resource = calculation_details.find(
              (resource) => resource.token_name == output.token_name,
            );

            // Specific to Martia output
            if (output_resource.token_name === 'MARTIA') {

              // calculate Martia Earning Power
              // item earning power * passive multiplier * martia slider value * owner health * martia multiplier
              adjusted_martia_ep = ResourcesService.calculate_adjusted_martia_ep(item_earning_power, item, true);

              // Calculate actual martia earned for this item based on martia ep, total available martia, and hourly martia payout:
              actual_martia_earned = ResourcesService.calculate_actual_martia_earned(adjusted_martia_ep, total_martia_available, hourly_martia_payout)

              // Owner Martia Cut
              owner_martia_cut = ResourcesService.calculate_owner_martia_cut(item, +(item.sample_item.slider_martia/100).toPrecision(3), actual_martia_earned);
              // User martia cut
              user_martia_cut = actual_martia_earned - owner_martia_cut;

              // User gain is their cut
              output_resource.gain = user_martia_cut;

            } else { // Not MARTIA output

              // Calculate the gain based on formula
              // item earning power * amount per earning power * health * slider * 4/3
              output_resource.gain = item_earning_power * output.amount_per_ep * (item.sample_item.owner_health/100) * (item.sample_item.slider_resource/100) * (4/3);

              // Check to see if the user has the resource, and if not, add it to the calculation details object
              if(!user.wallet.resources.find((x) => x.token_name === output_resource.token_name)) {
                user.wallet.resources.push(
                  { id: uuidv4(), name: output_resource.name, token_name: output_resource.token_name, amount: output_resource.gain }
                )
              }
            }
          }
        }

        // NOT ENOUGH RESOURCES for this item, so only gets defautl Martia calculation
        if (!can_earn_resources_for_item) {
          calc_summary.items_skipped.push({ name: item.sample_item.name, message: `Not enough resource inputs to mine ${item.sample_item.name} for resources. Defaulting to 25% martia only`})

          // calculate Martia Earning Power - This is correct!
          // item earning power * passive multiplier * martia slider value * owner health // Not using martia multiplier
          adjusted_martia_ep = ResourcesService.calculate_adjusted_martia_ep(item_earning_power, item, false)

          // Calculate Martia earned
          actual_martia_earned = ResourcesService.calculate_actual_martia_earned(adjusted_martia_ep, total_martia_available, hourly_martia_payout)

          // Owner = Active EP * Health * MartiaModifier * Owner Fee %
          // =ROUNDDOWN(owner fee * actual martia earned * 4)
          owner_martia_cut = ResourcesService.calculate_default_owner_martia_cut(item.sample_item.owner_fee/100,actual_martia_earned)
          // User martia cut
          user_martia_cut = actual_martia_earned - owner_martia_cut;
        }

        // Run calculations if there were enough resources to set the ending balance for each resource
        for (const item of calculation_details) {
          if(can_earn_resources_for_item) {
            item.close = (item.open + item.gain) - item.cost;
            item.token_name !== 'MARTIA' && user.wallet.resources.find((i) => i.token_name === item.token_name)
              ? user.wallet.resources.find((i) => i.token_name === item.token_name).amount = item.close
              : null;
          } else {
            item.close = item.open;
          }
        }

        // Martia is earned either way, whether there was enough resources or not
        user.wallet.martiaEarnt.earnt += user_martia_cut;

        // output object for viewing
        output_response.executions[execution_indexer].item_details[item_indexer]['adjusted_martia_ep'] = adjusted_martia_ep;
        output_response.executions[execution_indexer].item_details[item_indexer]['actual_martia_earned'] = actual_martia_earned;
        output_response.executions[execution_indexer].item_details[item_indexer]['owner_martia_cut'] = owner_martia_cut;
        output_response.executions[execution_indexer].item_details[item_indexer]['user_martia_cut'] = user_martia_cut;
        output_response.executions[execution_indexer].item_details[item_indexer]['calculation_details'] = calculation_details;
        // summary data for totals regarding martia
        calc_summary.total_adjusted_martia_ep += adjusted_martia_ep;
        calc_summary.total_actual_martia_payout += actual_martia_earned;
        calc_summary.total_owner_martia_earned += owner_martia_cut;
        calc_summary.total_user_martia_earned += user_martia_cut;

        item_indexer ++; // Increment item indexer for object
      }

      // output object for viewing
      output_response.executions[execution_indexer]['calc_summary'] = calc_summary;
      output_response.executions[execution_indexer]['user_resources_computed'] = user.wallet.resources;

      execution_indexer ++; // Increment execution indexer for object
    }
    // Output the total of ALL executions for outputs of martia
    const all_execution_totals = {
      total_actual_martia_payout: null,
      total_owner_martia_earned: null,
      total_user_martia_earned: null,
      total_adjusted_martia_ep: null
    };
    for(const item of output_response.executions) {
      all_execution_totals.total_actual_martia_payout += item['calc_summary'].total_actual_martia_payout;
      all_execution_totals.total_owner_martia_earned += item['calc_summary'].total_owner_martia_earned;
      all_execution_totals.total_user_martia_earned += item['calc_summary'].total_user_martia_earned;
      all_execution_totals.total_adjusted_martia_ep += item['calc_summary'].total_adjusted_martia_ep;
    }
    output_response['all_execution_totals'] = all_execution_totals;
    return output_response;
  }

  private static calculate_adjusted_martia_ep(item_earning_power, item, has_available_resources = false) {

    const passive_multiplier = item.sample_item.passive_multiplier_pct/100;
    const slider_martia = item.sample_item.slider_martia/100;
    const owner_health = item.sample_item.owner_health/100;
    const martia_multiplier = item.sample_item.martia_multiplier;

    let resulting_calc = item_earning_power * passive_multiplier  * owner_health;
    if (has_available_resources) resulting_calc = resulting_calc * slider_martia * martia_multiplier;

    return resulting_calc;
  }

  private static calculate_actual_martia_earned(adjusted_martia_ep, total_martia_available, hourly_martia_payout) {
    return (adjusted_martia_ep/total_martia_available) * hourly_martia_payout;
  }

  private static calculate_default_owner_martia_cut(owner_fee, actual_martia_earned) {
    return owner_fee * actual_martia_earned * 4;
  }

  private static calculate_owner_martia_cut(item, slider_value, actual_martia_earned) {

    let owner_martia_cut: number;

    // Owner = Active EP * Health * MartiaModifier * Owner Fee %
    // =ROUNDDOWN(IF(H3=0,G3*BW3*4,IF(D3=1,G3*BW3,IF(D3=0.75,G3*BW3*4/3,IF(D3=0.5,G3*BW3*2,IF(D3=0.25,G3*BW3*4,"ERROR"))))),4)
    // G3 = owner fee, H3 = is able to craft, BW3 = actual martia earned, D3 = martia slider value
    switch (slider_value) {
      case 1.00:
        owner_martia_cut = actual_martia_earned * (item.sample_item.owner_fee/100)
        break;
      case 0.75:
        owner_martia_cut = actual_martia_earned * (item.sample_item.owner_fee/100) * (4/3)
        break;
      case 0.50:
        owner_martia_cut = actual_martia_earned * (item.sample_item.owner_fee/100) * 2
        break;
      case 0.25:
        owner_martia_cut = actual_martia_earned * (item.sample_item.owner_fee/100) * 4
        break;
      default:
        // the value should NEVER be 0 since you can never allow 100% resources and 0% martia
        owner_martia_cut = 0.00;
        break;
    }

    return owner_martia_cut;

  }

  // This method found in back-end code to use for more precision, not working quite right
  static preciseRound(value: number) {
    const PRECISION = 10000;
    return Math.round((value * PRECISION) / PRECISION);
  }


}
