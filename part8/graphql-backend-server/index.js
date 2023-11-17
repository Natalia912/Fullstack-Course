const { startStandaloneServer } = require('@apollo/server/standalone')
const { server } = require('./graphql')
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})