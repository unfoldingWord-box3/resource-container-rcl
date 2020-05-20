import $RefParser from '@apidevtools/json-schema-ref-parser';
import schemaIndex from '../../core/schema/sbs_index.js';

let myResolver = {
    order: 1,
    canRead: true,
    read(file, callback, $refs) {
        const schemaId = file.url.replace(/^.*\/\/[^\/]+/, 'https://burrito.bible/schema');
        let schema = null;
        for (let i = 0; i < schemaIndex.schemas.length; i++) {
            // console.log(i, schemaIndex.schemas[i], schemaIndex.schemas[i].$id);
            if (schemaIndex.schemas[i].$id == schemaId) {
                schema = schemaIndex.schemas[i];
                break;
            }
        }
        if (schema)
            callback(null, schema);
        else
            callback(jsonKey + ' does not exist in available schemas.');
    }
};

export function getSchema(callback) {
    $RefParser.dereference("source_metadata.schema.json", { resolve: { json: myResolver } }, callback);
}
