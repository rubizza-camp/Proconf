# :reek:all
class AddUserRefToEpisodes < ActiveRecord::Migration[5.2]
  def change
    add_column :episodes, :created_by, :bigint
    add_foreign_key :episodes, :users, column: :created_by
    add_index :episodes, :created_by
  end
end
