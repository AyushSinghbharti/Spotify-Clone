import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
    uri: "https://saintsaulve.stepzen.net/api/agile-zebu/__graphql",
    headers: {
        authorization: 'apikey saintsaulve::stepzen.net+1000::99153d9faac8fdca3e056c454a0faabb9b2ff8929bf1e450ad7a6dd5e53bfcda',
    },
    cache: new InMemoryCache(),
});

const ApolloClientProvider = ({children}: PropsWithChildren) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
};

export default ApolloClientProvider;