import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RandomColorPicker extends LightningElement {
    backgroundColor;
    backgroundColorCode;
    isRendered = false;
   
    _title = 'Success';
    message = 'Color code has been copied to clipboard';
    variant = 'success';
    renderedCallback(){
        if(!this.isRendered){
            this.isRendered = true;
            this.getRandomColor();
        }
    }
    getRandomColor(){
        
        let x,y,z;
        x = parseInt(Math.random()*255);
        y = parseInt(Math.random()*255);
        z = parseInt(Math.random()*255);
        
        let hexColorCode = "#" + this.componentToHex(x) + this.componentToHex(y) + this.componentToHex(z);
        this.backgroundColorCode = hexColorCode.toUpperCase();
        this.backgroundColor = 'background-color:' + hexColorCode;

    }
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
    
    copyToClipboard(event){
        try{
            //dynamically creating html component
            var hiddenInputEle = document.createElement("input");
            //get the title of clicked element (record link)
            let val = event.target.title;
            //set value attribute as actual record link
            hiddenInputEle.setAttribute("value", val);
            //append the element in the document body
            document.body.appendChild(hiddenInputEle);
            // select the content
            hiddenInputEle.select();
            // Execute the copy command
            document.execCommand("copy");
            document.body.removeChild(hiddenInputEle); 
        
            const evt = new ShowToastEvent({
                title: this._title,
                message: this.message,
                variant: this.variant,
            });
            this.dispatchEvent(evt);
        }
        catch(error){
            const evt = new ShowToastEvent({
                title: 'Error!',
                message: 'Error has occured '+error,
                variant: 'error',
            });
            this.dispatchEvent(evt);
        }
    }
}
