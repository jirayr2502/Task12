import * as yup from "yup";

export const SchemaPwd = yup.object({
    old: yup.string()
        .required('Please fill in the field')
        .min(6, 'Password must be at least six characters long')
        .max(15, 'Password must be no more than fifteen characters long'),

    newpwd: yup.string()
        .required('Please fill in the field')
        .min(6, 'Password must be at least six characters long')
        .max(15, 'Password must be no more than fifteen characters long')
});

export const SchemaLog = yup.object({
    password: yup.string()
        .required('Please fill in the field')
        .min(6, 'Password must be at least six characters long')
        .max(15, 'Password must be no more than fifteen characters long'),

    login: yup.string()
        .required('Please fill in the field')
        .min(6, 'Login must be at least six characters long')
        .max(15, 'Login must be no more than fifteen characters long')
});

export const SchemaSignUp = yup.object({
    name: yup.string()
        .required('Please fill in the field')
        .min(4, 'Name must be at least four characters long')
        .max(10, 'Name must be no more than ten characters long')
        .test(
            'is-first-letter-capital',
            'First letter of the name must be capitalized',
            value => value ? /^[A-Z]/.test(value) : false
        ),

    surname: yup.string()
        .required('Please fill in the field')
        .min(6, 'Surname must be at least six characters long')
        .max(15, 'Surname must be no more than fifteen characters long')
        .test(
            'is-first-letter-capital',
            'First letter of the surname must be capitalized',
            value => value ? /^[A-Z]/.test(value) : false
        ),

    login: yup.string()
        .required('Please fill in the field')
        .min(6, 'Login must be at least six characters long')
        .max(15, 'Login must be no more than fifteen characters long'),

    password: yup.string()
        .required('Please fill in the field')
        .min(6, 'Password must be at least six characters long')
        .max(15, 'Password must be no more than fifteen characters long')
});
