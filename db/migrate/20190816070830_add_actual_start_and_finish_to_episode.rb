class AddActualStartAndFinishToEpisode < ActiveRecord::Migration[5.2]
  add_column :episodes, :actual_start, :timestamp
  add_column :episodes, :actual_finish, :timestamp
end
