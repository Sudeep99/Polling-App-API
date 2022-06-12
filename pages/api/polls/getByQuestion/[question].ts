// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Poll } from '@prisma/client'
import {Option} from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../../../db/prisma'

type Data = {
  poll: Poll | null | Poll[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { question } = req.query
    if((question !== undefined)&&(!Array.isArray(question))){
        const findPoll = await prisma.poll.findMany({ where: {question: {contains: question}}, include:{options: true}})
        res.status(200).json({ poll: findPoll})
    }
}
