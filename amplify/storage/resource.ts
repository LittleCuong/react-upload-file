import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'uploadFileCuongAWS',
  access: (allow) => ({
    'picture-submissions/*': [
      allow.authenticated.to(['read','write']),
      allow.guest.to(['read'])
    ],
  })
});