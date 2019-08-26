class AddYoutubeFieldsToEpisodes < ActiveRecord::Migration[5.2]
  def change
    add_column :episodes, :youtube_status, :string
    add_column :episodes, :broadcast_begin, :timestamp
    add_column :episodes, :broadcast_end, :timestamp
  end
end
