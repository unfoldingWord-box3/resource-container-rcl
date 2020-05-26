import React from 'react';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import schema from '../../core/schema/rc.schema.json';

// generated schema from https://extendsclass.com/json-schema-validator.html

export function getSchema() {
    return schema;
}

// TODO: Translate error strings here
export function transformErrors(errors) {
    return errors.map(error => {
        if (error.property == ".dublin_core.language.identifier" && error.name == "pattern")
            error.message = error.property + " must be a valid IETF language tag";
        else if ((error.property == ".dublin_core.modified" || error.property == ".dublin_core.issued") && error.name == "pattern")
            error.message = error.property + " must be a proper date in the format YYYY-MM-DD";
        else
            error.message = error.property + " " + error.message;
        return error;
    });
}

export function ErrorList(props) {
    const { errors } = props;
    return (
        <div className="MuiBox-root MuiBox-root-312">
            <h6 className="MuiTypography-root MuiTypography-h6">Errors:</h6>
            <ul className="MuiList-root MuiList-dense MuiList-padding">
                {errors.map(error => (
                    <li key={error.stack} className="MuiListItem-root MuiListItem-dense MuiListItem-gutters">
                        <div class="MuiListItemIcon-root"><svg class="MuiSvgIcon-root MuiSvgIcon-colorError" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></div>
                        {error.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}
