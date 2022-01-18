#steps to be followed to excute the program

1. npm install

2. npm run watch

## API End Points

A. Route "/api/v1/user"

    1. API "/register"

        Sample URL: http://localhost:3035/api/v1/user/register

        Method Type : POST

        Description: API for registering a user

        sample Request Body:
                        {
                            "name":"abhiram venugopal",
                            "email":"abhi@gmail.com",
                            "password":"system09"
                        }

        Sample Response:

                        {
                            "status": "success",
                            "message": "register success"
                        }

                        or

                        {
                            "status": "failed",
                        }

    2. API "/signin"

        Sample URL: http://localhost:3035/api/v1/user/signin

        Method Type : POST

        Description: API for login a user

        sample Request Body:
                        {
                            "username":"abhi@gmail.com",
                            "password":"system09"
                        }

        Sample Response:

                        {
                            "status": "success",
                            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjFlNjQ5YTk4NTg2MDM0ODFmYzEwYWY0IiwiaWF0IjoxNjQyNTA5MjM4fQ.91nZbnr3w0dQR6ovMw7cAAJrnT_oKZ_0itx4DQNNWNY",
                            "user": {
                                "name": "abhiram venugopal",
                                "email": "abhi@gmail.com",
                                "followers": 0,
                                "following": 0
                            }
                        }

                        or

                        {
                            "status": "failed",
                        }
    3. API "/users/like/myposts"

        Sample URL: http://localhost:3035/api/v1/user/users/like/myposts

        Method Type : GET

        Description: API to fetch the latest list of users liking my posts

        Sample Response:

                        {
                            "status": "success",
                            "users": [
                                {
                                    "_id": "61e649a9858603481fc10af4",
                                    "name": "abhiram venugopal",
                                    "email": "abhi@gmail.com",
                                    "followers": 0,
                                    "following": 0
                                }
                            ]
                        }

                        or

                        {
                            "status": "failed",
                        }
    4. API "users/comments/like/myposts"

        Sample URL: http://localhost:3035/api/v1/user/users/comments/like/myposts

        Method Type : GET

        Description: API to fetch the latest list of users liking my comments on any post

        Sample Response:

                        {
                            "status": "success",
                            "users": [
                                {
                                    "_id": "61e649a9858603481fc10af4",
                                    "name": "abhiram venugopal",
                                    "email": "abhi@gmail.com",
                                    "followers": 0,
                                    "following": 0
                                }
                            ]
                        }

                        or

                        {
                            "status": "failed",
                        }
    5. API "/users/comments/myposts"

        Sample URL: http://localhost:3035/api/v1/user/users/comments/myposts

        Method Type : GET

        Description: API to fetch the latest list of users commenting on my post

        Sample Response:

                        {
                            "status": "success",
                            "users": [
                                {
                                    "_id": "61e649a9858603481fc10af4",
                                    "name": "abhiram venugopal",
                                    "email": "abhi@gmail.com",
                                    "followers": 0,
                                    "following": 0
                                }
                            ]
                        }

                        or

                        {
                            "status": "failed",
                        }

B. Route "/api/v1/post"

    1. API "/create"

        Sample URL: http://localhost:3035/api/v1/post/create

        Method Type : POST

        Description: API for creating new post

        sample RequestBody:
                        {
                            "title":"sample ho ho",
                            "location":"nattika",
                            "description":"first post ho ho ",
                            "PostImage":"http://image.com/1234"
                        }



        Sample Response:

                       {
                            "status": "success",
                            "posts": {
                                "title": "sample ho ho",
                                "location": "nattika",
                                "likes": [],
                                "description": "first post ho ho ",
                                "PostImage": "http://image.com/1234",
                                "datetime": "2022-01-18T10:54:53.669Z",
                                "user": "61e649a9858603481fc10af4",
                                "_id": "61e69c7d8a7d3338d1f965cd",
                                "__v": 0
                            }
                        }

                        or

                        {
                            "status": "failed",
                        }
    2. API "/like/:postId"

        Sample URL: http://localhost:3035/api/v1/post/like/61e69c7d8a7d3338d1f965cd

        Method Type : PATCH

        Description: API for like a Post


        Sample Response:

                        {
                            "status": "success"
                        }

                        or

                        {
                            "status": "failed",
                        }

     3. API "/comment/:postId"

        Sample URL: http://localhost:3035/api/v1/post/comment/61e69c7d8a7d3338d1f965cd

        Method Type : POST

        Description: API for adding an comment to a post


        Sample Response:

                        {
                            "status": "success"
                        }

                        or

                        {
                            "status": "failed",
                        }
