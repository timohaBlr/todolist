import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Form, Formik, FormikHelpers, useFormik} from 'formik'

type FormikValues = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (
            values: FormikValues,
            {setSubmitting}: FormikHelpers<FormikValues>
        ) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 500);
        }
    })
    const validate = (values: FormikValues)=>{
        const errors = {};
        if (!values.email){
            errors.email = 'Required';
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   name={'email'}
                                   id={'email'}
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                        />

                        <TextField type="password" label="Password"
                                   margin="normal"
                                   name={'password'}
                                   id={'password'}
                                   value={formik.values.password}
                                   onChange={formik.handleChange}
                        />

                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox/>}
                                          name={'rememberMe'}
                                          id={'rememberMe'}
                                          value={formik.values.rememberMe}
                                          onChange={formik.handleChange}
                        />

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>

                    </FormGroup>
                </form>


            </FormControl>
        </Grid>
    </Grid>
}