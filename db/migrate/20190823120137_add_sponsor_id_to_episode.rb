class AddSponsorIdToEpisode < ActiveRecord::Migration[5.2]
  def change
    add_column :episodes, :sponsor_id, :bigint
  end
end
