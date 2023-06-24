import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'

import userrouter from './app/module/user/user.route'
import globalErrorHandler from './app/middlewears/globalerroHandler'
import httpStatus from 'http-status'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userrouter)

app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
