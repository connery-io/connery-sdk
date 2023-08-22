//import { Body, Controller, Get, Param, Post } from '@nestjs/common';
//import { MakeService } from '../shared/make.service';
//import { RunInput } from ':src/openai/types';
//
//@Controller('/runner/make/exposed')
//export class MakeController {
//  constructor(private makeService: MakeService) {}
//
//  @Get('/actions')
//  async getActions() {
//    return await this.makeService.getActions();
//  }
//
//  @Post('/actions/:actionKey/run')
//  async runAction(@Param('actionKey') actionKey: string, @Body() body: RunInput) {
//    return await this.makeService.runAction(actionKey, body);
//  }
//
//  @Get('/actions/:actionKey/input')
//  async getInputMetadata(@Param('actionKey') actionKey: string) {
//    return await this.makeService.getInputMetadata(actionKey);
//  }
//
//  @Get('/actions/:actionKey/output')
//  async getOutputMetadata(@Param('actionKey') actionKey: string) {
//    return await this.makeService.getOutputMetadata(actionKey);
//  }
//}
