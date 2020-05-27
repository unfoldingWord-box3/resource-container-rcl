### RC Form - Populated form with a RC repo from DCS (bg.door43.org)

```js
import React, {useContext, useState, useEffect} from 'react';
import {setup} from 'axios-cache-adapter';
import localforage from 'localforage';
import {
  AuthenticationContextProvider,
  AuthenticationContext,
  RepositoryContextProvider,
  RepositoryContext,
} from 'gitea-react-toolkit';
import Path from 'path';
import RCForm from './RCForm';
import yaml from 'yaml';

let cache = setup();

function Component() {
  const {state: repo, component: repoComponent, config} = useContext(RepositoryContext);
  const [ret, setReturnValue] = useState(<div className="loading">Loading Metadata Form and Populating Data...</div>);
  useEffect(() => {
    const getFormData = async () => {
      if (repo) {
        try {
          let branch = repo.branch;
          if (!branch) {
            branch = 'master';
          }
          const uri = config.server + '/' + Path.join(repo.owner.username, repo.name, 'raw/branch', branch, 'manifest.yaml');
          const response = await cache.get(uri);
          console.log(response.data);
          formData = yaml.parse(response.data);
          console.log(formData);
          setReturnValue(
            <RCForm 
              liveValidate={true}
              formData={formData} />
          );
        } catch (error) {
          setReturnValue(<div>{error.message}</div>);
        }
      }
    };
    getFormData();
  }, [config, repo]);

  if (!repo) return (<div><h3>Pick a repo that has an RC manifest.yaml file:</h3>{repoComponent}</div>);
  else return ret;
}

const [authentication, setAuthentication] = React.useState();
const [repository, setRepository] = React.useState();

<AuthenticationContextProvider>
  <RepositoryContextProvider
    config={{
      server: 'https://bg.door43.org',
      tokenid: 'PlaygroundTesting',
    }}
    defaultOwner="unfoldingWord"
    repository={repository}
    onRepository={setRepository}
  >
    <Component />
  </RepositoryContextProvider>
</AuthenticationContextProvider>;
```
