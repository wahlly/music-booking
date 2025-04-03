export const musicEventValidation = {
      artistId: {
            notEmpty: true,
            errorMessage: "artistId is required"
      },
      title: {
            notEmpty: true,
            errorMessage: "title is required"
      },
      venue: {
            notEmpty: true,
            errorMessage: "venue is required"
      },
      country: {
            notEmpty: true,
            errorMessage: "country is required"
      },
      state: {
            notEmpty: true,
            errorMessage: "state is required"
      },
      ticketPrice: {
            notEmpty: true,
            errorMessage: "ticketPrice is required"
      },
      date: {
            notEmpty: true,
            errorMessage: "date is required"
      },
      hostArtist: {
            notEmpty: true,
            errorMessage: "hostArtist is required"
      },
      guestArtist: {
            notEmpty: true,
            errorMessage: "guestArtist is required"
      },
      availableTickets: {
            notEmpty: true,
            errorMessage: "availableTickets is required"
      },
}