# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Main data

admin = User.create(username: "admin", password: "password")
guest = User.create(username: "guest", password: "password123")

general = Channel.create(name: "general", description: "Chat about anything...", owner_id: admin.id)


# Channels
simpsons = Channel.create(name: "The Simpsons", description: "A topic related to The Simpsons", owner_id: admin.id)
star_wars = Channel.create(name: "Star Wars", description: "Discuss any Star Wars related topics here", owner_id: admin.id)


# Users
homer = User.create(username: "Homer Simpson", password: "password123")
homer.avatar.attach(
  io: File.open("app/assets/images/avatars/homer.jpg"),
  filename: "homer.jpg"
)
marge = User.create(username: "Marge Simpson", password: "password123")
marge.avatar.attach(
  io: File.open("app/assets/images/avatars/marge.jpg"),
  filename: "marge.jpg"
)
bart = User.create(username: "Bart Simpson", password: "password123")
bart.avatar.attach(
  io: File.open("app/assets/images/avatars/bart.png"),
  filename: "bart.png"
)
lisa = User.create(username: "Lisa Simpson", password: "password123")
lisa.avatar.attach(
  io: File.open("app/assets/images/avatars/lisa.jpg"),
  filename: "lisa.jpg"
)

yoda = User.create(username: "Yoda", password: "password123")
yoda.avatar.attach(
  io: File.open("app/assets/images/avatars/yoda.jpg"),
  filename: "yoda.jpg"
)
darthvader = User.create(username: "Darth Vader", password: "password123")
darthvader.avatar.attach(
  io: File.open("app/assets/images/avatars/vader.jpeg"),
  filename: "vader.jpeg"
)
luke = User.create(username: "Luke Skywalker", password: "password123")
luke.avatar.attach(
  io: File.open("app/assets/images/avatars/luke.jpg"),
  filename: "luke.jpg"
)


# User Channels
homer_general = UserChannel.create(user_id: homer.id, channel_id: general.id)
homer_simpson = UserChannel.create(user_id: homer.id, channel_id: simpsons.id)
marge_general = UserChannel.create(user_id: marge.id, channel_id: general.id)
marge_simpson = UserChannel.create(user_id: marge.id, channel_id: simpsons.id)
bart_general = UserChannel.create(user_id: bart.id, channel_id: general.id)
bart_simpson = UserChannel.create(user_id: bart.id, channel_id: simpsons.id)
lisa_general = UserChannel.create(user_id: lisa.id, channel_id: general.id)
lisa_simpson = UserChannel.create(user_id: lisa.id, channel_id: simpsons.id)

yoda_general = UserChannel.create(user_id: yoda.id, channel_id: general.id)
yoda_star_wars = UserChannel.create(user_id: yoda.id, channel_id: star_wars.id)
darthvader_general = UserChannel.create(user_id: darthvader.id, channel_id: general.id)
darthvader_star_wars = UserChannel.create(user_id: darthvader.id, channel_id: star_wars.id)
luke_general = UserChannel.create(user_id: luke.id, channel_id: general.id)
luke_star_wars = UserChannel.create(user_id: luke.id, channel_id: star_wars.id)

admin_general = UserChannel.create(user_id: admin.id, channel_id: general.id)
admin_simpsons = UserChannel.create(user_id: admin.id, channel_id: simpsons.id)
admin_star_wars = UserChannel.create(user_id: admin.id, channel_id: star_wars.id)

guest_general = UserChannel.create(user_id: guest.id, channel_id: general.id)
guest_simpsons = UserChannel.create(user_id: guest.id, channel_id: simpsons.id)
guest_star_wars = UserChannel.create(user_id: guest.id, channel_id: star_wars.id)


