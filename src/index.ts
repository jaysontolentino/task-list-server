import 'dotenv/config'
import 'reflect-metadata'
import http from 'http'
import express, {Express} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageProductionDefault, 
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import { UserResolver } from './resolvers/user.resolver'
import { createContext } from './context'
import { formatError } from './utils/errorHandler'

(async function() {

  const app: Express = express()
  const PORT = process.env.PORT || 8080

  //express middlewares
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
  app.use(cookieParser())

  app.get('/refresh_token', (req, res) => {
    res.send(req.cookies.token)
  })

  const schema = await buildSchema({
    resolvers: [
      UserResolver
    ]
  })

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === 'production' ?
      ApolloServerPluginLandingPageProductionDefault :
      ApolloServerPluginLandingPageGraphQLPlayground
    ],
    context: createContext,
    formatError
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({app})

  const httpServer = http.createServer(app)
  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })

})()