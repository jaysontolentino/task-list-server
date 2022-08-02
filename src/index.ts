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
import resolvers from './resolvers'
import { createContext } from './context'
import { formatError } from './utils/errorHandler'

(async function() {

  const app: Express = express()
  const PORT = process.env.PORT || 5000

  //express middlewares
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  }))
  app.use(cookieParser())

  const schema = await buildSchema({
    resolvers
  })

  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
    formatError,
    plugins: [
      process.env.NODE_ENV === 'production' ?
      ApolloServerPluginLandingPageProductionDefault :
      ApolloServerPluginLandingPageGraphQLPlayground
    ],
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({app, cors: false})

  const httpServer = http.createServer(app)
  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })

})()