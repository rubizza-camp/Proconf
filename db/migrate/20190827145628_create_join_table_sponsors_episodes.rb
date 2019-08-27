class CreateJoinTableSponsorsEpisodes < ActiveRecord::Migration[5.2]
  def change
    create_join_table :sponsors, :episodes do |t|
      # t.index [:sponsor_id, :episode_id]
      # t.index [:episode_id, :sponsor_id]
    end
  end
end
