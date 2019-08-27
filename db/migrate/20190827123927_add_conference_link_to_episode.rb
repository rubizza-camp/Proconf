class AddConferenceLinkToEpisode < ActiveRecord::Migration[5.2]
  def change
    add_column :episodes, :conference_link, :string
  end
end
