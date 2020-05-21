import React, { useState } from 'react';
import { withTheme} from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { getSchema } from './helpers';

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
        />
    );
}

export default Form;
