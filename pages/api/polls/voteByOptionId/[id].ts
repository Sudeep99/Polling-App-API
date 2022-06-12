// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Poll } from '@prisma/client'
import {Option} from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../../../db/prisma'

type Data = {
  poll: Option | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { id } = req.query
    if((id !== undefined)&&(!Array.isArray(id))){
        const findPoll = await prisma.option.update({
            where:{
                id: id
            },
            data:{
                votes: {
                    increment: 1
                }
            }
        })
        res.status(200).json({ poll: findPoll})
    }
}
