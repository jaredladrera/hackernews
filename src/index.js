const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const path = require('path')
const fs = require('fs')
const { getUserId } = require('./utils');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')



// 2
const resolvers = {
    Query,
    Mutation,
    User,
    Link

//   Query: {
//     info: () => `This is the API of a Hackernews Clone`,
//     feed: async (parent, args, context) => {
//         return context.prisma.link.findMany()
//     },
//   },

//   Mutation: {



//     post: (parent, args, context, info) => {
//         const newLink = context.prisma.link.create({
//           data: {
//             url: args.url,
//             description: args.description,
//           },
//         })
//         return newLink
//       },
//     postpeople: (parent, args, context, info) => {
//         const newpeople = context.prisma.people.create({
//           data: {
//             name: args.name,
//             lastname: args.lastname,
//           },
//         })
//         return newpeople
//       },
//   },

//   Link: {
//     id: (parent) => parent.id,
//     description: (parent) => parent.description,
//     url: (parent) => parent.url,
//   }
}

// 3
const prisma = new PrismaClient()
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
      ),
    resolvers,
    introspection: true,
    context: ({ req }) => {
        return {
          ...req,
          prisma,
          userId:
            req && req.headers.authorization
              ? getUserId(req)
              : null
        };
      },

})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );