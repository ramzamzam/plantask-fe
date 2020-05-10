import * as _ from 'lodash';
import { IFormContorls } from '../shared/classes';

export function getValue(mappingObject: object = {}, key: string, obj: object): any {
  return obj[ mappingObject[key] || key ];
}

export function assignValidationErrorsToFormControls(controls: IFormContorls, validationErrors: object, formToResMapperObject?: object) {
  _.each(controls, (control, name) => {
    if(validationErrors[name]) {
      if (!control.errors) {
        control.errors = {};
      }
      control.errors.validations = getValue(formToResMapperObject, name, validationErrors);
    }
  });
}

export function formToObject(f: IFormContorls) {
  return Object.keys(f).reduce((acc, key) => {
    acc[key] = f[key].value;
    return acc;
  }, {});
}
