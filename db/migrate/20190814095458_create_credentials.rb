class CreateCredentials < ActiveRecord::Migration[5.2]
  def change
    create_table :credentials do |t|
      t.references :user, foreign_key: true
      t.string :service
      t.json :data

      t.timestamps
    end
  end
end
