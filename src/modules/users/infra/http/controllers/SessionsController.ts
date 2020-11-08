import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthencateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authencateUser = container.resolve(AuthencateUserService);

    const { user, token } = await authencateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
