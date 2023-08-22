import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { trim, forEach } from 'lodash';
import { InputParametersObject } from './types';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private _apiKey: string;
  private _repoOwner: string;
  private _repoName: string;
  private _repoBranch: string;
  private _actionKey: string;
  private _inputParameters: InputParametersObject;

  constructor(@Inject(REQUEST) request: Request) {
    this._apiKey = trim(request.headers['x-api-key'][0]);
    this._repoOwner = trim(request.params.repoOwner);
    this._repoName = trim(request.params.repoName);
    this._repoBranch = trim(request.params.repoBranch);
    this._actionKey = trim(request.params.actionKey);

    this._inputParameters = {};
    forEach(request.body, (value, key) => {
      this._inputParameters[key] = trim(value);
    });
  }

  get apiKey(): string {
    return this._apiKey;
  }

  get repoOwner(): string {
    return this._repoOwner;
  }

  get repoName(): string {
    return this._repoName;
  }

  get repoBranch(): string {
    return this._repoBranch;
  }

  get actionKey(): string {
    return this._actionKey;
  }

  get inputParameters(): InputParametersObject {
    return this._inputParameters;
  }
}
