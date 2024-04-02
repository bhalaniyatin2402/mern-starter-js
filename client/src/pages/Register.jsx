import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import FormInput from "../components/form/Input";
import { registerSchema } from "../data/formSchema";
import { useRegisterMutation } from "../redux/services/auth.services";
import { setCredentials } from "../redux/slices/auth.slice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const res = await register(values);
      if (res?.data) {
        dispatch(setCredentials({ isLoggedIn: true }));
        return navigate("/")
      }
      if (res?.error) {
        console.log(res.error.data.message);
      }
    },
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Login
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <FormInput
                type="text"
                name="username"
                placeholder="Enter Your Name"
                label="Username"
                onChange={handleChange}
                value={values.username}
                touched={touched}
                error={errors.username}
              />
              <FormInput
                type="email"
                name="email"
                placeholder="Enter Your Email"
                label="Email"
                onChange={handleChange}
                value={values.email}
                touched={touched}
                error={errors.email}
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Enter Your Password"
                label="Password"
                onChange={handleChange}
                value={values.password}
                touched={touched}
                error={errors.password}
              />
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  disabled={isLoading}
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
