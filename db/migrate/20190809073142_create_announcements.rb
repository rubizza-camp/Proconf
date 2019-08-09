class CreateAnnouncements < ActiveRecord::Migration[5.2]
  def change
    create_table :announcements do |t|
      t.references :episode, foreign_key: true
      t.string :title
      t.timestamp :date
      t.string :image
      t.string :video
      t.string :target_resource

      t.timestamps
    end
  end
end
