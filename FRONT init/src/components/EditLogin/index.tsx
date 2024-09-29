import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SchemaLog } from "../../Lib/yup";
import { ILogin } from "../../Lib/types";
import { handleChangeLog } from "../../Lib/api";
import { MDBInput } from "mdb-react-ui-kit";

export const EditLogin = () => {
    const [error, setError] = useState<string>('');

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ILogin>({
        resolver: yupResolver(SchemaLog),
    });

    const onSubmitForLog = async (data: ILogin): Promise<void> => {
        try {
            const response = await handleChangeLog(data);

            if (response.status === 'error' && response.message) {
                setError(response.message);
            } else {
                reset();
                setError('');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h5>Change login</h5>
            <form onSubmit={handleSubmit(onSubmitForLog)}>
                {error && <p className='text-danger'>{error}</p>}
                {errors.password && <p className='text-danger'>{errors.password.message}</p>}

                <MDBInput
                    wrapperClass='mb-4'
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                />

                {errors.login && <p className='text-danger'>{errors.login.message}</p>}

                <MDBInput
                    wrapperClass='mb-4'
                    type='text'
                    placeholder='New login'
                    {...register('login')}
                />

                <button type='submit' className='btn btn-outline-dark'>Change</button>
            </form>
        </div>
    );
};
