class CreateTimecodes < ActiveRecord::Migration[5.2]
  def change
    create_table :timecodes do |t|
      t.references :episode, foreign_key: true
      t.string :title, null: false
      t.timestamp :time, null: false

      t.timestamps
    end
  end
end
