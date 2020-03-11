import * as core from '@actions/core';
import * as fs from 'fs';
import {map} from 'lodash-es';
import {AppJson} from './lib/heroku';
import Heroku = require('heroku-client');

export interface FormationDyno {
  size?: string;
  quantity?: number;
  type: string;
  docker_image: string;
}

async function run() {
  const herokuApiToken = core.getInput('heroku_api_token');
  const appName = core.getInput('app');
  const appJsonPath = core.getInput('app_json');
  const imageRepository = core.getInput('image_repo');
  const imageTag = core.getInput('image_tag');

  const heroku = new Heroku({token: herokuApiToken});
  const appJson: AppJson = JSON.parse(fs.readFileSync(appJsonPath).toString());

  const dynos: FormationDyno[] = map(appJson.formation, (dynoDef, type) => {
    return {
      type,
      ...dynoDef,
      docker_image: `${imageRepository}/${type}:${imageTag}`,
    };
  });
  dynos.push({
    type: 'release',
    quantity: undefined,
    docker_image: `${imageRepository}/release:${imageTag}`,
    size: undefined,
  });

  console.log('Updating formation...', dynos);

  const formation = {
    updates: dynos,
  };

  const response = await heroku.patch(`/apps/${appName}/formation`, {body: formation, headers: {Accept: 'application/vnd.heroku+json; version=3.docker-releases'}});
  console.log(response);
}

try {
  run().catch((e) => {
    console.error(e);
    core.setFailed(e.message);
  });
} catch (e) {
  console.error(e);
  core.setFailed(e.message);
}
