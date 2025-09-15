export const EMAIL_VALIDATION={
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email not valid"
                  }
                }



                              export const PASSWORD_VALIDATION={
                required:"Password is Required",

              }
 export const CONFIRM_PASSWORD_VALIDATION = (password: string) => ({
  required: "Confirm Password is required",
  validate: (value: string) =>
    value === password || "Passwords do not match",
});


                           export const USERNAME_VALIDATION={
                required:"User name is Required",

              }
                         export const PHONE_VALIDATION = {
  required: "Phone is required",
  pattern: {
    value: /^01\d{9}$/,
    message: "Phone number must start with 01 and be 11 digits in total"
  }
};

               export const COUNTRY_VALIDATION={
                required:"Country is Required",

              }
               export const IMAGE_VALIDATION={
                required:"Image is Required",

              }