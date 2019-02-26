# MVP List

Slaking, a Slack clone, is a communication application that allows users to chat in real time, in private or public channels.

1. Hosting on Heroku (1 day)

2. Authentication (1 day)
    * Users can sign up, log in and log out
    * Access to a demo account so no need to sign up
    * Chat not accessible unless logged in (AuthRoutes/ProtectedRoutes)

2.5. Avatars (0.5 days)
    * Users can upload a photo as an avatar (saved to AWS)

3. Channels (2 days)
    * Logged in users can create, edit, and delete channels
    * Can also function as a DM
    * Multiple people can access it

4. Messages (1 day)
    * Users can send messages
    * They can edit and delete them
    * The message belongs to a channel

5. Emojis (2 days)
    * Users can add multiple emojis to other messages
    * Can be deleted only by the user who adds it
    * Adding the same emoji multiple times does nothing

6. Websocket (2 days)
    * Add real time chat functionality

7. Production README (0.5 days)
