import { Public } from '../auth.guard.js';
import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  getSchemaPath,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GenericErrorResponse, GenericObjectResponse } from '../dto.js';

@ApiTags('Tools')
@ApiExtraModels(GenericErrorResponse)
@ApiInternalServerErrorResponse({
  description: 'Internal server error.',
  schema: {
    $ref: getSchemaPath(GenericErrorResponse),
  },
})
@Controller('/api/tools')
export class ToolsController {
  @ApiOperation({
    summary: 'Check if the plugin is healthy.',
    description: 'Check if the plugin is healthy.',
  })
  @ApiOkResponse({
    description: 'The request is authenticated.',
    schema: {
      $ref: getSchemaPath(GenericObjectResponse),
    },
  })
  @Public()
  @Get('/health')
  async health(): Promise<GenericObjectResponse<undefined>> {
    return {
      status: 'success',
      data: undefined,
    };
  }
}