# Messages
Message.create(content: "Now that we’re all alone, Marge, admit it, you like Lisa best", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "No", author_id: marge.id, channel_id: simpsons.id)
Message.create(content: "Oh, so you’re a Bart woman, are you?!", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "No", author_id: marge.id, channel_id: simpsons.id)
Message.create(content: "Well you can’t possible like Maggie best. What has she ever done? Nothin’ for nobody!", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "Does it make you feel superior to tear down people's dreams?", author_id: lisa.id, channel_id: simpsons.id)
Message.create(content: "I’ve learned that life is one crushing defeat after another until you just wish Flanders was dead", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "Wow, your first day at the new school! Lisa, have fun. Bart, don't!", author_id: marge.id, channel_id: simpsons.id)
Message.create(content: "I believe that children are our future. Unless we stop them now", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "Nothing you say can upset us. We're the MTV generation", author_id: bart.id, channel_id: simpsons.id)
Message.create(content: "I’ve gone back in time to when dinosaurs weren’t just confined to zoos", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "There's a lot more to it than that, Bart. I don't just babysit. I sell peace of mind for a dollar an hour. Two dollars after 9 o'clock", author_id: lisa.id, channel_id: simpsons.id)
Message.create(content: "I’m like that guy who single-handedly built the rocket & flew to the moon. What was his name? Apollo Creed?", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "Lord help me, I’m just not that bright", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "Bart, with $10,000, we’d be millionaires! We could buy all kinds of useful things like…love!", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "I Thought Dabbling in the Black Arts Would Be Good for a Chuckle. How Wrong I Was", author_id: bart.id, channel_id: simpsons.id)
Message.create(content: "All my life I've had one dream, to achieve my many goals", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "Kids, you tried your best and you failed miserably. The lesson is, never try", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "Shut up, brain! I've got friends now. I don't need you anymore.", author_id: lisa.id, channel_id: simpsons.id)
Message.create(content: "Hmm. Your ideas are intriguing to me and I wish to subscribe to your newsletter", author_id: homer.id, channel_id: simpsons.id)
Message.create(content: "This tree reminds me of your father. Round in the middle, thinning up top and your hands get sticky when you touch him", author_id: marge.id, channel_id: simpsons.id)
Message.create(content: "I didn't do it. Nobody saw me do it. You can't prove anything", author_id: bart.id, channel_id: simpsons.id)

Message.create(content: "Give into your hate and anger", author_id: darthvader.id, channel_id: star_wars.id)
Message.create(content: "Train yourself to let go of everything you fear to lose", author_id: yoda.id, channel_id: star_wars.id)
Message.create(content: "Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering", author_id: yoda.id, channel_id: star_wars.id)
Message.create(content: "There IS still good in him. I’ve felt it.", author_id: luke.id, channel_id: star_wars.id)
Message.create(content: "If I don’t make it back, you’re the only hope for the Alliance.", author_id: luke.id, channel_id: star_wars.id)
Message.create(content: "Powerful you have become, the dark side I sense in you", author_id: yoda.id, channel_id: star_wars.id)
Message.create(content: "PATIENCE YOU MUST HAVE my young padawan", author_id: yoda.id, channel_id: star_wars.id)
Message.create(content: "I see through the lies of the Jedi. I do not fear the dark side as you do. I have brought peace, freedom, justice, and security to my new empire", author_id: darthvader.id, channel_id: star_wars.id)
Message.create(content: "You know, I think that R2 unit we bought may have been stolen.", author_id: luke.id, channel_id: star_wars.id)
Message.create(content: "I am altering the deal. Pray I don’t alter it any further.", author_id: darthvader.id, channel_id: star_wars.id)
Message.create(content: "Your overconfidence is your weakness.", author_id: luke.id, channel_id: star_wars.id)
Message.create(content: "Don’t be too proud of this technological terror you’ve constructed. The ability to destroy a planet is insignificant next to the power of the Force… I find your lack of faith disturbing", author_id: darthvader.id, channel_id: star_wars.id)
Message.create(content: "If you end your training now — if you choose the quick and easy path as Vader did — you will become an agent of evil", author_id: yoda.id, channel_id: star_wars.id)
Message.create(content: "The circle is now complete. When I left you, I was but the learner. Now I am the master", author_id: darthvader.id, channel_id: star_wars.id)
Message.create(content: "No, I am your father", author_id: darthvader.id, channel_id: star_wars.id)
Message.create(content: "You couldn’t bring yourself to kill me before and I don’t believe you’ll destroy me now.", author_id: luke.id, channel_id: star_wars.id)
Message.create(content: "Impressive. Most impressive. Obi-Wan has taught you well. You have controlled your fear. Now, release your anger. Only your hatred can destroy me. ", author_id: darthvader.id, channel_id: star_wars.id)
Message.create(content: "If there’s a bright center of the universe, you’re on the planet that it’s farthest from", author_id: luke.id, channel_id: star_wars.id)


users = [admin, guest, homer, marge, bart, lisa, yoda, darthvader, luke]
30.times do
  current_user = users.sample
  Message.create(content: Faker::GreekPhilosophers.quote, author_id: current_user.id, channel_id: general.id)
end