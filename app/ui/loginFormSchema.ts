import { string, object, pipe, email, minLength, InferInput } from "valibot";

export const schema = object({
  email: pipe(
    string("email is required"),
    email("email must be a valid email")
  ),
  password: pipe(
    string("password is required"),
    minLength(6, "password must be at least 6 characters")
  ),
});

export type LoginInputTypes = InferInput<typeof schema>;
