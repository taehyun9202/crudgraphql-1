import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
