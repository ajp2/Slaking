json.extract! message, :id, :content, :author_id, :channel_id
json.date time_ago_in_words(message.created_at)
json.time format_time(message.created_at)

message.emojis.each do |emoji|
  json.set! emoji.id do
    json.extract! emoji, :id, :content, :author_id
  end
end