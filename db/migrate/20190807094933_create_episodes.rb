# :reek:all
class CreateEpisodes < ActiveRecord::Migration[5.2]
  def change
    create_table :episodes do |t|
      t.string :title, null: false
      t.string :video
      t.string :image
      t.timestamp :date
      t.string :soundcloud
      t.text :description
      t.string :status, default: 'draft', null: false

      t.timestamps
    end
  end
end
