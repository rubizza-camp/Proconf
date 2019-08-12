class RemoveDraftFromEpisodes < ActiveRecord::Migration[5.2]
  def change
    remove_column :episodes, :draft, :boolean
  end
end
