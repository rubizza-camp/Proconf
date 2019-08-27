class CreateJoinTableSponsorsEpisodes < ActiveRecord::Migration[5.2]
  def change
    create_join_table :sponsors, :episodes
  end
end
