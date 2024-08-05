import { z } from 'zod';

export const registroValidacion = z.object({
    username: z.string({
        required_error: 'Tenés que agregar un nombre de usuario.'
    }),
    email: z.string({
        required_error: 'Tenés que agregar un email.'
    }).email({
        message: 'El email es inválido.'
    }),
    password: z.string({
        required_error: 'Tenés que agregar una contraseña.'
    }).min(6, {
        message: 'La contraseña tiene que contener al menos 6 caracteres.'
    }),
})

export const loginValidacion = z.object({
    email: z.string({
        message: 'Tenés que ingresar tu email.'
    }).email({
        message: 'El email es incorrecto o no estás registrado.'
    }),
    password: z.string({
        required_error: 'Tenés que ingresar una contraseña.'
    }).min(6, {
        message: 'La contraseña tiene que contener al menos 6 caracteres.'
    }),
})