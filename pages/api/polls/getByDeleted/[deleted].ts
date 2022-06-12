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
    const { deleted } = req.query
    if((deleted !== undefined)&&(!Array.isArray(deleted))){
        const findPoll = await prisma.poll.findMany({ where: {deleted: deleted }, include:{options: true}})
        res.status(200).json({ poll: findPoll})
    }
}
