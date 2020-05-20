import React, { useState } from 'react';
import { withTheme} from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { getSchema } from './helpers';

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
