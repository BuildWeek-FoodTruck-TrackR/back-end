# Back-end


# Food Truck Trackrr API

Base URL:

https://foodtrucktrackrr.herokuapp.com/

## Authentication

### Register DINER

#### Diner 
**[POST]** `/auth/diner/register`

#### REQUEST

##### Body

| name       | type   | required | description            |
| ---------- | ------ | -------- | ---------------------- |
| `username` | String | Yes      | Must be unique         |
| `password` | String | Yes      |                        |

_example:_

```
{
  username: "TestTom",
  password: "pass123"
}
```

#### RESPONSE

##### 201 (Created)

```
{
  "message": "Diner Registration Successful.",
    "id": 1,
    "username": "TestTom",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiVGVzdFRvbSIsImlhdCI6MTU5MjUxMTEyNCwiZXhwIjoxNTkyNTE0NzI0fQ.0rp9BLFWDPpp8c03nD_soA1_TJNuTcS4rS6s8ZpsTsE"
}
```

### Login DINER

**[POST]** `/auth/diner/login`

#### REQUEST

##### Body

| name       | type   | required | description            |
| ---------- | ------ | -------- | ---------------------- |
| `username` | String | Yes      | Must exist in database |
| `password` | String | Yes      | Must exist in database |

_example:_

```
{
  username: "TestTom",
  password: "pass123"
}
```

#### RESPONSE

##### 200 (OK)

```
{
  "message": "Welcome TestTom",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiVGVzdFRvbSIsImlhdCI6MTU5MjUxMTEyNCwiZXhwIjoxNTkyNTE0NzI0fQ.0rp9BLFWDPpp8c03nD_soA1_TJNuTcS4rS6s8ZpsTsE"
}
```

## Authentication

### Register OPERATOR

#### Diner 
**[POST]** `/auth/operator/register`

#### REQUEST

##### Body

| name       | type   | required | description            |
| ---------- | ------ | -------- | ---------------------- |
| `username` | String | Yes      | Must be unique         |
| `password` | String | Yes      |                        |

_example:_

```
{
  username: "TestTom",
  password: "pass123"
}
```

#### RESPONSE

##### 201 (Created)

```
{
  "message": "Operator Registration Successful.",
    "id": 1,
    "username": "TestTom",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiVGVzdFRvbSIsImlhdCI6MTU5MjUxMTEyNCwiZXhwIjoxNTkyNTE0NzI0fQ.0rp9BLFWDPpp8c03nD_soA1_TJNuTcS4rS6s8ZpsTsE"
}
```

### Login OPERATOR

**[POST]** `/auth/operator/login`

#### REQUEST

##### Body

| name       | type   | required | description            |
| ---------- | ------ | -------- | ---------------------- |
| `username` | String | Yes      | Must exist in database |
| `password` | String | Yes      | Must exist in database |

_example:_

```
{
  username: "TestTom",
  password: "pass123"
}
```

#### RESPONSE

##### 200 (OK)

```
{
  "message": "Welcome TestTom",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiVGVzdFRvbSIsImlhdCI6MTU5MjUxMTEyNCwiZXhwIjoxNTkyNTE0NzI0fQ.0rp9BLFWDPpp8c03nD_soA1_TJNuTcS4rS6s8ZpsTsE"
}
```



