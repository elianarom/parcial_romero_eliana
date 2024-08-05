import { z } from 'zod';

export const crearPostValidacion = z.object({
    title: z.string({
        required_error: 'Tenés que agregar un título.'
    }),
    description: z.string({
        required_error: 'Tenés que agregar una descripción.'
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