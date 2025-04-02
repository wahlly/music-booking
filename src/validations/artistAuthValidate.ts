export const artistSignupValidation = {
      birthName: {
            notEmpty: true,
            errorMessage: "name is required"
      },
      stageName: {
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

export const artistLoginValidation = {
      email: {
            notEmpty: true,
            errorMessage: "email is required"
      },
      password: {
            notEmpty: true,
            errorMessage: "password is required"
      }
}