import { ReactElement } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";

/**
 * Relay requires developers to configure a "fetch" function that tells Relay how to load
 * the results of GraphQL queries from your server (or other data source). See more at
 * https://relay.dev/docs/en/quick-start-guide#relay-environment.
 */
const fetchQuery: FetchFunction = async (
  query: RequestParameters,
  variables: Variables
) => {
  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AUTH}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query.text,
      variables,
      operationName: query.name,
    }),
  });

  // Get the response as JSON
  return await response.json();
};

const RelayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export const GQLProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
};
