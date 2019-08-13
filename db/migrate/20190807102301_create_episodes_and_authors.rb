# :reek:all
class CreateEpisodesAndAuthors < ActiveRecord::Migration[5.2]
  def change
    create_table :authors_episodes, id: false do |t|
      t.belongs_to :episode, index: true, foreign_key: true
      t.belongs_to :author, index: true, foreign_key: true
    end
  end
end
