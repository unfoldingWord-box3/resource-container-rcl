import React from 'react';
import { withTheme} from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { getSchema, transformErrors, ErrorList } from './helpers';

/**
 * Component to use the RC schema in a Schema Form
 * 
 * @example ./Form.md
 * @example ./Form.dcs.md
 * 
 * @param {*} props 
 */
function Form(props) {
    const schema = getSchema();

    const MuiForm = withTheme(MuiTheme);

    return (
        <MuiForm
            {...props}
            schema={schema}
            transformErrors={transformErrors}
            ErrorList={ErrorList}
        />
    );
}

export default Form;
