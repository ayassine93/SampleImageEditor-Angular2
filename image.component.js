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
var core_1 = require('@angular/core');
var Picture = (function () {
    function Picture() {
    }
    return Picture;
}());
exports.Picture = Picture;
var Pic = (function () {
    function Pic() {
    }
    return Pic;
}());
exports.Pic = Pic;
var ImageComponent = (function () {
    function ImageComponent() {
        this.files = []; // used for uploading
        /* Show Availabe Buttons*/
        this.enable_available_scale = true;
        this.enable_available_opacity = true;
        this.enable_available_rotate = true;
        this.enable_available_translate = true;
        /* Show Disabled Buttons*/
        this.enable_applied_scale = false;
        this.enable_applied_opacity = false;
        this.enable_applied_rotate = false;
        this.enable_applied_translate = false;
        /* Show Reset Button*/
        this.enable_reset = false;
        /* Scale modifiers */
        this.adjust_width = 0;
        this.adjust_height = 0;
        /* Opacity modifier */
        this.adjust_opacity = 1;
        /* Rotation modifier */
        this.rotation = "rotate(0deg)";
        /* Transform modifier */
        this.translation = "translateX(0px)";
    }
    ImageComponent.prototype.uploadfile = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            /* Reads uploaded file */
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            /* Creates event to store in the thefile variable */
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                _this.thefile = img.src; // to be displayed and edited
                /* This dimension adjustment is made to avoid very large images */
                if (img.width > 500) {
                    img.width = 500;
                }
                if (img.height > 500) {
                    img.height = 500;
                }
                /* Storing original dimensions */
                _this.original_width = img.width;
                _this.original_height = img.height;
                /* Setting Dimensions */
                _this.adjust_width = img.width;
                _this.adjust_height = img.height;
                _this.original_img = _this.thefile; // for reset button
            }, false);
            read.readAsDataURL(input.files[i]);
        }
        this.enable_reset = true; // reset button now available
    };
    ImageComponent.prototype.reset = function (img) {
        var canvas = document.createElement("canvas");
        /* Setting all modifier values back to original */
        this.adjust_width = this.original_width;
        this.adjust_height = this.original_height;
        this.adjust_opacity = 1;
        this.rotation = "rotate(0deg)";
        this.translation = "translateX(0px)";
        canvas.width = this.adjust_width;
        canvas.height = this.adjust_height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, this.adjust_width, this.adjust_height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /* Scales by 0.5*/
    ImageComponent.prototype.scale = function (img) {
        var canvas = document.createElement("canvas");
        this.adjust_width = this.original_width / 2;
        this.adjust_height = this.original_height / 2;
        canvas.width = this.adjust_width;
        canvas.height = this.adjust_height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, this.adjust_width, this.adjust_height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /* Scales back to original size*/
    ImageComponent.prototype.scale2 = function (img) {
        var canvas = document.createElement("canvas");
        this.adjust_width = this.original_width;
        this.adjust_height = this.original_height;
        canvas.width = this.adjust_width;
        canvas.height = this.adjust_height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, this.adjust_width, this.adjust_height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /*Fades the image*/
    ImageComponent.prototype.opacitydown = function (img) {
        this.adjust_opacity = 0.5;
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /*Image back to original fade*/
    ImageComponent.prototype.opacityup = function (img) {
        this.adjust_opacity = 1; // original opacity
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /* Rotates image 45 degrees */
    ImageComponent.prototype.rotate45 = function (img) {
        this.rotation = "rotate(45deg)"; // rotate 45
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /* Rotates image back to original (0 degrees) */
    ImageComponent.prototype.rotateback = function (img) {
        this.rotation = "rotate(0deg)"; // rotates 0 degrees
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /* Tranforms x by -40 px */
    ImageComponent.prototype.translate40 = function (img) {
        this.translation = "translateX(-40px)";
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /* Tranforms X back to normal */
    ImageComponent.prototype.translateback = function (img) {
        this.translation = "translateX(0px)";
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataUrl;
    };
    /* ----------------------------------------------------------------------- */
    /* Next set of functions are initiated once respective buttons are clicked */
    ImageComponent.prototype.resetback = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var resetimg = _this.reset(img);
                _this.thefile = resetimg;
            }, false);
            read.readAsDataURL(input.files[i]);
        }
    };
    /* Applies scale to 0.5 when called up by button*/
    ImageComponent.prototype.resize = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var scaled = _this.scale(img);
                _this.thefile = scaled;
            }, false);
            read.readAsDataURL(input.files[i]);
            // Disables available, enables applied
            this.enable_available_scale = false;
            this.enable_applied_scale = true;
        }
    };
    /* Applies scale back to original when called up by button*/
    ImageComponent.prototype.resize2 = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var scaled = _this.scale2(img);
                _this.thefile = scaled;
            }, false);
            read.readAsDataURL(input.files[i]);
            // Disables applied, enables available
            this.enable_available_scale = true;
            this.enable_applied_scale = false;
        }
    };
    /* Applies opacity to 0.5 when called up by button*/
    ImageComponent.prototype.reduceopacity = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var newopacity = _this.opacitydown(img);
                _this.thefile = newopacity;
            }, false);
            read.readAsDataURL(input.files[i]);
            // Disables available, enables applied
            this.enable_available_opacity = false;
            this.enable_applied_opacity = true;
        }
    };
    /* Applies opacity back  to 1 when called up by button*/
    ImageComponent.prototype.increaseopacity = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var newopacity = _this.opacityup(img);
                _this.thefile = newopacity;
            }, false);
            read.readAsDataURL(input.files[i]);
            // Enables available, disables applied
            this.enable_available_opacity = true;
            this.enable_applied_opacity = false;
        }
    };
    /* Applies rotation to 45 degrees when called up by button*/
    ImageComponent.prototype.rotation45 = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var rotated = _this.rotate45(img);
                _this.thefile = rotated;
            }, false);
            read.readAsDataURL(input.files[i]);
            // Disables available, enables applied
            this.enable_available_rotate = false;
            this.enable_applied_rotate = true;
        }
    };
    /* Applies rotation back to original 0 degrees when called up by button*/
    ImageComponent.prototype.rotationback = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var rotated = _this.rotateback(img);
                _this.thefile = rotated;
            }, false);
            read.readAsDataURL(input.files[i]);
            // Enables available, disables applied
            this.enable_available_rotate = true;
            this.enable_applied_rotate = false;
        }
    };
    /* Applies translation of X to -40px when called up by button*/
    ImageComponent.prototype.translation40 = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var translated = _this.translate40(img);
                _this.thefile = translated;
            }, false);
            read.readAsDataURL(input.files[i]);
            // Disables available, enables applied
            this.enable_available_translate = false;
            this.enable_applied_translate = true;
        }
    };
    /* Applies translation back to original when called up by button*/
    ImageComponent.prototype.translationback = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            read.addEventListener("load", function (event) {
                img.src = event.target.result;
                var translated = _this.translateback(img);
                _this.thefile = translated;
            }, false);
            read.readAsDataURL(input.files[i]);
            // Enables available, Disables applied
            this.enable_available_translate = true;
            this.enable_applied_translate = false;
        }
    };
    ImageComponent = __decorate([
        core_1.Component({
            selector: 'image',
            template: "\n        <div class = \"heading\"> \n            <h1>Sample Image Editor</h1> \n        </div>\n\n        <div class=\"buttonsection2\">\n            <h4>Applied Actions </h4>\n            <div>\n                <button class=\"button\" *ngIf=\"enable_applied_scale==true\" (click)=\"resize2(input)\"  #scalebutton  >Scale</button>\n            </div>\n\n            <div>\n                <button class=\"button\" *ngIf=\"enable_applied_opacity==true\" (click)=\"increaseopacity(input)\"> Opacity</button>\n            </div>\n\n            <div>\n                <button class=\"button\" *ngIf=\"enable_applied_translate==true\" (click)=\"translationback(input)\"> Translate</button>\n            </div>\n\n             <div>\n                <button class=\"button\" *ngIf=\"enable_applied_rotate==true\" (click)=\"rotationback(input)\"> Rotate</button>\n            </div>\n\n        </div>\n\n        <div class=\"buttonsection1\">\n            <div>\n                <h4> Available Actions  </h4>  \n            </div>\n\n            <div>\n                <button class=\"button\" *ngIf=\"enable_available_scale==true\" (click)=\"resize(input)\"  #scalebutton >Scale</button>\n            </div>\n\n            <div>\n                <button class=\"button\" *ngIf=\"enable_available_opacity==true\" (click)=\"reduceopacity(input)\"> Opacity</button>\n            </div>\n\n             <div>\n                <button class=\"button\" *ngIf=\"enable_available_translate==true\" (click)=\"translation40(input)\"> Translate</button>\n            </div>\n\n            <div>\n                <button class=\"button\" *ngIf=\"enable_available_rotate==true\" (click)=\"rotation45(input)\"> Rotate</button>\n            </div>\n\n        </div>\n\n        <div class=\"picture\">\n            <p><input type=\"file\" multiple (change)=\"uploadfile(input)\" #input /></p>\n            <button class=\"resetbutton\" *ngIf=\"enable_reset==true\" (click)=\"reset(input)\" > Reset</button>\n        \n            <img class = \"uploadedimage\" src='{{ thefile }}' alt=\"\" \n            [style.opacity]=\"adjust_opacity\" \n            [style.width]=\"adjust_width\" \n            [style.height]=\"adjust_height\"\n            [style.transform]=\"rotation\"\n            [style.transform]=\"translation\" \n\n            />\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ImageComponent);
    return ImageComponent;
}());
exports.ImageComponent = ImageComponent;
//# sourceMappingURL=image.component.js.map