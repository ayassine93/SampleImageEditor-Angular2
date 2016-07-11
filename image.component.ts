import { Component, ElementRef } from '@angular/core';

export class Picture{
    imgName : string;
}

export class Pic{
    imgsrc : string;
}

@Component({
    selector: 'image',
    template: `
        <div class = "heading"> 
            <h1>Sample Image Editor</h1> 
        </div>

        <div class="buttonsection2">
            <h4>Applied Actions </h4>
            <div>
                <button class="button" *ngIf="enable_applied_scale==true" (click)="resize2(input)"  #scalebutton  >Scale</button>
            </div>

            <div>
                <button class="button" *ngIf="enable_applied_opacity==true" (click)="increaseopacity(input)"> Opacity</button>
            </div>

            <div>
                <button class="button" *ngIf="enable_applied_translate==true" (click)="translationback(input)"> Translate</button>
            </div>

             <div>
                <button class="button" *ngIf="enable_applied_rotate==true" (click)="rotationback(input)"> Rotate</button>
            </div>

        </div>

        <div class="buttonsection1">
            <div>
                <h4> Available Actions  </h4>  
            </div>

            <div>
                <button class="button" *ngIf="enable_available_scale==true" (click)="resize(input)"  #scalebutton >Scale</button>
            </div>

            <div>
                <button class="button" *ngIf="enable_available_opacity==true" (click)="reduceopacity(input)"> Opacity</button>
            </div>

             <div>
                <button class="button" *ngIf="enable_available_translate==true" (click)="translation40(input)"> Translate</button>
            </div>

            <div>
                <button class="button" *ngIf="enable_available_rotate==true" (click)="rotation45(input)"> Rotate</button>
            </div>

        </div>

        <div class="picture">
            <p><input type="file" multiple (change)="uploadfile(input)" #input /></p>
            <button class="resetbutton" *ngIf="enable_reset==true" (click)="reset(input)" > Reset</button>
        
            <img class = "uploadedimage" src='{{ thefile }}' alt="" 
            [style.opacity]="adjust_opacity" 
            [style.width]="adjust_width" 
            [style.height]="adjust_height"
            [style.transform]="rotation"
            [style.transform]="translation" 

            />
        </div>
    `
})

export class ImageComponent { 
         
files: string[] = []; // used for uploading
thefile: string // used for image - will be modified as user applies actions

original_img; // used to store original img for the purpose of the reset button

/* Used for storing the original dimensions of uploaded image*/
original_width;
original_height;




/* Show Availabe Buttons*/ 
enable_available_scale = true;
enable_available_opacity = true;
enable_available_rotate = true;
enable_available_translate = true;


/* Show Disabled Buttons*/ 
enable_applied_scale = false;
enable_applied_opacity = false;
enable_applied_rotate = false;
enable_applied_translate = false;

/* Show Reset Button*/
enable_reset = false;

/* Scale modifiers */
adjust_width = 0;
adjust_height = 0;

/* Opacity modifier */
adjust_opacity = 1;

/* Rotation modifier */ 
rotation = "rotate(0deg)";

/* Transform modifier */
translation = "translateX(0px)";

    uploadfile(input){
        
        for (var i = 0; i < input.files.length; i++) {

            /* Reads uploaded file */
            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");

            img.src = window.URL.createObjectURL(input.files[i]);

            /* Creates event to store in the thefile variable */ 
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                this.thefile = img.src; // to be displayed and edited

                /* This dimension adjustment is made to avoid very large images */
                if (img.width > 500)
                {
                    img.width = 500;
                }

                if (img.height > 500)
                {
                    img.height = 500;
                }

                /* Storing original dimensions */
                this.original_width = img.width;
                this.original_height = img.height;

                /* Setting Dimensions */
                this.adjust_width = img.width;
                this.adjust_height = img.height;

                this.original_img = this.thefile; // for reset button

            }, false);

