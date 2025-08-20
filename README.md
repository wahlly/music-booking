# Music Booking Management API

## Overview

The Music Booking Management API is a RESTful service that helps with the management of music events, handling artist profiles, event scheduling, and managing bookings and transaction history. It enhances interactions between event organizers, artists, and their fans, ensuring a seamless booking process.

## Setup
- Clone the repo to your local.
- Ensure you have **docker** and **docker compose** installed in your environment.
- Copy the contents in the ".env.example" file in the root dir, create a .env file in the root dir, and past the contents in it.
- Spin up the application by running ***docker compose up***


## Technologies - Nodejs(typescript), MongoDB, Docker.

## API Endpoints

### **Artist**
- **POST** `/artist/signup` - register a new artist.
- **POST** `/artist/login` - artist login.
- **GET** `/artist/{artistId}/profile` - artist profile
- **POST** `/artist/event` - create an upcoming event.

### **Users**
- **POST** `/user/signup` - user registration
- **POST** `/user/login` - user login
- **GET** `/user/{userId}/profile` - Get user profile
- **GET** `/user/{userId}/artist-profile/{artistId}` - View profile of an artist, included in the response is a list of upcoming events hosted by the artist.
- **POST** `/user/event/booking/initialize` - initialize event booking transaction
- **POST** `/user/event/booking/complete` - complete event booking transaction
- **GET** `/user/{userId}/bookings/history` - Get user event booking history
- **GET** `/user/{userId}/music-events` - Get events list. it also accepts search filter parameters through req.query, supporting "status", "hostArtist", and "state". please refer to the postman docs for better clarification.
- **GET** `/user/{userId}/event/{eventId}` - Get a particular event using its _id.


## Authentication

The API uses jwt tokens for authentications, this is done by attaching 'Authorizaton: Bearer {token}'  to the Header. 

POSTMAN DOCS - https://documenter.getpostman.com/view/25439414/2sB2cSi4fK
