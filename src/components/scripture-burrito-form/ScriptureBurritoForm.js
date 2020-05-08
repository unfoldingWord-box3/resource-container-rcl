import React, { useState } from 'react';
import { withTheme} from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { getScriptureBurritoSchema} from './helpers';

function ScriptureBurritoForm() {
    const [sbSchema, setSchema] = useState({});    
    
    getScriptureBurritoSchema((err, schema) => {
        if (err) {
            console.error(err);
        }
        else {
            setSchema(schema)
        }
    });
    const MuiForm = withTheme(MuiTheme);                
    return (
        <MuiForm
            schema={sbSchema}
        />
    );
}

export default ScriptureBurritoForm;
