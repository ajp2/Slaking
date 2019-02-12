class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.string :description
      t.boolean :private, null: false, default: false
      t.integer :owner_id, null: false

      t.timestamps
    end
    add_index :channels, :name, unique: true
  end
end