            read.readAsDataURL(input.files[i]);
        }

        this.enable_reset = true; // reset button now available
       
    }

    reset (img)
    {
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

        
        
        return dataUrl
    }



    /* Scales by 0.5*/
    scale (img){
        var canvas = document.createElement("canvas");


        this.adjust_width = this.original_width/2;
        this.adjust_height = this.original_height/2;

        
        canvas.width = this.adjust_width;
        canvas.height = this.adjust_height;


        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, this.adjust_width, this.adjust_height);

        var dataUrl = canvas.toDataURL('image/jpeg');  

        
        
        return dataUrl
    }

    /* Scales back to original size*/
    scale2 (img){
        var canvas = document.createElement("canvas");


        this.adjust_width = this.original_width;
        this.adjust_height = this.original_height;

        
        canvas.width = this.adjust_width;
        canvas.height = this.adjust_height;


        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, this.adjust_width, this.adjust_height);

        var dataUrl = canvas.toDataURL('image/jpeg');  

        
        
        return dataUrl
    }

    /*Fades the image*/
    opacitydown(img)
    {
        this.adjust_opacity = 0.5;
        var canvas = document.createElement("canvas");

        var width = img.width;
        var height = img.height;

        
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");


        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');  

        
        
        return dataUrl
    }
    
    /*Image back to original fade*/
    opacityup(img)
    {
         
        this.adjust_opacity = 1; // original opacity
    
        var canvas = document.createElement("canvas");

        var width = img.width;
        var height = img.height;

        
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");


        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');  

        
        
        return dataUrl
    }

    /* Rotates image 45 degrees */
    rotate45(img)
    {
        this.rotation = "rotate(45deg)"; // rotate 45
    
        var canvas = document.createElement("canvas");

        var width = img.width;
        var height = img.height;

        
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");


        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');  

        
        
        return dataUrl
    }

    /* Rotates image back to original (0 degrees) */
    rotateback(img)
    {
        this.rotation = "rotate(0deg)"; // rotates 0 degrees
    
        var canvas = document.createElement("canvas");

        var width = img.width;
        var height = img.height;

        
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");


        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');  

        
        
        return dataUrl
    }

     /* Tranforms x by -40 px */
    translate40(img)
    {
        this.translation = "translateX(-40px)";
    
        var canvas = document.createElement("canvas");

        var width = img.width;
        var height = img.height;

        
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");


        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');  

        
        
        return dataUrl
    }

    /* Tranforms X back to normal */
    translateback(img)
    {
        this.translation = "translateX(0px)";
    
        var canvas = document.createElement("canvas");

        var width = img.width;
        var height = img.height;

        
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");


        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');  

        
        
        return dataUrl
    }


    /* ----------------------------------------------------------------------- */
    /* Next set of functions are initiated once respective buttons are clicked */

    resetback(input)
    {
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");


            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                var resetimg = this.reset(img);

                this.thefile = resetimg;
            }, false);

            read.readAsDataURL(input.files[i]);

            // Enables available, disables applied
        }

        
    }

    /* Applies scale to 0.5 when called up by button*/
    resize(input)
    {
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");


            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                var scaled = this.scale(img);

                this.thefile = scaled;
            }, false);

            read.readAsDataURL(input.files[i]);

            // Disables available, enables applied
            this.enable_available_scale = false;
            this.enable_applied_scale = true;
        }

        
    }

    /* Applies scale back to original when called up by button*/
    resize2(input)
    {
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");

            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {

                
                img.src = event.target.result;

                var scaled = this.scale2(img);


                this.thefile = scaled;
            }, false);

            read.readAsDataURL(input.files[i]);
            // Disables applied, enables available
            this.enable_available_scale = true;
            this.enable_applied_scale = false;

        }

    }


    /* Applies opacity to 0.5 when called up by button*/
    reduceopacity(input)
    {
            for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");


            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                var newopacity = this.opacitydown(img);

                this.thefile = newopacity;
            }, false);

            read.readAsDataURL(input.files[i]);

            // Disables available, enables applied
            this.enable_available_opacity = false;
            this.enable_applied_opacity = true;
        }

    }

    /* Applies opacity back  to 1 when called up by button*/
    increaseopacity(input)
    {
            for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");


            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                var newopacity = this.opacityup(img);

                this.thefile = newopacity;
            }, false);

            read.readAsDataURL(input.files[i]);

            // Enables available, disables applied
            this.enable_available_opacity = true;
            this.enable_applied_opacity = false;
        }

    }

    /* Applies rotation to 45 degrees when called up by button*/
    rotation45(input)
    {
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");


            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                var rotated = this.rotate45(img);

                this.thefile = rotated;
            }, false);

            read.readAsDataURL(input.files[i]);

            // Disables available, enables applied
            this.enable_available_rotate = false;
            this.enable_applied_rotate = true;
        }

        
    }

    /* Applies rotation back to original 0 degrees when called up by button*/
    rotationback(input)
    {
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");


            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                var rotated = this.rotateback(img);

                this.thefile = rotated;
            }, false);

            read.readAsDataURL(input.files[i]);

            // Enables available, disables applied
            this.enable_available_rotate = true;
            this.enable_applied_rotate = false;
        }

        
    }

    /* Applies translation of X to -40px when called up by button*/
    translation40(input)
    {
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");


            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                var translated = this.translate40(img);

                this.thefile = translated;
            }, false);

            read.readAsDataURL(input.files[i]);

            // Disables available, enables applied
            this.enable_available_translate = false;
            this.enable_applied_translate = true;
        }

        
    }


    /* Applies translation back to original when called up by button*/
    translationback(input)
    {
        for (var i = 0; i < input.files.length; i++) {

            this.files.push(input.files[i]);
            var read = new FileReader();
            var img = document.createElement("img");


            img.src = window.URL.createObjectURL(input.files[i]);

            
            read.addEventListener("load", (event:any) => {
                
                img.src = event.target.result;

                var translated = this.translateback(img);

                this.thefile = translated;
            }, false);

            read.readAsDataURL(input.files[i]);

            // Enables available, Disables applied
            this.enable_available_translate = true;
            this.enable_applied_translate = false;
        }

        
    }

 
}


