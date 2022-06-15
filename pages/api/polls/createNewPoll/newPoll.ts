// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Poll } from '@prisma/client'
import {Option} from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../../../db/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getInfo = req.body
  const q = getInfo.question
  const d = getInfo.description
  const o = getInfo.options
  const optionsLength = o.length
  const createUserAndPost = await prisma.poll.create({
    data:{
      question: q,
      description: d,
    }
  })
  for(let i = 0; i < optionsLength; i++){
    const createOptions = await prisma.option.create({data: {name: o[i],Poll:{connect:{id: createUserAndPost.id}}}})
  }
  res.status(200).json("Success")
}

// JSON Value Example
// {
//   "question":"testQuestion",
//   "description":"testDescription",
//   "options":["option1","option2","option3"]
// }