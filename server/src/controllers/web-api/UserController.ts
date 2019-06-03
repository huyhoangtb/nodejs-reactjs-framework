'use strict';
import {Body, Controller, Get, Post, Authorized, BodyParam, QueryParam, QueryParams} from "routing-controllers";
import {Inject} from "typedi";
import UserRepository from "../../repositories/UserRepository";
import {Failure, FailureWithException, Success, Warning} from "../../core/responseable/Result";
import UserService from "../../services/UserService";
import IUser from "../../core/entities/ientities/IUser";
import User from "../../core/entities/schemas/User";
import Status from "../../configs/Status";
import * as passport from "passport";
import * as passportLocal from "passport-local";
import ValidationException from "../../core/exceptions/ValidationException";
import {hashPassword} from "../../core/utils/password";
import {type} from "os";

const LocalStrategy = passportLocal.Strategy;

@Controller('/user')
class UserController {

    @Inject('userRepository')
    userRepository: UserRepository;
    @Inject('userService')
    userService: UserService;


    @Post("/create")
    @Authorized("CREATE_USER")
    async createAction(@Body() user: IUser) {
        console.log('useruseruseruseruseruser', user)
        try {
            const r = await this.userService.createUser(user)
            return Success.setResult(r).setMessage(`user has bean created!...`);
        } catch (e) {
            return FailureWithException(e);
        }
    }

    @Post("/login")
    async loginAction(@BodyParam('loginName') username: string, @BodyParam('password') password: string) {
        try {
            const user = await this.userService.login(username, password);
            if (user === null) {
                return Warning.setMessage('Your login name or password is not correct. Please try again!..');
            }
            return Success.setResult(user).setMessage(`You have bean login success to the system`);
        } catch (err) {
            return FailureWithException(err);
        }
    }

    @Get("/find")
    async findAction(@QueryParams() params: any = {}, @QueryParam('pageSize') pageSize: number,
                     @QueryParam('currentPage') currentPage: number, @QueryParam('sortField') sortField: string,
                     @QueryParam('sortOrder') sortOrder: any) {
        try {
            const user = await this.userRepository.search(params, pageSize, currentPage, sortField, sortOrder);
            if (user === null) {
                return Warning.setMessage('Your login name or password is not correct. Please try again!..');
            }
            return Success.setResult(user).setMessage(`You have bean login success to the system`);
        } catch (err) {
            return FailureWithException(err);
        }
    }
}

export default UserController;
