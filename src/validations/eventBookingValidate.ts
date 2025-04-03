export const initializeEventBookingValidation = {
      userId: {
            notEmpty: true,
            errorMessage: "userId is required"
      },
      eventId: {
            notEmpty: true,
            errorMessage: "eventId is required"
      },
      amount: {
            notEmpty: true,
            errorMessage: "amount is required"
      },
      email: {
            notEmpty: true,
            errorMessage: "email is required"
      }
}

export const completeEventBookingValidation = {
      userId: {
            notEmpty: true,
            errorMessage: "userId is required"
      },
      reference: {
            notEmpty: true,
            errorMessage: "reference is required"
      }
}