export const userSignupValidation = {
      name: {
            notEmpty: true,
            errorMessage: "name is required"
      },
      email: {
            notEmpty: true,
            errorMessage: "email is required"
      },
      password: {
            notEmpty: true,
            errorMessage: "password is required"
      }
}

export const userLoginValidation = {
      email: {
            notEmpty: true,
            errorMessage: "email is required"
      },
      password: {
            notEmpty: true,
            errorMessage: "password is required"
      }
}