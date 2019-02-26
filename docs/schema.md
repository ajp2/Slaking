# Database Schema

## `users`

| column name       | data type | details                   |
| ----------------- | --------- | ------------------------- |
| `id`              | integer   | not null, primary key     |
| `username`        | string    | not null, indexed, unique |
| `email`           | string    | not null, indexed, unique |
| `avatar_url`      | string    |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

* index on `username, unique: true`
* index on `email, unique: true`
* index on `session_token, unique: true`

## `channels`

| column name       | data type | details                   |
| ----------------- | --------- | ------------------------- |
| `id`              | integer   | not null, primary key     |
| `name`            | string    | not null, indexed, unique |
| `description`     | string    |                           |
| `private`         | boolean   | not null, default         |
| `owner_id`        | integer   | not null, foreign key     |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

* index on `name, unique: true`
* `private, default: false` 

## `user_channels`

| column name       | data type | details                        |
| ----------------- | --------- | ------------------------------ |
| `id`              | integer   | not null, primary key          |
| `user_id`         | integer   | not null, indexed, foreign key |
| `channel_id`      | integer   | not null, indexed, foreign key |
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

* index on `[:user_id, :channel_id], unique: true`
* index on `channel_id`

## `messages`

| column name           | data type | details                           |
| --------------------- | --------- | --------------------------------- |
| `id`                  | integer   | not null, primary key             |
| `content`             | text      | not null                          |
| `author_id`           | integer   | not null, indexed, foreign key    |
| `channel_id`          | integer   | not null, indexed, foreign key    |
| `created_at`          | datetime  | not null                          |
| `updated_at`          | datetime  | not null                          |

* `author_id` references `users`
* index on `channel_id`

## emojis

| column name       | data type | details                        |
| ----------------- | --------- | ------------------------------ |
| `id`              | integer   | not null, primary key          |
| `content`         | string    | not null                       |
| `author_id`       | integer   | not null, indexed, foreign key |
| `message_id`      | integer   | not null, indexed, foreign key |
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

* index on `author_id`
* index on `message_id`
