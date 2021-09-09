import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { auth_user } from "./user.entity";

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): auth_user => {
	const req = ctx.switchToHttp().getRequest(); //req.body
	return req.user;
});