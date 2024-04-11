import z from 'zod';


export const changeNameSchema = z.object({
    name: z.string()
})


export type ChangeNameInput = z.TypeOf<typeof changeNameSchema>