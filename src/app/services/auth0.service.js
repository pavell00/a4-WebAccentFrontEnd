// ./auth.service.ts
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
var Auth = (function () {
    function Auth() {
        var _this = this;
        // Configure Auth0
        this.lock = new Auth0Lock('Q0VquIM3AB5F3s61BOrinXkJ3SuZKV1g', 'dgmz2.eu.auth0.com', {});
        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            // Fetch profile information
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }
                localStorage.setItem('profile', JSON.stringify(profile));
                _this.userProfile = profile;
            });
        });
    }
    ;
    Auth.prototype.login = function () {
        this.lock.show();
    };
    Auth.prototype.authenticated = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    Auth.prototype.logout = function () {
        // Remove token and profile from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
    };
    ;
    return Auth;
}());
Auth = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=auth0.service.js.map