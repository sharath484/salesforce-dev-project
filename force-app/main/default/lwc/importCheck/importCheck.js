import FORM_FACTOR from '@salesforce/client/formFactor';
import MY_CUSTOM_LABEL from '@salesforce/label/c.demo_label';
import MY_IMAGE from '@salesforce/resourceUrl/myimage';
import MY_SVG from '@salesforce/resourceUrl/mysvgfile';
import USER_INFO from '@salesforce/user/Id';
import { LightningElement } from 'lwc';

export default class ImportCheck extends LightningElement {

    image = MY_IMAGE;
     myCustomLabel = MY_CUSTOM_LABEL;
     mySvg = MY_SVG;
     userInfo = USER_INFO;
     formFactor = FORM_FACTOR;
}