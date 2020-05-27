import React from 'react';
import { getSchema, transformErrors, ErrorList } from './helpers';
import Form from "@rjsf/material-ui";

/**
 * Component to use the RC schema in a Schema Form
 * 
 * @example ./RCForm.md
 * @example ./RCForm.dcs.md
 * @example ./RCForm.ult.md
 * 
 * @param {*} props 
 */
function RCForm(props) {
    const schema = getSchema();

    return (
        <Form
            {...props}
            schema={schema}
            transformErrors={transformErrors}
            ErrorList={ErrorList}
        />
    );
}

export default RCForm;
