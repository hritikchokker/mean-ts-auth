import {Model} from 'mongoose';
import * as testModel from '../models/testModel';
import TestCtrl from './testController';

module.exports = function (passport: any) {
    const testCtrl = new TestCtrl<Model<testModel.ITestModel>>(testModel.default);

    let publicModule: any = {};

    publicModule.home_get = (req: any, res: any) => {
        console.log('=====---- requested');
        res.sendfile('../../public/index.ejs');
    };

    publicModule.test_get = (req: any, res: any) => {
        testCtrl.getAll(req, res);
    };

    publicModule.test_post = (req: any, res: any) => {
        testCtrl.insert(req, res);
    };

    publicModule.test_delete = (req: any, res: any) => {
        testCtrl.delete(req, res);
    };


    /**
     * Authentication
     * */

    publicModule.login_get = (req: any, res: any) => {
        //TODO
    };
    publicModule.login_post = (req: any, res: any) => {
        passport.authenticate('local-login', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        });
    };

    publicModule.signup_get = (req: any, res: any) => {
        //TODO
    };
    publicModule.signup_post = (req: any, res: any) => {
        passport.authenticate('local-signup', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })
    };

    publicModule.profile_get = (req: any, res: any) => {
        //TODO
    };

    publicModule.logout_get = (req: any, res: any) => {
        //TODO
    };

    return publicModule;
};


let is_logged_in = (req: any, res: any, next: any) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

