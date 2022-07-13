/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from '../app.service';
import { ResourcesService } from '../service/resources.service';
import { SampleDataSetInputDTO } from "../dto/sample_data_set.dto";

@Controller('resources')
export class ResourcesController {

  constructor(
    private readonly appService: AppService,
    private readonly resourceService: ResourcesService,
  ) { }

  @Get('calc')
  calculateResources() {
    return this.resourceService.calculate_item_details()
  }

  @Post('calc')
  cacluateWithSampleDataSet(@Body() sample_data: SampleDataSetInputDTO) {
    return this.resourceService.calculate_item_details(sample_data)
  }

}
