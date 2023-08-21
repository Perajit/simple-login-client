import { rest } from 'msw';
import { UserProfile } from '../user-context';

const mockedUserProfile: UserProfile = {
  userId: 1,
  userName: 'user@mail.com',
  displayName: 'User',
  organization: 'a',
  group: 'a-1',
  roles: ['admin'],
};

const handlers = [
  rest.post(
    new RegExp('/auth/login'),
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(mockedUserProfile),
      );
  }),
  rest.post(
    new RegExp('/auth/logout'),
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
      );
  }),
  rest.get(
    new RegExp('/test'),
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ messsage: 'ok' }),
      );
  }),
];

export default handlers;
