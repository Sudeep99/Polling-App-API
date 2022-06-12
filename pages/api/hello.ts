// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Poll } from '@prisma/client'
import {Option} from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../db/prisma'

type Data = {
  poll: Poll | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //const findPoll = await prisma.poll.findUnique({ where: {id: "cl4863qb30762qcj7d8yde9d1"}, include:{options: true}})
  const createUserAndPost = await prisma.poll.create({
    data:{
      question: "Favourite Programming Language",
      description: "What is your Favourite Prorgamming Language?",
      options:{
        create:[
          {name: "C"},
          {name: "C++"},
          {name: "Java"},
          {name: "JavaScript"},
          {name: "Python"},
          {name: ".NET"},
          {name: "Assembly"},
        ]
      }
    },
    include:{
      options: true,
    }
  })
  res.status(200).json({ poll: createUserAndPost})
}
