# Car Dealership API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
For protected routes, include the JWT token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

## 1. User Management

### Register User
```
POST /user/register
```
Request Body:
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
}
```

### Login
```
POST /user/login
```
Request Body:
```json
{
    "email": "test@example.com",
    "password": "password123"
}
```

### Get User Profile
```
GET /user/profile
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Get All Users (Admin Only)
```
GET /user
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Get User by ID
```
GET /user/:id
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Update User
```
PUT /user/:id
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```
Request Body:
```json
{
    "username": "updateduser",
    "email": "updated@example.com"
}
```

### Delete User
```
DELETE /user/:id
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

## 2. Car Management

### Create Car
```
POST /car
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```
Request Body:
```json
{
    "make": "Toyota",
    "model": "Camry",
    "year": 2024,
    "price": 25000,
    "description": "New Toyota Camry",
    "features": ["Bluetooth", "Backup Camera", "Cruise Control"],
    "images": ["url1", "url2"],
    "available": true
}
```

### Get All Cars
```
GET /car
```

### Get Car by ID
```
GET /car/:id
```

### Update Car
```
PUT /car/:id
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```
Request Body:
```json
{
    "price": 24000,
    "available": false
}
```

### Delete Car
```
DELETE /car/:id
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Search Cars
```
GET /car/search?query=toyota
```

### Filter Cars
```
GET /car/filter?make=Toyota&year=2024
```

## 3. Test Drive Booking

### Create Booking
```
POST /book-test-drive
```
Request Body:
```json
{
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "carModel": "Toyota Camry",
    "preferredDate": "2024-03-25T10:00:00Z",
    "preferredTimeSlot": "10:00-12:00"
}
```

### Get All Bookings
```
GET /book-test-drive
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Get Booking by ID
```
GET /book-test-drive/:id
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Update Booking
```
PUT /book-test-drive/:id
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```
Request Body:
```json
{
    "isConfirmed": true,
    "preferredTimeSlot": "14:00-16:00"
}
```

### Delete Booking
```
DELETE /book-test-drive/:id
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Get Bookings by Date
```
GET /book-test-drive/date/2024-03-25
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Get Bookings by Car
```
GET /book-test-drive/car/:carId
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

### Get Bookings by User
```
GET /book-test-drive/user/:userId
```
Headers Required:
```
Authorization: Bearer your_jwt_token
```

## 4. Feedback Management

### Create Feedback
```
POST /feedback
```
Request Body:
```json
{
    "userId": "user_id_here",
    "carId": "car_id_here",
    "rating": 5,
    "comment": "Great experience with the test drive",
    "type": "test_drive"
}
```

### Get All Feedback
```
GET /feedback
```

### Get Feedback by ID
```
GET /feedback/:id
```

### Update Feedback
```
PUT /feedback/:id
```
Request Body:
```json
{
    "rating": 4,
    "comment": "Updated feedback comment"
}
```

### Delete Feedback
```
DELETE /feedback/:id
```

### Get Feedback by Car
```
GET /feedback/car/:carId
```

### Get Feedback by User
```
GET /feedback/user/:userId
```

### Get Average Rating for Car
```
GET /feedback/rating/:carId
```

## Response Format

### Success Response
```json
{
    "status": "success",
    "data": {
        // Response data here
    }
}
```

### Error Response
```json
{
    "status": "error",
    "message": "Error message here"
}
```

## Testing Flow
1. Register a new user
2. Login to get JWT token
3. Use the token in Authorization header for protected routes
4. Create a car
5. Book a test drive
6. Add feedback
7. Test GET endpoints to verify data

## Common Headers
```
Content-Type: application/json
Authorization: Bearer your_jwt_token
```

## Query Parameters
- Pagination: `?page=1&limit=10`
- Sorting: `?sort=price&order=desc`
- Filtering: `?make=Toyota&year=2024` 