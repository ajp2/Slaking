```
{
  entities: {
    users: {
      1: {
        id: 1,
        username: "admin",
        email: "admin@test.com",
        avatar_url: "s3.com/sfasdfl234d"
      }
    },
    channels: {
      1: {
        id: 1,
        name: "general",
        description: "talk about anything"
      }
    },
    messages: {
      1: {
        id: 1,
        content: "testing",
        author_id: 1,
        channel_id: 1
      },
      emojis: {
        1: {
          id: 1,
          content: ":wave",
          message_id: 1,
          author_id: 1
        }
      }
    }
  },
  ui: {
    loading: true/false
  },
  errors: {
    authentication: ["password can't be blank]
  },
  session: {
    userId: 1/null
  }
}
```