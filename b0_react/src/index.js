import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/',
    cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      {
          hikers {
              id
              username
          }
      }
    `
  })
  .then(result => console.log({gqlResult: result}));

const QUERY = gql`
    query QueryName {
        hikers {
            id
            username
        }
    }
`

const QueryComp = () => {
    const { loading, error, data } = useQuery(QUERY)

    if (loading) return <div>Loading ...</div>
    if (error) return <div>Error ...</div>

    const hikers = data.hikers.map(({ id, username }) => {
        return (
            <div>ID: {id}. username: {username}</div>
        )
    })

    return hikers;
}

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
            {/* <QueryComp /> */}
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


