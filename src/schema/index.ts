import 'graphql-import-node';
import typeDef from './schema.graphql';
import resolvers from './../resolvers/resolversMap';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

const schema: GraphQLSchema = makeExecutableSchema ({
    typeDefs: typeDef,
    resolvers: resolvers
});

export default schema;