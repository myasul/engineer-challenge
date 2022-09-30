import express from 'express'
import { PrismaClient, Prisma, PolicyStatus } from '@prisma/client'

const app = express()
const port = 4000
const prisma = new PrismaClient()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', ['Content-Type'])
    next()
})

app.get('/policies', async (req, res) => {
    const { search, status } = req.query as { search?: string, status?: string }

    const getValidStatusesFromString = (statusStr: string): PolicyStatus[] => {
        const rawStatuses = statusStr.split(',')

        return rawStatuses.flatMap(statusFromQuery => {
            const validStatuses: string[] = Object.values(PolicyStatus)
            const status = statusFromQuery.trim().toUpperCase()

            return validStatuses.includes(status) ? (status as PolicyStatus) : []
        })
    }

    const buildWhereClauseFromQueryParams = (search?: string, status?: string): Prisma.PolicyWhereInput => {
        if (!(search || status)) return {}

        const orList: Prisma.Enumerable<Prisma.PolicyWhereInput> = []
        const validStatuses = status ? getValidStatusesFromString(status) : []

        if (search) {
            orList.push(
                { provider: { contains: search as string, mode: 'insensitive' } },
                { customer: { firstName: { contains: search as string, mode: 'insensitive' } } },
                { customer: { lastName: { contains: search as string, mode: 'insensitive' } } },
            )
        }

        if (status) {
            if (orList.length > 0) {
                orList.forEach(condition => condition.status = { in: validStatuses })
            } else {
                orList.push({ status: { in: validStatuses } })
            }
        }

        return { OR: orList }
    }

    const policies = await prisma.policy.findMany({
        where: { ...buildWhereClauseFromQueryParams(search, status), },
        select: {
            id: true,
            provider: true,
            insuranceType: true,
            status: true,
            startDate: true,
            endDate: true,
            customer: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    dateOfBirth: true
                }
            }
        }
    })

    res.json(policies)
})

app.get('/', (req, res) => {
    res.send('Server is up and running 🚀')
})

app.listen(port, () => {
    console.log(`🚀  Server ready at ${port}`)
})
