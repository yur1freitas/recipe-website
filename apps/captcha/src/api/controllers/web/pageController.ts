import z from 'zod'

import { createController } from '~/utils/controller'
import { PageFilePaths } from '~/consts'

export const pageController = createController((app) => {
    app.get(
        '/',
        {
            preHandler: [app.tokenAuth(false)],
            schema: {
                response: {
                    200: z.file()
                }
            }
        },
        async (request, reply) => {
            if (request.isAuth) {
                return reply.sendFile(PageFilePaths.MANAGER)
            }

            return reply.sendFile(PageFilePaths.LOGIN)
        }
    )
})
