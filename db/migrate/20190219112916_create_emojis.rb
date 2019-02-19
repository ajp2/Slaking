class CreateEmojis < ActiveRecord::Migration[5.2]
  def change
    create_table :emojis do |t|
      t.string :content, null: false
      t.integer :author_id, null: false
      t.integer :message_id, null: false

      t.timestamps
    end
    add_index :emojis, [:author_id, :message_id, :content], unique: true
  end
end
