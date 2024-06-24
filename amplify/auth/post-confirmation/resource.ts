import { defineFunction } from '@aws-amplify/backend';

export const postConfirmation = defineFunction({
  name: 'post-confirmation',
  environment: {
    GROUP_NAME: 'PROD_1_USERS'
  }
});