class AddStatusRefToEpisodes < ActiveRecord::Migration[5.2]
  def change
    add_reference :episodes, :status, foreign_key: true
  end
end
