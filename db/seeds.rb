# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin = User.create(username: "admin", email: "admin@test.com", password: "password")
guest = User.create(username: "guest", email: "guest@test.com", password: "password123")


general = Channel.create(name: "general", description: "Chat about anything...", owner_id: admin.id)

admin_channel = UserChannel.create(user_id: admin.id, channel_id: general.id)
guest_channel = UserChannel.create(user_id: guest.id, channel_id: general.id)