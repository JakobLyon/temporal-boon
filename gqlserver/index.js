const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Event {
    name: String
    id: number
  }

  type Stage {
    name: String
    id: number
    events: [Event]
  }

  type Boss {
    name: String
    description: String
    hasStages: bool
    events: [Event]
    stages: [Stage]
  }

  type Query {
    bosses: [Boss]
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});